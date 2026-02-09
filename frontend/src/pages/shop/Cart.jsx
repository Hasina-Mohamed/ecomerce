import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, AlertCircle, ShoppingBag, Minus, Plus, ArrowRight } from 'lucide-react';
import { ShopContext } from '../../context/ShopContext';

const Cart = () => {
    const { cart, removeFromCart, addToCart } = useContext(ShopContext);
    const navigate = useNavigate();

    // Calculate subtotal
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = 25.00;
    const finalTotal = subtotal + shipping;

    if (cart.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag size={32} className="text-slate-300" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Your Bag is Empty</h2>
                <p className="text-slate-500 mb-8 max-w-md">Looks like you haven't added any of our luxury pieces to your collection yet.</p>
                <Link to="/shop" className="bg-slate-900 hover:bg-black text-white px-8 py-3 rounded-lg font-bold text-sm uppercase tracking-widest transition-all">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-12 lg:py-20 font-sans">
            <h1 className="text-4xl font-bold text-slate-900 mb-12">Shopping Bag</h1>

            <div className="grid lg:grid-cols-3 gap-12">
                {/* Cart Items List */}
                <div className="lg:col-span-2 space-y-6">
                    {cart.map((item, index) => (
                        <div key={`${item.id}-${item.size}-${item.color}`} className="group flex gap-6 p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all">

                            {/* Product Image */}
                            <div className="w-24 h-32 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                                <img src={item.images ? item.images[0] : item.img} alt={item.name} className="w-full h-full object-cover" />
                            </div>

                            {/* Product Details */}
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg font-bold text-slate-900">{item.name}</h3>
                                        <button
                                            onClick={() => removeFromCart(item.id, item.size, item.color)}
                                            className="text-slate-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                    <p className="text-luxe-green font-bold mb-4">${item.price.toFixed(2)}</p>

                                    <div className="flex items-center gap-4 text-sm text-slate-500">
                                        <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-md border border-slate-100">
                                            <span className="uppercase text-xs font-bold tracking-wider">Size:</span>
                                            <span className="font-medium text-slate-900">{item.size}</span>
                                        </div>
                                        <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-md border border-slate-100">
                                            <span className="uppercase text-xs font-bold tracking-wider">Color:</span>
                                            <div className={`w-3 h-3 rounded-full ${item.color === 'green' ? 'bg-[#105c38]' : item.color === 'gold' ? 'bg-[#D4AF37]' : 'bg-black'}`}></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-6">
                                    <div className="flex items-center border border-slate-200 rounded-lg h-10">
                                        <button className="px-3 hover:bg-slate-50 text-slate-500 h-full" onClick={() => item.quantity > 1 ? addToCart(item, -1, item.size, item.color) : removeFromCart(item.id, item.size, item.color)}>
                                            <Minus size={14} />
                                        </button>
                                        <span className="w-8 text-center text-sm font-bold text-slate-900">{item.quantity}</span>
                                        <button className="px-3 hover:bg-slate-50 text-slate-500 h-full" onClick={() => addToCart(item, 1, item.size, item.color)}>
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                    <p className="font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-xl sticky top-24">
                        <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>

                        <div className="space-y-4 mb-8 text-sm">
                            <div className="flex justify-between text-slate-600">
                                <span>Subtotal</span>
                                <span className="font-medium">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-slate-600">
                                <span>Shipping (Express)</span>
                                <span className="font-medium">${shipping.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-slate-600">
                                <span>Estimated Tax</span>
                                <span className="font-medium text-slate-400 italic">Calculated at Checkout</span>
                            </div>
                        </div>

                        <div className="border-t border-slate-100 pt-6 mb-8">
                            <div className="flex justify-between items-end">
                                <span className="font-bold text-slate-900 text-lg">Total</span>
                                <span className="font-black text-2xl text-luxe-green">${finalTotal.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full bg-slate-900 hover:bg-black text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 uppercase tracking-widest text-xs transition-all shadow-lg shadow-slate-900/20 active:scale-[0.98]"
                            >
                                Proceed to Checkout <ArrowRight size={16} />
                            </button>

                            <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl text-amber-800 text-xs leading-relaxed">
                                <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                                <p>Free returns within 30 days. Secure checkout powered by Stripe.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;

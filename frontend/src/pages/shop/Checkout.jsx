import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, CreditCard, CheckCircle } from 'lucide-react';
import { ShopContext } from '../../context/ShopContext';

const Checkout = () => {
    const { cart } = useContext(ShopContext);
    const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success

    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = 25.00;
    const finalTotal = subtotal + shipping;

    const handleShippingSubmit = (e) => {
        e.preventDefault();
        setStep(2);
        window.scrollTo(0, 0);
    };

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        setStep(3);
        window.scrollTo(0, 0);
    };

    if (step === 3) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4 font-sans">
                <div className="bg-white p-12 rounded-3xl shadow-xl max-w-lg w-full text-center border border-slate-100">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                        <CheckCircle size={40} />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-4">Order Confirmed!</h1>
                    <p className="text-slate-500 mb-8 leading-relaxed">
                        Thank you for your purchase. Your order <span className="font-bold text-slate-900">#LUXE-8492</span> has been received and is being processed.
                    </p>
                    <div className="bg-slate-50 rounded-xl p-6 mb-8 text-left">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-slate-500">Amount Paid:</span>
                            <span className="font-bold text-slate-900">${finalTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Est. Delivery:</span>
                            <span className="font-bold text-slate-900">Oct 24 - Oct 28</span>
                        </div>
                    </div>
                    <Link to="/" className="inline-block w-full bg-slate-900 hover:bg-black text-white font-bold py-4 rounded-xl uppercase tracking-widest text-xs transition-all">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FAFAFA] font-sans pb-20">
            {/* Header */}
            <div className="bg-white border-b border-slate-100 sticky top-0 z-40">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-luxe-green rounded-sm"></div>
                        <span className="font-black text-xl tracking-tighter italic text-slate-900">LUXE</span>
                    </Link>
                    <div className="flex items-center gap-8 text-sm font-bold tracking-wider uppercase text-slate-400 hidden md:flex">
                        <span className={step === 1 ? 'text-luxe-green' : 'text-slate-900'}>1. Shipping</span>
                        <span className={step === 2 ? 'text-luxe-green' : ''}>2. Payment</span>
                        <span>3. Review</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-widest">
                        <ShieldCheck size={16} className="text-luxe-green" /> Secure Checkout
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12 grid lg:grid-cols-12 gap-12">

                {/* Main Form Area */}
                <div className="lg:col-span-7 space-y-8">
                    {step === 1 && (
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm">1</div>
                                Shipping Details
                            </h2>
                            <form id="shipping-form" onSubmit={handleShippingSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">First Name</label>
                                        <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-luxe-green outline-none transition-all bg-slate-50" required placeholder="Elena" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Last Name</label>
                                        <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-luxe-green outline-none transition-all bg-slate-50" required placeholder="Vance" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Email Address</label>
                                    <input type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-luxe-green outline-none transition-all bg-slate-50" required placeholder="elena@example.com" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Street Address</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-luxe-green outline-none transition-all bg-slate-50" required placeholder="123 Luxury Lane" />
                                </div>
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">City</label>
                                        <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-luxe-green outline-none transition-all bg-slate-50" required placeholder="New York" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">State</label>
                                        <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-luxe-green outline-none transition-all bg-slate-50" required placeholder="NY" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Zip Code</label>
                                        <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-luxe-green outline-none transition-all bg-slate-50" required placeholder="10001" />
                                    </div>
                                </div>
                                <button type="submit" className="hidden" id="submit-shipping"></button>
                            </form>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm">2</div>
                                Payment Method
                            </h2>
                            <form id="payment-form" onSubmit={handlePaymentSubmit} className="space-y-6">
                                <div className="p-4 border-2 border-luxe-green bg-emerald-50/50 rounded-xl flex items-center gap-4 cursor-pointer">
                                    <div className="w-5 h-5 rounded-full border-[6px] border-luxe-green bg-white"></div>
                                    <div className="flex-1">
                                        <p className="font-bold text-slate-900 flex items-center gap-2">Credit Card <span className="text-xs font-normal text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">Visa / MC / Amex</span></p>
                                    </div>
                                    <CreditCard className="text-luxe-green" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Card Number</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-luxe-green outline-none transition-all bg-slate-50 font-mono" required placeholder="0000 0000 0000 0000" />
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Expiry Date</label>
                                        <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-luxe-green outline-none transition-all bg-slate-50 font-mono" required placeholder="MM / YY" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">CVC</label>
                                        <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-luxe-green outline-none transition-all bg-slate-50 font-mono" required placeholder="123" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}

                    <div className="flex justify-between items-center pt-4">
                        {step > 1 && (
                            <button onClick={() => setStep(step - 1)} className="text-slate-500 hover:text-slate-900 font-bold text-sm uppercase tracking-wider transition-colors">
                                ← Back
                            </button>
                        )}
                        <button
                            onClick={() => document.getElementById(step === 1 ? 'shipping-form' : 'payment-form').requestSubmit()}
                            className="ml-auto bg-slate-900 hover:bg-black text-white px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest shadow-xl shadow-slate-900/10 transition-all transform active:scale-[0.98]"
                        >
                            {step === 1 ? 'Continue to Payment' : 'Complete Order'}
                        </button>
                    </div>

                </div>

                {/* Sidebar Summary */}
                <div className="lg:col-span-5">
                    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-xl sticky top-28">
                        <h3 className="text-lg font-bold text-slate-900 mb-6">Order Summary</h3>
                        <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                            {cart.map((item, idx) => (
                                <div key={idx} className="flex gap-4">
                                    <div className="w-16 h-20 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0 relative">
                                        <img src={item.images ? item.images[0] : item.img} alt={item.name} className="w-full h-full object-cover" />
                                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-slate-900 text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow-md">{item.quantity}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-bold text-slate-900 truncate">{item.name}</h4>
                                        <p className="text-xs text-slate-500 mb-1">{item.size} / {item.color}</p>
                                        <p className="text-sm font-medium text-slate-700">${item.price.toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-3 border-t border-slate-100 pt-6 text-sm">
                            <div className="flex justify-between text-slate-600">
                                <span>Subtotal</span>
                                <span className="font-medium">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-slate-600">
                                <span>Shipping</span>
                                <span className="font-medium">${shipping.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="border-t border-slate-100 pt-6 mt-6">
                            <div className="flex justify-between items-end">
                                <span className="font-bold text-slate-900">Total</span>
                                <span className="font-black text-2xl text-luxe-green">${finalTotal.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Checkout;

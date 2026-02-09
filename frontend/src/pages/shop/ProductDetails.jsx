import { useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Minus, Plus, Heart, Share2, ChevronRight, ShoppingBag } from 'lucide-react';
import { ShopContext } from '../../context/ShopContext';

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart } = useContext(ShopContext);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const [selectedColor, setSelectedColor] = useState('green');
    const [selectedSize, setSelectedSize] = useState('M');

    // Hardcoded product data for demo
    const product = {
        name: 'Forest Expedition Parka',
        price: 849.00,
        rating: 5,
        reviews: 128,
        description: 'Designed for the modern adventurer, the Forest Expedition Parka combines technical performance with urban sophistication. Crafted from our proprietary weather-resistant organic cotton blend, it features reinforced stitching, ample storage, and a silhouette that transitions seamlessly from the trail to the city streets.',
        images: [
            'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop', // Main
            'https://images.unsplash.com/photo-1544923246-77307dd654cb?q=80&w=1000&auto=format&fit=crop', // Detail 1
            'https://images.unsplash.com/photo-1539533377285-b9dfb0ee4cbe?q=80&w=1000&auto=format&fit=crop', // Detail 2
            'https://images.unsplash.com/photo-1551488852-d814c937c191?q=80&w=1000&auto=format&fit=crop'  // Detail 3
        ]
    };

    const [mainImage, setMainImage] = useState(product.images[0]);

    return (
        <div className="bg-white min-h-screen pb-20">

            {/* Breadcrumbs */}
            <div className="container mx-auto px-6 py-6 text-xs text-slate-500 font-bold tracking-widest uppercase flex items-center gap-2">
                <Link to="/" className="hover:text-luxe-green">Home</Link>
                <ChevronRight size={12} />
                <Link to="/shop" className="hover:text-luxe-green">Shop</Link>
                <ChevronRight size={12} />
                <Link to="/shop/outerwear" className="hover:text-luxe-green">Outerwear</Link>
                <ChevronRight size={12} />
                <span className="text-slate-900">{product.name}</span>
            </div>

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">

                {/* Left Column: Images */}
                <div className="space-y-6">
                    <div className="aspect-[4/5] bg-slate-50 rounded-2xl overflow-hidden shadow-sm">
                        <img src={mainImage} alt={product.name} className="w-full h-full object-cover transition-all duration-500" />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {product.images.map((img, idx) => (
                            <div
                                key={idx}
                                className={`aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${mainImage === img ? 'border-luxe-green opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                onClick={() => setMainImage(img)}
                            >
                                <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Details */}
                <div className="lg:pt-8">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{product.name}</h1>
                            <div className="flex items-center gap-4">
                                <div className="flex text-[#D4AF37]">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                                </div>
                                <span className="text-sm text-slate-500 font-medium underline cursor-pointer">{product.reviews} Reviews</span>
                            </div>
                        </div>
                        <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                            <Heart size={20} />
                        </button>
                    </div>

                    <p className="text-3xl font-bold text-luxe-green mb-8">${product.price.toFixed(2)}</p>

                    <p className="text-slate-600 leading-relaxed mb-8">
                        {product.description}
                    </p>

                    <div className="space-y-8 border-t border-slate-100 pt-8 mb-8">

                        {/* Colors */}
                        <div>
                            <p className="text-xs font-bold uppercase text-slate-900 tracking-widest mb-4">Select Color</p>
                            <div className="flex gap-3">
                                {['green', 'gold', 'black'].map(color => (
                                    <button
                                        key={color}
                                        onClick={() => setSelectedColor(color)}
                                        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${selectedColor === color ? 'border-slate-900' : 'border-transparent'}`}
                                    >
                                        <div className={`w-8 h-8 rounded-full ${color === 'green' ? 'bg-[#105c38]' :
                                            color === 'gold' ? 'bg-[#D4AF37]' : 'bg-black'
                                            }`}></div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Sizes */}
                        <div>
                            <p className="text-xs font-bold uppercase text-slate-900 tracking-widest mb-4">Select Size</p>
                            <div className="flex gap-3">
                                {['S', 'M', 'L', 'XL'].map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`w-12 h-12 rounded-lg border font-bold text-sm transition-all ${selectedSize === size ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 text-slate-600 hover:border-slate-400'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity & Add to Cart */}
                        <div className="flex gap-4">
                            <div className="flex items-center border border-slate-200 rounded-lg h-14">
                                <button className="px-4 text-slate-500 hover:text-slate-900" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={16} /></button>
                                <span className="font-bold text-slate-900 w-8 text-center">{quantity}</span>
                                <button className="px-4 text-slate-500 hover:text-slate-900" onClick={() => setQuantity(quantity + 1)}><Plus size={16} /></button>
                            </div>
                            <button
                                onClick={() => addToCart(product, quantity, selectedSize, selectedColor)}
                                className="flex-1 bg-slate-900 hover:bg-black text-white font-bold rounded-lg h-14 uppercase tracking-widest text-xs shadow-xl shadow-slate-900/10 transition-all flex items-center justify-center gap-2 active:scale-95"
                            >
                                Add to Cart <ShoppingBag size={18} />
                            </button>
                        </div>

                        <button className="w-full bg-[#10B981] hover:bg-[#059669] text-white font-bold rounded-lg h-14 uppercase tracking-widest text-xs shadow-lg shadow-emerald-500/20 transition-all">
                            Buy it Now
                        </button>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest cursor-pointer hover:text-luxe-green">
                        <Share2 size={14} /> Share this product
                    </div>

                </div>
            </div>

            {/* Tabs Section */}
            <div className="container mx-auto px-6 mt-24 mb-24">
                <div className="flex justify-center gap-12 border-b border-slate-100 mb-12">
                    {['Description', 'Specifications', 'Reviews'].map(tab => (
                        <button
                            key={tab}
                            className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all ${activeTab === tab.toLowerCase() ? 'text-luxe-green border-b-2 border-luxe-green' : 'text-slate-400 hover:text-slate-600'
                                }`}
                            onClick={() => setActiveTab(tab.toLowerCase())}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="max-w-3xl mx-auto text-center text-slate-600 leading-relaxed">
                    {activeTab === 'description' && (
                        <p>
                            Experience tailored perfection with our Forest Expedition Parka. Meticulously constructed from high-density, water-repellent organic cotton canvas, this piece is lined with ethically sourced down for superior warmth without the bulk. The articulated sleeves ensure freedom of movement, while the antique brass hardware adds a touch of timeless elegance. Perfect for navigating both urban jungles and woodland trails.
                        </p>
                    )}
                    {activeTab === 'specifications' && (
                        <ul className="text-left space-y-2 inline-block">
                            <li><strong>Material:</strong> 100% Organic Cotton Canvas (Water Resistant)</li>
                            <li><strong>Lining:</strong> Recycled Polyester / Ethically Sourced Down</li>
                            <li><strong>Hardware:</strong> Antique Brass Zippers & Snaps</li>
                            <li><strong>Care:</strong> Machine Wash Cold, Tumble Dry Low</li>
                            <li><strong>Origin:</strong> Handcrafted in Portugal</li>
                        </ul>
                    )}
                    {activeTab === 'reviews' && (
                        <div>
                            <div className="flex justify-center mb-6">
                                {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="#D4AF37" className="text-[#D4AF37]" />)}
                            </div>
                            <p className="font-bold text-slate-900 text-lg mb-2">"Absolutely stunning jacket."</p>
                            <p className="italic">"The quality is unmatched. I've worn this in pouring rain and freezing temperatures, and it holds up perfectly while looking stylish."</p>
                            <p className="mt-4 text-xs font-bold text-slate-400 uppercase">- Sarah J., Verified Buyer</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Related Products */}
            <div className="container mx-auto px-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-10 text-center">You May Also Like</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {[1, 2, 3, 4].map(item => (
                        <div key={item} className="group cursor-pointer">
                            <div className="aspect-[3/4] bg-slate-100 rounded-xl overflow-hidden mb-4 relative">
                                <img src={`https://images.unsplash.com/photo-${item === 1 ? '1576566588028-4147f3842f27' : item === 2 ? '1541099649105-f69ad21f3246' : item === 3 ? '1590874103328-eac65d21880c' : '1525966222134-fcfa99b8ae77'}?q=80&w=500`}
                                    alt="Related" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <h4 className="font-bold text-slate-900 text-sm">Essential Collection Item</h4>
                            <p className="text-luxe-green text-xs font-black">$125.00</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default ProductDetails;

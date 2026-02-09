import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const categories = [
    { id: 1, title: 'Outerwear', img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop', link: '/shop/Outerwear', desc: 'Conquer the elements in style.' },
    { id: 2, title: 'Dresses', img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop', link: '/shop/Dresses', desc: 'Effortless elegance for every occasion.' },
    { id: 3, title: 'Knitwear', img: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=600&auto=format&fit=crop', link: '/shop/Knitwear', desc: 'Soft textures and cozy layers.' },
    { id: 4, title: 'Accessories', img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop', link: '/shop/Accessories', desc: 'Finishing touches that define your look.' },
    { id: 5, title: 'Footwear', img: 'https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=600&auto=format&fit=crop', link: '/shop/Footwear', desc: 'Step out with confidence.' },
    { id: 6, title: 'Home Goods', img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=600&auto=format&fit=crop', link: '/shop/Home', desc: 'Curated pieces for your sanctuary.' }
];

const Categories = () => {
    return (
        <div className="bg-[#FAFAFA] min-h-screen py-16 font-sans">
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <p className="text-luxe-green text-xs font-bold tracking-[0.2em] uppercase mb-4">Explore our Collections</p>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Shop by Category</h1>
                    <p className="text-slate-500 text-lg leading-relaxed">
                        Discover our meticulously curated selection of apparel, accessories, and home essentials designed for modern living.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((cat) => (
                        <Link key={cat.id} to={cat.link} className="group relative block overflow-hidden rounded-2xl aspect-[4/5] bg-white shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent z-10 opacity-80 transition-opacity group-hover:opacity-90"></div>

                            <img
                                src={cat.img}
                                alt={cat.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <h3 className="text-2xl font-bold mb-2 tracking-tight">{cat.title}</h3>
                                <p className="text-slate-300 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
                                    {cat.desc}
                                </p>
                                <div className="flex items-center gap-2 text-luxe-green font-bold text-xs uppercase tracking-widest group-hover:gap-3 transition-all">
                                    Browse Collection <ArrowRight size={14} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Categories;

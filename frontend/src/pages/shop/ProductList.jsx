import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Filter, Star, ChevronRight, ChevronLeft, ChevronRight as ChevronRightIcon } from 'lucide-react';

const allProducts = [
  { id: 1, name: 'Luxe Emerald Overcoat', brand: 'Aurelian Heritage', price: 849.00, oldPrice: null, category: 'Outerwear', tag: 'NEW', rating: 5, reviews: 42, img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop' },
  { id: 2, name: 'Silk Satin Slip Dress', brand: 'Forest & Fern', price: 299.00, oldPrice: 375.00, category: 'Dresses', tag: 'SALE -20%', rating: 4, reviews: 18, img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop' },
  { id: 3, name: 'Tailored Indigo Denim', brand: 'Luxe Couture', price: 450.00, oldPrice: null, category: 'Apparel', tag: null, rating: 4, reviews: 12, img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=600&auto=format&fit=crop' },
  { id: 4, name: 'Classic Leather Tote', brand: 'Forest & Fern', price: 550.00, oldPrice: null, category: 'Accessories', tag: null, rating: 5, reviews: 56, img: 'https://images.unsplash.com/photo-1590874103328-eac65d21880c?q=80&w=600&auto=format&fit=crop' },
  { id: 5, name: 'Silk Ruffle Blouse', brand: 'Forest & Fern', price: 185.00, oldPrice: null, category: 'Apparel', tag: null, rating: 5, reviews: 6, img: 'https://images.unsplash.com/photo-1604176354204-9268737828fa?q=80&w=600&auto=format&fit=crop' },
  { id: 6, name: 'Cashmere Cable Knit', brand: 'Aurelian Heritage', price: 595.00, oldPrice: null, category: 'Knitwear', tag: null, rating: 5, reviews: 31, img: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=600&auto=format&fit=crop' },
  { id: 7, name: 'Botanical Midi Dress', brand: 'Luxe Couture', price: 265.00, oldPrice: null, category: 'Dresses', tag: 'BEST SELLER', rating: 4, reviews: 56, img: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?q=80&w=600&auto=format&fit=crop' },
  { id: 8, name: 'Signature Gold Cuff', brand: 'Aurelian', price: 120.00, oldPrice: null, category: 'Accessories', tag: null, rating: 5, reviews: 89, img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop' },
  { id: 9, name: 'Midnight Velvet Blazer', brand: 'Luxe Couture', price: 325.00, oldPrice: null, category: 'Outerwear', tag: null, rating: 5, reviews: 24, img: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=600&auto=format&fit=crop' },
  { id: 10, name: 'Sculpted Heel Boots', brand: 'Forest & Fern', price: 410.00, oldPrice: null, category: 'Footwear', tag: 'NEW', rating: 4, reviews: 8, img: 'https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=600&auto=format&fit=crop' },
  { id: 11, name: 'Woven Straw Hat', brand: 'Aurelian', price: 85.00, oldPrice: null, category: 'Accessories', tag: null, rating: 5, reviews: 67, img: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=600&auto=format&fit=crop' },
  { id: 12, name: 'Linen Wide-Leg Trousers', brand: 'Luxe Couture', price: 195.00, oldPrice: null, category: 'Apparel', tag: null, rating: 4, reviews: 33, img: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=600&auto=format&fit=crop' },
];

const ProductList = () => {
  const { category } = useParams();
  const [products, setProducts] = useState(allProducts);

  useEffect(() => {
    if (category) {
      const filtered = allProducts.filter(p =>
        p.category.toLowerCase() === category.toLowerCase() ||
        category === 'shop'
      );
      setProducts(filtered.length > 0 ? filtered : allProducts);
    } else {
      setProducts(allProducts);
    }
  }, [category]);

  const displayTitle = category && category !== 'shop' ? (category.charAt(0).toUpperCase() + category.slice(1)) : 'Apparel';

  return (
    <div className="bg-[#FAFAFA] min-h-screen">

      {/* Breadcrumbs & Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link to="/" className="hover:text-luxe-green">Home</Link>
          <ChevronRight size={14} />
          <span className="text-slate-900">{displayTitle}</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-12 flex gap-12">
        {/* Sidebar Filters */}
        <aside className="w-64 hidden lg:block space-y-10 shrink-0">

          <div className="flex items-center gap-2 font-bold text-xl text-slate-900 border-b border-slate-100 pb-4">
            <Filter size={20} /> Filters
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase text-slate-400 tracking-widest">Category</p>
            <label className="flex items-center gap-3 text-sm text-slate-700 font-medium cursor-pointer group">
              <div className="w-5 h-5 rounded border border-luxe-green bg-luxe-green flex items-center justify-center text-white"><span className="text-xs">✓</span></div>
              <span className="group-hover:text-luxe-green transition-colors">All Apparel</span>
            </label>
            {['Dresses', 'Outerwear', 'Knitwear'].map(cat => (
              <label key={cat} className="flex items-center gap-3 text-sm text-slate-500 cursor-pointer group hover:text-luxe-green">
                <div className="w-5 h-5 rounded border border-slate-200 group-hover:border-luxe-green transition-colors"></div>
                <span>{cat}</span>
              </label>
            ))}
          </div>

          {/* Price Range */}
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase text-slate-400 tracking-widest">Price Range</p>
            <div className="h-1 bg-slate-200 rounded-full relative">
              <div className="absolute left-0 w-1/2 h-full bg-luxe-green rounded-full"></div>
              <div className="absolute left-1/2 w-4 h-4 bg-white border-2 border-luxe-green rounded-full -top-1.5 shadow"></div>
            </div>
            <div className="flex justify-between text-xs font-bold text-slate-900">
              <span>$0</span>
              <span>$1,000+</span>
            </div>
          </div>

          {/* Brand */}
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase text-slate-400 tracking-widest">Brand</p>
            {['Luxe Couture', 'Forest & Fern', 'Aurelian'].map(brand => (
              <label key={brand} className="flex items-center gap-3 text-sm text-slate-500 cursor-pointer group hover:text-luxe-green">
                <div className="w-5 h-5 rounded border border-slate-200 group-hover:border-luxe-green transition-colors"></div>
                <span>{brand}</span>
              </label>
            ))}
          </div>

          {/* Color */}
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase text-slate-400 tracking-widest">Color</p>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-black cursor-pointer ring-2 ring-offset-2 ring-slate-200"></div>
              <div className="w-8 h-8 rounded-full bg-white border border-slate-200 cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-slate-200"></div>
              <div className="w-8 h-8 rounded-full bg-[#105c38] cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-luxe-green"></div>
              <div className="w-8 h-8 rounded-full bg-[#D4AF37] cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-luxe-gold"></div>
              <div className="w-8 h-8 rounded-full bg-[#5D4037] cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-[#5D4037]"></div>
            </div>
          </div>

          {/* Size */}
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase text-slate-400 tracking-widest">Size</p>
            <div className="grid grid-cols-4 gap-2">
              {['XS', 'S', 'M', 'L'].map(size => (
                <button key={size} className={`h-10 border rounded text-xs font-bold transition-all ${size === 'S' ? 'border-luxe-green text-luxe-green bg-emerald-50' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}>
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button className="w-full bg-[#10B981] hover:bg-[#059669] text-white font-bold py-4 rounded-lg shadow-lg shadow-emerald-500/20 transition-all text-xs tracking-widest uppercase">
            Apply Filters
          </button>
          <button className="w-full text-slate-400 text-xs font-bold uppercase tracking-widest hover:text-slate-600">
            Clear All
          </button>

        </aside>

        {/* Categories Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-8">
            <p className="text-slate-500 text-sm font-medium">Showing <span className="font-bold text-slate-900">1 - {products.length}</span> of 48 products</p>
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-500">Sort By:</span>
              <select className="border border-slate-200 rounded-lg py-2 px-3 text-sm outline-none bg-white font-medium text-slate-700">
                <option>Featured</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
            {products.map(p => (
              <div key={p.id} className="group cursor-pointer">
                {/* Image Card */}
                <div className="relative aspect-[3/4] overflow-hidden bg-white mb-5">
                  {p.tag && (
                    <span className={`absolute top-4 left-4 z-10 text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest rounded-sm ${p.tag.includes('SALE') ? 'bg-[#EF4444] text-white' : 'bg-[#D4AF37] text-white'}`}>
                      {p.tag}
                    </span>
                  )}
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />

                  {/* Hover Actions */}
                  <div className="absolute bottom-4 left-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <Link to={`/product/${p.id}`} className="block w-full bg-white text-slate-900 border border-slate-200 py-3 text-center font-bold text-xs uppercase tracking-widest hover:bg-luxe-green hover:text-white hover:border-luxe-green transition-colors">
                      Quick View
                    </Link>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-1.5">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">{p.brand}</p>
                  <h4 className="font-bold text-slate-900 text-lg group-hover:text-luxe-green transition-colors">{p.name}</h4>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    <div className="flex text-[#D4AF37]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} fill={i < p.rating ? "currentColor" : "none"} className={i < p.rating ? "" : "text-slate-200"} />
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">({p.reviews})</span>
                  </div>

                  <div className="flex items-baseline gap-3 pt-1">
                    <p className="text-slate-900 font-bold text-lg">${p.price.toFixed(2)}</p>
                    {p.oldPrice && <p className="text-slate-400 text-sm line-through">${p.oldPrice.toFixed(2)}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-20">
            <button className="w-10 h-10 border border-slate-200 rounded-lg flex items-center justify-center text-slate-400 hover:bg-white hover:text-slate-600 transition-colors"><ChevronLeft size={16} /></button>
            <button className="w-10 h-10 bg-[#10B981] text-white rounded-lg flex items-center justify-center font-bold text-sm shadow-lg shadow-emerald-500/20">1</button>
            <button className="w-10 h-10 border border-slate-200 rounded-lg flex items-center justify-center text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors">2</button>
            <button className="w-10 h-10 border border-slate-200 rounded-lg flex items-center justify-center text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors">3</button>
            <span className="text-slate-400">...</span>
            <button className="w-10 h-10 border border-slate-200 rounded-lg flex items-center justify-center text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors">8</button>
            <button className="w-10 h-10 border border-slate-200 rounded-lg flex items-center justify-center text-slate-400 hover:bg-white hover:text-slate-600 transition-colors"><ChevronRightIcon size={16} /></button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductList;
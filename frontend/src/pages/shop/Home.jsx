import { Link } from 'react-router-dom';
import { ArrowRight, Heart } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col font-sans">

      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center bg-[#FDFBF7]">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center h-full">

          {/* Text Content */}
          <div className="order-2 md:order-1 space-y-8 max-w-xl">
            <div>
              <span className="text-luxe-green text-xs font-bold tracking-[0.2em] uppercase">Autumn 2024</span>
              <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mt-4 leading-[1.1] tracking-tight">
                Discover Our <br /> Latest <br /> Collection
              </h1>
            </div>
            <p className="text-slate-500 text-lg leading-relaxed max-w-md">
              Experience the pinnacle of craftsmanship and timeless design in every piece we create for your lifestyle.
            </p>
            <Link
              to="/shop"
              className="inline-block bg-[#10B981] hover:bg-[#059669] text-white px-10 py-4 rounded-lg font-bold text-sm uppercase tracking-widest shadow-xl shadow-emerald-500/20 transition-all transform hover:-translate-y-1"
            >
              Shop Now
            </Link>
          </div>

          {/* Hero Image */}
          <div className="order-1 md:order-2 h-full relative">
            <div className="absolute inset-0 bg-[#F5F5F0] rounded-bl-[100px] -z-10 hidden md:block w-[120%] translate-x-10"></div>
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000"
              alt="Autumn Collection"
              className="w-full h-full object-cover object-center md:rounded-bl-[80px]"
            />
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-10">Shop by Category</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CategoryCard
              title="Electronics"
              img="https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=800&auto=format&fit=crop"
            />
            <CategoryCard
              title="Apparel"
              img="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop"
            />
            <CategoryCard
              title="Home Goods"
              img="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop"
            />
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Trending Products</h2>
              <p className="text-slate-500 text-sm">Curated selection of our best-sellers this week.</p>
            </div>
            <Link to="/shop" className="text-luxe-green font-bold text-sm hover:underline">View All Products</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ProductCard
              title="Signature Chrono Watch"
              price="$255.00"
              img="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600"
              color="black"
            />
            <ProductCard
              title="Nordic Studio Headphones"
              price="$450.00"
              img="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600"
              color="black"
            />
            <ProductCard
              title="Urban Leather Sneakers"
              price="$185.00"
              img="https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=600"
              color="white"
            />
            <ProductCard
              title="Essential Travel Tote"
              price="$320.00"
              img="https://images.unsplash.com/photo-1590874103328-eac65d21880c?q=80&w=600"
              color="brown"
            />
          </div>
        </div>
      </section>

      {/* Inner Circle Newsletter */}
      <section className="bg-emerald-50/50 py-32">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Join the Inner Circle</h2>
          <p className="text-slate-500 mb-10 text-lg">Be the first to know about new collections, exclusive events, and seasonal offers.</p>

          <div className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-6 py-4 rounded-lg border-none shadow-lg shadow-emerald-900/5 outline-none focus:ring-2 focus:ring-luxe-green/20"
            />
            <button className="bg-[#10B981] hover:bg-[#059669] text-white px-8 py-4 rounded-lg font-bold shadow-lg shadow-emerald-500/20 transition-all">
              Subscribe
            </button>
          </div>

          <p className="text-[10px] text-slate-400 mt-8 uppercase tracking-widest font-bold">
            Minimalist Design • Conscious Living • High Quality
          </p>
        </div>
      </section>

    </div>
  );
};

// Helper Components
const CategoryCard = ({ title, img }) => (
  <Link to={`/shop/${title.toLowerCase()}`} className="group relative overflow-hidden rounded-2xl aspect-[4/3] block">
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-90"></div>
    <img src={img} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
    <div className="absolute bottom-6 left-6 z-20">
      <h3 className="text-white text-xl font-bold tracking-tight">{title}</h3>
    </div>
  </Link>
);

const ProductCard = ({ title, price, img, color }) => (
  <Link to="/product/1" className="group block bg-[#F5F5F5] rounded-3xl p-6 transition-all hover:bg-white hover:shadow-xl hover:-translate-y-1">
    <div className="flex justify-between items-start mb-4">
      {/* Color Dot if needed, or just layout */}
      <div className="w-full aspect-square relative mb-4">
        <img src={img} alt={title} className="w-full h-full object-contain mix-blend-multiply" />
        <button className="absolute top-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md text-slate-400 hover:text-red-500 transition-colors">
          <Heart size={14} fill="currentColor" className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500" />
          <Heart size={14} className="absolute group-hover:opacity-0 transition-opacity" />
        </button>
      </div>
    </div>
    <div>
      <h3 className="font-bold text-slate-900 text-sm mb-1">{title}</h3>
      <p className="text-[#10B981] font-black text-xs">{price}</p>
    </div>
  </Link>
);

export default Home;
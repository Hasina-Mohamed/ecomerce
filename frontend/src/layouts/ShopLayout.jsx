import { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ShoppingBag, Search, User, LogOut } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';

const ShopLayout = () => {
  const { getCartCount, user, logout } = useContext(ShopContext);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-luxe-green rounded-sm"></div>
            <span className="font-black text-xl tracking-tighter italic">LUXE</span>
          </Link>

          <nav className="hidden md:flex gap-8 font-medium text-sm text-slate-600">
            <Link to="/shop" className="hover:text-luxe-green transition-colors">Shop</Link>
            <Link to="/categories" className="hover:text-luxe-green transition-colors">Categories</Link>
            <Link to="/our-story" className="hover:text-luxe-green transition-colors">Our Story</Link>
            <Link to="/contact" className="hover:text-luxe-green transition-colors">Contact</Link>
          </nav>

          <div className="flex items-center gap-5">
            <button className="text-slate-700 hidden sm:block"><Search size={20} /></button>

            {user ? (
              <div className="flex items-center gap-2 group relative">
                <span className="text-xs font-bold text-slate-700 hidden sm:block">Hi, {user.name}</span>
                <button onClick={logout} className="text-slate-400 hover:text-red-500" title="Logout"><LogOut size={18} /></button>
              </div>
            ) : (
              <Link to="/login" className="text-slate-700 hover:text-luxe-green"><User size={20} /></Link>
            )}

            <Link to="/cart" className="relative p-2 bg-slate-50 rounded-full hover:bg-emerald-50 transition-colors group">
              <ShoppingBag size={20} className="text-slate-700 group-hover:text-luxe-green" />
              {getCartCount() > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-luxe-green text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {getCartCount()}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-slate-50 border-t border-slate-200 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <span className="font-black text-xl italic text-luxe-green">LUXE</span>
            <p className="text-slate-500 text-sm leading-relaxed">Redefining modern retail through craftsmanship, quality, and ethical practice.</p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Collections</h4>
            <ul className="text-sm text-slate-500 space-y-2">
              <li>New Arrivals</li>
              <li>Best Sellers</li>
              <li>Limited Edition</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Newsletter</h4>
            <div className="flex gap-2">
              <input type="email" placeholder="Email address" className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm w-full outline-none focus:border-luxe-green" />
              <button className="bg-luxe-green text-white px-4 py-2 rounded-lg font-bold text-xs uppercase">Join</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ShopLayout;
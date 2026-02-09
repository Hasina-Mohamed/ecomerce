import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut } from 'lucide-react';

const AdminLayout = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20}/>, path: '/admin' },
    { name: 'Products', icon: <Package size={20}/>, path: '/admin/products' },
    { name: 'Orders', icon: <ShoppingCart size={20}/>, path: '/admin/orders' },
    { name: 'Customers', icon: <Users size={20}/>, path: '/admin/customers' },
  ];

  return (
    <div className="flex min-h-screen bg-luxe-muted">
      {/* Sidebar */}
      <aside className="w-64 bg-luxe-dark text-white flex flex-col fixed h-full">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-luxe-green rounded-lg flex items-center justify-center">
            <span className="text-black font-bold">L</span>
          </div>
          <span className="font-bold text-xl tracking-tight">LUXE RETAIL</span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                location.pathname === item.path 
                ? 'bg-luxe-green/10 text-luxe-green border-l-4 border-luxe-green' 
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:text-red-400 transition-colors">
            <LogOut size={20}/>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
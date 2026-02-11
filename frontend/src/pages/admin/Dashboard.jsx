import { useState, useEffect } from 'react';
import { TrendingUp, Package, ShoppingBag, Users } from 'lucide-react';
import api from '../../api/axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    orders: 0,
    products: 0,
    users: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, ordersRes] = await Promise.all([
          api.get('/admin/stats'),
          api.get('/admin/orders')
        ]);
        setStats(statsRes.data);
        setRecentOrders(ordersRes.data.slice(0, 5)); // Get 5 most recent orders
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const statCards = [
    { label: 'Total Revenue', value: `$${stats.totalRevenue.toFixed(2)}`, growth: '+12.5%', icon: <TrendingUp className="text-luxe-green" /> },
    { label: 'Total Orders', value: stats.orders, growth: '+5.2%', icon: <ShoppingBag className="text-blue-500" /> },
    { label: 'Stock Units', value: stats.products, growth: 'Stable', icon: <Package className="text-orange-500" /> },
    { label: 'New Customers', value: stats.users, growth: '+8.1%', icon: <Users className="text-purple-500" /> },
  ];

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Welcome, Admin!</h1>
        <p className="text-slate-500">Here's what's happening with your store today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-50 rounded-xl">{stat.icon}</div>
              <span className="text-luxe-green text-sm font-bold bg-luxe-green/10 px-2 py-1 rounded-lg">
                {stat.growth}
              </span>
            </div>
            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
            <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
          <h2 className="font-bold text-lg">Recent Orders</h2>
          <a href="/admin/orders" className="text-luxe-green font-semibold text-sm hover:underline">View All Orders</a>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-sm">
            <tr>
              <th className="px-6 py-4 font-semibold">ORDER ID</th>
              <th className="px-6 py-4 font-semibold">CUSTOMER</th>
              <th className="px-6 py-4 font-semibold">AMOUNT</th>
              <th className="px-6 py-4 font-semibold">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <tr key={order._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium font-mono text-sm">#{order._id.substring(0, 8)}</td>
                  <td className="px-6 py-4">{order.user?.name || 'Guest'}</td>
                  <td className="px-6 py-4 font-bold text-luxe-gold">${order.totalPrice.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Delivered' ? 'bg-green-100 text-green-600' :
                        order.status === 'Cancelled' ? 'bg-red-100 text-red-600' :
                          'bg-amber-100 text-amber-600'
                      }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-slate-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
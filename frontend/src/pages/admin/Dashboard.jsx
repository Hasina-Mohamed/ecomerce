import { TrendingUp, Package, ShoppingBag, Users } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { label: 'Total Revenue', value: '$128,430.00', growth: '+12.5%', icon: <TrendingUp className="text-luxe-green"/> },
    { label: 'Total Orders', value: '1,250', growth: '+5.2%', icon: <ShoppingBag className="text-blue-500"/> },
    { label: 'Stock Units', value: '4,320', growth: 'Stable', icon: <Package className="text-orange-500"/> },
    { label: 'New Customers', value: '156', growth: '+8.1%', icon: <Users className="text-purple-500"/> },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Welcome, Admin!</h1>
        <p className="text-slate-500">Here's what's happening with your store today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
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
          <button className="text-luxe-green font-semibold text-sm">View All Orders</button>
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
            {[
              { id: '#1024', name: 'Sophia Martinez', amount: '$2,450.00', status: 'Delivered' },
              { id: '#1025', name: 'James Wilson', amount: '$890.00', status: 'Pending' },
            ].map((order, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-medium">{order.id}</td>
                <td className="px-6 py-4">{order.name}</td>
                <td className="px-6 py-4 font-bold">{order.amount}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
                  }`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
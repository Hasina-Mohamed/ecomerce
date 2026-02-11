import { useState, useEffect } from 'react';
import { TrendingUp, Package, ShoppingBag, Users, DollarSign, Calendar, Download } from 'lucide-react';
import api from '../../api/axios';

const Reports = () => {
    const [stats, setStats] = useState({
        totalRevenue: 0,
        orders: 0,
        products: 0,
        users: 0
    });
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dateRange, setDateRange] = useState('all');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [statsRes, ordersRes] = await Promise.all([
                api.get('/admin/stats'),
                api.get('/admin/orders')
            ]);
            setStats(statsRes.data);
            setOrders(ordersRes.data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch report data", error);
            setLoading(false);
        }
    };

    const calculateMetrics = () => {
        const paidOrders = orders.filter(o => o.isPaid);
        const deliveredOrders = orders.filter(o => o.isDelivered);
        const pendingOrders = orders.filter(o => o.status === 'Pending');

        const totalPaidRevenue = paidOrders.reduce((sum, o) => sum + o.totalPrice, 0);
        const averageOrderValue = orders.length > 0 ? stats.totalRevenue / orders.length : 0;

        return {
            paidOrders: paidOrders.length,
            deliveredOrders: deliveredOrders.length,
            pendingOrders: pendingOrders.length,
            totalPaidRevenue,
            averageOrderValue
        };
    };

    const metrics = calculateMetrics();

    const downloadReport = () => {
        const reportData = {
            generatedAt: new Date().toISOString(),
            summary: {
                totalRevenue: stats.totalRevenue,
                totalOrders: stats.orders,
                totalProducts: stats.products,
                totalCustomers: stats.users,
                paidOrders: metrics.paidOrders,
                deliveredOrders: metrics.deliveredOrders,
                pendingOrders: metrics.pendingOrders,
                averageOrderValue: metrics.averageOrderValue
            },
            orders: orders.map(o => ({
                id: o._id,
                customer: o.user?.name || 'Guest',
                total: o.totalPrice,
                status: o.status,
                isPaid: o.isPaid,
                isDelivered: o.isDelivered,
                date: o.createdAt
            }))
        };

        const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `luxe-report-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    if (loading) return <div>Loading reports...</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Business Reports</h1>
                    <p className="text-slate-500">Comprehensive analytics and insights</p>
                </div>
                <button
                    onClick={downloadReport}
                    className="bg-luxe-green text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-500 shadow-lg shadow-luxe-green/20"
                >
                    <Download size={20} /> Export Report
                </button>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-green-50 rounded-xl">
                            <DollarSign className="text-luxe-green" size={24} />
                        </div>
                    </div>
                    <p className="text-slate-500 text-sm font-medium">Total Revenue</p>
                    <h3 className="text-3xl font-bold mt-1 text-luxe-green">${stats.totalRevenue.toFixed(2)}</h3>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-blue-50 rounded-xl">
                            <ShoppingBag className="text-blue-500" size={24} />
                        </div>
                    </div>
                    <p className="text-slate-500 text-sm font-medium">Total Orders</p>
                    <h3 className="text-3xl font-bold mt-1">{stats.orders}</h3>
                    <p className="text-xs text-slate-400 mt-1">{metrics.paidOrders} paid</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-orange-50 rounded-xl">
                            <Package className="text-orange-500" size={24} />
                        </div>
                    </div>
                    <p className="text-slate-500 text-sm font-medium">Products</p>
                    <h3 className="text-3xl font-bold mt-1">{stats.products}</h3>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-purple-50 rounded-xl">
                            <Users className="text-purple-500" size={24} />
                        </div>
                    </div>
                    <p className="text-slate-500 text-sm font-medium">Customers</p>
                    <h3 className="text-3xl font-bold mt-1">{stats.users}</h3>
                </div>
            </div>

            {/* Additional Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-green-50 rounded-lg">
                            <TrendingUp className="text-green-600" size={20} />
                        </div>
                        <h3 className="font-bold text-slate-900">Average Order Value</h3>
                    </div>
                    <p className="text-3xl font-bold text-luxe-green">${metrics.averageOrderValue.toFixed(2)}</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <ShoppingBag className="text-blue-600" size={20} />
                        </div>
                        <h3 className="font-bold text-slate-900">Delivered Orders</h3>
                    </div>
                    <p className="text-3xl font-bold text-blue-600">{metrics.deliveredOrders}</p>
                    <p className="text-sm text-slate-500 mt-1">
                        {stats.orders > 0 ? ((metrics.deliveredOrders / stats.orders) * 100).toFixed(1) : 0}% completion rate
                    </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-amber-50 rounded-lg">
                            <Calendar className="text-amber-600" size={20} />
                        </div>
                        <h3 className="font-bold text-slate-900">Pending Orders</h3>
                    </div>
                    <p className="text-3xl font-bold text-amber-600">{metrics.pendingOrders}</p>
                </div>
            </div>

            {/* Revenue Breakdown */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h2 className="text-xl font-bold mb-4">Revenue Breakdown</h2>
                <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-slate-600">Paid Revenue</span>
                        <span className="font-bold text-green-600">${metrics.totalPaidRevenue.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-slate-600">Pending Revenue</span>
                        <span className="font-bold text-amber-600">${(stats.totalRevenue - metrics.totalPaidRevenue).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-slate-900 font-bold">Total Revenue</span>
                        <span className="font-bold text-luxe-green text-xl">${stats.totalRevenue.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* Recent Orders Summary */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-50">
                    <h2 className="font-bold text-lg">Recent Orders Summary</h2>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-sm">
                        <tr>
                            <th className="px-6 py-4 font-semibold">ORDER ID</th>
                            <th className="px-6 py-4 font-semibold">CUSTOMER</th>
                            <th className="px-6 py-4 font-semibold">AMOUNT</th>
                            <th className="px-6 py-4 font-semibold">STATUS</th>
                            <th className="px-6 py-4 font-semibold">PAYMENT</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {orders.slice(0, 10).map((order) => (
                            <tr key={order._id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4 font-mono text-sm">#{order._id.substring(0, 8)}</td>
                                <td className="px-6 py-4">{order.user?.name || 'Guest'}</td>
                                <td className="px-6 py-4 font-bold text-luxe-gold">${order.totalPrice.toFixed(2)}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Delivered' ? 'bg-green-100 text-green-600' :
                                            order.status === 'Cancelled' ? 'bg-red-100 text-red-600' :
                                                'bg-blue-100 text-blue-600'
                                        }`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.isPaid ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
                                        }`}>
                                        {order.isPaid ? 'Paid' : 'Unpaid'}
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

export default Reports;

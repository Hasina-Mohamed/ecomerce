import { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, Calendar, Download, CreditCard, Banknote, Smartphone } from 'lucide-react';
import api from '../../api/axios';

const PaymentHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, paid, unpaid

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const { data } = await api.get('/admin/orders');
            setOrders(data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch orders", error);
            setLoading(false);
        }
    };

    const filteredOrders = orders.filter(order => {
        if (filter === 'paid') return order.isPaid;
        if (filter === 'unpaid') return !order.isPaid;
        return true;
    });

    const calculateStats = () => {
        const paidOrders = orders.filter(o => o.isPaid);
        const unpaidOrders = orders.filter(o => !o.isPaid);

        const totalPaid = paidOrders.reduce((sum, o) => sum + o.totalPrice, 0);
        const totalUnpaid = unpaidOrders.reduce((sum, o) => sum + o.totalPrice, 0);
        const totalRevenue = orders.reduce((sum, o) => sum + o.totalPrice, 0);

        // Payment method breakdown
        const cashPayments = paidOrders.filter(o => o.paymentMethod === 'Cash');
        const cardPayments = paidOrders.filter(o => o.paymentMethod === 'Card');
        const mobilePayments = paidOrders.filter(o => o.paymentMethod === 'Mobile Money');

        return {
            totalPaid,
            totalUnpaid,
            totalRevenue,
            paidCount: paidOrders.length,
            unpaidCount: unpaidOrders.length,
            cashTotal: cashPayments.reduce((sum, o) => sum + o.totalPrice, 0),
            cardTotal: cardPayments.reduce((sum, o) => sum + o.totalPrice, 0),
            mobileTotal: mobilePayments.reduce((sum, o) => sum + o.totalPrice, 0),
            cashCount: cashPayments.length,
            cardCount: cardPayments.length,
            mobileCount: mobilePayments.length
        };
    };

    const stats = calculateStats();

    const downloadPaymentReport = () => {
        const reportData = {
            generatedAt: new Date().toISOString(),
            summary: stats,
            payments: filteredOrders.map(o => ({
                orderId: o._id,
                customer: o.user?.name || 'Guest',
                amount: o.totalPrice,
                paymentMethod: o.paymentMethod,
                isPaid: o.isPaid,
                paidAt: o.paidAt,
                date: o.createdAt
            }))
        };

        const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `payment-history-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    if (loading) return <div>Loading payment history...</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Payment History</h1>
                    <p className="text-slate-500">Track all financial transactions</p>
                </div>
                <button
                    onClick={downloadPaymentReport}
                    className="bg-luxe-green text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-500 shadow-lg shadow-luxe-green/20"
                >
                    <Download size={20} /> Export Report
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-2xl shadow-lg text-white">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-white/20 rounded-lg">
                            <DollarSign size={24} />
                        </div>
                        <h3 className="font-bold">Total Paid</h3>
                    </div>
                    <p className="text-4xl font-bold">${stats.totalPaid.toFixed(2)}</p>
                    <p className="text-sm text-white/80 mt-1">{stats.paidCount} transactions</p>
                </div>

                <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-6 rounded-2xl shadow-lg text-white">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-white/20 rounded-lg">
                            <TrendingUp size={24} />
                        </div>
                        <h3 className="font-bold">Pending Payments</h3>
                    </div>
                    <p className="text-4xl font-bold">${stats.totalUnpaid.toFixed(2)}</p>
                    <p className="text-sm text-white/80 mt-1">{stats.unpaidCount} pending</p>
                </div>

                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-2xl shadow-lg text-white">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-white/20 rounded-lg">
                            <Calendar size={24} />
                        </div>
                        <h3 className="font-bold">Total Revenue</h3>
                    </div>
                    <p className="text-4xl font-bold">${stats.totalRevenue.toFixed(2)}</p>
                    <p className="text-sm text-white/80 mt-1">All time</p>
                </div>
            </div>

            {/* Payment Method Breakdown */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h2 className="text-xl font-bold mb-4">Payment Methods Breakdown</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-50 rounded-xl">
                        <div className="flex items-center gap-3 mb-2">
                            <Banknote className="text-green-600" size={20} />
                            <span className="font-bold text-slate-700">Cash</span>
                        </div>
                        <p className="text-2xl font-bold text-green-600">${stats.cashTotal.toFixed(2)}</p>
                        <p className="text-sm text-slate-500">{stats.cashCount} transactions</p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl">
                        <div className="flex items-center gap-3 mb-2">
                            <CreditCard className="text-blue-600" size={20} />
                            <span className="font-bold text-slate-700">Card</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">${stats.cardTotal.toFixed(2)}</p>
                        <p className="text-sm text-slate-500">{stats.cardCount} transactions</p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl">
                        <div className="flex items-center gap-3 mb-2">
                            <Smartphone className="text-purple-600" size={20} />
                            <span className="font-bold text-slate-700">Mobile Money</span>
                        </div>
                        <p className="text-2xl font-bold text-purple-600">${stats.mobileTotal.toFixed(2)}</p>
                        <p className="text-sm text-slate-500">{stats.mobileCount} transactions</p>
                    </div>
                </div>
            </div>

            {/* Payment History Table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                    <h2 className="font-bold text-lg">Transaction History</h2>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'all' ? 'bg-luxe-green text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilter('paid')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'paid' ? 'bg-luxe-green text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                        >
                            Paid
                        </button>
                        <button
                            onClick={() => setFilter('unpaid')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'unpaid' ? 'bg-luxe-green text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                        >
                            Unpaid
                        </button>
                    </div>
                </div>

                <table className="w-full">
                    <thead className="bg-slate-50 text-[11px] font-black uppercase text-slate-400">
                        <tr>
                            <th className="px-6 py-4 text-left">Order ID</th>
                            <th className="px-6 py-4 text-left">Customer</th>
                            <th className="px-6 py-4 text-left">Date</th>
                            <th className="px-6 py-4 text-left">Amount</th>
                            <th className="px-6 py-4 text-left">Method</th>
                            <th className="px-6 py-4 text-left">Status</th>
                            <th className="px-6 py-4 text-left">Paid At</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {filteredOrders.map((order) => (
                            <tr key={order._id} className="hover:bg-slate-50/50">
                                <td className="px-6 py-4 text-sm font-mono text-slate-500">
                                    #{order._id.substring(0, 8)}
                                </td>
                                <td className="px-6 py-4 font-bold text-slate-900">
                                    {order.user?.name || 'Guest'}
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 font-bold text-luxe-gold">
                                    ${order.totalPrice.toFixed(2)}
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600">
                                    {order.paymentMethod}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.isPaid ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
                                        }`}>
                                        {order.isPaid ? 'Paid' : 'Unpaid'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600">
                                    {order.paidAt ? new Date(order.paidAt).toLocaleDateString() : '-'}
                                </td>
                            </tr>
                        ))}
                        {filteredOrders.length === 0 && (
                            <tr>
                                <td colSpan="7" className="px-6 py-8 text-center text-slate-500">
                                    No transactions found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;

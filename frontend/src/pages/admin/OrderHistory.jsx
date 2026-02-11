import { useState, useEffect } from 'react';
import { Search, Plus, Edit3, Trash2, X, Package } from 'lucide-react';
import api from '../../api/axios';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingOrder, setEditingOrder] = useState(null);
    const [formData, setFormData] = useState({
        user: '',
        status: 'Pending',
        isPaid: false,
        isDelivered: false,
        paymentMethod: 'Cash',
        shippingAddress: {
            address: '',
            city: '',
            postalCode: '',
            country: ''
        },
        orderItems: [],
        itemsPrice: 0,
        taxPrice: 0,
        shippingPrice: 0,
        totalPrice: 0
    });

    useEffect(() => {
        fetchOrders();
        fetchUsers();
        fetchProducts();
    }, []);

    useEffect(() => {
        const filtered = orders.filter(order =>
            order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (order.user && order.user.name && order.user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            order.status.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredOrders(filtered);
    }, [searchTerm, orders]);

    const fetchOrders = async () => {
        try {
            const { data } = await api.get('/admin/orders');
            setOrders(data);
            setFilteredOrders(data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch orders", error);
            setLoading(false);
        }
    };

    const fetchUsers = async () => {
        try {
            const { data } = await api.get('/admin/users');
            setUsers(data.filter(u => !u.isAdmin));
        } catch (error) {
            console.error("Failed to fetch users", error);
        }
    };

    const fetchProducts = async () => {
        try {
            const { data } = await api.get('/admin/products');
            setProducts(data);
        } catch (error) {
            console.error("Failed to fetch products", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const orderData = {
                ...formData,
                itemsPrice: parseFloat(formData.itemsPrice),
                taxPrice: parseFloat(formData.taxPrice),
                shippingPrice: parseFloat(formData.shippingPrice),
                totalPrice: parseFloat(formData.totalPrice)
            };

            if (editingOrder) {
                const { data } = await api.put(`/admin/orders/${editingOrder._id}`, orderData);
                setOrders(orders.map(o => o._id === data._id ? data : o));
            } else {
                const { data } = await api.post('/admin/orders', orderData);
                setOrders([...orders, data]);
            }
            closeModal();
        } catch (error) {
            console.error("Failed to save order", error);
            alert(error.response?.data?.message || 'Failed to save order');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            try {
                await api.delete(`/admin/orders/${id}`);
                setOrders(orders.filter(o => o._id !== id));
            } catch (error) {
                console.error("Failed to delete order", error);
            }
        }
    };

    const addOrderItem = () => {
        setFormData({
            ...formData,
            orderItems: [...formData.orderItems, { product: '', qty: 1, name: '', price: 0, image: '' }]
        });
    };

    const removeOrderItem = (index) => {
        const newItems = formData.orderItems.filter((_, i) => i !== index);
        setFormData({ ...formData, orderItems: newItems });
        calculateTotals(newItems);
    };

    const updateOrderItem = (index, field, value) => {
        const newItems = [...formData.orderItems];
        newItems[index][field] = value;

        if (field === 'product') {
            const product = products.find(p => p._id === value);
            if (product) {
                newItems[index].name = product.name;
                newItems[index].price = product.price;
                newItems[index].image = product.image;
            }
        }

        setFormData({ ...formData, orderItems: newItems });
        calculateTotals(newItems);
    };

    const calculateTotals = (items) => {
        const itemsPrice = items.reduce((acc, item) => acc + item.price * item.qty, 0);
        const taxPrice = itemsPrice * 0.15; // 15% tax
        const shippingPrice = itemsPrice > 100 ? 0 : 10;
        const totalPrice = itemsPrice + taxPrice + shippingPrice;

        setFormData(prev => ({
            ...prev,
            itemsPrice: itemsPrice.toFixed(2),
            taxPrice: taxPrice.toFixed(2),
            shippingPrice: shippingPrice.toFixed(2),
            totalPrice: totalPrice.toFixed(2)
        }));
    };

    const openModal = (order = null) => {
        if (order) {
            setEditingOrder(order);
            setFormData({
                user: order.user?._id || '',
                status: order.status,
                isPaid: order.isPaid,
                isDelivered: order.isDelivered,
                paymentMethod: order.paymentMethod,
                shippingAddress: order.shippingAddress,
                orderItems: order.orderItems,
                itemsPrice: order.itemsPrice || 0,
                taxPrice: order.taxPrice || 0,
                shippingPrice: order.shippingPrice || 0,
                totalPrice: order.totalPrice || 0
            });
        } else {
            setEditingOrder(null);
            setFormData({
                user: '',
                status: 'Pending',
                isPaid: false,
                isDelivered: false,
                paymentMethod: 'Cash',
                shippingAddress: {
                    address: '',
                    city: '',
                    postalCode: '',
                    country: ''
                },
                orderItems: [],
                itemsPrice: 0,
                taxPrice: 0,
                shippingPrice: 0,
                totalPrice: 0
            });
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingOrder(null);
    };

    if (loading) return <div>Loading orders...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Order History</h1>
                    <p className="text-slate-500">Track and manage customer orders.</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="bg-luxe-green text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-500 shadow-lg shadow-luxe-green/20"
                >
                    <Plus size={20} /> Create Order
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex gap-4">
                    <div className="flex-1 relative">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search orders by ID, customer, or status..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-lg outline-none border border-transparent focus:border-luxe-green transition-all"
                        />
                    </div>
                </div>

                <table className="w-full">
                    <thead className="bg-slate-50 text-[11px] font-black uppercase text-slate-400">
                        <tr>
                            <th className="px-6 py-4 text-left">Order ID</th>
                            <th className="px-6 py-4 text-left">Customer</th>
                            <th className="px-6 py-4 text-left">Date</th>
                            <th className="px-6 py-4 text-left">Total</th>
                            <th className="px-6 py-4 text-left">Payment</th>
                            <th className="px-6 py-4 text-left">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {filteredOrders.map((order) => (
                            <tr key={order._id} className="hover:bg-slate-50/50">
                                <td className="px-6 py-4 text-sm font-mono text-slate-500">#{order._id.substring(0, 8)}</td>
                                <td className="px-6 py-4 font-bold text-slate-900">
                                    {order.user ? order.user.name : 'Guest'}
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 font-bold text-luxe-gold">${order.totalPrice.toFixed(2)}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-[10px] font-black uppercase rounded ${order.isPaid ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                                        }`}>
                                        {order.isPaid ? 'Paid' : 'Unpaid'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-[10px] font-black uppercase rounded ${order.status === 'Delivered' ? 'bg-green-50 text-green-600' :
                                            order.status === 'Cancelled' ? 'bg-red-50 text-red-600' :
                                                'bg-blue-50 text-blue-600'
                                        }`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2 text-slate-400">
                                        <button
                                            onClick={() => openModal(order)}
                                            className="p-2 hover:bg-slate-100 rounded-lg hover:text-luxe-green"
                                        >
                                            <Edit3 size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(order._id)}
                                            className="p-2 hover:bg-slate-100 rounded-lg hover:text-red-500"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredOrders.length === 0 && (
                            <tr>
                                <td colSpan="7" className="px-6 py-8 text-center text-slate-500">No orders found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto p-4">
                    <div className="bg-white rounded-2xl p-8 max-w-4xl w-full my-8 shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">
                                {editingOrder ? 'Edit Order' : 'Create New Order'}
                            </h2>
                            <button onClick={closeModal} className="text-slate-400 hover:text-slate-600">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Customer Selection */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Customer</label>
                                    <select
                                        value={formData.user}
                                        onChange={(e) => setFormData({ ...formData, user: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-luxe-green focus:border-luxe-green outline-none"
                                        required
                                        disabled={editingOrder}
                                    >
                                        <option value="">Select Customer</option>
                                        {users.map(user => (
                                            <option key={user._id} value={user._id}>{user.name} ({user.email})</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Payment Method</label>
                                    <select
                                        value={formData.paymentMethod}
                                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-luxe-green focus:border-luxe-green outline-none"
                                        required
                                    >
                                        <option value="Cash">Cash</option>
                                        <option value="Card">Card</option>
                                        <option value="Mobile Money">Mobile Money</option>
                                    </select>
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Shipping Address</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Address"
                                        value={formData.shippingAddress.address}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            shippingAddress: { ...formData.shippingAddress, address: e.target.value }
                                        })}
                                        className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-luxe-green focus:border-luxe-green outline-none"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="City"
                                        value={formData.shippingAddress.city}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            shippingAddress: { ...formData.shippingAddress, city: e.target.value }
                                        })}
                                        className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-luxe-green focus:border-luxe-green outline-none"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Postal Code"
                                        value={formData.shippingAddress.postalCode}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            shippingAddress: { ...formData.shippingAddress, postalCode: e.target.value }
                                        })}
                                        className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-luxe-green focus:border-luxe-green outline-none"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Country"
                                        value={formData.shippingAddress.country}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            shippingAddress: { ...formData.shippingAddress, country: e.target.value }
                                        })}
                                        className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-luxe-green focus:border-luxe-green outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Order Items */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-bold text-slate-700">Order Items</label>
                                    {!editingOrder && (
                                        <button
                                            type="button"
                                            onClick={addOrderItem}
                                            className="text-luxe-green text-sm font-bold flex items-center gap-1"
                                        >
                                            <Plus size={16} /> Add Item
                                        </button>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    {formData.orderItems.map((item, index) => (
                                        <div key={index} className="flex gap-2 items-center p-3 bg-slate-50 rounded-lg">
                                            <select
                                                value={item.product}
                                                onChange={(e) => updateOrderItem(index, 'product', e.target.value)}
                                                className="flex-1 px-3 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-luxe-green outline-none"
                                                required
                                                disabled={editingOrder}
                                            >
                                                <option value="">Select Product</option>
                                                {products.map(p => (
                                                    <option key={p._id} value={p._id}>{p.name} - ${p.price}</option>
                                                ))}
                                            </select>
                                            <input
                                                type="number"
                                                min="1"
                                                value={item.qty}
                                                onChange={(e) => updateOrderItem(index, 'qty', parseInt(e.target.value))}
                                                className="w-20 px-3 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-luxe-green outline-none"
                                                placeholder="Qty"
                                                required
                                            />
                                            {!editingOrder && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeOrderItem(index)}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order Status (Edit Only) */}
                            {editingOrder && (
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1">Status</label>
                                        <select
                                            value={formData.status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-luxe-green focus:border-luxe-green outline-none"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="isPaid"
                                            checked={formData.isPaid}
                                            onChange={(e) => setFormData({ ...formData, isPaid: e.target.checked })}
                                            className="w-5 h-5 rounded border-slate-300 text-luxe-green focus:ring-luxe-green"
                                        />
                                        <label htmlFor="isPaid" className="text-sm font-bold text-slate-700">Paid</label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="isDelivered"
                                            checked={formData.isDelivered}
                                            onChange={(e) => setFormData({ ...formData, isDelivered: e.target.checked })}
                                            className="w-5 h-5 rounded border-slate-300 text-luxe-green focus:ring-luxe-green"
                                        />
                                        <label htmlFor="isDelivered" className="text-sm font-bold text-slate-700">Delivered</label>
                                    </div>
                                </div>
                            )}

                            {/* Totals */}
                            <div className="bg-slate-50 p-4 rounded-lg space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Items Price:</span>
                                    <span className="font-bold">${formData.itemsPrice}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Tax (15%):</span>
                                    <span className="font-bold">${formData.taxPrice}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Shipping:</span>
                                    <span className="font-bold">${formData.shippingPrice}</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold border-t pt-2">
                                    <span>Total:</span>
                                    <span className="text-luxe-green">${formData.totalPrice}</span>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="flex-1 px-4 py-2 border border-slate-200 rounded-lg font-medium hover:bg-slate-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-luxe-green text-white rounded-lg font-bold hover:bg-emerald-500"
                                >
                                    {editingOrder ? 'Update Order' : 'Create Order'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderHistory;

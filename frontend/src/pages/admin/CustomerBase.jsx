import { useState, useEffect } from 'react';
import { Search, Mail, Shield, Plus, Edit3, Trash2, X, Phone, MapPin } from 'lucide-react';
import api from '../../api/axios';

const CustomerBase = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        location: '',
        password: ''
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        const filtered = users.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (user.phone && user.phone.includes(searchTerm)) ||
            (user.location && user.location.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setFilteredUsers(filtered);
    }, [searchTerm, users]);

    const fetchUsers = async () => {
        try {
            const { data } = await api.get('/admin/users');
            setUsers(data);
            setFilteredUsers(data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch users", error);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingUser) {
                const { data } = await api.put(`/admin/users/${editingUser._id}`, formData);
                setUsers(users.map(u => u._id === data._id ? data : u));
            } else {
                const { data } = await api.post('/admin/users', formData);
                setUsers([...users, data]);
            }
            closeModal();
        } catch (error) {
            console.error("Failed to save user", error);
            alert(error.response?.data?.message || 'Failed to save customer');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            try {
                await api.delete(`/admin/users/${id}`);
                setUsers(users.filter(u => u._id !== id));
            } catch (error) {
                console.error("Failed to delete user", error);
                alert(error.response?.data?.message || 'Failed to delete customer');
            }
        }
    };

    const openModal = (user = null) => {
        if (user) {
            setEditingUser(user);
            setFormData({
                name: user.name,
                email: user.email,
                phone: user.phone || '',
                location: user.location || '',
                password: ''
            });
        } else {
            setEditingUser(null);
            setFormData({
                name: '',
                email: '',
                phone: '',
                location: '',
                password: ''
            });
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingUser(null);
        setFormData({
            name: '',
            email: '',
            phone: '',
            location: '',
            password: ''
        });
    };

    if (loading) return <div>Loading customers...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Customer Base</h1>
                    <p className="text-slate-500">View and manage your registered users.</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="bg-luxe-green text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-500 shadow-lg shadow-luxe-green/20"
                >
                    <Plus size={20} /> Add Customer
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex gap-4">
                    <div className="flex-1 relative">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search customers by name, email, phone, or location..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-lg outline-none border border-transparent focus:border-luxe-green transition-all"
                        />
                    </div>
                </div>

                <table className="w-full">
                    <thead className="bg-slate-50 text-[11px] font-black uppercase text-slate-400">
                        <tr>
                            <th className="px-6 py-4 text-left">Customer</th>
                            <th className="px-6 py-4 text-left">Email</th>
                            <th className="px-6 py-4 text-left">Phone</th>
                            <th className="px-6 py-4 text-left">Location</th>
                            <th className="px-6 py-4 text-left">Role</th>
                            <th className="px-6 py-4 text-left">Joined Date</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {filteredUsers.map((user) => (
                            <tr key={user._id} className="hover:bg-slate-50/50">
                                <td className="px-6 py-4 font-bold text-slate-900">{user.name}</td>
                                <td className="px-6 py-4 text-sm text-slate-600 flex items-center gap-2">
                                    <Mail size={14} className="text-slate-400" /> {user.email}
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600">
                                    {user.phone ? (
                                        <span className="flex items-center gap-1">
                                            <Phone size={14} className="text-slate-400" /> {user.phone}
                                        </span>
                                    ) : (
                                        <span className="text-slate-300">-</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600">
                                    {user.location ? (
                                        <span className="flex items-center gap-1">
                                            <MapPin size={14} className="text-slate-400" /> {user.location}
                                        </span>
                                    ) : (
                                        <span className="text-slate-300">-</span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {user.isAdmin ? (
                                        <span className="flex items-center gap-1 text-luxe-green text-xs font-bold uppercase">
                                            <Shield size={12} /> Admin
                                        </span>
                                    ) : (
                                        <span className="text-slate-500 text-xs font-medium uppercase">Customer</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2 text-slate-400">
                                        <button
                                            onClick={() => openModal(user)}
                                            className="p-2 hover:bg-slate-100 rounded-lg hover:text-luxe-green"
                                        >
                                            <Edit3 size={16} />
                                        </button>
                                        {!user.isAdmin && (
                                            <button
                                                onClick={() => handleDelete(user._id)}
                                                className="p-2 hover:bg-slate-100 rounded-lg hover:text-red-500"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredUsers.length === 0 && (
                            <tr>
                                <td colSpan="7" className="px-6 py-8 text-center text-slate-500">
                                    No customers found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">
                                {editingUser ? 'Edit Customer' : 'Add New Customer'}
                            </h2>
                            <button onClick={closeModal} className="text-slate-400 hover:text-slate-600">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-luxe-green focus:border-luxe-green outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-luxe-green focus:border-luxe-green outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Phone</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-luxe-green focus:border-luxe-green outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Location</label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-luxe-green focus:border-luxe-green outline-none"
                                />
                            </div>

                            {!editingUser && (
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
                                    <input
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-luxe-green focus:border-luxe-green outline-none"
                                        placeholder="Leave blank for default (123456)"
                                    />
                                </div>
                            )}

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
                                    {editingUser ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomerBase;

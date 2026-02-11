import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { ShopContext } from '../../context/ShopContext';

// ... icons ...

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const { setUser } = useContext(ShopContext); // Directly setting user if context allows or use login flow

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const { data } = await api.post('/auth/register', { name, email, password });
            // Assuming register returns same object as login: user info + token
            localStorage.setItem('luxe_user', JSON.stringify(data));
            // Better to trigger a context update. 
            // Since ShopContext mainly reads from localStorage or has login fn, 
            // I might need to reload or manually set state if exposed.
            // For now, let's redirect to login to be safe or auto-login.
            // Let's try auto-login by calling the API response effectively.

            // However, ShopContext `login` takes email/pass. 
            // I'll just redirect to login for simplicity or assume success.
            alert('Registration Successful! Please login.');
            navigate('/login');

        } catch (error) {
            console.error('Registration failed', error);
            alert(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen bg-luxe-muted flex items-center justify-center p-6 font-sans">
            <div className="max-w-[500px] w-full bg-white rounded-3xl shadow-xl p-10 border-t-4 border-luxe-gold">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Join LUXE</h1>
                    <p className="text-slate-500 text-sm">Experience the pinnacle of high-end retail</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                        <label className="block text-sm font-bold text-slate-700">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Alexander Hamilton"
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-1 focus:ring-luxe-green focus:border-luxe-green outline-none transition-all placeholder:text-slate-300"
                            required
                        />
                    </div>

                    {/* Email Address */}
                    <div className="space-y-1.5">
                        <label className="block text-sm font-bold text-slate-700">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@example.com"
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-1 focus:ring-luxe-green focus:border-luxe-green outline-none transition-all placeholder:text-slate-300"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="space-y-1.5">
                        <label className="block text-sm font-bold text-slate-700">Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-1 focus:ring-luxe-green focus:border-luxe-green outline-none transition-all placeholder:text-slate-300"
                                required
                            />
                            <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                <Eye size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-1.5">
                        <label className="block text-sm font-bold text-slate-700">Confirm Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-1 focus:ring-luxe-green focus:border-luxe-green outline-none transition-all placeholder:text-slate-300"
                                required
                            />
                        </div>
                    </div>

                    {/* Terms Checkbox */}
                    <div className="flex items-center gap-3 pt-2">
                        <input
                            type="checkbox"
                            id="terms"
                            className="w-5 h-5 rounded border-slate-300 text-luxe-green focus:ring-luxe-green cursor-pointer"
                            required
                        />
                        <label htmlFor="terms" className="text-xs text-slate-500">
                            I agree to the <span className="text-luxe-green cursor-pointer">Terms of Service</span> and <span className="text-luxe-green cursor-pointer">Privacy Policy</span>.
                        </label>
                    </div>

                    {/* Create Account Button */}
                    <button type="submit" className="w-full bg-[#10B981] hover:bg-[#059669] text-white font-bold py-3.5 rounded-lg shadow-lg shadow-emerald-500/20 transition-all transform active:scale-[0.98] mt-2">
                        Create Account
                    </button>
                </form>

                {/* Divider */}
                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold text-slate-400">
                        <span className="bg-white px-4">OR SIGN UP WITH</span>
                    </div>
                </div>

                {/* Social Buttons */}
                <div className="flex gap-4">
                    <button className="flex-1 flex items-center justify-center gap-2 border border-slate-200 py-3 rounded-lg hover:bg-slate-50 transition-colors font-medium text-sm text-slate-700">
                        <GoogleIcon /> Google
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 border border-slate-200 py-3 rounded-lg hover:bg-slate-50 transition-colors font-medium text-sm text-slate-700">
                        <GithubIcon /> GitHub
                    </button>
                </div>

                {/* Login Link */}
                <div className="text-center mt-8">
                    <p className="text-sm text-slate-500">
                        Already have an account? <Link to="/login" className="text-[#10B981] font-bold hover:underline">Log In</Link>
                    </p>
                </div>

            </div>

            {/* Footer Copyright (Visual element from design, optional but nice) */}
            <div className="absolute bottom-6 text-[10px] text-slate-400 font-bold tracking-widest uppercase">
                © 2024 Luxe Retail Group. All Rights Reserved.
            </div>
        </div>
    );
};

export default Signup;

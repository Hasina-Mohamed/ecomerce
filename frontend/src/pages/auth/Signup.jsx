import { Link } from 'react-router-dom';
import { Eye, Component } from 'lucide-react'; // Simulating Google/Github icons with generics if needed, or specific SVGs

// Simple Google/Github SVG components for the buttons
const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);

const GithubIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
);

const Signup = () => {
    return (
        <div className="min-h-screen bg-luxe-muted flex items-center justify-center p-6 font-sans">
            <div className="max-w-[500px] w-full bg-white rounded-3xl shadow-xl p-10 border-t-4 border-luxe-gold">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Join LUXE</h1>
                    <p className="text-slate-500 text-sm">Experience the pinnacle of high-end retail</p>
                </div>

                <form className="space-y-5">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                        <label className="block text-sm font-bold text-slate-700">Full Name</label>
                        <input
                            type="text"
                            placeholder="Alexander Hamilton"
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-1 focus:ring-luxe-green focus:border-luxe-green outline-none transition-all placeholder:text-slate-300"
                        />
                    </div>

                    {/* Email Address */}
                    <div className="space-y-1.5">
                        <label className="block text-sm font-bold text-slate-700">Email Address</label>
                        <input
                            type="email"
                            placeholder="name@example.com"
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-1 focus:ring-luxe-green focus:border-luxe-green outline-none transition-all placeholder:text-slate-300"
                        />
                    </div>

                    {/* Password */}
                    <div className="space-y-1.5">
                        <label className="block text-sm font-bold text-slate-700">Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-1 focus:ring-luxe-green focus:border-luxe-green outline-none transition-all placeholder:text-slate-300"
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
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-1 focus:ring-luxe-green focus:border-luxe-green outline-none transition-all placeholder:text-slate-300"
                            />
                        </div>
                    </div>

                    {/* Terms Checkbox */}
                    <div className="flex items-center gap-3 pt-2">
                        <input
                            type="checkbox"
                            id="terms"
                            className="w-5 h-5 rounded border-slate-300 text-luxe-green focus:ring-luxe-green cursor-pointer"
                        />
                        <label htmlFor="terms" className="text-xs text-slate-500">
                            I agree to the <span className="text-luxe-green cursor-pointer">Terms of Service</span> and <span className="text-luxe-green cursor-pointer">Privacy Policy</span>.
                        </label>
                    </div>

                    {/* Create Account Button */}
                    <button className="w-full bg-[#10B981] hover:bg-[#059669] text-white font-bold py-3.5 rounded-lg shadow-lg shadow-emerald-500/20 transition-all transform active:scale-[0.98] mt-2">
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

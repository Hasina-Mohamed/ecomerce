import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Lock, Mail } from 'lucide-react';
import { ShopContext } from '../../context/ShopContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, user } = useContext(ShopContext);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      if (user.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="min-h-screen bg-luxe-muted flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-luxe-gold h-1.5 w-full"></div>
        <div className="p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 bg-luxe-green/10 rounded-2xl text-luxe-green mb-2">
              <Lock size={28} />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>
            <p className="text-slate-500">Sign in to access your luxury collections</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1.5 text-slate-700">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-luxe-green focus:border-transparent outline-none transition-all bg-slate-50"
                required
              />
            </div>
            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                <button type="button" className="text-xs font-bold text-luxe-gold">Forgot Password?</button>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-luxe-green focus:border-transparent outline-none transition-all bg-slate-50"
                required
              />
            </div>
            <button type="submit" className="w-full bg-luxe-green hover:bg-emerald-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-luxe-green/20">
              Login <LogIn size={20} />
            </button>
          </form>

          <div className="text-center pt-4">
            <p className="text-slate-500 text-sm">New here? <Link to="/signup" className="text-luxe-green font-bold">Create an account</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
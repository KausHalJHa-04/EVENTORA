import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [showOTP, setShowOTP] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login, verifyOTP } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            if (!showOTP) {
                const data = await login(email, password);
                if (data.role === 'admin') navigate('/admin');
                else navigate('/dashboard');
            } else {
                const data = await verifyOTP(email, otp);
                if (data.role === 'admin') navigate('/admin');
                else navigate('/dashboard');
            }
        } catch (err) {
            if (err.needsVerification) {
                setShowOTP(true);
                setError('Account not verified. A new OTP has been sent to your email.');
            } else {
                setError(err.message || err);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 text-white">
            <div className="w-full max-w-md bg-white/[0.02] border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl backdrop-blur-md relative overflow-hidden group transition-all duration-500 hover:bg-white/[0.04]">
                {/* Animated Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>

                <div className="text-center mb-8 relative z-10">
                    <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-3 tracking-tight">Welcome Back</h2>
                    <p className="text-gray-400 font-medium">Sign in to your Eventora account</p>
                </div>

                {error && <div className="bg-red-500/10 text-red-400 p-4 rounded-xl mb-6 text-center border border-red-500/20 text-sm font-semibold relative z-10">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    {!showOTP ? (
                        <>
                            <div className="space-y-1.5">
                                <label className="block text-xs font-bold tracking-wide text-gray-400 uppercase">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    placeholder="you@example.com"
                                    className="w-full bg-black/40 border border-white/10 px-5 py-3.5 rounded-xl text-white placeholder-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300 shadow-inner"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-xs font-bold tracking-wide text-gray-400 uppercase">Password</label>
                                <input
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    className="w-full bg-black/40 border border-white/10 px-5 py-3.5 rounded-xl text-white placeholder-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300 shadow-inner"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </>
                    ) : (
                        <div className="space-y-4">
                            <p className="text-sm text-green-400 bg-green-500/10 p-4 rounded-xl border border-green-500/20 text-center font-medium">
                                Please check your email for the OTP to continue.
                            </p>
                            <div className="space-y-1.5">
                                <label className="block text-xs font-bold tracking-wide text-gray-400 uppercase text-center">Verification Code (OTP)</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="000000"
                                    className="w-full bg-black/40 border border-white/10 px-5 py-4 rounded-xl text-white placeholder-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300 shadow-inner font-black tracking-[0.5em] text-center text-2xl"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    maxLength="6"
                                />
                            </div>
                        </div>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-1 mt-4 tracking-wide uppercase text-sm flex justify-center items-center h-14"
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                                Processing...
                            </span>
                        ) : (showOTP ? 'Verify OTP & Log In' : 'Sign In')}
                    </button>
                </form>

                <p className="text-center mt-8 text-sm text-gray-400 relative z-10">
                    Don't have an account? <Link to="/register" className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors ml-1">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;

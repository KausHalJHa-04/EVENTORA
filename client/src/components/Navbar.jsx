import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaTicketAlt, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Add a scroll listener to create a shrinking glassmorphism effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/60 backdrop-blur-2xl border-b border-white/10 py-2 shadow-2xl' : 'bg-black/30 backdrop-blur-md border-b border-transparent py-4'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* LOGO */}
                    <Link
                        to="/"
                        className="flex items-center gap-3 group"
                    >
                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-indigo-500/20 group-hover:border-indigo-500/30 transition-all duration-500 shadow-inner">
                            <FaTicketAlt className="text-indigo-400 text-xl group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <span className="text-2xl font-black bg-gradient-to-r from-white via-gray-200 to-gray-400 group-hover:from-indigo-400 group-hover:to-purple-400 bg-clip-text text-transparent transition-all duration-500 tracking-tight">
                            Eventora
                        </span>
                    </Link>

                    {/* DESKTOP MENU */}
                    <div className="hidden md:flex items-center gap-8">

                        <Link
                            to="/"
                            className="relative text-gray-300 hover:text-white text-sm font-bold uppercase tracking-widest transition-colors duration-300 group"
                        >
                            Events
                            <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-indigo-400 transition-all duration-300 group-hover:w-full rounded-full"></span>
                        </Link>

                        {user ? (
                            <>
                                <Link
                                    to={user.role === 'admin' ? '/admin' : '/dashboard'}
                                    className="relative text-gray-300 hover:text-white text-sm font-bold uppercase tracking-widest transition-colors duration-300 group"
                                >
                                    Dashboard
                                    <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-indigo-400 transition-all duration-300 group-hover:w-full rounded-full"></span>
                                </Link>

                                <div className="h-6 w-px bg-white/10 mx-2"></div>

                                <button
                                    onClick={handleLogout}
                                    className="px-6 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 text-gray-300 font-bold text-sm tracking-wide uppercase transition-all duration-300"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="h-6 w-px bg-white/10 mx-2"></div>
                                <Link
                                    to="/login"
                                    className="text-gray-300 hover:text-white text-sm font-bold uppercase tracking-widest transition-colors duration-300"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold text-sm tracking-wide uppercase transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>

                    {/* MOBILE TOGGLE BUTTON */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 hover:text-white focus:outline-none w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-all duration-300"
                        >
                            {isOpen ? <FaTimes className="text-2xl transform rotate-90 transition-transform duration-300" /> : <FaBars className="text-2xl transition-transform duration-300" />}
                        </button>
                    </div>
                </div>

                {/* MOBILE DROPDOWN MENU */}
                <div
                    className={`md:hidden absolute top-[100%] left-0 w-full transition-all duration-500 ease-in-out overflow-hidden ${
                        isOpen ? 'max-h-[500px] opacity-100 border-b border-white/10 shadow-2xl' : 'max-h-0 opacity-0 border-transparent'
                    }`}
                >
                    <div className="bg-black/95 backdrop-blur-3xl px-6 py-8 flex flex-col gap-6 shadow-inner border-t border-white/5">

                        <Link
                            to="/"
                            onClick={() => setIsOpen(false)}
                            className="text-gray-300 hover:text-indigo-400 text-lg font-bold tracking-widest uppercase transition-colors"
                        >
                            Events
                        </Link>

                        {user ? (
                            <>
                                <Link
                                    to={user.role === 'admin' ? '/admin' : '/dashboard'}
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-300 hover:text-indigo-400 text-lg font-bold tracking-widest uppercase transition-colors"
                                >
                                    Dashboard
                                </Link>

                                <div className="h-px w-full bg-white/10 my-2"></div>

                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setIsOpen(false);
                                    }}
                                    className="w-full py-3.5 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 font-bold tracking-widest uppercase transition-colors hover:bg-red-500/20 shadow-inner"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="h-px w-full bg-white/10 my-2"></div>

                                <Link
                                    to="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full py-3.5 rounded-xl border border-white/10 bg-white/5 text-gray-200 text-center font-bold tracking-widest uppercase transition-colors hover:bg-white/10 hover:text-white"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-center font-bold tracking-widest uppercase transition-all shadow-lg"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
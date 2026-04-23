import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/axios';
import {
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaSearch,
    FaRegClock,
    FaTicketAlt,
    FaShieldAlt,
    FaChair,
    FaTwitter,
    FaInstagram,
    FaFacebook
} from 'react-icons/fa';
import Hyperspeed from './Hyperspeed';

const Home = () => {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchEvents();
        }, 400);
        return () => clearTimeout(timeoutId);
    }, [search]);

    const fetchEvents = async () => {
        try {
            const { data } = await api.get(`/events?search=${search}`);
            setEvents(data);
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-black text-white overflow-x-hidden">
            {/* HERO (FULL WIDTH) */}
            <section className="relative w-full h-[70vh] lg:h-[88vh] min-h-[500px] flex items-center justify-center px-4">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="w-full h-full">
                        <Hyperspeed />
                    </div>
                    {/* Subtle gradient to ensure the navbar and bottom transition smoothly, but keep the middle clear */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black pointer-events-none"></div>
                </div>

                {/* Glassmorphism content card to make text pop while keeping background visible */}
                <div className="relative z-10 text-center max-w-4xl bg-black/20  border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl mx-4">
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight text-white mb-6 drop-shadow-lg">
                        Explore Events That
                        <br />
                        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent drop-shadow-sm">
                            Match Your Vibe
                        </span>
                    </h1>

                    <p className="text-gray-300 mt-6 text-lg sm:text-xl md:text-2xl font-medium max-w-2xl mx-auto drop-shadow">
                        Discover local events, epic concerts, and unforgettable experiences happening around you.
                    </p>

                    {/* SEARCH */}
                    <div className="mt-10 max-w-2xl mx-auto relative group">
                        <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-400 transition-colors duration-300 text-xl" />
                        <input
                            type="text"
                            placeholder="Search for events, artists, or venues..."
                            className="w-full pl-16 pr-6 py-5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white/20 transition-all text-lg shadow-inner"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <section className="w-full px-4 md:px-16 py-20 border-t border-white/10 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
                    {[
                        {
                            icon: <FaRegClock />,
                            title: 'Fast Booking',
                            desc: 'Book your tickets in seconds with our streamlined checkout process.'
                        },
                        {
                            icon: <FaTicketAlt />,
                            title: 'Easy Access',
                            desc: 'Get digital tickets right on your phone. No printing required.'
                        },
                        {
                            icon: <FaShieldAlt />,
                            title: 'Secure Payments',
                            desc: 'Your transactions are protected with industry-leading encryption.'
                        }
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center text-center gap-4 group p-6 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300">
                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-indigo-400 text-3xl group-hover:scale-110 group-hover:bg-indigo-500/20 group-hover:text-indigo-300 transition-all duration-300 shadow-lg">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-200 group-hover:text-white transition-colors duration-300 mt-2">
                                {item.title}
                            </h3>
                            <p className="text-gray-400 text-base leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* EVENTS */}
            <section className="w-full px-4 md:px-16 py-24 bg-black">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                                Upcoming Events
                            </h2>
                            <p className="text-gray-400 mt-3 text-lg md:text-xl max-w-xl">
                                Secure your spot at the most anticipated experiences in town.
                            </p>
                        </div>
                        <div className="px-5 py-2.5 bg-white/10 rounded-full border border-white/10 backdrop-blur-md text-gray-300 text-sm font-semibold tracking-wide shadow-inner hidden sm:block">
                            {events.length} {events.length === 1 ? 'event' : 'events'} found
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 space-y-4">
                            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                            <div className="text-gray-400 text-lg font-medium animate-pulse">
                                Summoning events...
                            </div>
                        </div>
                    ) : events.length === 0 ? (
                        <div className="text-center py-32 bg-white/[0.02] border border-white/10 rounded-3xl shadow-inner mt-8">
                            <span className="text-6xl mb-6 block drop-shadow-md">🎟️</span>
                            <h3 className="text-2xl font-bold text-gray-200 mb-3">No events found</h3>
                            <p className="text-gray-500 text-lg">Try adjusting your search to find what you're looking for.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                            {events.map((event) => (
                                <div
                                    key={event._id}
                                    className="group flex flex-col bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-2xl hover:shadow-indigo-500/10"
                                >
                                    {/* IMAGE */}
                                    <div className="relative h-64 w-full overflow-hidden bg-gray-900">
                                        <img
                                            src={event.image || 'https://images.unsplash.com/photo-1540039155732-68473684177c?q=80&w=3000'}
                                            alt={event.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        
                                        <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                                            <div className="bg-indigo-500 backdrop-blur-md text-white text-xs font-black px-4 py-1.5 rounded-full shadow-lg uppercase tracking-wider">
                                                {event.ticketPrice === 0 ? 'FREE' : `₹${event.ticketPrice}`}
                                            </div>
                                        </div>

                                        {event.category && (
                                            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 text-gray-200 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                                                {event.category}
                                            </div>
                                        )}
                                    </div>

                                    {/* CONTENT */}
                                    <div className="p-7 flex flex-col flex-grow">
                                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors line-clamp-2">
                                            {event.title}
                                        </h3>

                                        <div className="space-y-3 mt-auto mb-8">
                                            <div className="flex items-center text-gray-400 text-sm font-medium">
                                                <div className="w-9 h-9 rounded-full bg-indigo-500/10 flex items-center justify-center mr-4 text-indigo-400 shrink-0">
                                                    <FaCalendarAlt />
                                                </div>
                                                {new Date(event.date).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                                            </div>
                                            <div className="flex items-center text-gray-400 text-sm font-medium">
                                                <div className="w-9 h-9 rounded-full bg-purple-500/10 flex items-center justify-center mr-4 text-purple-400 shrink-0">
                                                    <FaMapMarkerAlt />
                                                </div>
                                                <span className="truncate pr-2">{event.location}</span>
                                            </div>
                                            <div className="flex items-center text-gray-400 text-sm font-medium">
                                                <div className="w-9 h-9 rounded-full bg-pink-500/10 flex items-center justify-center mr-4 text-pink-400 shrink-0">
                                                    <FaChair />
                                                </div>
                                                <span>
                                                    <strong className={event.availableSeats <= 10 ? "text-red-400 font-bold" : "text-gray-200 font-bold"}>{event.availableSeats}</strong> seats available
                                                </span>
                                            </div>
                                        </div>

                                        <Link
                                            to={`/events/${event._id}`}
                                            className="block w-full py-3.5 px-4 bg-white/5 hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/25 text-center text-white font-bold rounded-xl transition-all duration-300 border border-white/10 hover:border-transparent uppercase tracking-wider text-sm"
                                        >
                                            Get Tickets
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* FOOTER */}
            <footer className="w-full border-t border-white/10 bg-black mt-auto py-12 px-6 md:px-16 text-gray-400">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <div className="flex items-center gap-2 text-2xl font-bold">
                            <FaTicketAlt className="text-indigo-400" />
                            <span className="text-white tracking-wide">Eventora</span>
                        </div>
                        <p className="text-sm text-gray-500">Your gateway to unforgettable experiences.</p>
                    </div>
                    <div className="flex gap-6 text-sm font-semibold tracking-wide uppercase">
                        <Link to="/" className="hover:text-white transition-colors duration-300">Events</Link>
                        <Link to="/login" className="hover:text-white transition-colors duration-300">Login</Link>
                        <Link to="/register" className="hover:text-white transition-colors duration-300">Sign Up</Link>
                    </div>
                    <div className="flex gap-6 text-xl">
                        <a href="#" className="text-gray-500 hover:text-[#1DA1F2] hover:scale-110 transition-all duration-300"><FaTwitter /></a>
                        <a href="#" className="text-gray-500 hover:text-[#E1306C] hover:scale-110 transition-all duration-300"><FaInstagram /></a>
                        <a href="#" className="text-gray-500 hover:text-[#1877F2] hover:scale-110 transition-all duration-300"><FaFacebook /></a>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-10 pt-8 border-t border-white/5 text-center text-sm text-gray-600 font-medium">
                    © {new Date().getFullYear()} Eventora. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Home;
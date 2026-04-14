import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaTicketAlt, FaTimesCircle, FaCalendarAlt, FaMapMarkerAlt, FaMoneyBillWave } from 'react-icons/fa';

const UserDashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        fetchBookings();
    }, [user, navigate]);

    const fetchBookings = async () => {
        try {
            const { data } = await api.get('/bookings/my');
            setBookings(data);
        } catch (error) {
            console.error('Error fetching bookings', error);
        } finally {
            setLoading(false);
        }
    };

    const cancelBooking = async (id) => {
        if (window.confirm('Are you sure you want to cancel this booking request?')) {
            try {
                await api.delete(`/bookings/${id}`);
                fetchBookings();
            } catch (error) {
                alert(error.response?.data?.message || 'Error cancelling booking');
            }
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="text-gray-400 text-lg font-medium animate-pulse">Loading your dashboard...</div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 md:py-16 text-white">
            {/* PROFILE HEADER */}
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 mb-12 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 shadow-2xl backdrop-blur-md relative overflow-hidden group transition-all duration-500 hover:bg-white/[0.05]">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                
                <div className="relative z-10 w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full flex items-center justify-center text-4xl font-black shadow-lg shadow-indigo-500/30 shrink-0 transform group-hover:scale-105 group-hover:rotate-3 transition-all duration-500 border-2 border-white/20">
                    {user?.name.charAt(0).toUpperCase()}
                </div>
                <div className="relative z-10 flex flex-col items-center sm:items-start mt-2">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-2 tracking-tight">
                        Welcome back, {user?.name}!
                    </h1>
                    <p className="text-gray-400 flex items-center justify-center sm:justify-start gap-2 text-lg font-medium">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        Active Explorer
                    </p>
                </div>
            </div>

            {/* TICKETS SECTION TITLE */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
                <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3 tracking-tight">
                    <FaTicketAlt className="text-indigo-400" /> My Tickets
                </h2>
                {bookings.length > 0 && (
                    <div className="px-5 py-2 bg-white/10 rounded-full border border-white/10 text-gray-300 text-sm font-semibold tracking-wide backdrop-blur-sm shadow-inner">
                        {bookings.length} {bookings.length === 1 ? 'Booking' : 'Bookings'} Found
                    </div>
                )}
            </div>

            {bookings.length === 0 ? (
                <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-16 text-center shadow-2xl backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.04]">
                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10 shadow-inner group">
                        <FaTicketAlt className="text-gray-500 text-4xl group-hover:scale-110 group-hover:text-indigo-400 transition-all duration-300" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-200 mb-3">No tickets yet</h3>
                    <p className="text-gray-400 mb-8 max-w-md mx-auto text-lg">Discover epic events and secure your spot today. Your next adventure awaits!</p>
                    <Link to="/" className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold py-3.5 px-10 rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-1 tracking-wide">
                        Browse Upcoming Events
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {bookings.map((booking) => (
                        <div key={booking._id} className="group bg-white/[0.03] rounded-3xl overflow-hidden shadow-lg border border-white/10 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col">
                            
                            {/* IMAGE / HEADER */}
                            <div className="h-44 w-full bg-gray-900 relative overflow-hidden shrink-0">
                                {booking.eventId?.image ? (
                                    <img src={booking.eventId.image} alt="Event" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-70 group-hover:opacity-100" />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black group-hover:scale-105 transition-transform duration-700 ease-out opacity-80"></div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                                
                                {booking.eventId ? (
                                    <>
                                        <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                                            <span className={`px-3 py-1.5 text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg backdrop-blur-md border ${booking.status === 'confirmed' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                                                    booking.status === 'cancelled' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                                                        'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                                                    }`}>
                                                    {booking.status}
                                                </span>
                                                {booking.status !== 'cancelled' && (
                                                    <span className={`px-3 py-1.5 text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg backdrop-blur-md border ${booking.paymentStatus === 'paid' ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' : 'bg-gray-500/20 text-gray-300 border-gray-500/30'
                                                        }`}>
                                                        {booking.paymentStatus.replace('_', ' ')}
                                                    </span>
                                                )}
                                            </div>
                                        <div className="absolute bottom-4 left-5 right-5">
                                            <h3 className="text-xl font-bold text-white leading-tight drop-shadow-md line-clamp-2 group-hover:text-indigo-300 transition-colors duration-300">{booking.eventId.title}</h3>
                                        </div>
                                    </>
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                                        <p className="text-red-400 font-bold tracking-widest uppercase text-sm">Event Unavailable</p>
                                    </div>
                                )}
                            </div>

                            {/* CARD CONTENT */}
                            <div className="p-6 flex-grow flex flex-col justify-between bg-white/[0.01]">
                                {booking.eventId ? (
                                    <div className="space-y-4 mb-6">
                                        <p className="flex items-center text-gray-400 text-sm font-medium">
                                            <FaCalendarAlt className="mr-3 text-indigo-400 text-lg opacity-80" />
                                            {new Date(booking.eventId.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                        </p>
                                        <p className="flex items-center text-gray-400 text-sm font-medium">
                                            <FaMapMarkerAlt className="mr-3 text-purple-400 text-lg opacity-80" />
                                            <span className="truncate">{booking.eventId.location || 'Venue TBA'}</span>
                                        </p>
                                        <p className="flex items-center text-gray-400 text-sm font-medium">
                                            <FaMoneyBillWave className="mr-3 text-green-400 text-lg opacity-80" />
                                            {booking.amount === 0 ? 'Free Entry' : `₹${booking.amount}`}
                                        </p>
                                    </div>
                                ) : null}
                                <div className="text-xs text-gray-500 font-semibold tracking-wide uppercase flex items-center justify-between pt-4 border-t border-white/5">
                                    <span>Requested on</span>
                                    <span>{new Date(booking.bookedAt).toLocaleDateString()}</span>
                                </div>
                            </div>

                            {/* ACTIONS FOOTER */}
                            <div className="px-6 py-4 bg-black/40 border-t border-white/5 flex justify-between items-center shrink-0 transition-colors duration-300">
                                {booking.eventId && booking.status !== 'cancelled' ? (
                                    <>
                                        <Link to={`/events/${booking.eventId._id}`} className="text-indigo-400 font-bold text-sm hover:text-indigo-300 transition-colors flex items-center gap-1 group/link">
                                            View Event <span className="transform group-hover/link:translate-x-1 transition-transform">&rarr;</span>
                                        </Link>
                                        <button
                                            onClick={() => cancelBooking(booking._id)}
                                            className="text-red-400 font-bold text-sm hover:text-red-300 transition-colors flex items-center gap-1.5 bg-red-500/0 hover:bg-red-500/10 px-3 py-1.5 rounded-lg"
                                        >
                                            <FaTimesCircle /> Cancel
                                        </button>
                                    </>
                                ) : (
                                    <div className="w-full text-center text-xs font-bold tracking-widest text-gray-600 uppercase">Booking Closed</div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserDashboard;

import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import { 
    FaTrash, 
    FaCheck, 
    FaTimes, 
    FaPlus, 
    FaUsers, 
    FaChartLine, 
    FaClock, 
    FaCalendarAlt, 
    FaMapMarkerAlt, 
    FaTicketAlt 
} from 'react-icons/fa';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showEventForm, setShowEventForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '', description: '', date: '', location: '', category: '', totalSeats: '', ticketPrice: '', image: ''
    });

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/login');
            return;
        }
        fetchData();
    }, [user, navigate]);

    const fetchData = async () => {
        try {
            const [eventsRes, bookingsRes] = await Promise.all([
                api.get('/events'),
                api.get('/bookings/my') // Admin gets all bookings
            ]);
            setEvents(eventsRes.data);
            setBookings(bookingsRes.data);
        } catch (error) {
            console.error('Error fetching admin data', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateEvent = async (e) => {
        e.preventDefault();
        try {
            await api.post('/events', formData);
            setShowEventForm(false);
            setFormData({ title: '', description: '', date: '', location: '', category: '', totalSeats: '', ticketPrice: '', image: '' });
            fetchData();
        } catch (error) {
            alert(error.response?.data?.message || 'Error creating event');
        }
    };

    const handleDeleteEvent = async (id) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                await api.delete(`/events/${id}`);
                fetchData();
            } catch (error) {
                alert('Error deleting event');
            }
        }
    };

    const handleConfirmBooking = async (id, paymentStatus) => {
        try {
            await api.put(`/bookings/${id}/confirm`, { paymentStatus });
            fetchData();
        } catch (error) {
            alert(error.response?.data?.message || 'Error confirming booking');
        }
    };

    const handleCancelBooking = async (id) => {
        if (window.confirm('Cancel this user\'s booking request?')) {
            try {
                await api.delete(`/bookings/${id}`);
                fetchData();
            } catch (error) {
                alert(error.response?.data?.message || 'Error cancelling booking');
            }
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="text-gray-400 text-lg font-medium animate-pulse">Loading admin dashboard...</div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 md:py-16 text-white">
            {/* HEADER */}
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 mb-10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left shadow-2xl backdrop-blur-md relative overflow-hidden group transition-all duration-500 hover:bg-white/[0.05]">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                <div className="relative z-10">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-2 tracking-tight">Admin Control Panel</h1>
                    <p className="text-gray-400 text-lg font-medium">Manage events, monitor revenue, and manually confirm bookings.</p>
                </div>
                <button
                    onClick={() => setShowEventForm(!showEventForm)}
                    className={`relative z-10 w-full md:w-auto font-bold py-3.5 px-8 rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center gap-2 ${showEventForm ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20' : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white hover:shadow-indigo-500/40 hover:-translate-y-1 border border-transparent'}`}
                >
                    {showEventForm ? <><FaTimes /> Cancel Creation</> : <><FaPlus /> Create New Event</>}
                </button>
            </div>

            {/* STATS ROW */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
                <div className="bg-white/[0.02] p-8 rounded-3xl shadow-lg border border-white/10 flex items-center justify-between group hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/10 hover:bg-white/[0.04] transition-all duration-500">
                    <div>
                        <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-2">Total Revenue</p>
                        <h3 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">₹{bookings.reduce((sum, b) => b.paymentStatus === 'paid' && b.status === 'confirmed' ? sum + b.amount : sum, 0)}</h3>
                    </div>
                    <div className="w-14 h-14 bg-green-500/10 text-green-400 rounded-full flex items-center justify-center text-2xl font-bold border border-green-500/20 shadow-inner group-hover:scale-110 transition-transform duration-500"><FaChartLine /></div>
                </div>
                <div className="bg-white/[0.02] p-8 rounded-3xl shadow-lg border border-white/10 flex items-center justify-between group hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10 hover:bg-white/[0.04] transition-all duration-500">
                    <div>
                        <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-2">Paid Clients</p>
                        <h3 className="text-4xl font-black text-white">{new Set(bookings.filter(b => b.paymentStatus === 'paid' && b.status === 'confirmed').map(b => b.userId?._id)).size}</h3>
                    </div>
                    <div className="w-14 h-14 bg-indigo-500/10 text-indigo-400 rounded-full flex items-center justify-center text-2xl font-bold border border-indigo-500/20 shadow-inner group-hover:scale-110 transition-transform duration-500"><FaUsers /></div>
                </div>
                <div className="bg-white/[0.02] p-8 rounded-3xl shadow-lg border border-white/10 flex items-center justify-between group hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow-500/10 hover:bg-white/[0.04] transition-all duration-500">
                    <div>
                        <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-2">Pending Requests</p>
                        <h3 className="text-4xl font-black text-white">{bookings.filter(b => b.status === 'pending').length}</h3>
                    </div>
                    <div className="w-14 h-14 bg-yellow-500/10 text-yellow-400 rounded-full flex items-center justify-center text-2xl font-bold border border-yellow-500/20 shadow-inner group-hover:scale-110 transition-transform duration-500"><FaClock /></div>
                </div>
            </div>

            {/* EVENT FORM */}
            {showEventForm && (
                <div className="bg-white/[0.02] p-8 md:p-10 rounded-3xl shadow-2xl border border-indigo-500/30 mb-12 backdrop-blur-md relative overflow-hidden transform transition-all duration-500 ease-in-out origin-top">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                    <h2 className="text-3xl font-bold mb-8 text-white tracking-tight">Launch New Event</h2>
                    <form onSubmit={handleCreateEvent} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input required type="text" placeholder="Event Title" className="w-full bg-black/40 border border-white/10 px-5 py-4 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300 shadow-inner" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                        <input required type="text" placeholder="Category (e.g., Tech, Music)" className="w-full bg-black/40 border border-white/10 px-5 py-4 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300 shadow-inner" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} />
                        <input required type="date" className="w-full bg-black/40 border border-white/10 px-5 py-4 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300 shadow-inner" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
                        <input required type="text" placeholder="Location" className="w-full bg-black/40 border border-white/10 px-5 py-4 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300 shadow-inner" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />
                        <input required type="number" placeholder="Total Seats" className="w-full bg-black/40 border border-white/10 px-5 py-4 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300 shadow-inner" value={formData.totalSeats} onChange={e => setFormData({ ...formData, totalSeats: e.target.value })} />
                        <input required type="number" placeholder="Ticket Price (0 for free)" className="w-full bg-black/40 border border-white/10 px-5 py-4 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300 shadow-inner" value={formData.ticketPrice} onChange={e => setFormData({ ...formData, ticketPrice: e.target.value })} />

                        <div className="md:col-span-2">
                            <input type="text" placeholder="Image URL (Provide a direct link to an image)" className="w-full bg-black/40 border border-white/10 px-5 py-4 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300 shadow-inner" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} />
                        </div>

                        <textarea required placeholder="Event Description" className="w-full bg-black/40 border border-white/10 px-5 py-4 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300 shadow-inner md:col-span-2 h-32 resize-none" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                        <button type="submit" className="md:col-span-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 mt-2 rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-1 text-lg tracking-wide uppercase">Publish Event</button>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
                {/* EVENTS SECTION */}
                <div className="flex flex-col">
                    <h2 className="text-3xl font-bold mb-8 text-white flex items-center gap-4 tracking-tight">
                        <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/30 shadow-inner"><FaTicketAlt /></div>
                        All Events
                        <span className="ml-auto bg-white/10 text-gray-300 text-sm py-1 px-4 rounded-full border border-white/10">{events.length}</span>
                    </h2>
                    <div className="bg-white/[0.02] rounded-3xl shadow-lg border border-white/10 overflow-hidden backdrop-blur-sm">
                        <ul className="divide-y divide-white/5 max-h-[700px] overflow-y-auto pr-2">
                            {events.length === 0 ? <li className="p-10 text-gray-500 text-center font-medium">No events created yet.</li> :
                                events.map(event => (
                                    <li key={event._id} className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 hover:bg-white/[0.04] transition-colors duration-300 group">
                                        <div className="flex-1">
                                            <h4 className="font-bold text-xl text-white mb-3 leading-tight group-hover:text-indigo-300 transition-colors">{event.title}</h4>
                                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 font-medium">
                                                <span className="flex items-center gap-1.5"><FaCalendarAlt className="text-indigo-400" /> {new Date(event.date).toLocaleDateString()}</span>
                                                <span className="flex items-center gap-1.5"><FaUsers className={event.availableSeats > 0 ? 'text-green-400' : 'text-red-400'} /> {event.availableSeats}/{event.totalSeats} seats</span>
                                            </div>
                                        </div>
                                        <button onClick={() => handleDeleteEvent(event._id)} className="w-full sm:w-auto text-red-400 hover:text-white hover:bg-red-500 border border-red-500/30 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 shadow-sm shrink-0 flex items-center justify-center gap-2 group/btn">
                                            <FaTrash className="group-hover/btn:scale-110 transition-transform" /> Delete
                                        </button>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>

                {/* BOOKINGS SECTION */}
                <div className="flex flex-col">
                    <h2 className="text-3xl font-bold mb-8 text-white flex items-center gap-4 tracking-tight">
                        <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 border border-yellow-500/30 shadow-inner"><FaClock /></div>
                        Booking Requests
                        <span className="ml-auto bg-white/10 text-gray-300 text-sm py-1 px-4 rounded-full border border-white/10">{bookings.length}</span>
                    </h2>
                    <div className="bg-white/[0.02] rounded-3xl shadow-lg border border-white/10 overflow-hidden backdrop-blur-sm">
                        <ul className="divide-y divide-white/5 max-h-[700px] overflow-y-auto pr-2">
                            {bookings.length === 0 ? <li className="p-10 text-gray-500 text-center font-medium">No bookings yet.</li> :
                                bookings.map(booking => (
                                    <li key={booking._id} className="relative p-6 hover:bg-white/[0.04] transition-colors duration-300 overflow-hidden group">
                                        <div className={`absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-300 group-hover:w-2 ${booking.status === 'pending' ? 'bg-yellow-400' : booking.status === 'confirmed' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                                        <div className="flex justify-between items-start mb-3">
                                            <h4 className="font-bold text-white text-xl leading-tight ml-2 group-hover:text-indigo-300 transition-colors">{booking.eventId?.title || 'Deleted Event'}</h4>
                                            <div className="flex flex-col gap-1 items-end shrink-0 ml-4">
                                                <span className={`px-3 py-1 text-[10px] font-black rounded-full uppercase tracking-widest border ${booking.status === 'confirmed' ? 'bg-green-500/10 text-green-400 border-green-500/20' : booking.status === 'cancelled' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}`}>{booking.status}</span>
                                                {booking.status !== 'cancelled' && <span className={`px-3 py-1 text-[10px] font-black rounded-full uppercase tracking-widest border ${booking.paymentStatus === 'paid' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>{booking.paymentStatus.replace('_', ' ')}</span>}
                                            </div>
                                        </div>
                                        <div className="bg-black/30 rounded-xl p-5 mb-2 ml-2 border border-white/5 text-sm space-y-3">
                                            <p className="flex items-center gap-3">
                                                <span className="font-bold w-16 text-gray-500 uppercase text-xs tracking-wider">User:</span>
                                                <span className="font-semibold text-gray-200">{booking.userId?.name}</span>
                                                <span className="text-gray-400">({booking.userId?.email})</span>
                                            </p>
                                            <p className="flex items-center gap-3">
                                                <span className="font-bold w-16 text-gray-500 uppercase text-xs tracking-wider">Amount:</span>
                                                <span className={`font-semibold ${booking.amount === 0 ? 'text-green-400' : 'text-gray-200'}`}>{booking.amount === 0 ? 'Free' : `₹${booking.amount}`}</span>
                                            </p>
                                            <p className="flex items-center gap-3">
                                                <span className="font-bold w-16 text-gray-500 uppercase text-xs tracking-wider">Date:</span>
                                                <span className="text-gray-300">{new Date(booking.bookedAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}</span>
                                            </p>
                                            {booking.eventId && (
                                                <p className="flex items-center gap-3 mt-3 pt-3 border-t border-white/5">
                                                    <span className="font-bold w-16 text-gray-500 uppercase text-xs tracking-wider">Seats:</span>
                                                    <span className="text-gray-300"><span className={`font-bold ${booking.eventId.availableSeats > 0 ? 'text-green-400' : 'text-red-400'}`}>{booking.eventId.availableSeats}</span> remaining of {booking.eventId.totalSeats}</span>
                                                </p>
                                            )}
                                        </div>

                                        {/* Action buttons for admin */}
                                        {booking.status === 'pending' && (
                                            <div className="flex flex-wrap gap-3 mt-4 pt-2 ml-2">
                                                <button onClick={() => handleConfirmBooking(booking._id, 'paid')} className="flex-1 min-w-[120px] bg-green-500/10 text-green-400 hover:bg-green-500/20 border border-green-500/20 text-xs font-bold py-2.5 px-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm hover:shadow-green-500/10">
                                                    <FaCheck /> Approve as Paid
                                                </button>
                                                <button onClick={() => handleConfirmBooking(booking._id, 'not_paid')} className="flex-1 min-w-[120px] bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 border border-indigo-500/20 text-xs font-bold py-2.5 px-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm hover:shadow-indigo-500/10">
                                                    <FaCheck /> Approve Undecided
                                                </button>
                                                <button onClick={() => handleCancelBooking(booking._id)} className="w-[100px] bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 text-xs font-bold py-2.5 px-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm hover:shadow-red-500/10">
                                                    <FaTimes /> Reject
                                                </button>
                                            </div>
                                        )}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

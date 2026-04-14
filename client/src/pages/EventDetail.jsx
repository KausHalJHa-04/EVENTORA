import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/axios';
import { AuthContext } from '../context/AuthContext';
import { FaCalendarAlt, FaMapMarkerAlt, FaChair, FaMoneyBillWave } from 'react-icons/fa';

const EventDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookingLoading, setBookingLoading] = useState(false);
    const [otp, setOtp] = useState('');
    const [showOTP, setShowOTP] = useState(false);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const { data } = await api.get(`/events/${id}`);
                setEvent(data);
            } catch (err) {
                setError('Failed to load event details.');
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    const handleBooking = async () => {
        if (!user) {
            navigate('/login');
            return;
        }
        setBookingLoading(true);
        setError('');
        setSuccessMsg('');

        try {
            if (!showOTP) {
                await api.post('/bookings/send-otp');
                setShowOTP(true);
                setSuccessMsg('OTP sent to your email. Please verify to confirm booking.');
            } else {
                await api.post('/bookings', { eventId: event._id, otp });
                setSuccessMsg('Booking requested! Awaiting admin confirmation.');
                setShowOTP(false);
                // Update local seats count dynamically after booking
                setEvent({ ...event, availableSeats: event.availableSeats - 1 });
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Booking failed');
        } finally {
            setBookingLoading(false);
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="text-gray-400 text-lg font-medium animate-pulse">Loading event details...</div>
        </div>
    );

    if (error && !event) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
            <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-8 text-center max-w-md backdrop-blur-sm">
                <p className="text-4xl mb-4 drop-shadow-md">⚠️</p>
                <p className="text-xl font-bold text-red-400 mb-2">Oops!</p>
                <p className="text-gray-300">{error || 'Event not found'}</p>
                <button onClick={() => navigate('/')} className="mt-6 text-indigo-400 font-bold tracking-wide uppercase text-sm hover:text-indigo-300 transition-colors">← Back to Events</button>
            </div>
        </div>
    );

    const isSoldOut = event.availableSeats <= 0;

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 md:py-16 text-white">
            
            {/* HERO IMAGE HEADER */}
            <div className="relative w-full h-72 md:h-96 lg:h-[30rem] rounded-3xl overflow-hidden group mb-10 shadow-2xl border border-white/10">
                {event.image ? (
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center text-white/20 text-4xl md:text-6xl font-black uppercase tracking-widest group-hover:scale-105 transition-transform duration-700">
                        {event.category}
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full">
                    <div className="inline-block bg-indigo-500/20 backdrop-blur-md border border-indigo-500/30 text-indigo-300 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 shadow-lg">
                        {event.category}
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-lg leading-tight">{event.title}</h1>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                
                {/* LEFT COLUMN: DESCRIPTION */}
                <div className="lg:w-2/3 space-y-8">
                    <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-10 shadow-xl backdrop-blur-sm">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 text-lg border border-indigo-500/20">ℹ</div>
                            About this Event
                        </h2>
                        <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">{event.description}</p>
                    </div>
                </div>

                {/* RIGHT COLUMN: BOOKING CARD */}
                <div className="lg:w-1/3">
                    <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-md sticky top-28 group transition-all duration-500 hover:bg-white/[0.05] hover:border-white/20 hover:shadow-indigo-500/10">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                        
                        <h3 className="text-2xl font-bold text-white mb-8 tracking-tight relative z-10">Booking Details</h3>

                        <div className="space-y-6 mb-10 relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 text-xl border border-green-500/20 shadow-inner group-hover:scale-110 transition-transform duration-500 shrink-0">
                                    <FaMoneyBillWave />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Ticket Price</p>
                                    <p className="font-bold text-gray-200 text-xl">{event.ticketPrice === 0 ? <span className="text-green-400 uppercase tracking-wide">Free Entry</span> : `₹${event.ticketPrice}`}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 text-xl border border-indigo-500/20 shadow-inner group-hover:scale-110 transition-transform duration-500 shrink-0">
                                    <FaChair />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Availability</p>
                                    <p className="font-bold text-gray-200 text-lg">
                                        <span className={event.availableSeats < 10 ? 'text-red-400 font-black text-xl' : 'text-white'}>{event.availableSeats}</span> <span className="text-gray-500 text-sm font-normal">/ {event.totalSeats} seats</span>
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-400 text-xl border border-pink-500/20 shadow-inner group-hover:scale-110 transition-transform duration-500 shrink-0">
                                    <FaCalendarAlt />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Date</p>
                                    <p className="font-bold text-gray-200">{new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 text-xl border border-purple-500/20 shadow-inner group-hover:scale-110 transition-transform duration-500 shrink-0">
                                    <FaMapMarkerAlt />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Location</p>
                                    <p className="font-bold text-gray-200">{event.location}</p>
                                </div>
                            </div>
                        </div>

                        {showOTP && (
                            <div className="mb-6 relative z-10 space-y-2">
                                <p className="text-sm text-green-400 bg-green-500/10 p-3 rounded-xl border border-green-500/20 text-center font-medium">OTP sent! Check your email.</p>
                                <label className="block text-xs font-bold tracking-wide text-gray-400 uppercase text-center mt-2">Verification Code</label>
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
                        )}

                        <button
                            onClick={handleBooking}
                            disabled={isSoldOut || bookingLoading || (showOTP && !otp)}
                            className={`w-full py-4 rounded-xl font-bold tracking-wide uppercase text-sm flex justify-center items-center h-14 transition-all duration-300 shadow-lg relative z-10 ${isSoldOut || (successMsg && !showOTP)
                                ? 'bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed'
                                : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-1'
                                }`}
                        >
                            {bookingLoading ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                                    Processing...
                                </span>
                            ) : (showOTP ? 'Verify OTP & Confirm' : (successMsg && !showOTP ? 'Request Sent' : (isSoldOut ? 'Sold Out' : 'Confirm Registration')))}
                        </button>
                        
                        {error && <div className="mt-6 bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm font-semibold text-center relative z-10">{error}</div>}
                        {successMsg && <div className="mt-6 bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl text-sm font-semibold text-center relative z-10">{successMsg}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetail;

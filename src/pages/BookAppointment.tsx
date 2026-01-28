import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar, Clock, MessageSquare, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Home, Search, Heart, FileText, Settings } from 'lucide-react';

const BookAppointment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(0); // 0 = today, 1 = tomorrow, etc.
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [reason, setReason] = useState('');
    const [isbooked, setIsBooked] = useState(false);

    // Mock doctor data
    const doctor = {
        id: id,
        name: "Dr. Elena Rodriguez",
        specialty: "Pediatrician",
        hospital: "Children's Hospital",
        avatar: "https://images.unsplash.com/photo-1559839734-2b71f1e198ee?auto=format&fit=crop&q=80&w=200&h=200"
    };

    const sidebarItems = [
        { icon: Home, label: 'Home', id: 'home', path: '/patient-dashboard' },
        { icon: Search, label: 'Find a Doctor', id: 'find', path: '/patient-dashboard' },
        { icon: Heart, label: 'My Health', id: 'health', path: '#' },
        { icon: FileText, label: 'Records', id: 'records', path: '#' },
        { icon: Settings, label: 'Settings', id: 'settings', path: '#' },
    ];

    const generateDates = () => {
        const dates = [];
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        for (let i = 0; i < 7; i++) {
            const d = new Date();
            d.setDate(d.getDate() + i);
            dates.push({
                dayName: days[d.getDay()],
                dayNumber: d.getDate(),
                fullDate: d.toDateString()
            });
        }
        return dates;
    };

    const timeSlots = [
        { time: "09:00 AM", available: true },
        { time: "09:30 AM", available: false },
        { time: "10:00 AM", available: true },
        { time: "10:30 AM", available: true },
        { time: "11:00 AM", available: false },
        { time: "11:30 AM", available: true },
        { time: "02:00 PM", available: true },
        { time: "02:30 PM", available: true },
        { time: "03:00 PM", available: false },
        { time: "03:30 PM", available: true },
        { time: "04:00 PM", available: true },
        { time: "04:30 PM", available: true },
    ];

    const handleBooking = () => {
        if (!selectedSlot) return;
        setIsBooked(true);
        // In a real app, send booking to API
    };

    if (isbooked) {
        return (
            <div className="app-container">
                <Sidebar items={sidebarItems} activeId="find" />
                <div className="main-wrapper">
                    <Header title="Success" />
                    <main className="content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div className="booking-form-card" style={{ textAlign: 'center', maxWidth: '500px' }}>
                            <div style={{ color: 'var(--success)', marginBottom: '24px' }}>
                                <CheckCircle2 size={80} strokeWidth={1.5} />
                            </div>
                            <h2 style={{ fontSize: '2rem', marginBottom: '12px' }}>Appointment Confirmed!</h2>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
                                Your appointment with <strong>{doctor.name}</strong> has been scheduled successfully.
                            </p>
                            <button className="btn-primary full-width" onClick={() => navigate('/patient-dashboard')}>
                                Go back to Dashboard
                            </button>
                        </div>
                    </main>
                </div>
            </div>
        );
    }

    return (
        <div className="app-container">
            <Sidebar items={sidebarItems} activeId="find" />
            <div className="main-wrapper">
                <Header title="Book Appointment" />
                <main className="content">
                    <div className="booking-container">
                        <div className="back-btn-top" onClick={() => navigate(-1)}>
                            <ArrowLeft size={18} />
                            Back
                        </div>

                        <div className="doctor-summary-card">
                            <img src={doctor.avatar} alt={doctor.name} className="summary-avatar" />
                            <div className="summary-info">
                                <div style={{ fontSize: '0.875rem', color: 'var(--primary-blue)', fontWeight: '600', marginBottom: '2px' }}>Booking with</div>
                                <h3>{doctor.name}</h3>
                                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{doctor.specialty} • {doctor.hospital}</div>
                            </div>
                        </div>

                        <div className="booking-form-card">
                            <section className="form-section">
                                <div className="form-section-title">
                                    <Calendar size={20} color="var(--primary-blue)" />
                                    Select Date
                                </div>
                                <div className="date-grid">
                                    {generateDates().map((date, idx) => (
                                        <div
                                            key={idx}
                                            className={`date-chip ${selectedDate === idx ? 'active' : ''}`}
                                            onClick={() => setSelectedDate(idx)}
                                        >
                                            <span className="day-name">{date.dayName}</span>
                                            <span className="day-number">{date.dayNumber}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="form-section">
                                <div className="form-section-title">
                                    <Clock size={20} color="var(--primary-blue)" />
                                    Select Time Slot
                                </div>
                                <div className="slots-grid">
                                    {timeSlots.map((slot, idx) => (
                                        <div
                                            key={idx}
                                            className={`slot-chip ${!slot.available ? 'unavailable' : ''} ${selectedSlot === slot.time ? 'active' : ''}`}
                                            onClick={() => slot.available && setSelectedSlot(slot.time)}
                                        >
                                            {slot.time}
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="form-section">
                                <div className="form-section-title">
                                    <MessageSquare size={20} color="var(--primary-blue)" />
                                    Reason for Visit
                                </div>
                                <textarea
                                    className="reason-textarea"
                                    placeholder="Briefly describe your symptoms or reason for the visit..."
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                ></textarea>
                            </section>

                            <button
                                className="btn-primary full-width"
                                style={{ padding: '16px', fontSize: '1.125rem' }}
                                disabled={!selectedSlot}
                                onClick={handleBooking}
                            >
                                Confirm Appointment
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default BookAppointment;

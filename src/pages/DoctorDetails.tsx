import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, GraduationCap, Briefcase, Building2, MapPin, Clock, Calendar, ShieldCheck } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Home, Search, Heart, FileText, Settings } from 'lucide-react';

const DoctorDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Mock data for the doctor - in a real app, this would be fetched based on :id
    const doctor = {
        id: id,
        name: "Dr. Elena Rodriguez",
        specialty: "Pediatrician",
        qualification: "MD - Pediatrics, Fellow of the American Academy of Pediatrics",
        experience: "12+ Years",
        hospital: "Children's Hospital",
        address: "456 Pediatric Way, Medical District, NY",
        status: "Online",
        available: true,
        avatar: "https://images.unsplash.com/photo-1559839734-2b71f1e198ee?auto=format&fit=crop&q=80&w=200&h=200"
    };

    const sidebarItems = [
        { icon: Home, label: 'Home', id: 'home', path: '/patient-dashboard' },
        { icon: Search, label: 'Find a Doctor', id: 'find', path: '/patient-dashboard' },
        { icon: Heart, label: 'My Health', id: 'health', path: '#' },
        { icon: FileText, label: 'Records', id: 'records', path: '#' },
        { icon: Settings, label: 'Settings', id: 'settings', path: '#' },
    ];

    return (
        <div className="app-container">
            <Sidebar items={sidebarItems} activeId="find" />
            <div className="main-wrapper">
                <Header title="Doctor Profile" />
                <main className="content">
                    <div className="profile-container">
                        <div className="back-btn-top" onClick={() => navigate(-1)}>
                            <ArrowLeft size={18} />
                            Back to Search
                        </div>

                        <div className="profile-header-card">
                            <div className="profile-cover"></div>
                            <div className="profile-main-info">
                                <div className="profile-avatar-wrapper">
                                    <img src={doctor.avatar} alt={doctor.name} className="profile-avatar" />
                                    <span className={`live-dot ${doctor.status.toLowerCase()}`} style={{ position: 'absolute', bottom: '15px', right: '15px', width: '24px', height: '24px', border: '4px solid white' }}></span>
                                </div>
                                <div className="profile-name-row">
                                    <h2>{doctor.name}</h2>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <span className="profile-specialty-badge">{doctor.specialty}</span>
                                    </div>
                                    <div className={`live-badge ${doctor.status.toLowerCase()}`} style={{ marginTop: '8px' }}>
                                        <span className={`live-dot ${doctor.status.toLowerCase()}`}></span>
                                        {doctor.status} • Available Today
                                    </div>
                                </div>

                                <div className="profile-grid">
                                    <div className="detail-item">
                                        <div className="detail-icon">
                                            <GraduationCap size={24} />
                                        </div>
                                        <div className="detail-info">
                                            <div className="detail-label">Qualification</div>
                                            <div className="detail-value">{doctor.qualification}</div>
                                        </div>
                                    </div>
                                    <div className="detail-item">
                                        <div className="detail-icon">
                                            <Briefcase size={24} />
                                        </div>
                                        <div className="detail-info">
                                            <div className="detail-label">Experience</div>
                                            <div className="detail-value">{doctor.experience}</div>
                                        </div>
                                    </div>
                                    <div className="detail-item">
                                        <div className="detail-icon">
                                            <Building2 size={24} />
                                        </div>
                                        <div className="detail-info">
                                            <div className="detail-label">Hospital</div>
                                            <div className="detail-value">{doctor.hospital}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="booking-section">
                            <div className="booking-header">
                                <h3>Book an Appointment</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>Select a time slot to consult with {doctor.name}</p>
                            </div>

                            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                                <div className="meta-item" style={{ flex: 1, padding: '16px', background: '#f8fafc', borderRadius: '12px' }}>
                                    <MapPin size={20} className="icon" style={{ color: 'var(--primary-blue)' }} />
                                    <div>
                                        <div style={{ fontWeight: '600', color: 'var(--text-dark)' }}>Location</div>
                                        <div style={{ fontSize: '0.875rem' }}>{doctor.address}</div>
                                    </div>
                                </div>
                                <div className="meta-item" style={{ flex: 1, padding: '16px', background: '#f8fafc', borderRadius: '12px' }}>
                                    <Clock size={20} className="icon" style={{ color: 'var(--primary-blue)' }} />
                                    <div>
                                        <div style={{ fontWeight: '600', color: 'var(--text-dark)' }}>Working Hours</div>
                                        <div style={{ fontSize: '0.875rem' }}>09:00 AM - 05:00 PM</div>
                                    </div>
                                </div>
                            </div>

                            <button className="btn-primary full-width" style={{ padding: '18px', fontSize: '1.125rem' }} disabled={!doctor.available}>
                                <Calendar size={22} />
                                {doctor.available ? 'Confirm Booking' : 'Not Available'}
                            </button>

                            <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--success)', fontSize: '0.875rem', fontWeight: '500' }}>
                                <ShieldCheck size={16} />
                                Verified Doctor Profile
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DoctorDetails;

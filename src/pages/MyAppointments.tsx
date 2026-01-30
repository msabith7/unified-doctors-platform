import { useState } from 'react';
import { Calendar, MapPin, Clock, Ban, CheckCircle2 } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Home, Search, Heart, FileText, Settings, ClipboardList } from 'lucide-react';

const MyAppointments = () => {
    const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');

    const sidebarItems = [
        { icon: Home, label: 'Home', id: 'home', path: '/patient-dashboard' },
        { icon: Search, label: 'Find a Doctor', id: 'find', path: '/patient-dashboard' },
        { icon: Calendar, label: 'My Appointments', id: 'appointments', path: '/my-appointments' },
        { icon: Heart, label: 'My Health', id: 'health', path: '#' },
        { icon: FileText, label: 'Records', id: 'records', path: '/patient-records' },
        { icon: ClipboardList, label: 'Test Reports', id: 'test-reports', path: '/patient-test-reports' },
        { icon: Settings, label: 'Settings', id: 'settings', path: '#' },
    ];

    const appointments = {
        upcoming: [
            { id: 1, doctor: "Dr. Elena Rodriguez", specialty: "Pediatrician", hospital: "Children's Hospital", date: "Oct 30, 2023", time: "10:30 AM", status: "Confirmed" },
            { id: 2, doctor: "Dr. James Wilson", specialty: "Neurologist", hospital: "City General Hospital", date: "Nov 02, 2023", time: "02:15 PM", status: "Pending" },
        ],
        completed: [
            { id: 3, doctor: "Dr. Sarah Smith", specialty: "Cardiologist", hospital: "Heart Center", date: "Oct 20, 2023", time: "09:00 AM", status: "Completed" },
            { id: 4, doctor: "Dr. Michael Chen", specialty: "Dermatologist", hospital: "Skin & Care Unit", date: "Oct 15, 2023", time: "11:45 AM", status: "Completed" },
        ]
    };

    const currentAppointments = appointments[activeTab];

    return (
        <div className="app-container">
            <Sidebar items={sidebarItems} activeId="appointments" />
            <div className="main-wrapper">
                <Header title="My Appointments" />
                <main className="content">
                    <div className="appointments-page">
                        <div className="tabs-container">
                            <div
                                className={`tab-item ${activeTab === 'upcoming' ? 'active' : ''}`}
                                onClick={() => setActiveTab('upcoming')}
                            >
                                Upcoming
                            </div>
                            <div
                                className={`tab-item ${activeTab === 'completed' ? 'active' : ''}`}
                                onClick={() => setActiveTab('completed')}
                            >
                                Completed
                            </div>
                        </div>

                        {currentAppointments.length > 0 ? (
                            <div className="appointments-list">
                                {currentAppointments.map((apt) => (
                                    <div key={apt.id} className="appointment-card">
                                        <div className="apt-header">
                                            <div className="patient-info">
                                                <div className="patient-avatar">
                                                    {apt.doctor.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div>
                                                    <div className="patient-name">{apt.doctor}</div>
                                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{apt.specialty}</div>
                                                </div>
                                            </div>
                                            <span className={`status-badge ${apt.status.toLowerCase()}`}>
                                                {apt.status === 'Confirmed' && <CheckCircle2 size={14} />}
                                                {apt.status === 'Pending' && <Clock size={14} />}
                                                {apt.status === 'Completed' && <CheckCircle2 size={14} />}
                                                {apt.status}
                                            </span>
                                        </div>

                                        <div className="apt-details">
                                            <div className="apt-detail-item">
                                                <MapPin size={16} className="icon" />
                                                <span>{apt.hospital}</span>
                                            </div>
                                            <div className="apt-detail-item">
                                                <Calendar size={16} className="icon" />
                                                <span>{apt.date}</span>
                                            </div>
                                            <div className="apt-detail-item" style={{ gridColumn: 'span 2' }}>
                                                <Clock size={16} className="icon" />
                                                <span>{apt.time}</span>
                                            </div>
                                        </div>

                                        <div className="apt-actions">
                                            {activeTab === 'upcoming' ? (
                                                <>
                                                    <button className="btn-complete" style={{ background: 'var(--primary-light)', color: 'var(--primary)', border: '1px solid var(--primary)' }}>
                                                        <FileText size={16} /> Reschedule
                                                    </button>
                                                    <button className="btn-complete" style={{ background: '#fff1f2', color: 'var(--danger)', border: '1px solid #fecaca' }}>
                                                        <Ban size={16} /> Cancel
                                                    </button>
                                                </>
                                            ) : (
                                                <button className="btn-complete">
                                                    <FileText size={16} /> View Summary
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state">
                                <div className="empty-state-icon">
                                    <Calendar size={64} />
                                </div>
                                <h3>No appointments found</h3>
                                <p>You don't have any {activeTab} appointments at the moment.</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MyAppointments;

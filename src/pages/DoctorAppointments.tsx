import { useState } from 'react';
import {
    LayoutDashboard,
    Calendar,
    Users,
    MessageSquare,
    Settings,
    Clock,
    Check,
    Search,
    UserCircle
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

interface Appointment {
    id: number;
    patientName: string;
    time: string;
    date: string;
    status: 'Upcoming' | 'Completed';
    type: string;
}

const DoctorAppointments = () => {
    const [activeTab, setActiveTab] = useState<'Upcoming' | 'Completed'>('Upcoming');
    const [appointments, setAppointments] = useState<Appointment[]>([
        { id: 1, patientName: "Sarah Jenkins", time: "09:00 AM", date: "Today", status: 'Upcoming', type: 'General Checkup' },
        { id: 2, patientName: "Michael Ross", time: "10:30 AM", date: "Today", status: 'Upcoming', type: 'Dental Surgery' },
        { id: 3, patientName: "Emily Blunt", time: "02:00 PM", date: "Today", status: 'Upcoming', type: 'Follow-up' },
        { id: 4, patientName: "David Miller", time: "04:30 PM", date: "Today", status: 'Upcoming', type: 'Consultation' },
        { id: 5, patientName: "Jessica Alba", time: "08:00 AM", date: "Yesterday", status: 'Completed', type: 'X-Ray Review' },
        { id: 6, patientName: "Tom Hardy", time: "11:00 AM", date: "Yesterday", status: 'Completed', type: 'Post-Op Check' },
    ]);

    const sidebarItems = [
        { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard', path: '/doctor-dashboard' },
        { icon: Calendar, label: 'Appointments', id: 'appointments', path: '/doctor-appointments' },
        { icon: Users, label: 'Patients', id: 'patients', path: '/doctor-patients' },
        { icon: MessageSquare, label: 'Consultations', id: 'consultations', path: '/doctor-consultations' },
        { icon: UserCircle, label: 'Profile', id: 'profile', path: '/doctor-profile' },
        { icon: Settings, label: 'Settings', id: 'settings', path: '#' },
    ];

    const markAsCompleted = (id: number) => {
        setAppointments(appointments.map(apt =>
            apt.id === id ? { ...apt, status: 'Completed' as const } : apt
        ));
    };

    const filteredAppointments = appointments.filter(apt => apt.status === activeTab);

    return (
        <div className="app-container">
            <Sidebar items={sidebarItems} activeId="appointments" />
            <div className="main-wrapper">
                <Header title="My Appointments" />
                <main className="content">
                    <div className="tabs-container">
                        <div
                            className={`tab-item ${activeTab === 'Upcoming' ? 'active' : ''}`}
                            onClick={() => setActiveTab('Upcoming')}
                        >
                            Upcoming Appointments ({appointments.filter(a => a.status === 'Upcoming').length})
                        </div>
                        <div
                            className={`tab-item ${activeTab === 'Completed' ? 'active' : ''}`}
                            onClick={() => setActiveTab('Completed')}
                        >
                            Completed ({appointments.filter(a => a.status === 'Completed').length})
                        </div>
                    </div>

                    {filteredAppointments.length > 0 ? (
                        <div className="appointments-list">
                            {filteredAppointments.map(apt => (
                                <div key={apt.id} className="appointment-card">
                                    <div className="apt-header">
                                        <div className="patient-info">
                                            <div className="patient-avatar">
                                                {apt.patientName.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <div className="patient-name">{apt.patientName}</div>
                                                <div className={`status-badge ${apt.status.toLowerCase()}`}>{apt.type}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="apt-details">
                                        <div className="apt-detail-item">
                                            <Clock size={16} className="icon" />
                                            <span>{apt.time}</span>
                                        </div>
                                        <div className="apt-detail-item">
                                            <Calendar size={16} className="icon" />
                                            <span>{apt.date}</span>
                                        </div>
                                    </div>

                                    {apt.status === 'Upcoming' && (
                                        <div className="apt-actions">
                                            <button
                                                className="btn-complete"
                                                onClick={() => markAsCompleted(apt.id)}
                                            >
                                                <Check size={18} />
                                                Mark as Completed
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <Search className="empty-state-icon" size={64} />
                            <h3>No appointments found</h3>
                            <p>You don't have any {activeTab.toLowerCase()} appointments at the moment.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default DoctorAppointments;

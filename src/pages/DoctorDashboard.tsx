import { useState } from 'react';
import {
    LayoutDashboard,
    Calendar,
    Users,
    MessageSquare,
    Settings,
    Clock,
    CheckCircle,
    AlertCircle,
    Play,
    Square,
    UserMinus,
    UserCheck,
    AlertTriangle,
    X,
    Check,
    Stethoscope
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import StatCard from '../components/StatCard';

const DoctorDashboard = () => {
    const [status, setStatus] = useState({
        label: 'Available',
        color: 'green'
    });

    const [showSurgeryModal, setShowSurgeryModal] = useState(false);
    const [surgeryType, setSurgeryType] = useState('');
    const [duration, setDuration] = useState(60);
    const [notification, setNotification] = useState<string | null>(null);

    const sidebarItems = [
        { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard', path: '/doctor-dashboard' },
        { icon: Calendar, label: 'Appointments', id: 'appointments', path: '/doctor-appointments' },
        { icon: Users, label: 'Patients', id: 'patients', path: '#' },
        { icon: MessageSquare, label: 'Consultations', id: 'consultations', path: '#' },
        { icon: Settings, label: 'Settings', id: 'settings', path: '#' },
    ];

    const appointments = [
        { id: 1, patient: "John Doe", type: "Check-up", time: "10:00 AM", status: "Confirmed" },
        { id: 2, patient: "Jane Smith", type: "Follow-up", time: "11:30 AM", status: "Pending" },
        { id: 3, patient: "Robert Brown", type: "Consultation", time: "02:00 PM", status: "Cancelled" },
    ];

    const updateStatus = (label: string, color: string) => {
        setStatus({ label, color });
        if (label === 'Available') {
            setNotification(null);
        }
    };

    const handleSurgerySubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const now = new Date();
        const endTime = new Date(now.getTime() + duration * 60000);
        const formattedTime = endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        setStatus({ label: 'In Surgery', color: 'red' });
        setNotification(`Status updated to In Surgery until ${formattedTime}`);
        setShowSurgeryModal(false);
        setSurgeryType('');

        // Clear notification after 10 seconds or when status changes
        // For now we keep it visible as long as they are in surgery
    };

    return (
        <div className="app-container">
            <Sidebar items={sidebarItems} activeId="dashboard" />
            <div className="main-wrapper">
                <Header title="Doctor Dashboard" />
                <main className="content">
                    {notification && (
                        <div className="notification-banner">
                            <Check size={20} />
                            <span>{notification}</span>
                        </div>
                    )}

                    <div className="dashboard-header-section">
                        <div className="welcome-text">
                            <h2>Welcome Dr. Sabith</h2>
                            <p>Here's what's happening with your clinic today.</p>
                        </div>
                        <div className={`large-status-badge ${status.color}`}>
                            <div className={`status-dot ${status.color}`}></div>
                            Status: {status.label}
                        </div>
                    </div>

                    <div className="action-grid">
                        <button className="action-btn" onClick={() => setShowSurgeryModal(true)}>
                            <Play color="#10b981" />
                            <span>Start Surgery</span>
                        </button>
                        <button className="action-btn" onClick={() => updateStatus('Available', 'green')}>
                            <Square color="#ef4444" />
                            <span>End Surgery</span>
                        </button>
                        <button className="action-btn" onClick={() => updateStatus('On Leave', 'yellow')}>
                            <UserMinus color="#f59e0b" />
                            <span>Mark On Leave</span>
                        </button>
                        <button className="action-btn" onClick={() => updateStatus('Available', 'green')}>
                            <UserCheck color="#2563eb" />
                            <span>Mark Available</span>
                        </button>
                        <button className="action-btn danger" onClick={() => updateStatus('Emergency', 'orange')}>
                            <AlertTriangle color="#f97316" />
                            <span>Emergency Case</span>
                        </button>
                    </div>

                    <div className="dashboard-grid">
                        <StatCard label="Today's Appointments" value="8" icon={Calendar} color="#2563eb" />
                        <StatCard label="Pending Requests" value="3" icon={Clock} color="#f59e0b" />
                        <StatCard label="Completed Today" value="5" icon={CheckCircle} color="#10b981" />
                        <StatCard label="Emergency" value="0" icon={AlertCircle} color="#ef4444" />
                    </div>

                    <div className="table-card">
                        <div className="card-header">
                            <h2 className="card-title">Today's Appointments</h2>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Time</th>
                                    <th>Patient Name</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map(apt => (
                                    <tr key={apt.id}>
                                        <td>{apt.time}</td>
                                        <td style={{ fontWeight: '500' }}>{apt.patient}</td>
                                        <td>
                                            <span className={`status-badge ${apt.status.toLowerCase()}`}>
                                                {apt.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>

            {/* Surgery Modal */}
            {showSurgeryModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Start New Surgery</h3>
                            <button className="close-btn" onClick={() => setShowSurgeryModal(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSurgerySubmit}>
                            <div className="modal-body">
                                <div className="auth-form">
                                    <div className="input-group">
                                        <label>Surgery Type</label>
                                        <div className="input-wrapper">
                                            <Stethoscope size={20} className="input-icon" />
                                            <input
                                                type="text"
                                                className="full-width"
                                                placeholder="e.g. Appendectomy"
                                                value={surgeryType}
                                                onChange={(e) => setSurgeryType(e.target.value)}
                                                required
                                                style={{ paddingLeft: '42px' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="input-group">
                                        <label>Expected Duration (minutes)</label>
                                        <div className="input-wrapper">
                                            <Clock size={20} className="input-icon" />
                                            <input
                                                type="number"
                                                className="full-width"
                                                placeholder="60"
                                                value={duration}
                                                onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
                                                required
                                                style={{ paddingLeft: '42px' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn-ghost" onClick={() => setShowSurgeryModal(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn-primary">
                                    Confirm Surgery
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorDashboard;

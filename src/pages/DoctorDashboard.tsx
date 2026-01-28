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
    AlertTriangle
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import StatCard from '../components/StatCard';

const DoctorDashboard = () => {
    const [status, setStatus] = useState({
        label: 'Available',
        color: 'green'
    });

    const sidebarItems = [
        { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
        { icon: Calendar, label: 'My Schedule', id: 'schedule' },
        { icon: Users, label: 'Patients', id: 'patients' },
        { icon: MessageSquare, label: 'Consultations', id: 'consultations' },
        { icon: Settings, label: 'Settings', id: 'settings' },
    ];

    const appointments = [
        { id: 1, patient: "John Doe", type: "Check-up", time: "10:00 AM", status: "Confirmed" },
        { id: 2, patient: "Jane Smith", type: "Follow-up", time: "11:30 AM", status: "Pending" },
        { id: 3, patient: "Robert Brown", type: "Consultation", time: "02:00 PM", status: "Cancelled" },
    ];

    const updateStatus = (label: string, color: string) => {
        setStatus({ label, color });
    };

    return (
        <div className="app-container">
            <Sidebar items={sidebarItems} activeId="dashboard" />
            <div className="main-wrapper">
                <Header title="Doctor Dashboard" />
                <main className="content">
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
                        <button className="action-btn" onClick={() => updateStatus('In Surgery', 'red')}>
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
        </div>
    );
};

export default DoctorDashboard;

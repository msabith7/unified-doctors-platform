import {
    LayoutDashboard,
    Calendar,
    Users,
    MessageSquare,
    Settings,
    UserCircle,
    Search
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

interface Consultation {
    id: number;
    date: string;
    time: string;
    patientName: string;
    type: string;
    status: 'Completed' | 'Scheduled' | 'Cancelled';
}

const ConsultationLog = () => {
    const consultations: Consultation[] = [
        { id: 1, date: '30 Jan 2025', time: '09:00 AM', patientName: 'Sarah Jenkins', type: 'General Checkup', status: 'Completed' },
        { id: 2, date: '30 Jan 2025', time: '10:30 AM', patientName: 'Michael Ross', type: 'Follow-up', status: 'Completed' },
        { id: 3, date: '29 Jan 2025', time: '02:00 PM', patientName: 'Emily Blunt', type: 'Consultation', status: 'Completed' },
        { id: 4, date: '29 Jan 2025', time: '04:30 PM', patientName: 'David Miller', type: 'Post-Op Review', status: 'Completed' },
        { id: 5, date: '31 Jan 2025', time: '11:00 AM', patientName: 'Jessica Alba', type: 'Consultation', status: 'Scheduled' },
    ];

    const sidebarItems = [
        { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard', path: '/doctor-dashboard' },
        { icon: Calendar, label: 'Appointments', id: 'appointments', path: '/doctor-appointments' },
        { icon: Users, label: 'Patients', id: 'patients', path: '/doctor-patients' },
        { icon: MessageSquare, label: 'Consultations', id: 'consultations', path: '/doctor-consultations' },
        { icon: UserCircle, label: 'Profile', id: 'profile', path: '/doctor-profile' },
        { icon: Settings, label: 'Settings', id: 'settings', path: '#' },
    ];

    return (
        <div className="app-container">
            <Sidebar items={sidebarItems} activeId="consultations" />
            <div className="main-wrapper">
                <Header title="Consultation Log" />
                <main className="content">
                    <div className="table-card">
                        <div className="card-header">
                            <h2 className="card-title">Consultations</h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '4px' }}>Recent and upcoming consultations</p>
                        </div>
                        {consultations.length > 0 ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Patient</th>
                                        <th>Type</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {consultations.map((c) => (
                                        <tr key={c.id}>
                                            <td>{c.date}</td>
                                            <td>{c.time}</td>
                                            <td style={{ fontWeight: '500' }}>{c.patientName}</td>
                                            <td>{c.type}</td>
                                            <td>
                                                <span className={`status-badge ${c.status.toLowerCase()}`}>
                                                    {c.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="empty-state">
                                <Search className="empty-state-icon" size={48} />
                                <p>No consultations recorded yet.</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ConsultationLog;

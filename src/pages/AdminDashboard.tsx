import { LayoutDashboard, Users, UserCheck, Activity, Calendar, Stethoscope, BarChart2, Settings } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import StatCard from '../components/StatCard';

const AdminDashboard = () => {
    const sidebarItems = [
        { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard', path: '/admin-dashboard' },
        { icon: UserCheck, label: 'Manage Doctors', id: 'doctors', path: '#' },
        { icon: Users, label: 'Manage Users', id: 'users', path: '#' },
        { icon: BarChart2, label: 'Reports', id: 'reports', path: '#' },
        { icon: Settings, label: 'System Settings', id: 'settings', path: '#' },
    ];

    const doctorStatus = [
        { id: 1, name: "Dr. Sarah Connor", hospital: "City General Hospital", status: "Active", lastUpdated: "2 mins ago" },
        { id: 2, name: "Dr. James Wilson", hospital: "Grace Medical Center", status: "In Surgery", lastUpdated: "15 mins ago" },
        { id: 3, name: "Dr. Amy Lee", hospital: "Mayo Clinic", status: "Active", lastUpdated: "Just Now" },
        { id: 4, name: "Dr. Michael Chen", hospital: "Johns Hopkins", status: "Inactive", lastUpdated: "1 hour ago" },
    ];

    return (
        <div className="app-container">
            <Sidebar items={sidebarItems} activeId="dashboard" />
            <div className="main-wrapper">
                <Header title="Admin Dashboard" />
                <main className="content">
                    <div className="dashboard-grid">
                        <StatCard label="Total Doctors" value="248" icon={UserCheck} color="#2563eb" />
                        <StatCard label="Active Doctors Now" value="142" icon={Activity} color="#10b981" />
                        <StatCard label="Surgeries Ongoing" value="12" icon={Stethoscope} color="#6366f1" />
                        <StatCard label="Appointments Today" value="48" icon={Calendar} color="#f59e0b" />
                    </div>

                    <div className="table-card">
                        <div className="card-header">
                            <h2 className="card-title">Live Doctor Status</h2>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Doctor</th>
                                    <th>Hospital</th>
                                    <th>Status</th>
                                    <th>Last Updated</th>
                                </tr>
                            </thead>
                            <tbody>
                                {doctorStatus.map(doc => (
                                    <tr key={doc.id}>
                                        <td style={{ fontWeight: '600' }}>{doc.name}</td>
                                        <td>{doc.hospital}</td>
                                        <td>
                                            <span className={`status-badge ${doc.status.toLowerCase().replace(' ', '-')}`}>
                                                {doc.status}
                                            </span>
                                        </td>
                                        <td>{doc.lastUpdated}</td>
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

export default AdminDashboard;

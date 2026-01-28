import { LayoutDashboard, Users, Shield, BarChart2, Settings, UserCheck, Activity, Globe } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import StatCard from '../components/StatCard';

const AdminDashboard = () => {
    const sidebarItems = [
        { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
        { icon: UserCheck, label: 'Manage Doctors', id: 'doctors' },
        { icon: Users, label: 'Manage Users', id: 'users' },
        { icon: BarChart2, label: 'Reports', id: 'reports' },
        { icon: Settings, label: 'System Settings', id: 'settings' },
    ];

    const logs = [
        { id: 1, action: "User Registration", user: "John Smith", time: "2 mins ago", status: "Success" },
        { id: 2, action: "Doctor Verification", user: "Dr. Amy Lee", time: "15 mins ago", status: "Pending" },
        { id: 3, action: "System Update", user: "System Admin", time: "1 hour ago", status: "Success" },
    ];

    return (
        <div className="app-container">
            <Sidebar items={sidebarItems} activeId="dashboard" />
            <div className="main-wrapper">
                <Header title="Admin Dashboard" />
                <main className="content">
                    <div className="dashboard-grid">
                        <StatCard label="Total Users" value="1,240" icon={Users} color="#2563eb" />
                        <StatCard label="Active Doctors" value="148" icon={Activity} color="#10b981" />
                        <StatCard label="System Health" value="99.9%" icon={Shield} color="#6366f1" />
                        <StatCard label="Global Reach" value="24 Cities" icon={Globe} color="#f59e0b" />
                    </div>

                    <div className="table-card">
                        <div className="card-header">
                            <h2 className="card-title">Recent System Logs</h2>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Action</th>
                                    <th>User</th>
                                    <th>Time</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.map(log => (
                                    <tr key={log.id}>
                                        <td style={{ fontWeight: '500' }}>{log.action}</td>
                                        <td>{log.user}</td>
                                        <td>{log.time}</td>
                                        <td>
                                            <span className={`status-badge ${log.status.toLowerCase()}`}>
                                                {log.status}
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

export default AdminDashboard;

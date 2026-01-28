import {
    LayoutDashboard,
    Users,
    UserCheck,
    BarChart2,
    Settings,
    Building2,
    ScrollText,
    Search
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useState } from 'react';

interface Log {
    id: number;
    doctor: string;
    action: string;
    status: 'Active' | 'Inactive' | 'Pending' | 'Verified' | 'Suspended';
    time: string;
    updatedBy: string;
}

const StatusLogs = () => {
    const sidebarItems = [
        { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard', path: '/admin-dashboard' },
        { icon: Building2, label: 'Hospital Management', id: 'hospitals', path: '/admin/hospitals' },
        { icon: UserCheck, label: 'Manage Doctors', id: 'doctors', path: '/admin/doctors' },
        { icon: ScrollText, label: 'Status Logs', id: 'logs', path: '/admin/logs' },
        { icon: Users, label: 'Manage Users', id: 'users', path: '#' },
        { icon: BarChart2, label: 'Reports', id: 'reports', path: '#' },
        { icon: Settings, label: 'System Settings', id: 'settings', path: '#' },
    ];

    const [logs] = useState<Log[]>([
        { id: 1, doctor: "Dr. Sarah Connor", action: "Status Change", status: "Active", time: "2024-03-15 09:30 AM", updatedBy: "Admin User" },
        { id: 2, doctor: "Dr. James Wilson", action: "Verification", status: "Verified", time: "2024-03-14 02:15 PM", updatedBy: "Super Admin" },
        { id: 3, doctor: "Dr. Amy Lee", action: "Status Change", status: "Inactive", time: "2024-03-14 11:00 AM", updatedBy: "System" },
        { id: 4, doctor: "Dr. Michael Chen", action: "Registration", status: "Pending", time: "2024-03-13 04:45 PM", updatedBy: "System" },
        { id: 5, doctor: "Dr. Gregory House", action: "Suspension", status: "Suspended", time: "2024-03-10 10:00 AM", updatedBy: "Admin User" },
    ]);

    const [searchQuery, setSearchQuery] = useState('');

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'active':
            case 'verified':
                return 'green';
            case 'inactive':
            case 'suspended':
                return 'red';
            case 'pending':
                return 'yellow';
            default:
                return 'blue';
        }
    };

    const filteredLogs = logs.filter(log =>
        log.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.updatedBy.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="app-container">
            <Sidebar items={sidebarItems} activeId="logs" />
            <div className="main-wrapper">
                <Header title="System Status Logs" />
                <main className="content">

                    {/* Search Bar */}
                    <div className="search-container" style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                        <div className="search-input-wrapper" style={{ flex: 1 }}>
                            <Search className="search-icon" size={20} />
                            <input
                                type="text"
                                placeholder="Search logs by doctor or admin..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Logs Table */}
                    <div className="table-card">
                        <div className="card-header">
                            <h2 className="card-title">Recent Activity Logs</h2>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Doctor</th>
                                    <th>Action</th>
                                    <th>Status Output</th>
                                    <th>Time</th>
                                    <th>Updated By</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLogs.map(log => (
                                    <tr key={log.id}>
                                        <td style={{ fontWeight: '600' }}>{log.doctor}</td>
                                        <td>{log.action}</td>
                                        <td>
                                            <span className={`status-badge ${getStatusColor(log.status)}`}>
                                                {log.status}
                                            </span>
                                        </td>
                                        <td>{log.time}</td>
                                        <td style={{ color: '#64748b' }}>{log.updatedBy}</td>
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

export default StatusLogs;

import { useState } from 'react';
import {
    LayoutDashboard,
    Users,
    UserCheck,
    BarChart2,
    Settings,
    Building2,
    CheckCircle,
    Power,
    History,
    X,
    Search,
    Shield,
    ScrollText
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

interface Doctor {
    id: number;
    name: string;
    specialization: string;
    hospital: string;
    status: 'Active' | 'Inactive' | 'Pending';
    verified: boolean;
    joinedDate: string;
}

interface StatusLog {
    id: number;
    date: string;
    action: string;
    admin: string;
}

const DoctorManagement = () => {
    const sidebarItems = [
        { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard', path: '/admin-dashboard' },
        { icon: Building2, label: 'Hospital Management', id: 'hospitals', path: '/admin/hospitals' },
        { icon: UserCheck, label: 'Manage Doctors', id: 'doctors', path: '/admin/doctors' },
        { icon: ScrollText, label: 'Status Logs', id: 'logs', path: '/admin/logs' },
        { icon: Users, label: 'Manage Users', id: 'users', path: '#' },
        { icon: BarChart2, label: 'Reports', id: 'reports', path: '#' },
        { icon: Settings, label: 'System Settings', id: 'settings', path: '#' },
    ];

    const [doctors, setDoctors] = useState<Doctor[]>([
        { id: 1, name: "Dr. Sarah Connor", specialization: "Cardiology", hospital: "City General", status: 'Active', verified: true, joinedDate: "2024-01-15" },
        { id: 2, name: "Dr. James Wilson", specialization: "Neurology", hospital: "Grace Medical", status: 'Pending', verified: false, joinedDate: "2024-02-01" },
        { id: 3, name: "Dr. Amy Lee", specialization: "Pediatrics", hospital: "Mayo Clinic", status: 'Inactive', verified: true, joinedDate: "2023-11-20" },
    ]);

    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const [historyLogs] = useState<StatusLog[]>([
        { id: 1, date: "2024-01-15 10:30 AM", action: "Account Verification", admin: "Admin User" },
        { id: 2, date: "2024-01-15 02:15 PM", action: "Status set to Active", admin: "Super Admin" },
        { id: 3, date: "2024-02-01 09:00 AM", action: "Profile Updated", admin: "System" },
    ]);

    const toggleStatus = (id: number) => {
        setDoctors(doctors.map(doc => {
            if (doc.id === id) {
                return { ...doc, status: doc.status === 'Active' ? 'Inactive' : 'Active' };
            }
            return doc;
        }));
    };

    const verifyDoctor = (id: number) => {
        setDoctors(doctors.map(doc => {
            if (doc.id === id) {
                return { ...doc, verified: true, status: 'Active' };
            }
            return doc;
        }));
    };

    const filteredDoctors = doctors.filter(doc =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.specialization.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="app-container">
            <Sidebar items={sidebarItems} activeId="doctors" />
            <div className="main-wrapper">
                <Header title="Doctor Management" />
                <main className="content">

                    {/* Search and Filter */}
                    <div className="search-container" style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                        <div className="search-input-wrapper" style={{ flex: 1 }}>
                            <Search className="search-icon" size={20} />
                            <input
                                type="text"
                                placeholder="Search doctors by name or specialization..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Doctor List Table */}
                    <div className="table-card">
                        <div className="card-header">
                            <h2 className="card-title">Registered Doctors</h2>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Doctor Name</th>
                                    <th>Specialization</th>
                                    <th>Hospital</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredDoctors.map(doc => (
                                    <tr key={doc.id}>
                                        <td style={{ fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            {doc.name}
                                            {doc.verified && <Shield size={14} color="#2563eb" fill="#2563eb" />}
                                        </td>
                                        <td>{doc.specialization}</td>
                                        <td>{doc.hospital}</td>
                                        <td>
                                            <span className={`status-badge ${doc.status.toLowerCase()}`}>
                                                {doc.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                {!doc.verified && (
                                                    <button
                                                        className="btn-primary"
                                                        style={{ padding: '6px 12px', fontSize: '0.75rem', backgroundColor: '#10b981' }}
                                                        onClick={() => verifyDoctor(doc.id)}
                                                        title="Approve Doctor"
                                                    >
                                                        <CheckCircle size={14} /> Approve
                                                    </button>
                                                )}

                                                <button
                                                    className={`btn-primary ${doc.status === 'Active' ? 'danger' : ''}`}
                                                    style={{
                                                        padding: '6px 12px',
                                                        fontSize: '0.75rem',
                                                        backgroundColor: doc.status === 'Active' ? '#fee2e2' : '#dcfce7',
                                                        color: doc.status === 'Active' ? '#991b1b' : '#166534',
                                                        border: 'none'
                                                    }}
                                                    onClick={() => toggleStatus(doc.id)}
                                                    title={doc.status === 'Active' ? 'Deactivate' : 'Activate'}
                                                >
                                                    <Power size={14} />
                                                </button>

                                                <button
                                                    className="btn-primary"
                                                    style={{ padding: '6px 12px', fontSize: '0.75rem', backgroundColor: '#f1f5f9', color: '#475569' }}
                                                    onClick={() => {
                                                        setSelectedDoctor(doc);
                                                        setIsHistoryModalOpen(true);
                                                    }}
                                                    title="View History"
                                                >
                                                    <History size={14} /> History
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>

            {/* History Modal */}
            {isHistoryModalOpen && selectedDoctor && (
                <div className="modal-overlay" style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div className="table-card" style={{ width: '600px', padding: '0', maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
                        <div className="card-header" style={{ padding: '24px', borderBottom: '1px solid var(--border)' }}>
                            <h2 className="card-title">Status History: {selectedDoctor.name}</h2>
                            <button onClick={() => setIsHistoryModalOpen(false)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                                <X size={20} />
                            </button>
                        </div>
                        <div style={{ padding: '24px', overflowY: 'auto' }}>
                            <table style={{ border: '1px solid var(--border)', borderRadius: '8px' }}>
                                <thead style={{ background: '#f8fafc' }}>
                                    <tr>
                                        <th style={{ padding: '12px' }}>Date</th>
                                        <th style={{ padding: '12px' }}>Action</th>
                                        <th style={{ padding: '12px' }}>Admin</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {historyLogs.map(log => (
                                        <tr key={log.id}>
                                            <td style={{ padding: '12px', borderBottom: '1px solid var(--border)' }}>{log.date}</td>
                                            <td style={{ padding: '12px', borderBottom: '1px solid var(--border)' }}>{log.action}</td>
                                            <td style={{ padding: '12px', borderBottom: '1px solid var(--border)' }}>{log.admin}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorManagement;

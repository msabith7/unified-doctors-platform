import { useState } from 'react';
import {
    LayoutDashboard,
    Users,
    UserCheck,
    BarChart2,
    Settings,
    Plus,
    MapPin,
    Building2,
    UserPlus,
    X,
    Search,
    ScrollText
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

interface Hospital {
    id: number;
    name: string;
    location: string;
    type: string;
    doctorCount: number;
}

const HospitalManagement = () => {
    const sidebarItems = [
        { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard', path: '/admin-dashboard' },
        { icon: Building2, label: 'Hospital Management', id: 'hospitals', path: '/admin/hospitals' },
        { icon: UserCheck, label: 'Manage Doctors', id: 'doctors', path: '/admin/doctors' },
        { icon: ScrollText, label: 'Status Logs', id: 'logs', path: '/admin/logs' },
        { icon: Users, label: 'Manage Users', id: 'users', path: '#' },
        { icon: BarChart2, label: 'Reports', id: 'reports', path: '#' },
        { icon: Settings, label: 'System Settings', id: 'settings', path: '#' },
    ];

    const [hospitals, setHospitals] = useState<Hospital[]>([
        { id: 1, name: "City General Hospital", location: "Downtown", type: "General", doctorCount: 45 },
        { id: 2, name: "Grace Medical Center", location: "North Side", type: "Specialized", doctorCount: 32 },
        { id: 3, name: "Mayo Clinic", location: "Rochester", type: "Private", doctorCount: 120 },
    ]);

    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        location: '',
        type: 'General'
    });

    const handleAddHospital = (e: React.FormEvent) => {
        e.preventDefault();
        const newHospital: Hospital = {
            id: hospitals.length + 1,
            name: formData.name,
            location: formData.location,
            type: formData.type,
            doctorCount: 0
        };
        setHospitals([...hospitals, newHospital]);
        setFormData({ name: '', location: '', type: 'General' });
    };

    return (
        <div className="app-container">
            <Sidebar items={sidebarItems} activeId="hospitals" />
            <div className="main-wrapper">
                <Header title="Hospital Management" />
                <main className="content">

                    {/* Add Hospital Form */}
                    <div className="table-card" style={{ marginBottom: '32px', padding: '24px' }}>
                        <div className="card-header" style={{ padding: '0 0 20px 0', borderBottom: '1px solid var(--border)', marginBottom: '24px' }}>
                            <h2 className="card-title">Add New Hospital</h2>
                        </div>
                        <form onSubmit={handleAddHospital} className="auth-form" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                            <div className="input-group">
                                <label>Hospital Name</label>
                                <div className="input-wrapper">
                                    <Building2 className="input-icon" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Enter name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="input-group">
                                <label>Location</label>
                                <div className="input-wrapper">
                                    <MapPin className="input-icon" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Enter location"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="input-group">
                                <label>Facility Type</label>
                                <div className="input-wrapper">
                                    <Search className="input-icon" size={18} />
                                    <select
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    >
                                        <option value="General">General</option>
                                        <option value="Specialized">Specialized</option>
                                        <option value="Clinic">Clinic</option>
                                        <option value="Private">Private</option>
                                    </select>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                                <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                                    <Plus size={20} /> Add Hospital
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Hospital List Table */}
                    <div className="table-card">
                        <div className="card-header">
                            <h2 className="card-title">Registered Hospitals</h2>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Hospital Name</th>
                                    <th>Location</th>
                                    <th>Type</th>
                                    <th>Doctors</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {hospitals.map(hospital => (
                                    <tr key={hospital.id}>
                                        <td style={{ fontWeight: '600' }}>{hospital.name}</td>
                                        <td>{hospital.location}</td>
                                        <td>
                                            <span className="status-badge active" style={{ backgroundColor: '#f1f5f9', color: '#475569' }}>
                                                {hospital.type}
                                            </span>
                                        </td>
                                        <td>{hospital.doctorCount}</td>
                                        <td>
                                            <button
                                                className="btn-primary"
                                                style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                                                onClick={() => {
                                                    setSelectedHospital(hospital);
                                                    setIsAssignModalOpen(true);
                                                }}
                                            >
                                                <UserPlus size={14} /> Assign Doctors
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>

            {/* Mock Assign Doctor Modal */}
            {isAssignModalOpen && (
                <div className="modal-overlay" style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div className="table-card" style={{ width: '400px', padding: '24px' }}>
                        <div className="card-header" style={{ padding: '0 0 16px 0', borderBottom: '1px solid var(--border)', marginBottom: '20px' }}>
                            <h2 className="card-title">Assign Doctors to {selectedHospital?.name}</h2>
                            <button onClick={() => setIsAssignModalOpen(false)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className="input-group" style={{ marginBottom: '20px' }}>
                            <label>Select Doctor</label>
                            <div className="input-wrapper">
                                <UserCheck className="input-icon" size={18} />
                                <select>
                                    <option>Select a doctor...</option>
                                    <option>Dr. John Doe</option>
                                    <option>Dr. Jane Smith</option>
                                    <option>Dr. Alan Grant</option>
                                </select>
                            </div>
                        </div>
                        <button
                            className="btn-primary"
                            style={{ width: '100%' }}
                            onClick={() => {
                                alert(`Doctor assigned to ${selectedHospital?.name}`);
                                setIsAssignModalOpen(false);
                            }}
                        >
                            Confirm Assignment
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HospitalManagement;

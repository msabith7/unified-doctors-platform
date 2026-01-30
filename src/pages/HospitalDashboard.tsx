import { useState } from 'react';
import { LayoutDashboard, Users, UserCheck, Activity, Calendar, BarChart2, Settings, Building2, ScrollText, Ambulance, Clock, CheckCircle } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import StatCard from '../components/StatCard';

const HospitalDashboard = () => {
    const sidebarItems = [
        { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard', path: '/hospital-dashboard' },
        { icon: Ambulance, label: 'Casualty Management', id: 'casualty', path: '#casualty' },
        { icon: Building2, label: 'Department Management', id: 'departments', path: '/admin/hospitals' },
        { icon: UserCheck, label: 'Manage Doctors', id: 'doctors', path: '/admin/doctors' },
        { icon: ScrollText, label: 'Status Logs', id: 'logs', path: '/admin/logs' },
        { icon: Users, label: 'Manage Staff', id: 'users', path: '#' },
        { icon: BarChart2, label: 'Reports', id: 'reports', path: '#' },
        { icon: Settings, label: 'System Settings', id: 'settings', path: '#' },
    ];

    // Mock Data for Existing Dashboard
    const doctorStatus = [
        { id: 1, name: "Dr. Sarah Connor", hospital: "General Ward", status: "Active", lastUpdated: "2 mins ago" },
        { id: 2, name: "Dr. James Wilson", hospital: "Surgery Dept", status: "In Surgery", lastUpdated: "15 mins ago" },
        { id: 3, name: "Dr. Amy Lee", hospital: "Neurology", status: "Active", lastUpdated: "Just Now" },
        { id: 4, name: "Dr. Michael Chen", hospital: "Cardiology", status: "Inactive", lastUpdated: "1 hour ago" },
    ];

    // Mock Data for Casualty Management
    const [casualtyCases, setCasualtyCases] = useState([
        { id: 101, patientName: "Alex Doe", type: "Accident", severity: "Critical", condition: "Severe head trauma, internal bleeding", arrivalTime: "10:15 AM", status: "Pending", assignedDoctor: null },
        { id: 102, patientName: "Sarah Smith", type: "Cardiac", severity: "High", condition: "Acute chest pain, shortness of breath", arrivalTime: "10:30 AM", status: "Pending", assignedDoctor: null },
        { id: 103, patientName: "Unknown Female", type: "Stroke", severity: "High", condition: "Facial drooping, slurred speech", arrivalTime: "10:45 AM", status: "Assigned", assignedDoctor: { id: 3, name: "Dr. Amy Lee" } },
        { id: 104, patientName: "Mike Ross", type: "Trauma", severity: "Moderate", condition: "Fractured tibia, stable", arrivalTime: "11:00 AM", status: "Pending", assignedDoctor: null },
    ]);

    const [availableDoctors, setAvailableDoctors] = useState([
        { id: 1, name: "Dr. Sarah Connor", specialty: "Trauma Surgeon", status: "Active", hospital: "General Ward", workload: 2 },
        { id: 3, name: "Dr. Amy Lee", specialty: "Neurologist", status: "Active", hospital: "Neurology", workload: 1 },
        { id: 5, name: "Dr. Emily Clark", specialty: "Emergency Medicine", status: "Active", hospital: "ER", workload: 0 },
        { id: 6, name: "Dr. Raj Patel", specialty: "Cardiologist", status: "Active", hospital: "Cardiology", workload: 1 },
    ]);

    const [showAssignModal, setShowAssignModal] = useState<number | null>(null);

    const handleAssign = (caseId: number, doctor: any) => {
        setCasualtyCases(cases => cases.map(c =>
            c.id === caseId ? { ...c, status: "Assigned", assignedDoctor: { id: doctor.id, name: doctor.name } } : c
        ));
        setAvailableDoctors(docs => docs.map(d =>
            d.id === doctor.id ? { ...d, workload: d.workload + 1 } : d
        ));
        setShowAssignModal(null);
    };

    const getSeverityColor = (severity: string) => {
        switch (severity.toLowerCase()) {
            case 'critical': return '#dc2626';
            case 'high': return '#ea580c';
            case 'moderate': return '#ca8a04';
            default: return '#16a34a';
        }
    };

    return (
        <div className="app-container">
            <Sidebar items={sidebarItems} activeId="dashboard" />
            <div className="main-wrapper">
                <Header title="Hospital Dashboard" />
                <main className="content">
                    {/* Stats Grid */}
                    <div className="dashboard-grid">
                        <StatCard label="Total Doctors" value="248" icon={UserCheck} color="#2563eb" />
                        <StatCard label="Active Doctors Now" value="142" icon={Activity} color="#10b981" />
                        <StatCard label="Live Causalities" value={casualtyCases.filter(c => c.status !== 'Resolved').length.toString()} icon={Ambulance} color="#dc2626" />
                        <StatCard label="Appointments Today" value="48" icon={Calendar} color="#f59e0b" />
                    </div>

                    {/* Casualty Management Section */}
                    <div id="casualty" className="section-container" style={{ marginTop: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Ambulance color="#dc2626" /> Casualty Management
                            </h2>
                            <button style={{ backgroundColor: '#dc2626', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontWeight: 'bold', cursor: 'pointer' }}>
                                + Add Walk-in Case
                            </button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>

                            {/* Upcoming Cases List */}
                            <div className="table-card" style={{ height: 'fit-content' }}>
                                <div className="card-header">
                                    <h3 className="card-title">Upcoming / Pending Cases</h3>
                                </div>
                                <div style={{ overflowX: 'auto' }}>
                                    <table style={{ minWidth: '100%' }}>
                                        <thead>
                                            <tr>
                                                <th>Time</th>
                                                <th>Patient</th>
                                                <th>Condition</th>
                                                <th>Severity</th>
                                                <th>Assignment</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {casualtyCases.map(c => (
                                                <tr key={c.id}>
                                                    <td style={{ fontWeight: '500', color: '#4b5563' }}><Clock size={16} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> {c.arrivalTime}</td>
                                                    <td>
                                                        <div style={{ fontWeight: 'bold' }}>{c.patientName}</div>
                                                        <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>{c.type}</div>
                                                    </td>
                                                    <td style={{ maxWidth: '200px' }}>
                                                        <div style={{ fontSize: '0.9rem' }}>{c.condition}</div>
                                                    </td>
                                                    <td>
                                                        <span style={{
                                                            backgroundColor: `${getSeverityColor(c.severity)}20`,
                                                            color: getSeverityColor(c.severity),
                                                            padding: '0.25rem 0.5rem',
                                                            borderRadius: '999px',
                                                            fontSize: '0.75rem',
                                                            fontWeight: 'bold',
                                                            border: `1px solid ${getSeverityColor(c.severity)}`
                                                        }}>
                                                            {c.severity}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        {c.assignedDoctor ? (
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#16a34a', fontWeight: '500' }}>
                                                                <CheckCircle size={16} /> {c.assignedDoctor.name}
                                                            </div>
                                                        ) : (
                                                            <span style={{ color: '#dc2626', fontWeight: '500' }}>Unassigned</span>
                                                        )}
                                                    </td>
                                                    <td style={{ position: 'relative' }}>
                                                        {!c.assignedDoctor && (
                                                            <button
                                                                onClick={() => setShowAssignModal(showAssignModal === c.id ? null : c.id)}
                                                                style={{
                                                                    backgroundColor: '#2563eb',
                                                                    color: 'white',
                                                                    border: 'none',
                                                                    padding: '0.5rem 0.75rem',
                                                                    borderRadius: '0.375rem',
                                                                    cursor: 'pointer',
                                                                    fontSize: '0.85rem'
                                                                }}
                                                            >
                                                                Assign Dr.
                                                            </button>
                                                        )}
                                                        {showAssignModal === c.id && (
                                                            <div style={{
                                                                position: 'absolute',
                                                                right: 0,
                                                                top: '100%',
                                                                zIndex: 10,
                                                                backgroundColor: 'white',
                                                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                                                borderRadius: '0.5rem',
                                                                border: '1px solid #e5e7eb',
                                                                width: '280px',
                                                                padding: '0.5rem'
                                                            }}>
                                                                <div style={{ fontSize: '0.85rem', fontWeight: 'bold', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                                                                    Select Doctor
                                                                </div>
                                                                <div style={{ maxHeight: '200px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                                    {availableDoctors.map(doc => (
                                                                        <button
                                                                            key={doc.id}
                                                                            onClick={() => handleAssign(c.id, doc)}
                                                                            style={{
                                                                                textAlign: 'left',
                                                                                padding: '0.5rem',
                                                                                border: '1px solid #f3f4f6',
                                                                                borderRadius: '0.375rem',
                                                                                backgroundColor: '#f9fafb',
                                                                                cursor: 'pointer'
                                                                            }}
                                                                        >
                                                                            <div style={{ fontWeight: '600', color: '#1f2937' }}>{doc.name}</div>
                                                                            <div style={{ fontSize: '0.75rem', color: '#4b5563' }}>{doc.specialty} • {doc.workload} Active Cases</div>
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Available Doctors Side Panel */}
                            <div className="table-card" style={{ height: 'fit-content' }}>
                                <div className="card-header">
                                    <h3 className="card-title">Available Doctors</h3>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '0 1.5rem 1.5rem 1.5rem' }}>
                                    {availableDoctors.map(doc => (
                                        <div key={doc.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}>
                                            <div>
                                                <div style={{ fontWeight: '600', color: '#1f2937' }}>{doc.name}</div>
                                                <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>{doc.specialty}</div>
                                                <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{doc.hospital}</div>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <div style={{
                                                    display: 'inline-block',
                                                    padding: '0.25rem 0.5rem',
                                                    borderRadius: '999px',
                                                    fontSize: '0.7rem',
                                                    fontWeight: '600',
                                                    backgroundColor: '#dcfce7',
                                                    color: '#16a34a'
                                                }}>
                                                    {doc.status}
                                                </div>
                                                <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>LOAD: {doc.workload}</div>
                                            </div>
                                        </div>
                                    ))}
                                    <button style={{ width: '100%', padding: '0.75rem', border: '1px dashed #d1d5db', borderRadius: '0.5rem', color: '#6b7280', cursor: 'pointer', fontSize: '0.9rem' }}>
                                        View All Doctors
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Original Doctor Status Section */}
                    <div className="table-card" style={{ marginTop: '2rem' }}>
                        <div className="card-header">
                            <h2 className="card-title">Live Hospital Staff Status</h2>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Doctor</th>
                                    <th>Department</th>
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

export default HospitalDashboard;

import { Home, Search, Heart, FileText, Settings, Calendar, User, Activity, MapPin, Clock, ClipboardList } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import StatCard from '../components/StatCard';

const PatientDashboard = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [specialization, setSpecialization] = useState('All');
    const [hospital, setHospital] = useState('All');

    const sidebarItems = [
        { icon: Home, label: 'Home', id: 'home', path: '/patient-dashboard' },
        { icon: Search, label: 'Find a Doctor', id: 'find', path: '/patient-dashboard' },
        { icon: Calendar, label: 'My Appointments', id: 'appointments', path: '/my-appointments' },
        { icon: Heart, label: 'My Health', id: 'health', path: '#' },
        { icon: FileText, label: 'Records', id: 'records', path: '/patient-records' },
        { icon: ClipboardList, label: 'Test Reports', id: 'test-reports', path: '/patient-test-reports' },
        { icon: Settings, label: 'Settings', id: 'settings', path: '#' },
    ];

    const upcoming = [
        { id: 1, doctor: "Dr. Sarah Smith", specialty: "Cardiologist", date: "Oct 25, 2023", time: "10:00 AM" },
        { id: 2, doctor: "Dr. James Wilson", specialty: "Neurologist", date: "Oct 28, 2023", time: "02:30 PM" },
    ];

    const doctors = [
        { id: 1, name: "Dr. Sarah Smith", specialty: "Cardiologist", hospital: "City General Hospital", status: "Online", available: true },
        { id: 2, name: "Dr. James Wilson", specialty: "Neurologist", hospital: "Central Medical Center", status: "Offline", available: false },
        { id: 3, name: "Dr. Elena Rodriguez", specialty: "Pediatrician", hospital: "Children's Hospital", status: "Online", available: true },
        { id: 4, name: "Dr. David Chen", specialty: "Dermatologist", hospital: "Skin Care Institute", status: "Online", available: true },
        { id: 5, name: "Dr. Michael Brown", specialty: "Orthopedic", hospital: "City General Hospital", status: "Offline", available: true },
        { id: 6, name: "Dr. Lisa Wong", specialty: "Cardiologist", hospital: "Heart Health Plaza", status: "Online", available: false },
    ];

    const filteredDoctors = doctors.filter(doc => {
        const matchesQuery = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSpecialty = specialization === 'All' || doc.specialty === specialization;
        const matchesHospital = hospital === 'All' || doc.hospital === hospital;
        return matchesQuery && matchesSpecialty && matchesHospital;
    });

    const specializations = ['All', ...new Set(doctors.map(d => d.specialty))];
    const hospitals = ['All', ...new Set(doctors.map(d => d.hospital))];

    const isSearching = searchQuery !== '' || specialization !== 'All' || hospital !== 'All';

    return (
        <div className="app-container">
            <Sidebar items={sidebarItems} activeId="home" />
            <div className="main-wrapper">
                <Header title="Patient Home" />
                <main className="content">
                    <div className="dashboard-grid">
                        <StatCard label="Upcoming" value="2" icon={Calendar} color="#2563eb" />
                        <StatCard label="Health Score" value="92%" icon={Activity} color="#10b981" />
                        <StatCard label="Prescriptions" value="3" icon={FileText} color="#6366f1" />
                        <StatCard label="Doctors Seen" value="12" icon={User} color="#f59e0b" />
                    </div>

                    <div className="search-container">
                        <div className="search-bar-row">
                            <div className="search-input-wrapper">
                                <Search className="search-icon" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search by name or specialization..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="filters-row">
                            <div className="filter-group">
                                <select value={specialization} onChange={(e) => setSpecialization(e.target.value)}>
                                    {specializations.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div className="filter-group">
                                <select value={hospital} onChange={(e) => setHospital(e.target.value)}>
                                    {hospitals.map(h => <option key={h} value={h}>{h}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    {isSearching ? (
                        <div className="search-results">
                            <h2 className="card-title" style={{ marginBottom: '24px' }}>
                                Found {filteredDoctors.length} Doctors
                            </h2>
                            <div className="doctor-results-grid">
                                {filteredDoctors.map(doc => (
                                    <Link to={`/doctor/${doc.id}`} key={doc.id} className="doctor-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <div className="doctor-card-info">
                                            <div className="doctor-main-info">
                                                <h3>{doc.name}</h3>
                                                <div className="live-badge-row" style={{ marginTop: '4px' }}>
                                                    <span className={`live-badge ${doc.status.toLowerCase()}`}>
                                                        <span className={`live-dot ${doc.status.toLowerCase()}`}></span>
                                                        {doc.status}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="doctor-specialty-badge">
                                                <span style={{ fontSize: '0.75rem', padding: '4px 8px', background: 'var(--bg-blue)', borderRadius: '4px', color: 'var(--primary-blue)', fontWeight: '600' }}>
                                                    {doc.specialty}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="doctor-meta">
                                            <div className="meta-item">
                                                <MapPin size={16} />
                                                {doc.hospital}
                                            </div>
                                            <div className="meta-item">
                                                <Clock size={16} />
                                                Available Today
                                            </div>
                                        </div>
                                        <button className="book-btn" disabled={!doc.available}>
                                            {doc.available ? 'Book Appointment' : 'Not Available Today'}
                                        </button>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="table-card">
                            <div className="card-header">
                                <h2 className="card-title">Upcoming Appointments</h2>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Doctor</th>
                                        <th>Specialty</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {upcoming.map(apt => (
                                        <tr key={apt.id}>
                                            <td style={{ fontWeight: '500' }}>{apt.doctor}</td>
                                            <td>{apt.specialty}</td>
                                            <td>{apt.date}</td>
                                            <td>{apt.time}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default PatientDashboard;

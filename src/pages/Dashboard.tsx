import {
    LayoutDashboard,
    Users,
    Calendar,
    Settings,
    Bell,
    Search,
    UserCircle,
    Stethoscope,
    Clock
} from 'lucide-react';

const Sidebar = () => (
    <div className="sidebar">
        <div className="logo-section">
            <Stethoscope size={28} />
            <span>UniDoctor</span>
        </div>
        <nav className="nav-links">
            <div className="nav-item active"><LayoutDashboard size={20} /> Dashboard</div>
            <div className="nav-item"><Users size={20} /> Doctors</div>
            <div className="nav-item"><Calendar size={20} /> Appointments</div>
            <div className="nav-item"><Bell size={20} /> Notifications</div>
            <div className="nav-item"><Settings size={20} /> Settings</div>
        </nav>
    </div>
);

const Header = () => (
    <header className="header">
        <div className="header-title">
            <h1>Unified Doctor Availability System</h1>
        </div>
        <div className="header-actions" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div className="search-bar" style={{ position: 'relative' }}>
                <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                    type="text"
                    placeholder="Search doctors..."
                    style={{
                        padding: '10px 10px 10px 40px',
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0',
                        outline: 'none',
                        fontSize: '14px',
                        width: '250px'
                    }}
                />
            </div>
            <UserCircle size={32} color="#1e293b" style={{ cursor: 'pointer' }} />
        </div>
    </header>
);

const StatCard = ({ label, value, icon: Icon, color }: any) => (
    <div className="stat-card">
        <div className="stat-info">
            <div className="label">{label}</div>
            <div className="value">{value}</div>
        </div>
        <div className="stat-icon" style={{ color: color }}>
            <Icon size={24} />
        </div>
    </div>
);

const Dashboard = () => {
    const doctors = [
        { id: 1, name: "Dr. Sarah Smith", specialty: "Cardiologist", availability: "Available", time: "09:00 AM - 05:00 PM" },
        { id: 2, name: "Dr. James Wilson", specialty: "Neurologist", availability: "Busy", time: "10:30 AM - 04:00 PM" },
        { id: 3, name: "Dr. Elena Rodriguez", specialty: "Pediatrician", availability: "Available", time: "08:00 AM - 06:00 PM" },
        { id: 4, name: "Dr. Micheal Chen", specialty: "Dermatologist", availability: "Available", time: "11:00 AM - 03:00 PM" },
    ];

    return (
        <div className="app-container">
            <Sidebar />
            <div className="main-wrapper">
                <Header />
                <main className="content">
                    <div className="dashboard-grid">
                        <StatCard label="Total Doctors" value="124" icon={Users} color="#2563eb" />
                        <StatCard label="Available Now" value="48" icon={Stethoscope} color="#10b981" />
                        <StatCard label="Appointments Today" value="32" icon={Calendar} color="#f59e0b" />
                        <StatCard label="Avg. Wait Time" value="15 min" icon={Clock} color="#6366f1" />
                    </div>

                    <div className="table-card">
                        <div className="card-header">
                            <h2 className="card-title">Doctor Availability Overview</h2>
                            <button style={{
                                padding: '8px 16px',
                                background: '#2563eb',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontWeight: '500',
                                cursor: 'pointer'
                            }}>View All</button>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Doctor Name</th>
                                    <th>Specialty</th>
                                    <th>Status</th>
                                    <th>Working Hours</th>
                                </tr>
                            </thead>
                            <tbody>
                                {doctors.map(dr => (
                                    <tr key={dr.id}>
                                        <td style={{ fontWeight: '500' }}>{dr.name}</td>
                                        <td>{dr.specialty}</td>
                                        <td>
                                            <span className={`status-badge ${dr.availability.toLowerCase()}`}>
                                                {dr.availability}
                                            </span>
                                        </td>
                                        <td>{dr.time}</td>
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

export default Dashboard;

import {
    LayoutDashboard,
    Calendar,
    Users,
    MessageSquare,
    Settings,
    UserCircle,
    Mail,
    Phone,
    Building2,
    Award,
    Edit3
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const DoctorProfile = () => {
    // Mock data for the doctor profile
    const doctorData = {
        name: "Dr. Sabith Sathar",
        specialization: "General Surgeon",
        experience: "10+ Years",
        email: "sabith.sathar@unidoc.com",
        phone: "+91 98765 43210",
        hospitals: [
            "City General Hospital",
            "Lakeshore Hospital",
            "Sunrise Medical Center"
        ],
        bio: "Specializing in minimally invasive procedures with over a decade of experience in providing high-quality patient care."
    };

    const sidebarItems = [
        { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard', path: '/doctor-dashboard' },
        { icon: Calendar, label: 'Appointments', id: 'appointments', path: '/doctor-appointments' },
        { icon: Users, label: 'Patients', id: 'patients', path: '#' },
        { icon: MessageSquare, label: 'Consultations', id: 'consultations', path: '#' },
        { icon: UserCircle, label: 'Profile', id: 'profile', path: '/doctor-profile' },
        { icon: Settings, label: 'Settings', id: 'settings', path: '#' },
    ];

    return (
        <div className="app-container">
            <Sidebar items={sidebarItems} activeId="profile" />
            <div className="main-wrapper">
                <Header title="My Profile" />
                <main className="content">
                    <div className="profile-card">
                        <div className="profile-section-header">
                            <div className="doctor-profile-identity">
                                <div className="doctor-profile-avatar">
                                    {doctorData.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="doctor-info-text">
                                    <h2>{doctorData.name}</h2>
                                    <span className="doctor-specialty-tag">{doctorData.specialization}</span>
                                </div>
                            </div>
                            <button className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.875rem' }}>
                                <Edit3 size={18} />
                                Edit Profile
                            </button>
                        </div>

                        <div className="profile-details-grid">
                            <div className="profile-info-block">
                                <div className="info-icon-wrapper">
                                    <Award size={22} />
                                </div>
                                <div className="info-content">
                                    <div className="info-label">Experience</div>
                                    <div className="info-value">{doctorData.experience}</div>
                                </div>
                            </div>

                            <div className="profile-info-block">
                                <div className="info-icon-wrapper">
                                    <Mail size={22} />
                                </div>
                                <div className="info-content">
                                    <div className="info-label">Email Address</div>
                                    <div className="info-value">{doctorData.email}</div>
                                </div>
                            </div>

                            <div className="profile-info-block">
                                <div className="info-icon-wrapper">
                                    <Phone size={22} />
                                </div>
                                <div className="info-content">
                                    <div className="info-label">Phone Number</div>
                                    <div className="info-value">{doctorData.phone}</div>
                                </div>
                            </div>

                            <div className="profile-info-block">
                                <div className="info-icon-wrapper">
                                    <Building2 size={22} />
                                </div>
                                <div className="info-content">
                                    <div className="info-label">Affiliated Hospitals</div>
                                    <div className="hospital-list">
                                        {doctorData.hospitals.map((hospital, index) => (
                                            <div key={index} className="hospital-item">
                                                {hospital}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: '32px', paddingTop: '32px', borderTop: '1px solid var(--border)' }}>
                            <div className="info-label" style={{ marginBottom: '12px' }}>Professional Bio</div>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{doctorData.bio}</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DoctorProfile;

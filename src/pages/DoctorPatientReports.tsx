import { Link, useParams } from 'react-router-dom';
import {
    LayoutDashboard,
    Calendar,
    Users,
    MessageSquare,
    Settings,
    UserCircle,
    ClipboardList,
    ArrowLeft,
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const PATIENT_NAMES: Record<string, string> = {
    '1': 'Sarah Jenkins',
    '2': 'Michael Ross',
    '3': 'Emily Blunt',
    '4': 'David Miller',
    '5': 'Jessica Alba',
    '6': 'Tom Hardy',
    '7': 'John Doe',
    '8': 'Jane Smith',
    '9': 'Robert Brown',
};

const DoctorPatientReports = () => {
    const { patientId } = useParams<{ patientId: string }>();
    const patientName = patientId ? PATIENT_NAMES[patientId] ?? `Patient #${patientId}` : 'Unknown';

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
            <Sidebar items={sidebarItems} activeId="patients" />
            <div className="main-wrapper">
                <Header title={`Reports – ${patientName}`} />
                <main className="content">
                    <div className="doctor-patient-detail-page">
                        <Link to="/doctor-patients" className="doctor-patient-back">
                            <ArrowLeft size={18} />
                            Back to Patients
                        </Link>
                        <div className="doctor-patient-detail-card">
                            <ClipboardList size={32} className="doctor-patient-detail-icon" />
                            <h2>Reports for {patientName}</h2>
                            <p className="doctor-patient-detail-message">
                                Lab and diagnostic reports for this patient will appear here.
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DoctorPatientReports;

import { Link } from 'react-router-dom';
import {
    LayoutDashboard,
    Calendar,
    Users,
    MessageSquare,
    Settings,
    UserCircle,
    Clock,
    ClipboardList,
    Pill,
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

interface PatientUnderCare {
    id: number;
    name: string;
    lastVisit: string;
    nextAppointment?: string;
    conditionOrReason?: string;
}

const DoctorPatients = () => {
    const sidebarItems = [
        { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard', path: '/doctor-dashboard' },
        { icon: Calendar, label: 'Appointments', id: 'appointments', path: '/doctor-appointments' },
        { icon: Users, label: 'Patients', id: 'patients', path: '/doctor-patients' },
        { icon: MessageSquare, label: 'Consultations', id: 'consultations', path: '/doctor-consultations' },
        { icon: UserCircle, label: 'Profile', id: 'profile', path: '/doctor-profile' },
        { icon: Settings, label: 'Settings', id: 'settings', path: '#' },
    ];

    const patients: PatientUnderCare[] = [
        { id: 1, name: 'Sarah Jenkins', lastVisit: 'Oct 28, 2023', nextAppointment: 'Nov 5, 2023', conditionOrReason: 'General Checkup' },
        { id: 2, name: 'Michael Ross', lastVisit: 'Oct 27, 2023', nextAppointment: 'Nov 2, 2023', conditionOrReason: 'Follow-up' },
        { id: 3, name: 'Emily Blunt', lastVisit: 'Oct 25, 2023', conditionOrReason: 'Consultation' },
        { id: 4, name: 'David Miller', lastVisit: 'Oct 24, 2023', nextAppointment: 'Oct 31, 2023', conditionOrReason: 'Consultation' },
        { id: 5, name: 'Jessica Alba', lastVisit: 'Oct 23, 2023', conditionOrReason: 'X-Ray Review' },
        { id: 6, name: 'Tom Hardy', lastVisit: 'Oct 22, 2023', nextAppointment: 'Nov 8, 2023', conditionOrReason: 'Post-Op Check' },
        { id: 7, name: 'John Doe', lastVisit: 'Oct 20, 2023', nextAppointment: 'Oct 30, 2023', conditionOrReason: 'Check-up' },
        { id: 8, name: 'Jane Smith', lastVisit: 'Oct 18, 2023', conditionOrReason: 'Follow-up' },
        { id: 9, name: 'Robert Brown', lastVisit: 'Oct 15, 2023', nextAppointment: 'Oct 29, 2023', conditionOrReason: 'Consultation' },
    ];

    return (
        <div className="app-container">
            <Sidebar items={sidebarItems} activeId="patients" />
            <div className="main-wrapper">
                <Header title="My Patients" />
                <main className="content">
                    <div className="doctor-patients-page">
                        <p className="doctor-patients-intro">
                            Patients under your consultation. Use the buttons below to view prescriptions or access reports for each patient.
                        </p>
                        <div className="doctor-patients-list">
                            {patients.map((patient) => (
                                <div key={patient.id} className="doctor-patient-card">
                                    <div className="doctor-patient-card-header">
                                        <div className="patient-info">
                                            <div className="patient-avatar">
                                                {patient.name.split(' ').map((n) => n[0]).join('')}
                                            </div>
                                            <div>
                                                <div className="patient-name">{patient.name}</div>
                                                {patient.conditionOrReason && (
                                                    <div className="doctor-patient-reason">{patient.conditionOrReason}</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="doctor-patient-details">
                                        <div className="doctor-patient-detail-item">
                                            <Clock size={16} className="icon" />
                                            <span>Last visit: {patient.lastVisit}</span>
                                        </div>
                                        {patient.nextAppointment && (
                                            <div className="doctor-patient-detail-item">
                                                <Calendar size={16} className="icon" />
                                                <span>Next: {patient.nextAppointment}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="doctor-patient-actions">
                                        <Link
                                            to={`/doctor-patients/${patient.id}/prescriptions`}
                                            className="btn-doctor-patient btn-prescriptions"
                                        >
                                            <Pill size={18} />
                                            Prescriptions
                                        </Link>
                                        <Link
                                            to={`/doctor-patients/${patient.id}/reports`}
                                            className="btn-doctor-patient btn-reports"
                                        >
                                            <ClipboardList size={18} />
                                            Reports
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DoctorPatients;

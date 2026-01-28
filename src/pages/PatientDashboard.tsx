import { Home, Search, Heart, FileText, Settings, Calendar, User, Activity } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import StatCard from '../components/StatCard';

const PatientDashboard = () => {
    const sidebarItems = [
        { icon: Home, label: 'Home', id: 'home' },
        { icon: Search, label: 'Find a Doctor', id: 'find' },
        { icon: Heart, label: 'My Health', id: 'health' },
        { icon: FileText, label: 'Records', id: 'records' },
        { icon: Settings, label: 'Settings', id: 'settings' },
    ];

    const upcoming = [
        { id: 1, doctor: "Dr. Sarah Smith", specialty: "Cardiologist", date: "Oct 25, 2023", time: "10:00 AM" },
        { id: 2, doctor: "Dr. James Wilson", specialty: "Neurologist", date: "Oct 28, 2023", time: "02:30 PM" },
    ];

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
                </main>
            </div>
        </div>
    );
};

export default PatientDashboard;

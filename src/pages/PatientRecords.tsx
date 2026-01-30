import { Home, Search, Heart, FileText, Settings, Calendar, MapPin, Clock, Stethoscope, Pill } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

interface Medicine {
    name: string;
    dosage?: string;
    duration?: string;
}

interface ConsultationRecord {
    id: number;
    doctorName: string;
    hospitalName: string;
    date: string;
    time: string;
    diseaseDetails: string;
    medicines: Medicine[];
}

const PatientRecords = () => {
    const sidebarItems = [
        { icon: Home, label: 'Home', id: 'home', path: '/patient-dashboard' },
        { icon: Search, label: 'Find a Doctor', id: 'find', path: '/patient-dashboard' },
        { icon: Calendar, label: 'My Appointments', id: 'appointments', path: '/my-appointments' },
        { icon: Heart, label: 'My Health', id: 'health', path: '#' },
        { icon: FileText, label: 'Records', id: 'records', path: '/patient-records' },
        { icon: Settings, label: 'Settings', id: 'settings', path: '#' },
    ];

    const records: ConsultationRecord[] = [
        {
            id: 1,
            doctorName: 'Dr. Sarah Smith',
            hospitalName: 'Heart Center',
            date: 'Oct 20, 2023',
            time: '09:00 AM',
            diseaseDetails: 'Hypertension follow-up. Blood pressure controlled with current medication. Advised low-sodium diet and regular monitoring.',
            medicines: [
                { name: 'Amlodipine', dosage: '5mg', duration: 'Once daily' },
                { name: 'Lisinopril', dosage: '10mg', duration: 'Once daily' },
            ],
        },
        {
            id: 2,
            doctorName: 'Dr. Michael Chen',
            hospitalName: 'Skin & Care Unit',
            date: 'Oct 15, 2023',
            time: '11:45 AM',
            diseaseDetails: 'Dermatitis – contact allergy. Prescribed topical steroid and antihistamine. Avoid identified allergens.',
            medicines: [
                { name: 'Hydrocortisone cream', dosage: '1%', duration: 'Apply twice daily for 7 days' },
                { name: 'Cetirizine', dosage: '10mg', duration: 'Once daily at night' },
            ],
        },
        {
            id: 3,
            doctorName: 'Dr. Elena Rodriguez',
            hospitalName: "Children's Hospital",
            date: 'Oct 10, 2023',
            time: '10:30 AM',
            diseaseDetails: 'Upper respiratory infection. Mild fever and cough. No antibiotics required; symptomatic treatment only.',
            medicines: [
                { name: 'Paracetamol', dosage: '500mg', duration: 'As needed for fever' },
                { name: 'Cough syrup', dosage: '10ml', duration: 'Three times daily for 5 days' },
            ],
        },
        {
            id: 4,
            doctorName: 'Dr. James Wilson',
            hospitalName: 'City General Hospital',
            date: 'Oct 05, 2023',
            time: '02:15 PM',
            diseaseDetails: 'Migraine – recurrent headaches. Neurological exam normal. Prescribed preventive and rescue medication.',
            medicines: [
                { name: 'Sumatriptan', dosage: '50mg', duration: 'At onset of migraine' },
                { name: 'Propranolol', dosage: '40mg', duration: 'Twice daily' },
            ],
        },
    ];

    return (
        <div className="app-container">
            <Sidebar items={sidebarItems} activeId="records" />
            <div className="main-wrapper">
                <Header title="Consultation History" />
                <main className="content">
                    <div className="records-page">
                        {records.length > 0 ? (
                            <div className="records-list">
                                {records.map((record) => (
                                    <div key={record.id} className="record-card">
                                        <div className="record-card-header">
                                            <div className="record-doctor-info">
                                                <div className="patient-avatar">
                                                    {record.doctorName.split(' ').map((n) => n[0]).join('')}
                                                </div>
                                                <div>
                                                    <div className="patient-name">{record.doctorName}</div>
                                                    <div className="record-meta">
                                                        <span className="record-meta-item">
                                                            <MapPin size={14} />
                                                            {record.hospitalName}
                                                        </span>
                                                        <span className="record-meta-item">
                                                            <Calendar size={14} />
                                                            {record.date}
                                                        </span>
                                                        <span className="record-meta-item">
                                                            <Clock size={14} />
                                                            {record.time}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="record-disease">
                                            <Stethoscope size={16} className="record-section-icon" />
                                            <div>
                                                <div className="record-section-label">Diagnosis / Notes</div>
                                                <p className="record-disease-text">{record.diseaseDetails}</p>
                                            </div>
                                        </div>

                                        <div className="record-prescription">
                                            <Pill size={16} className="record-section-icon" />
                                            <div>
                                                <div className="record-section-label">Prescription</div>
                                                <ul className="record-medicines-list">
                                                    {record.medicines.map((med, idx) => (
                                                        <li key={idx} className="record-medicine-item">
                                                            <span className="record-medicine-name">{med.name}</span>
                                                            {(med.dosage || med.duration) && (
                                                                <span className="record-medicine-detail">
                                                                    {[med.dosage, med.duration].filter(Boolean).join(' · ')}
                                                                </span>
                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state">
                                <div className="empty-state-icon">
                                    <FileText size={64} />
                                </div>
                                <h3>No consultation records</h3>
                                <p>Your past consultations and prescriptions will appear here.</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default PatientRecords;

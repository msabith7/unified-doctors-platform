import { useRef } from 'react';
import { Home, Search, Heart, FileText, Settings, Calendar, MapPin, Clock, ClipboardList, TestTube2, Upload } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

interface TestResultItem {
    name: string;
    value: string;
    unit?: string;
    reference?: string;
}

interface TestReport {
    id: number;
    testName: string;
    date: string;
    time: string;
    placeName: string;
    placeAddress?: string;
    labOrFacility: string;
    results: TestResultItem[];
    notes?: string;
}

const PatientTestReports = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files?.length) {
            // Placeholder for future upload logic (e.g. API call)
            console.log('Selected files:', Array.from(files).map((f) => f.name));
        }
        e.target.value = '';
    };

    const sidebarItems = [
        { icon: Home, label: 'Home', id: 'home', path: '/patient-dashboard' },
        { icon: Search, label: 'Find a Doctor', id: 'find', path: '/patient-dashboard' },
        { icon: Calendar, label: 'My Appointments', id: 'appointments', path: '/my-appointments' },
        { icon: Heart, label: 'My Health', id: 'health', path: '#' },
        { icon: FileText, label: 'Records', id: 'records', path: '/patient-records' },
        { icon: ClipboardList, label: 'Test Reports', id: 'test-reports', path: '/patient-test-reports' },
        { icon: Settings, label: 'Settings', id: 'settings', path: '#' },
    ];

    const reports: TestReport[] = [
        {
            id: 1,
            testName: 'Complete Blood Count (CBC)',
            date: 'Oct 22, 2023',
            time: '08:45 AM',
            placeName: 'City General Hospital – Lab',
            placeAddress: 'Central Wing, Ground Floor',
            labOrFacility: 'City General Hospital',
            results: [
                { name: 'Hemoglobin', value: '14.2', unit: 'g/dL', reference: '13.5–17.5' },
                { name: 'WBC Count', value: '7.1', unit: '×10³/µL', reference: '4.5–11.0' },
                { name: 'Platelet Count', value: '245', unit: '×10³/µL', reference: '150–400' },
                { name: 'RBC Count', value: '4.8', unit: '×10⁶/µL', reference: '4.5–5.5' },
            ],
            notes: 'Fasting sample. All parameters within normal range.',
        },
        {
            id: 2,
            testName: 'Lipid Profile',
            date: 'Oct 18, 2023',
            time: '09:30 AM',
            placeName: 'Heart Center – Diagnostic Lab',
            placeAddress: 'Building A, 1st Floor',
            labOrFacility: 'Heart Center',
            results: [
                { name: 'Total Cholesterol', value: '185', unit: 'mg/dL', reference: '< 200' },
                { name: 'LDL Cholesterol', value: '110', unit: 'mg/dL', reference: '< 100' },
                { name: 'HDL Cholesterol', value: '52', unit: 'mg/dL', reference: '> 40' },
                { name: 'Triglycerides', value: '128', unit: 'mg/dL', reference: '< 150' },
            ],
            notes: '12-hour fasting. Follow-up in 6 months advised.',
        },
        {
            id: 3,
            testName: 'Thyroid Function (TSH, T3, T4)',
            date: 'Oct 12, 2023',
            time: '10:15 AM',
            placeName: 'Central Medical Center – Pathology',
            labOrFacility: 'Central Medical Center',
            results: [
                { name: 'TSH', value: '2.4', unit: 'mIU/L', reference: '0.4–4.0' },
                { name: 'Free T3', value: '3.1', unit: 'pg/mL', reference: '2.3–4.2' },
                { name: 'Free T4', value: '1.2', unit: 'ng/dL', reference: '0.8–1.8' },
            ],
            notes: 'Thyroid function normal.',
        },
        {
            id: 4,
            testName: 'Blood Glucose (Fasting)',
            date: 'Oct 08, 2023',
            time: '07:00 AM',
            placeName: 'Skin & Care Unit – Lab',
            labOrFacility: 'Skin & Care Unit',
            results: [
                { name: 'Fasting Blood Glucose', value: '92', unit: 'mg/dL', reference: '70–100' },
            ],
            notes: '8-hour fasting. Within normal limits.',
        },
    ];

    return (
        <div className="app-container">
            <Sidebar items={sidebarItems} activeId="test-reports" />
            <div className="main-wrapper">
                <Header title="Test Reports" />
                <main className="content">
                    <div className="test-reports-page">
                        <div className="test-reports-header">
                            <p className="test-reports-intro">
                                Previews and recent test reports. Date, time, and place where each result was generated are shown below.
                            </p>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".pdf,image/*"
                                multiple
                                onChange={handleFileChange}
                                className="test-reports-file-input"
                                aria-label="Upload test reports"
                            />
                            <button type="button" className="btn-upload-reports" onClick={handleUploadClick}>
                                <Upload size={18} />
                                Upload Reports
                            </button>
                        </div>
                        {reports.length > 0 ? (
                            <div className="test-reports-list">
                                {reports.map((report) => (
                                    <div key={report.id} className="test-report-card">
                                        <div className="test-report-header">
                                            <div className="test-report-title-row">
                                                <TestTube2 size={20} className="test-report-icon" />
                                                <h3 className="test-report-name">{report.testName}</h3>
                                            </div>
                                            <div className="test-report-meta">
                                                <span className="test-report-meta-item">
                                                    <Calendar size={14} />
                                                    {report.date}
                                                </span>
                                                <span className="test-report-meta-item">
                                                    <Clock size={14} />
                                                    {report.time}
                                                </span>
                                                <span className="test-report-meta-item">
                                                    <MapPin size={14} />
                                                    {report.placeName}
                                                </span>
                                            </div>
                                            {report.placeAddress && (
                                                <div className="test-report-place-detail">{report.placeAddress}</div>
                                            )}
                                            <div className="test-report-facility">Generated at: {report.labOrFacility}</div>
                                        </div>

                                        <div className="test-report-results">
                                            <div className="test-report-results-label">
                                                <ClipboardList size={16} />
                                                Results
                                            </div>
                                            <table className="test-results-table">
                                                <thead>
                                                    <tr>
                                                        <th>Parameter</th>
                                                        <th>Value</th>
                                                        <th>Reference</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {report.results.map((row, idx) => (
                                                        <tr key={idx}>
                                                            <td>{row.name}</td>
                                                            <td>
                                                                <strong>{row.value}</strong>
                                                                {row.unit && <span className="test-result-unit"> {row.unit}</span>}
                                                            </td>
                                                            <td className="test-result-ref">{row.reference ?? '–'}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        {report.notes && (
                                            <div className="test-report-notes">{report.notes}</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state">
                                <div className="empty-state-icon">
                                    <ClipboardList size={64} />
                                </div>
                                <h3>No test reports yet</h3>
                                <p>Your lab and diagnostic test reports will appear here.</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default PatientTestReports;

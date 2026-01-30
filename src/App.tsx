import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import DoctorDashboard from './pages/DoctorDashboard';
import DoctorAppointments from './pages/DoctorAppointments';
import DoctorProfile from './pages/DoctorProfile';
import ConsultationLog from './pages/ConsultationLog';
import PatientDashboard from './pages/PatientDashboard';
import HospitalDashboard from './pages/HospitalDashboard';
import HospitalManagement from './pages/HospitalManagement';
import DoctorManagement from './pages/DoctorManagement';
import StatusLogs from './pages/StatusLogs';
import DoctorDetails from './pages/DoctorDetails';
import BookAppointment from './pages/BookAppointment';
import MyAppointments from './pages/MyAppointments';
import PatientRecords from './pages/PatientRecords';
import PatientTestReports from './pages/PatientTestReports';
import CasualtyDashboard from './pages/CasualtyDashboard';
import EmergencyCaseEntry from './pages/EmergencyCaseEntry';
import TransportAssistance from './pages/TransportAssistance';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor-appointments" element={<DoctorAppointments />} />
        <Route path="/doctor-profile" element={<DoctorProfile />} />
        <Route path="/doctor-consultations" element={<ConsultationLog />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/doctor/:id" element={<DoctorDetails />} />
        <Route path="/book-appointment/:id" element={<BookAppointment />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/patient-records" element={<PatientRecords />} />
        <Route path="/patient-test-reports" element={<PatientTestReports />} />
        <Route path="/hospital-dashboard" element={<HospitalDashboard />} />
        <Route path="/admin/hospitals" element={<HospitalManagement />} />
        <Route path="/admin/doctors" element={<DoctorManagement />} />
        <Route path="/admin/logs" element={<StatusLogs />} />
        <Route path="/casualty-dashboard" element={<CasualtyDashboard />} />
        <Route path="/emergency-case-entry" element={<EmergencyCaseEntry />} />
        <Route path="/transport-assistance" element={<TransportAssistance />} />
        {/* Redirect root to login for now */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

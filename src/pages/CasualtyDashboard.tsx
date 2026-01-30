import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Phone, Activity, AlertCircle, Ambulance, HeartPulse, Navigation } from 'lucide-react';

const CasualtyDashboard = () => {
    const navigate = useNavigate();
    const [casualtyType, setCasualtyType] = useState('Accident');
    const [searchQuery, setSearchQuery] = useState('');

    // Mock data for hospitals
    const hospitals = [
        {
            id: 1,
            name: "City General Hospital",
            distance: "1.2 km",
            icuStatus: "Available",
            icuCount: 3,
            traumaLevel: "Level 1",
            doctors: [
                { name: "Dr. Smith", specialty: "Trauma Surgeon", availability: "On Site" },
                { name: "Dr. Johnson", specialty: "Anesthesiologist", availability: "On Call" }
            ],
            phone: "+1 555-0123"
        },
        {
            id: 2,
            name: "St. Mary's Medical Center",
            distance: "3.5 km",
            icuStatus: "Full",
            icuCount: 0,
            traumaLevel: "Level 2",
            doctors: [
                { name: "Dr. Lee", specialty: "Emergency Medicine", availability: "On Site" }
            ],
            phone: "+1 555-0124"
        },
        {
            id: 3,
            name: "Westside Emergency Clinic",
            distance: "4.0 km",
            icuStatus: "Limited",
            icuCount: 1,
            traumaLevel: "Level 3",
            doctors: [
                { name: "Dr. Davis", specialty: "General Surgeon", availability: "Busy" }
            ],
            phone: "+1 555-0125"
        }
    ];

    const casualtyTypes = [
        { id: 'Accident', label: 'Accident', icon: <Ambulance size={24} /> },
        { id: 'Cardiac', label: 'Cardiac', icon: <HeartPulse size={24} /> },
        { id: 'Stroke', label: 'Stroke', icon: <Activity size={24} /> },
        { id: 'Trauma', label: 'Trauma', icon: <AlertCircle size={24} /> },
    ];

    return (
        <div className="casualty-container" style={{ minHeight: '100vh', backgroundColor: '#fdf2f2' }}>
            {/* Header */}
            <header style={{ backgroundColor: '#dc2626', color: 'white', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Ambulance size={32} />
                    <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>Emergency Response</h1>
                </div>
                <button onClick={() => navigate('/login')} style={{ backgroundColor: 'white', color: '#dc2626', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontWeight: 'bold', cursor: 'pointer' }}>
                    Exit Mode
                </button>
            </header>

            <main style={{ padding: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>

                {/* Emergency Actions */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                    <button
                        onClick={() => navigate('/emergency-case-entry')}
                        className="emergency-btn-large"
                        style={{
                            backgroundColor: '#fee2e2',
                            border: '2px solid #dc2626',
                            borderRadius: '1rem',
                            padding: '1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '1rem',
                            cursor: 'pointer',
                            fontSize: '1.25rem',
                            fontWeight: 'bold',
                            color: '#991b1b',
                            transition: 'transform 0.1s'
                        }}
                    >
                        <AlertCircle size={32} color="#dc2626" />
                        NEW EMERGENCY CASE ENTRY
                    </button>

                    <div style={{ position: 'relative' }}>
                        <Search size={24} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#991b1b' }} />
                        <input
                            type="text"
                            placeholder="Search Hospital..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '1.5rem 1rem 1.5rem 3.5rem',
                                borderRadius: '1rem',
                                border: '1px solid #fecaca',
                                fontSize: '1.25rem',
                                outline: 'none',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                            }}
                        />
                    </div>
                </div>

                {/* Casualty Type Selector */}
                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.25rem', color: '#7f1d1d', marginBottom: '1rem' }}>Select Casualty Type</h2>
                    <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                        {casualtyTypes.map((type) => (
                            <button
                                key={type.id}
                                onClick={() => setCasualtyType(type.id)}
                                style={{
                                    flex: '1',
                                    minWidth: '120px',
                                    padding: '1rem',
                                    borderRadius: '0.75rem',
                                    border: casualtyType === type.id ? '2px solid #dc2626' : '1px solid #e5e7eb',
                                    backgroundColor: casualtyType === type.id ? '#fecaca' : 'white',
                                    color: casualtyType === type.id ? '#7f1d1d' : '#4b5563',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    cursor: 'pointer',
                                    fontWeight: '600'
                                }}
                            >
                                {type.icon}
                                {type.label}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Nearby Hospitals */}
                <section>
                    <h2 style={{ fontSize: '1.25rem', color: '#7f1d1d', marginBottom: '1rem' }}>Nearby Hospitals & Status</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                        {hospitals.filter(h => h.name.toLowerCase().includes(searchQuery.toLowerCase())).map((hospital) => (
                            <div key={hospital.id} style={{ backgroundColor: 'white', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', borderLeft: `6px solid ${hospital.icuStatus === 'Available' ? '#16a34a' : hospital.icuStatus === 'Limited' ? '#ca8a04' : '#dc2626'}` }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#1f2937' }}>{hospital.name}</h3>
                                    <span style={{ backgroundColor: '#f3f4f6', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.875rem', fontWeight: '600', color: '#4b5563' }}>{hospital.distance}</span>
                                </div>

                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                    <div style={{ flex: 1, backgroundColor: '#eff6ff', padding: '0.75rem', borderRadius: '0.5rem' }}>
                                        <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--primary)' }}>ICU Beds</p>
                                        <p style={{ margin: 0, fontSize: '1.125rem', fontWeight: 'bold', color: '#1e3a8a' }}>{hospital.icuCount}</p>
                                    </div>
                                    <div style={{ flex: 1, backgroundColor: '#fff7ed', padding: '0.75rem', borderRadius: '0.5rem' }}>
                                        <p style={{ margin: 0, fontSize: '0.75rem', color: '#9a3412' }}>Level</p>
                                        <p style={{ margin: 0, fontSize: '1.125rem', fontWeight: 'bold', color: '#7c2d12' }}>{hospital.traumaLevel}</p>
                                    </div>
                                </div>

                                <div style={{ marginBottom: '1rem' }}>
                                    <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#4b5563', marginBottom: '0.5rem' }}>Available Doctors:</p>
                                    {hospital.doctors.map((doc, idx) => (
                                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                                            <span style={{ color: '#374151' }}>{doc.name} <span style={{ color: '#6b7280', fontSize: '0.75rem' }}>({doc.specialty})</span></span>
                                            <span style={{ color: doc.availability === 'On Site' ? '#16a34a' : '#ca8a04', fontWeight: '500' }}>{doc.availability}</span>
                                        </div>
                                    ))}
                                </div>

                                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                    <button style={{ flex: 1, backgroundColor: '#dc2626', color: 'white', padding: '0.75rem', borderRadius: '0.75rem', border: 'none', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                        <Phone size={18} />
                                        Call
                                    </button>
                                    <button
                                        onClick={() => navigate('/transport-assistance', { state: { hospital, casualtyType } })}
                                        style={{ flex: 2, backgroundColor: 'var(--primary)', color: 'white', padding: '0.75rem', borderRadius: '0.75rem', border: 'none', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                                    >
                                        <Navigation size={18} />
                                        Navigate & Assist
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default CasualtyDashboard;

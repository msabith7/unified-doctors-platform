import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Navigation, AlertTriangle, ShieldCheck, Clock, MapPin, CheckCircle, Activity, HeartPulse, Ambulance } from 'lucide-react';

const TransportAssistance = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { hospital, casualtyType } = location.state || {
        hospital: { name: "City General Hospital", distance: "1.2 km" },
        casualtyType: "Accident"
    };

    const firstAidTips: any = {
        'Accident': [
            "Check for severe bleeding and apply pressure if found.",
            "Do NOT move the patient unless immediate danger exists (fire, etc.).",
            "Keep the patient warm and talk to them to maintain consciousness.",
            "Immobilize any suspected broken limbs with splints if possible."
        ],
        'Cardiac': [
            "Have the patient sit down and rest immediately.",
            "Loosen tight clothing around the neck and chest.",
            "If unconscious and not breathing, start CPR immediately.",
            "Ask if they have prescribed heart medication (like nitroglycerin) and assist them."
        ],
        'Stroke': [
            "Remember FAST: Face dropping, Arm weakness, Speech difficulty, Time to call.",
            "Keep the patient in a comfortable position, lying on their side.",
            "Do NOT give them food or water.",
            "Monitor breathing and be ready to perform CPR if necessary."
        ],
        'Trauma': [
            "Control any external bleeding with direct pressure.",
            "Keep the patient lying still to prevent spinal injury.",
            "Cover with a blanket to prevent shock.",
            "Reassure the patient and keep them calm."
        ]
    };

    const selectedTips = firstAidTips[casualtyType] || firstAidTips['Accident'];

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#fdf2f2', paddingBottom: '2rem' }}>
            <header style={{ backgroundColor: '#dc2626', color: 'white', padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                <button onClick={() => navigate(-1)} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>
                    <ArrowLeft size={28} />
                </button>
                <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold' }}>Transport Assistance</h1>
            </header>

            <main style={{ padding: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>

                {/* Destination Header */}
                <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '1.5rem', borderLeft: '6px solid #dc2626' }}>
                    <p style={{ color: '#6b7280', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>DESTINATION</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#1f2937' }}>{hospital.name}</h2>
                            <p style={{ margin: '0.5rem 0 0', color: '#dc2626', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <MapPin size={18} /> {hospital.distance} away
                            </p>
                        </div>
                        <div style={{ backgroundColor: '#fee2e2', padding: '0.5rem 1rem', borderRadius: '0.5rem', color: '#991b1b', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Clock size={18} />
                            ~12 mins
                        </div>
                    </div>
                </div>

                {/* Route Suggestion */}
                <section style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.25rem', color: '#7f1d1d', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Navigation size={24} /> Recommended Route via Main St.
                    </h3>
                    <div style={{ backgroundColor: '#ecfdf5', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #10b981' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                            <ShieldCheck size={32} color="#059669" />
                            <div>
                                <h4 style={{ margin: 0, color: '#065f46', fontSize: '1.1rem' }}>Safest Route Selected</h4>
                                <p style={{ margin: '0.5rem 0 0', color: '#047857', lineHeight: '1.5' }}>
                                    This route avoids heavy congestion on 5th Avenue and has smoother road surfaces, minimalizing vibration for the patient.
                                </p>
                            </div>
                        </div>
                        <button style={{ width: '100%', backgroundColor: '#059669', color: 'white', padding: '1rem', borderRadius: '0.5rem', border: 'none', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                            <Navigation size={20} /> Start GPS Navigation
                        </button>
                    </div>
                </section>

                {/* Patient Safety & First Aid */}
                <section>
                    <h3 style={{ fontSize: '1.25rem', color: '#7f1d1d', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <HeartPulse size={24} /> Critical Care Instructions: <span style={{ textDecoration: 'underline' }}>{casualtyType}</span>
                    </h3>

                    <div style={{ backgroundColor: 'white', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                        <div style={{ backgroundColor: '#fff7ed', padding: '1rem', borderBottom: '1px solid #fed7aa', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <AlertTriangle size={20} color="#c2410c" />
                            <span style={{ color: '#9a3412', fontWeight: 'bold' }}>For Bystanders / Transporters</span>
                        </div>
                        <div style={{ padding: '1.5rem' }}>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {selectedTips.map((tip: string, index: number) => (
                                    <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                        <CheckCircle size={20} color="#16a34a" style={{ flexShrink: 0, marginTop: '2px' }} />
                                        <span style={{ color: '#374151', fontSize: '1.05rem', lineHeight: '1.5' }}>{tip}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div style={{ backgroundColor: '#fef2f2', padding: '1rem', textAlign: 'center', borderTop: '1px solid #fecaca' }}>
                            <p style={{ margin: 0, color: '#dc2626', fontWeight: 'bold', fontSize: '0.9rem' }}>
                                <Activity size={16} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                                Monitor Vitals continuously until handover.
                            </p>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
};

export default TransportAssistance;

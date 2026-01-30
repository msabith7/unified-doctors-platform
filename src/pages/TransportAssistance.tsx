import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Navigation, AlertTriangle, ShieldCheck, Clock, MapPin, CheckCircle, Activity, HeartPulse, Maximize2, Minimize2 } from 'lucide-react';

const TransportAssistance = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { hospital, casualtyType } = location.state || {
        hospital: { name: "City General Hospital", distance: "1.2 km" },
        casualtyType: "Accident"
    };

    const [isFullScreenMap, setIsFullScreenMap] = useState(false);

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
        <>
            {/* Inline CSS for animations */}
            <style>
                {`
                    @keyframes pulse {
                        0%, 100% { transform: scale(1); opacity: 1; }
                        50% { transform: scale(1.1); opacity: 0.8; }
                    }
                    @keyframes blink {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.3; }
                    }
                `}
            </style>

            {/* Fullscreen Map Modal */}
            {isFullScreenMap && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.95)',
                    zIndex: 9999,
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    {/* Fullscreen Header */}
                    <div style={{ backgroundColor: '#059669', color: 'white', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Navigation size={28} />
                            <div>
                                <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Live Navigation</h2>
                                <p style={{ margin: 0, fontSize: '0.875rem', opacity: 0.9 }}>to {hospital.name}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsFullScreenMap(false)}
                            style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                color: 'white',
                                borderRadius: '0.5rem',
                                padding: '0.5rem 1rem',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <Minimize2 size={18} /> Exit Fullscreen
                        </button>
                    </div>

                    {/* Fullscreen Map */}
                    <div style={{ flex: 1, position: 'relative', background: 'linear-gradient(180deg, #d1fae5 0%, #a7f3d0 100%)' }}>
                        {/* Start Point */}
                        <div style={{ position: 'absolute', bottom: '20%', left: '15%', width: '24px', height: '24px', backgroundColor: '#059669', borderRadius: '50%', border: '4px solid white', boxShadow: '0 4px 8px rgba(0,0,0,0.3)' }}></div>

                        {/* End Point */}
                        <div style={{ position: 'absolute', top: '15%', right: '20%', width: '32px', height: '32px', backgroundColor: '#dc2626', borderRadius: '50%', border: '5px solid white', boxShadow: '0 4px 12px rgba(0,0,0,0.4)', animation: 'pulse 2s infinite' }}></div>

                        {/* Route Path (SVG) */}
                        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} viewBox="0 0 400 200" preserveAspectRatio="none">
                            <path
                                d="M 60 160 Q 100 120, 150 100 T 320 30"
                                fill="none"
                                stroke="#059669"
                                strokeWidth="8"
                                strokeLinecap="round"
                                strokeDasharray="12,6"
                            />
                        </svg>

                        {/* LIVE Badge */}
                        <div style={{
                            position: 'absolute',
                            top: '20px',
                            left: '20px',
                            backgroundColor: '#dc2626',
                            color: 'white',
                            padding: '0.75rem 1.25rem',
                            borderRadius: '0.75rem',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
                        }}>
                            <div style={{ width: '10px', height: '10px', backgroundColor: '#fff', borderRadius: '50%', animation: 'blink 1s infinite' }}></div>
                            LIVE NAVIGATION
                        </div>

                        {/* Distance/Time Overlay */}
                        <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'rgba(255, 255, 255, 0.95)', padding: '1rem 2rem', borderRadius: '999px', fontSize: '1.25rem', fontWeight: 'bold', color: '#065f46', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
                            {hospital.distance} • ~12 mins
                        </div>
                    </div>

                    {/* Fullscreen Footer Controls */}
                    <div style={{ backgroundColor: '#065f46', color: 'white', padding: '1rem', display: 'flex', gap: '1rem' }}>
                        <button style={{ flex: 1, backgroundColor: '#059669', color: 'white', padding: '1rem', borderRadius: '0.5rem', border: 'none', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>
                            Recalculate Route
                        </button>
                        <button style={{ flex: 2, backgroundColor: '#dc2626', color: 'white', padding: '1rem', borderRadius: '0.5rem', border: 'none', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                            <AlertTriangle size={20} /> Report Issue
                        </button>
                    </div>
                </div>
            )}

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

                    {/* Live Map Preview */}
                    <section style={{ marginBottom: '2rem' }}>
                        <div style={{ backgroundColor: '#ecfdf5', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #10b981', position: 'relative' }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                                <ShieldCheck size={32} color="#059669" />
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ margin: 0, color: '#065f46', fontSize: '1.1rem' }}>Safest Route Selected</h4>
                                    <p style={{ margin: '0.5rem 0 0', color: '#047857', lineHeight: '1.5' }}>
                                        This route avoids heavy congestion on 5th Avenue and has smoother road surfaces, minimizing vibration for the patient.
                                    </p>
                                </div>
                            </div>

                            {/* Mini Map Container */}
                            <div style={{
                                position: 'relative',
                                backgroundColor: '#d1fae5',
                                borderRadius: '0.75rem',
                                overflow: 'hidden',
                                marginBottom: '1rem',
                                border: '2px solid #34d399'
                            }}>
                                {/* Map Canvas */}
                                <div style={{ height: '200px', position: 'relative', background: 'linear-gradient(180deg, #d1fae5 0%, #a7f3d0 100%)' }}>
                                    {/* Start Point */}
                                    <div style={{ position: 'absolute', bottom: '20%', left: '15%', width: '12px', height: '12px', backgroundColor: '#059669', borderRadius: '50%', border: '2px solid white', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}></div>

                                    {/* End Point */}
                                    <div style={{ position: 'absolute', top: '15%', right: '20%', width: '16px', height: '16px', backgroundColor: '#dc2626', borderRadius: '50%', border: '3px solid white', boxShadow: '0 2px 6px rgba(0,0,0,0.3)', animation: 'pulse 2s infinite' }}></div>

                                    {/* Route Path (SVG) */}
                                    <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} viewBox="0 0 400 200">
                                        <path
                                            d="M 60 160 Q 100 120, 150 100 T 320 30"
                                            fill="none"
                                            stroke="#059669"
                                            strokeWidth="4"
                                            strokeLinecap="round"
                                            strokeDasharray="8,4"
                                        />
                                    </svg>

                                    {/* LIVE Preview Badge */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '10px',
                                        left: '10px',
                                        backgroundColor: '#dc2626',
                                        color: 'white',
                                        padding: '0.4rem 0.8rem',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.3rem',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                    }}>
                                        <div style={{ width: '6px', height: '6px', backgroundColor: '#fff', borderRadius: '50%', animation: 'blink 1s infinite' }}></div>
                                        LIVE PREVIEW
                                    </div>

                                    {/* Fullscreen Toggle Button */}
                                    <button
                                        onClick={() => setIsFullScreenMap(!isFullScreenMap)}
                                        style={{
                                            position: 'absolute',
                                            top: '10px',
                                            right: '10px',
                                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                            border: '1px solid #d1d5db',
                                            borderRadius: '0.5rem',
                                            padding: '0.5rem',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                            transition: 'all 0.2s'
                                        }}
                                        title="Toggle Fullscreen"
                                    >
                                        {isFullScreenMap ? <Minimize2 size={18} color="#059669" /> : <Maximize2 size={18} color="#059669" />}
                                    </button>

                                    {/* Distance/Time Overlay */}
                                    <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'rgba(255, 255, 255, 0.95)', padding: '0.5rem 1rem', borderRadius: '999px', fontSize: '0.875rem', fontWeight: 'bold', color: '#065f46', boxShadow: '0 2px 4px rgba(0,0,0,0.15)' }}>
                                        {hospital.distance} • ~12 mins
                                    </div>
                                </div>
                            </div>

                            <button style={{ width: '100%', backgroundColor: '#059669', color: 'white', padding: '1rem', borderRadius: '0.5rem', border: 'none', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 6px rgba(5, 150, 105, 0.3)' }}>
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
        </>
    );
};

export default TransportAssistance;

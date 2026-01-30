import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Mic, AlertTriangle } from 'lucide-react';

const EmergencyCaseEntry = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        patientName: '',
        age: '',
        gender: '',
        condition: '', // Critical, Stable, etc.
        notes: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would submit to backend.
        // For now, simulate success and go back.
        alert("Emergency Case Broadcasted to Nearby Hospitals!");
        navigate('/casualty-dashboard');
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#fdf2f2', padding: '1rem' }}>
            <header style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626' }}
                >
                    <ArrowLeft size={32} />
                </button>
                <h1 style={{ marginLeft: '1rem', color: '#991b1b', fontSize: '1.75rem' }}>Emergency Case Entry</h1>
            </header>

            <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                <div style={{ backgroundColor: '#fee2e2', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #f87171', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <AlertTriangle size={32} color="#dc2626" />
                    <p style={{ margin: 0, color: '#b91c1c', fontWeight: '500' }}>For accurate hospital matching, please provide as much detail as possible quickly.</p>
                </div>

                <div>
                    <label style={{ display: 'block', color: '#7f1d1d', fontWeight: 'bold', marginBottom: '0.5rem' }}>Patient Name / ID</label>
                    <input
                        type="text"
                        placeholder="Enter Name or 'Unknown'"
                        value={formData.patientName}
                        onChange={e => setFormData({ ...formData, patientName: e.target.value })}
                        style={{ width: '100%', padding: '1rem', fontSize: '1.25rem', borderRadius: '0.75rem', border: '1px solid #d1d5db' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', color: '#7f1d1d', fontWeight: 'bold', marginBottom: '0.5rem' }}>Approx Age</label>
                        <input
                            type="number"
                            placeholder="Age"
                            value={formData.age}
                            onChange={e => setFormData({ ...formData, age: e.target.value })}
                            style={{ width: '100%', padding: '1rem', fontSize: '1.25rem', borderRadius: '0.75rem', border: '1px solid #d1d5db' }}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', color: '#7f1d1d', fontWeight: 'bold', marginBottom: '0.5rem' }}>Gender</label>
                        <select
                            value={formData.gender}
                            onChange={e => setFormData({ ...formData, gender: e.target.value })}
                            style={{ width: '100%', padding: '1rem', fontSize: '1.25rem', borderRadius: '0.75rem', border: '1px solid #d1d5db', backgroundColor: 'white' }}
                        >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label style={{ display: 'block', color: '#7f1d1d', fontWeight: 'bold', marginBottom: '0.5rem' }}>Condition / Vitals</label>
                    <textarea
                        rows={4}
                        placeholder="Describe injuries, vitals (BP, Pulse), consciousness level..."
                        value={formData.notes}
                        onChange={e => setFormData({ ...formData, notes: e.target.value })}
                        style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', borderRadius: '0.75rem', border: '1px solid #d1d5db' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button
                        type="button"
                        style={{ flex: 1, padding: '1.25rem', borderRadius: '0.75rem', border: '2px solid #dc2626', background: 'transparent', color: '#dc2626', fontWeight: 'bold', fontSize: '1.1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
                    >
                        <Mic size={24} />
                        Voice Note
                    </button>
                    <button
                        type="submit"
                        style={{ flex: 2, padding: '1.25rem', borderRadius: '0.75rem', border: 'none', backgroundColor: '#dc2626', color: 'white', fontWeight: 'bold', fontSize: '1.25rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 6px rgba(220, 38, 38, 0.4)' }}
                    >
                        <Save size={24} />
                        Broadcast Alert
                    </button>
                </div>

            </form>
        </div>
    );
};

export default EmergencyCaseEntry;

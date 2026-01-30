import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Stethoscope, Mail, Lock, ArrowRight, User, ShieldCheck, HeartPulse, Ambulance, AlertTriangle } from 'lucide-react';

const Login = () => {
    const [role, setRole] = useState('Patient');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Role-based redirection logic
        if (role === 'Doctor') {
            navigate('/doctor-dashboard');
        } else if (role === 'Admin') {
            navigate('/hospital-dashboard');
        } else {
            navigate('/patient-dashboard');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card glass">
                <div className="auth-header">
                    <div className="auth-logo">
                        <Stethoscope size={40} className="primary-icon" />
                        <h1>UniDoctor</h1>
                    </div>
                    <p className="auth-subtitle">Unified Doctor Availability System</p>
                </div>

                <div className="role-selector">
                    <button
                        type="button"
                        className={`role-tab ${role === 'Patient' ? 'active' : ''}`}
                        onClick={() => setRole('Patient')}
                    >
                        <HeartPulse size={18} />
                        Patient
                    </button>
                    <button
                        type="button"
                        className={`role-tab ${role === 'Doctor' ? 'active' : ''}`}
                        onClick={() => setRole('Doctor')}
                    >
                        <ShieldCheck size={18} />
                        Doctor
                    </button>
                    <button
                        type="button"
                        className={`role-tab ${role === 'Admin' ? 'active' : ''}`}
                        onClick={() => setRole('Admin')}
                    >
                        <User size={18} />
                        Admin
                    </button>
                    <button
                        type="button"
                        className={`role-tab ${role === 'Casualty' ? 'active' : ''}`}
                        onClick={() => setRole('Casualty')}
                    >
                        <Ambulance size={18} />
                        Casualty
                    </button>
                </div>

                {role === 'Casualty' ? (
                    <div className="casualty-login-section" style={{ padding: '1rem 0', textAlign: 'center' }}>
                        <div style={{ backgroundColor: '#fef2f2', padding: '1.5rem', borderRadius: '1rem', marginBottom: '2rem', border: '1px solid #fecaca' }}>
                            <AlertTriangle size={48} color="#dc2626" style={{ marginBottom: '1rem' }} />
                            <h3 style={{ color: '#b91c1c', marginBottom: '0.5rem' }}>Emergency Mode</h3>
                            <p style={{ color: '#7f1d1d', fontSize: '0.95rem', lineHeight: '1.5' }}>
                                Direct access for Ambulance Drivers and Paramedics. No login credential required.
                            </p>
                        </div>
                        <button
                            type="button"
                            className="btn-primary full-width"
                            style={{
                                backgroundColor: '#dc2626',
                                border: 'none',
                                padding: '1rem',
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                boxShadow: '0 4px 14px 0 rgba(220, 38, 38, 0.39)'
                            }}
                            onClick={() => navigate('/casualty-dashboard')}
                        >
                            <Ambulance size={24} style={{ marginRight: '0.5rem' }} />
                            ENTER EMERGENCY DASHBOARD
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleLogin} className="auth-form">
                        <div className="input-group">
                            <label>Email or Phone</label>
                            <div className="input-wrapper">
                                <Mail size={20} className="input-icon" />
                                <input
                                    type="text"
                                    placeholder="Enter your email or phone"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label>Password</label>
                            <div className="input-wrapper">
                                <Lock size={20} className="input-icon" />
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="auth-actions">
                            <label className="checkbox-container">
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                                Remember me
                            </label>
                            <a href="#" className="forgot-link">Forgot password?</a>
                        </div>

                        <button type="submit" className="btn-primary full-width">
                            Login <ArrowRight size={20} />
                        </button>
                    </form>
                )}

                <div className="auth-footer">
                    <p>Don't have an account? <Link to="/register">Register here</Link></p>
                </div>
            </div>

            <div className="auth-visual">
                <div className="visual-content">
                    <h2>Streamline Your Healthcare Experience</h2>
                    <p>Connect with top medical professionals and manage your health journey efficiently.</p>
                    <div className="visual-stats">
                        <div className="visual-stat">
                            <span>500+</span>
                            <p>Verified Doctors</p>
                        </div>
                        <div className="visual-stat">
                            <span>10k+</span>
                            <p>Happy Patients</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

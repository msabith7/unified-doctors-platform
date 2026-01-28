import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Stethoscope, Mail, Lock, Phone, User, ShieldCheck, HeartPulse, Building2, BadgeCheck, Activity, ArrowLeft } from 'lucide-react';

const Register = () => {
    const [role, setRole] = useState<'Patient' | 'Doctor'>('Patient');
    const navigate = useNavigate();

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/dashboard');
    };

    return (
        <div className="auth-container">
            <div className="auth-card glass wider">
                <Link to="/login" className="back-link">
                    <ArrowLeft size={18} /> Back to Login
                </Link>
                <div className="auth-header">
                    <div className="auth-logo">
                        <Stethoscope size={40} className="primary-icon" />
                        <h1>UniDoctor</h1>
                    </div>
                    <p className="auth-subtitle">Create your professional profile today</p>
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
                </div>

                <form onSubmit={handleRegister} className="auth-form registration-grid">
                    <div className="input-group">
                        <label>Full Name</label>
                        <div className="input-wrapper">
                            <User size={20} className="input-icon" />
                            <input type="text" placeholder="John Doe" required />
                        </div>
                    </div>

                    {role === 'Patient' ? (
                        <>
                            <div className="input-group">
                                <label>Age</label>
                                <div className="input-wrapper">
                                    <Activity size={20} className="input-icon" />
                                    <input type="number" placeholder="25" required />
                                </div>
                            </div>
                            <div className="input-group">
                                <label>Gender</label>
                                <div className="input-wrapper">
                                    <User size={20} className="input-icon" />
                                    <select required>
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="input-group">
                                <label>Registration Number</label>
                                <div className="input-wrapper">
                                    <BadgeCheck size={20} className="input-icon" />
                                    <input type="text" placeholder="MRN12345" required />
                                </div>
                            </div>
                            <div className="input-group">
                                <label>Specialization</label>
                                <div className="input-wrapper">
                                    <ShieldCheck size={20} className="input-icon" />
                                    <input type="text" placeholder="Cardiologist" required />
                                </div>
                            </div>
                            <div className="input-group col-span-2">
                                <label>Hospital/Clinic</label>
                                <div className="input-wrapper">
                                    <Building2 size={20} className="input-icon" />
                                    <input type="text" placeholder="City General Hospital" required />
                                </div>
                            </div>
                        </>
                    )}

                    <div className="input-group">
                        <label>Phone Number</label>
                        <div className="input-wrapper">
                            <Phone size={20} className="input-icon" />
                            <input type="tel" placeholder="+1 (555) 000-0000" required />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Email Address</label>
                        <div className="input-wrapper">
                            <Mail size={20} className="input-icon" />
                            <input type="email" placeholder="john@example.com" required />
                        </div>
                    </div>

                    <div className="input-group col-span-2">
                        <label>Password</label>
                        <div className="input-wrapper">
                            <Lock size={20} className="input-icon" />
                            <input type="password" placeholder="Min. 8 characters" required />
                        </div>
                    </div>

                    <button type="submit" className="btn-primary full-width col-span-2">
                        Create Account
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Already have an account? <Link to="/login">Login here</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;

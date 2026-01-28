import React from 'react';
import { Search, UserCircle } from 'lucide-react';

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => (
    <header className="header">
        <div className="header-title">
            <h1>{title}</h1>
        </div>
        <div className="header-actions" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div className="search-bar" style={{ position: 'relative' }}>
                <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                    type="text"
                    placeholder="Search..."
                    style={{
                        padding: '10px 10px 10px 40px',
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0',
                        outline: 'none',
                        fontSize: '14px',
                        width: '250px'
                    }}
                />
            </div>
            <UserCircle size={32} color="#1e293b" style={{ cursor: 'pointer' }} />
        </div>
    </header>
);

export default Header;

import { type LucideIcon, Stethoscope } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface SidebarItem {
    icon: LucideIcon;
    label: string;
    id: string;
    path: string;
}

interface SidebarProps {
    items: SidebarItem[];
    activeId: string;
}

const Sidebar = ({ items }: SidebarProps) => (
    <div className="sidebar">
        <div className="logo-section">
            <Stethoscope size={28} />
            <span>UniDoctor</span>
        </div>
        <nav className="nav-links">
            {items.map((item) => (
                <NavLink
                    key={item.id}
                    to={item.path}
                    className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                >
                    <item.icon size={20} />
                    {item.label}
                </NavLink>
            ))}
        </nav>
    </div>
);

export default Sidebar;

import { type LucideIcon, Stethoscope } from 'lucide-react';

interface SidebarItem {
    icon: LucideIcon;
    label: string;
    id: string;
}

interface SidebarProps {
    items: SidebarItem[];
    activeId: string;
    onItemClick?: (id: string) => void;
}

const Sidebar = ({ items, activeId, onItemClick }: SidebarProps) => (
    <div className="sidebar">
        <div className="logo-section">
            <Stethoscope size={28} />
            <span>UniDoctor</span>
        </div>
        <nav className="nav-links">
            {items.map((item) => (
                <div
                    key={item.id}
                    className={`nav-item ${activeId === item.id ? 'active' : ''}`}
                    onClick={() => onItemClick?.(item.id)}
                >
                    <item.icon size={20} />
                    {item.label}
                </div>
            ))}
        </nav>
    </div>
);

export default Sidebar;

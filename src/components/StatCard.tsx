import { type LucideIcon } from 'lucide-react';

interface StatCardProps {
    label: string;
    value: string;
    icon: LucideIcon;
    color: string;
}

const StatCard = ({ label, value, icon: Icon, color }: StatCardProps) => (
    <div className="stat-card">
        <div className="stat-info">
            <div className="label">{label}</div>
            <div className="value">{value}</div>
        </div>
        <div className="stat-icon" style={{ color: color }}>
            <Icon size={24} />
        </div>
    </div>
);

export default StatCard;

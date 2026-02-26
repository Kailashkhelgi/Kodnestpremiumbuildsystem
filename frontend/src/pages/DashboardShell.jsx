import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Code, FileText, BookOpen, User } from 'lucide-react';

const NAV_ITEMS = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/dashboard/practice', label: 'Practice', icon: Code },
    { path: '/dashboard/assessments', label: 'Assessments', icon: FileText },
    { path: '/dashboard/resources', label: 'Resources', icon: BookOpen },
    { path: '/dashboard/profile', label: 'Profile', icon: User },
];

export default function DashboardShell() {
    const location = useLocation();

    return (
        <div className="flex h-screen bg-[var(--clr-bg)] text-[var(--clr-text-primary)]">
            {/* Sidebar Navigation */}
            <aside className="w-64 bg-[var(--clr-surface)] border-r border-[var(--clr-border)] flex flex-col">
                <div className="p-6 border-b border-[var(--clr-border)] flex items-center justify-center">
                    <div className="text-xl font-serif font-bold text-[color:var(--clr-accent)]">
                        KodNest
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto py-6 flex flex-col gap-2 px-4">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${isActive
                                        ? 'bg-indigo-50 text-[color:var(--clr-accent)]'
                                        : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <Icon size={20} />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-6 border-t border-[var(--clr-border)] text-xs text-gray-400 text-center">
                    v1.0 Placement Prep
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Dashboard Header */}
                <header className="h-20 px-8 border-b border-[var(--clr-border)] bg-[var(--clr-surface)] flex items-center justify-between">
                    <h2 className="text-2xl font-serif">Placement Prep</h2>

                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-gray-600">John Doe</span>
                        <div className="w-10 h-10 rounded-full bg-indigo-100 text-[color:var(--clr-accent)] flex items-center justify-center border border-[var(--clr-border)] overflow-hidden">
                            <User size={20} />
                        </div>
                    </div>
                </header>

                {/* Dynamic Nested Content */}
                <main className="flex-1 overflow-y-auto p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

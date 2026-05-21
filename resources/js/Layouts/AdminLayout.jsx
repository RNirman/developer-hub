import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    BarChart3,
    Settings,
    Users,
    FileText,
    LogOut,
    Menu,
    X,
    LayoutGrid,
    Bell,
} from 'lucide-react';

export default function AdminLayout({ children, currentRoute }) {
    const user = usePage().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const menuItems = [
        { label: 'Dashboard', route: 'admin.dashboard', icon: LayoutGrid },
        { label: 'Users', route: 'admin.users.index', icon: Users },
        { label: 'Posts', route: 'admin.posts.index', icon: FileText },
        { label: 'Analytics', route: 'admin.dashboard', icon: BarChart3 },
        { label: 'Settings', route: 'admin.settings.index', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100">
            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 h-screen bg-slate-800 border-r border-slate-700 transition-all duration-300 ${
                    sidebarOpen ? 'w-64' : 'w-20'
                } z-40`}
            >
                <div className="flex items-center justify-between p-4 border-b border-slate-700">
                    {sidebarOpen && (
                        <h1 className="text-xl font-bold text-blue-400 font-mono">ADMIN</h1>
                    )}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-1 hover:bg-slate-700 rounded transition"
                    >
                        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <nav className="space-y-2 p-4">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = item.route !== '#' && route().current(item.route);

                        return (
                            <Link
                                key={item.label}
                                href={item.route === '#' ? '#' : route(item.route)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                                    isActive
                                        ? 'bg-blue-600 text-white'
                                        : 'text-slate-400 hover:bg-slate-700'
                                }`}
                                title={item.label}
                            >
                                <Icon size={20} />
                                {sidebarOpen && <span>{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content */}
            <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
                {/* Top Bar */}
                <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-30">
                    <div className="flex items-center justify-between px-8 py-4">
                        <h2 className="text-2xl font-bold text-white">
                            {currentRoute || 'Admin Panel'}
                        </h2>
                        <div className="flex items-center gap-4">
                            <button className="p-2 hover:bg-slate-700 rounded-lg transition">
                                <Bell size={20} className="text-slate-400" />
                            </button>
                            <div className="flex items-center gap-3 pl-4 border-l border-slate-700">
                                <div>
                                    <p className="text-sm font-medium text-white">{user.name}</p>
                                    <p className="text-xs text-slate-400 capitalize">{user.role}</p>
                                </div>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="p-2 hover:bg-slate-700 rounded-lg transition"
                                    title="Logout"
                                >
                                    <LogOut size={18} className="text-slate-400" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}

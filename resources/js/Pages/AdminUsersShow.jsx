import AdminLayout from '@/Layouts/AdminLayout';
import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

export default function AdminUsersShow({ user, audit_logs }) {
    return (
        <AdminLayout currentRoute="User Details">
            <div className="max-w-4xl mx-auto">
                <Link
                    href={route('admin.users.index')}
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6"
                >
                    <ArrowLeft size={18} />
                    Back to Users
                </Link>

                <div className="grid grid-cols-3 gap-6 mb-6">
                    {/* User Info */}
                    <div className="col-span-2 bg-slate-800 border border-slate-700 rounded-lg p-6">
                        <h1 className="text-2xl font-bold text-white mb-6">{user.name}</h1>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-slate-400">Email</p>
                                <p className="text-white font-medium">{user.email}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">Role</p>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-900 text-blue-300 capitalize mt-1">
                                    {user.role}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">Joined</p>
                                <p className="text-white font-medium">{new Date(user.created_at).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">Last Active</p>
                                <p className="text-white font-medium">{new Date(user.updated_at).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                        <h2 className="text-lg font-bold text-white mb-4">Stats</h2>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-slate-400">User ID</p>
                                <p className="text-white font-mono">{user.id}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">Account Status</p>
                                <p className="text-green-400 font-medium">Active</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Audit Logs */}
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                    <h2 className="text-lg font-bold text-white mb-4">Activity History</h2>
                    <div className="space-y-3">
                        {audit_logs.length > 0 ? (
                            audit_logs.map((log) => (
                                <div
                                    key={log.id}
                                    className="flex items-center justify-between p-3 bg-slate-700/50 rounded text-sm"
                                >
                                    <div>
                                        <p className="text-white font-medium capitalize">{log.action.replace(/_/g, ' ')}</p>
                                        <p className="text-slate-400 text-xs">{log.description}</p>
                                    </div>
                                    <span className="text-slate-500 text-xs">
                                        {new Date(log.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="text-slate-400">No activity recorded</p>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

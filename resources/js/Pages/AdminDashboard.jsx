import AdminLayout from '@/Layouts/AdminLayout';
import { BarChart3, Users, FileText, TrendingUp } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminDashboard({ stats, user_growth, post_growth, recent_activities, recent_users }) {
    const StatCard = ({ icon: Icon, label, value, color }) => (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-slate-400 text-sm mb-1">{label}</p>
                    <p className="text-3xl font-bold text-white">{value}</p>
                </div>
                <div className={`p-3 rounded-lg ${color}`}>
                    <Icon size={24} />
                </div>
            </div>
        </div>
    );

    return (
        <AdminLayout currentRoute="Dashboard">
            <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        icon={Users}
                        label="Total Users"
                        value={stats.total_users}
                        color="bg-blue-900 text-blue-400"
                    />
                    <StatCard
                        icon={FileText}
                        label="Total Posts"
                        value={stats.total_posts}
                        color="bg-purple-900 text-purple-400"
                    />
                    <StatCard
                        icon={TrendingUp}
                        label="Active This Week"
                        value={stats.active_users}
                        color="bg-green-900 text-green-400"
                    />
                    <StatCard
                        icon={Users}
                        label="New Users"
                        value={stats.new_users}
                        color="bg-orange-900 text-orange-400"
                    />
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">User Growth (30 days)</h3>
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={user_growth} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                    <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickMargin={10} />
                                    <YAxis stroke="#94a3b8" fontSize={12} tickMargin={10} allowDecimals={false} />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                                        itemStyle={{ color: '#60a5fa' }}
                                    />
                                    <Line type="monotone" dataKey="count" name="New Users" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 0 }} activeDot={{ r: 6 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Post Growth (30 days)</h3>
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={post_growth} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                    <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickMargin={10} />
                                    <YAxis stroke="#94a3b8" fontSize={12} tickMargin={10} allowDecimals={false} />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                                        itemStyle={{ color: '#c084fc' }}
                                        cursor={{ fill: '#334155', opacity: 0.4 }}
                                    />
                                    <Bar dataKey="count" name="New Posts" fill="#a855f7" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Recent Activity & Users */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Activities */}
                    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Recent Activities</h3>
                        <div className="space-y-3">
                            {recent_activities.length > 0 ? (
                                recent_activities.map((activity) => (
                                    <div
                                        key={activity.id}
                                        className="flex items-center justify-between p-3 bg-slate-700/50 rounded text-sm"
                                    >
                                        <div>
                                            <p className="text-white font-medium">{activity.action}</p>
                                            <p className="text-slate-400 text-xs">{activity.description}</p>
                                        </div>
                                        <span className="text-slate-500 text-xs">
                                            {new Date(activity.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-slate-400">No recent activities</p>
                            )}
                        </div>
                    </div>

                    {/* Recent Users */}
                    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Recent Users</h3>
                        <div className="space-y-3">
                            {recent_users.length > 0 ? (
                                recent_users.map((u) => (
                                    <div
                                        key={u.id}
                                        className="flex items-center justify-between p-3 bg-slate-700/50 rounded"
                                    >
                                        <div>
                                            <p className="text-white font-medium text-sm">{u.name}</p>
                                            <p className="text-slate-400 text-xs">{u.email}</p>
                                        </div>
                                        <span className="text-xs font-semibold px-2 py-1 rounded bg-blue-900 text-blue-300 capitalize">
                                            {u.role}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-slate-400">No users yet</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

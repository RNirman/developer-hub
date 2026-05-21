import AdminLayout from '@/Layouts/AdminLayout';
import { useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function AdminUsersEdit({ user, roles }) {
    const { data, setData, patch, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        role: user.role,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('admin.users.update', user.id));
    };

    return (
        <AdminLayout currentRoute="Edit User">
            <div className="max-w-2xl mx-auto">
                <Link
                    href={route('admin.users.index')}
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6"
                >
                    <ArrowLeft size={18} />
                    Back to Users
                </Link>

                <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
                    <h1 className="text-2xl font-bold text-white mb-6">Edit User: {user.name}</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-white mb-2">Name</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white mb-2">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white mb-2">Role</label>
                            <select
                                value={data.role}
                                onChange={(e) => setData('role', e.target.value)}
                                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {roles.map((role) => (
                                    <option key={role} value={role}>
                                        {role.charAt(0).toUpperCase() + role.slice(1)}
                                    </option>
                                ))}
                            </select>
                            {errors.role && <p className="text-red-400 text-sm mt-1">{errors.role}</p>}
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium disabled:opacity-50"
                            >
                                <Save size={18} />
                                {processing ? 'Saving...' : 'Save Changes'}
                            </button>
                            <Link
                                href={route('admin.users.index')}
                                className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition font-medium"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}

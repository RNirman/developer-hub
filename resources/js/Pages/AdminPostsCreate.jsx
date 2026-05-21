import AdminLayout from '@/Layouts/AdminLayout';
import { useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function AdminPostsCreate({ statuses }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        body: '',
        status: 'draft',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.posts.store'));
    };

    return (
        <AdminLayout currentRoute="Create Post">
            <div className="max-w-4xl mx-auto">
                <Link
                    href={route('admin.posts.index')}
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6"
                >
                    <ArrowLeft size={18} />
                    Back to Posts
                </Link>

                <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
                    <h1 className="text-2xl font-bold text-white mb-6">Create New Post</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-white mb-2">Title</label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="Enter post title"
                                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white mb-2">Content</label>
                            <textarea
                                value={data.body}
                                onChange={(e) => setData('body', e.target.value)}
                                placeholder="Enter post content..."
                                rows="10"
                                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                            />
                            {errors.body && <p className="text-red-400 text-sm mt-1">{errors.body}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white mb-2">Status</label>
                            <select
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {statuses.map((status) => (
                                    <option key={status} value={status}>
                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                    </option>
                                ))}
                            </select>
                            {errors.status && <p className="text-red-400 text-sm mt-1">{errors.status}</p>}
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium disabled:opacity-50"
                            >
                                <Save size={18} />
                                {processing ? 'Creating...' : 'Create Post'}
                            </button>
                            <Link
                                href={route('admin.posts.index')}
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

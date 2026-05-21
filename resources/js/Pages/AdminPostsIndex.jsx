import AdminLayout from '@/Layouts/AdminLayout';
import { Link, usePage, useForm } from '@inertiajs/react';
import { Edit2, Trash2, Search, Plus } from 'lucide-react';
import { useState } from 'react';

export default function AdminPostsIndex({ posts, filters, statuses }) {
    const { data, setData, get, delete: destroy } = useForm({
        search: filters.search || '',
        status: filters.status || '',
    });
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        setIsSearching(true);
        get(route('admin.posts.index'), {
            onFinish: () => setIsSearching(false),
        });
    };

    const handleDelete = (post) => {
        if (confirm(`Are you sure you want to delete "${post.title}"? This action cannot be undone.`)) {
            destroy(route('admin.posts.destroy', post.id));
        }
    };

    return (
        <AdminLayout currentRoute="Posts Management">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-white">Posts</h1>
                    <Link
                        href={route('admin.posts.create')}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium"
                    >
                        <Plus size={18} />
                        New Post
                    </Link>
                </div>

                {/* Search & Filter */}
                <form onSubmit={handleSearch} className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                    <div className="flex gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-3 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search posts..."
                                value={data.search}
                                onChange={(e) => setData('search', e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <select
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value)}
                            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">All Statuses</option>
                            {statuses.map((status) => (
                                <option key={status} value={status}>
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                </option>
                            ))}
                        </select>
                        <button
                            type="submit"
                            disabled={isSearching}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium disabled:opacity-50"
                        >
                            {isSearching ? 'Searching...' : 'Search'}
                        </button>
                    </div>
                </form>

                {/* Posts Table */}
                <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-slate-700/50 border-b border-slate-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-white">Title</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-white">Author</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-white">Status</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-white">Published</th>
                                <th className="px-6 py-3 text-right text-sm font-semibold text-white">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                            {posts.data.map((post) => (
                                <tr key={post.id} className="hover:bg-slate-700/50 transition">
                                    <td className="px-6 py-4 text-white font-medium max-w-xs truncate">{post.title}</td>
                                    <td className="px-6 py-4 text-slate-300">{post.user?.name}</td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize ${
                                                post.status === 'published'
                                                    ? 'bg-green-900 text-green-300'
                                                    : post.status === 'draft'
                                                    ? 'bg-yellow-900 text-yellow-300'
                                                    : 'bg-gray-900 text-gray-300'
                                            }`}
                                        >
                                            {post.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-400 text-sm">
                                        {new Date(post.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={route('admin.posts.edit', post.id)}
                                                className="p-2 hover:bg-slate-700 rounded transition text-blue-400 hover:text-blue-300"
                                                title="Edit"
                                            >
                                                <Edit2 size={18} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(post)}
                                                className="p-2 hover:bg-slate-700 rounded transition text-red-400 hover:text-red-300"
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {posts.links && (
                    <div className="flex gap-2 justify-center">
                        {posts.links.map((link, idx) => (
                            <Link
                                key={idx}
                                href={link.url || '#'}
                                className={`px-3 py-1 rounded text-sm ${
                                    link.active
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

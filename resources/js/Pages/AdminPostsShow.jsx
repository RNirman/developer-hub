import AdminLayout from '@/Layouts/AdminLayout';
import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

export default function AdminPostsShow({ post }) {
    return (
        <AdminLayout currentRoute="Post Details">
            <div className="max-w-4xl mx-auto">
                <Link
                    href={route('admin.posts.index')}
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6"
                >
                    <ArrowLeft size={18} />
                    Back to Posts
                </Link>

                <div className="space-y-6">
                    {/* Post Header */}
                    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h1 className="text-3xl font-bold text-white">{post.title}</h1>
                                <p className="text-slate-400 text-sm mt-2">
                                    by {post.user?.name} • {new Date(post.created_at).toLocaleDateString()}
                                </p>
                            </div>
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
                        </div>
                    </div>

                    {/* Post Content */}
                    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                        <h2 className="text-lg font-bold text-white mb-4">Content</h2>
                        <div className="prose prose-invert max-w-none">
                            <p className="text-slate-300 whitespace-pre-wrap">{post.body}</p>
                        </div>
                    </div>

                    {/* Comments */}
                    {post.comments && post.comments.length > 0 && (
                        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                            <h2 className="text-lg font-bold text-white mb-4">
                                Comments ({post.comments.length})
                            </h2>
                            <div className="space-y-4">
                                {post.comments.map((comment) => (
                                    <div key={comment.id} className="bg-slate-700/50 rounded p-4">
                                        <div className="flex items-start justify-between mb-2">
                                            <p className="text-white font-medium">{comment.user?.name}</p>
                                            <p className="text-slate-400 text-xs">
                                                {new Date(comment.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <p className="text-slate-300">{comment.body}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-4">
                        <Link
                            href={route('admin.posts.edit', post.id)}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium"
                        >
                            Edit Post
                        </Link>
                        <Link
                            href={route('admin.posts.index')}
                            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition font-medium"
                        >
                            Back
                        </Link>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

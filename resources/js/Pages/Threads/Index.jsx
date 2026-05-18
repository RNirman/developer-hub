import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Index({ auth, threads }) {
    const [liveThreads, setLiveThreads] = useState(threads);
    const [commentInputs, setCommentInputs] = useState({});

    const { data, setData, post, processing, reset, errors } = useForm({
        title: '',
        category: 'general',
        body: '',
    });

    useEffect(() => {
        const channel = window.Echo.channel('threads');

        channel.listen('ThreadCreated', (e) => {
            if (e.thread.user_id !== auth.user.id) {
                const newThread = { ...e.thread, comments: [] };
                setLiveThreads(prev => [newThread, ...prev]);
            }
        });

        channel.listen('CommentCreated', (e) => {
            if (e.comment.user_id !== auth.user.id) {
                setLiveThreads(prevThreads => prevThreads.map(thread => {
                    if (thread.id === e.comment.thread_id) {
                        return { ...thread, comments: [...(thread.comments || []), e.comment] };
                    }
                    return thread;
                }));
            }
        });

        return () => window.Echo.leaveChannel('threads');
    }, [auth.user.id]);

    const submitThread = (e) => {
        e.preventDefault();
        post(route('threads.store'), {
            onSuccess: (page) => {
                reset();
                setLiveThreads(page.props.threads);
            }
        });
    };

    const submitComment = (e, threadId) => {
        e.preventDefault();
        const body = commentInputs[threadId];
        if (!body) return;

        router.post(route('comments.store', threadId), { body }, {
            preserveScroll: true,
            onSuccess: (page) => {
                setCommentInputs(prev => ({ ...prev, [threadId]: '' }));
                setLiveThreads(page.props.threads);
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Developer Hub</h2>}
        >
            <Head title="Discussions" />
            <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">

                {/* THREAD FORM */}
                <form onSubmit={submitThread} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
                    <div className="flex gap-4 mb-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                value={data.title}
                                placeholder="What's on your mind?"
                                className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                onChange={e => setData('title', e.target.value)}
                            />
                        </div>
                        <select
                            value={data.category}
                            onChange={e => setData('category', e.target.value)}
                            className="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        >
                            <option value="general">General</option>
                            <option value="php">PHP / Laravel</option>
                            <option value="react">React / JS</option>
                            <option value="linux">Linux / Servers</option>
                        </select>
                    </div>
                    <textarea
                        value={data.body}
                        placeholder="Share a code snippet or ask a question..."
                        className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        rows="4"
                        onChange={e => setData('body', e.target.value)}
                    ></textarea>
                    <div className="mt-4 flex justify-end">
                        <button type="submit" disabled={processing} className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-500">
                            Post Thread
                        </button>
                    </div>
                </form>

                {/* THREAD FEED */}
                <div className="space-y-6">
                    {liveThreads.map(thread => (
                        <div key={thread.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{thread.user.name}</span>
                                <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 rounded-full uppercase font-bold tracking-wider">
                                    {thread.category}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-1">{thread.title}</h3>
                            <div className="mt-2 mb-4 text-gray-800 dark:text-gray-200 text-sm">
                                <ReactMarkdown
                                    components={{
                                        code({ node, inline, className, children, ...props }) {
                                            const match = /language-(\w+)/.exec(className || '')
                                            return !inline && match ? (
                                                <SyntaxHighlighter
                                                    {...props}
                                                    children={String(children).replace(/\n$/, '')}
                                                    style={vscDarkPlus}
                                                    language={match[1]}
                                                    PreTag="div"
                                                    className="rounded-md border border-gray-700 my-2"
                                                />
                                            ) : (
                                                <code {...props} className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-red-500 dark:text-red-400">
                                                    {children}
                                                </code>
                                            )
                                        }
                                    }}
                                >
                                    {thread.body}
                                </ReactMarkdown>
                            </div>

                            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-2">
                                <div className="space-y-3 mb-4">
                                    {thread.comments && thread.comments.map(comment => (
                                        <div key={comment.id} className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded text-sm">
                                            <span className="font-bold text-gray-900 dark:text-gray-200 mr-2">{comment.user.name}:</span>
                                            <span className="text-gray-700 dark:text-gray-300">{comment.body}</span>
                                        </div>
                                    ))}
                                </div>

                                <form onSubmit={(e) => submitComment(e, thread.id)} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={commentInputs[thread.id] || ''}
                                        onChange={e => setCommentInputs({ ...commentInputs, [thread.id]: e.target.value })}
                                        placeholder="Write a comment..."
                                        className="flex-1 text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 rounded-md shadow-sm"
                                    />
                                    <button type="submit" className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-bold uppercase rounded-md hover:bg-gray-300 dark:hover:bg-gray-600">
                                        Reply
                                    </button>
                                </form>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
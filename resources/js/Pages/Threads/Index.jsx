import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import toast, { Toaster } from 'react-hot-toast';
import { MessageSquare, Send, Hash, CornerDownRight, ArrowBigUp } from 'lucide-react';

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

                toast.success(`${e.thread.user.name} posted a new discussion.`, {
                    icon: '🚀',
                    style: { background: '#081b33', color: '#00f0ff', border: '1px solid #00f0ff' }
                });
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

                toast(`${e.comment.user.name} replied to a thread.`, {
                    icon: '💬',
                    style: { background: '#081b33', color: '#38bdf8', border: '1px solid #38bdf8' }
                });
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
    const upvoteThread = (threadId) => {
        router.post(route('threads.upvote', threadId), {}, {
            preserveScroll: true,
            onSuccess: (page) => {
                setLiveThreads(page.props.threads);
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white tracking-wide flex items-center gap-2"><MessageSquare className="w-5 h-5 text-blueprint-accent" /> Discussions</h2>}
        >
            <Head title="Discussions" />

            <Toaster position="bottom-right" />

            <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">

                {/* THREAD FORM */}
                <form onSubmit={submitThread} className="bg-blueprint-bg/60 backdrop-blur-sm border border-blueprint-grid p-6 mb-8 rounded-lg shadow-lg relative group">
                    <div className="flex gap-4 mb-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                value={data.title}
                                placeholder="What's on your mind?"
                                className="w-full bg-blueprint-bg/50 border border-blueprint-grid text-blueprint-fg placeholder-blueprint-fg/40 focus:border-blueprint-accent focus:ring-0 rounded-md shadow-sm text-sm"
                                onChange={e => setData('title', e.target.value)}
                            />
                        </div>
                        <select
                            value={data.category}
                            onChange={e => setData('category', e.target.value)}
                            className="bg-blueprint-bg/50 border border-blueprint-grid text-blueprint-fg focus:border-blueprint-accent focus:ring-0 rounded-md shadow-sm text-sm"
                        >
                            <option value="general">General</option>
                            <option value="php">PHP / Laravel</option>
                            <option value="react">React / UI</option>
                            <option value="linux">Linux / Devops</option>
                        </select>
                    </div>
                    <textarea
                        value={data.body}
                        placeholder="Share a snippet or ask a question..."
                        className="w-full bg-blueprint-bg/50 border border-blueprint-grid text-blueprint-fg placeholder-blueprint-fg/40 focus:border-blueprint-accent focus:ring-0 rounded-md shadow-sm text-sm"
                        rows="4"
                        onChange={e => setData('body', e.target.value)}
                    ></textarea>
                    <div className="mt-4 flex justify-end">
                        <button type="submit" disabled={processing} className="flex items-center gap-2 px-6 py-2 bg-blueprint-accent/10 border border-blueprint-accent rounded-md font-semibold text-sm text-blueprint-accent tracking-wide hover:bg-blueprint-accent hover:text-blueprint-bg transition-colors shadow-sm">
                            <Send className="w-4 h-4" /> Post Thread
                        </button>
                    </div>
                </form>

                {/* THREAD FEED */}
                <div className="space-y-6">
                    {liveThreads.map(thread => (
                        <div key={thread.id} className="bg-blueprint-bg/60 backdrop-blur-sm border border-blueprint-grid rounded-lg p-6 shadow flex flex-col gap-2 hover:border-blueprint-accent/50 transition-colors">
                            <div className="flex justify-between items-center mb-2 border-b border-blueprint-grid pb-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blueprint-accent opacity-80"></div>
                                    <span className="text-sm font-semibold text-blueprint-secondary">{thread.user.name} <span className="text-[0.7rem] bg-blueprint-bg border border-blueprint-grid px-1.5 py-0.5 rounded ml-1 text-blueprint-accent font-mono" title="Node Power / Reputation">[PWR: {thread.user.reputation || 0}]</span></span>
                                </div>
                                <span className="flex items-center gap-1 text-[0.7rem] px-2 py-1 bg-blueprint-grid/50 border border-blueprint-grid rounded-full text-blueprint-accent font-medium tracking-wide">
                                    <Hash className="w-3 h-3" /> {thread.category}
                                </span>
                            </div>
                            <h3 className="text-lg font-semibold text-white mt-1 tracking-tight">{thread.title}</h3>
                            <div className="mt-2 mb-4 text-blueprint-fg/90 text-sm leading-relaxed">
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
                                                    className="border border-blueprint-grid rounded-md !bg-[#0b1426] !my-4"
                                                    customStyle={{ padding: '1rem', background: '#0b1426' }}
                                                />
                                            ) : (
                                                <code {...props} className="bg-blueprint-grid/50 text-blueprint-alert px-1.5 py-0.5 rounded text-xs border border-blueprint-grid font-mono">
                                                    {children}
                                                </code>
                                            )
                                        }
                                    }}
                                >
                                    {thread.body}
                                </ReactMarkdown>
                            </div>

                            <div className="flex items-center gap-3 mb-2">
                                <button
                                    onClick={() => upvoteThread(thread.id)}
                                    disabled={thread.user_has_voted || thread.user_id === auth.user.id}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors border ${
                                        thread.user_has_voted 
                                        ? 'bg-blueprint-accent text-blueprint-bg border-blueprint-accent'
                                        : (thread.user_id === auth.user.id
                                            ? 'bg-blueprint-bg/30 text-blueprint-secondary/50 border-blueprint-grid cursor-not-allowed'
                                            : 'bg-blueprint-bg/50 text-blueprint-secondary border-blueprint-grid hover:border-blueprint-accent hover:text-blueprint-accent')
                                    }`}
                                >
                                    <ArrowBigUp className={`w-4 h-4 ${thread.user_has_voted ? 'fill-current' : ''}`} />
                                    {thread.votes_count || 0}
                                </button>
                            </div>

                            <div className="border-t border-blueprint-grid pt-4 mt-2">
                                <div className="space-y-3 mb-4">
                                    {thread.comments && thread.comments.map(comment => (
                                        <div key={comment.id} className="flex gap-2 text-sm pl-4 border-l-2 border-blueprint-grid hover:border-blueprint-accent/30 transition-colors">
                                            <CornerDownRight className="w-4 h-4 text-blueprint-secondary shrink-0 mt-0.5" />
                                            <div>
                                                <span className="font-semibold text-blueprint-secondary text-sm mr-2">{comment.user.name}:</span>
                                                <span className="text-blueprint-fg/80 text-sm">{comment.body}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <form onSubmit={(e) => submitComment(e, thread.id)} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={commentInputs[thread.id] || ''}
                                        onChange={e => setCommentInputs({ ...commentInputs, [thread.id]: e.target.value })}
                                        placeholder="Write a reply..."
                                        className="flex-1 bg-blueprint-bg/30 border border-blueprint-grid text-blueprint-fg placeholder-blueprint-fg/40 focus:border-blueprint-secondary focus:ring-0 rounded-md text-sm shadow-sm"
                                    />
                                    <button type="submit" className="px-4 py-2 border border-blueprint-secondary rounded-md text-blueprint-secondary text-xs font-semibold hover:bg-blueprint-secondary hover:text-blueprint-bg transition-colors shadow-sm">
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
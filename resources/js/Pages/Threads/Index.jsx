import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Index({ auth, threads }) {
    const [liveThreads, setLiveThreads] = useState(threads);

    const { data, setData, post, processing, reset, errors } = useForm({
        title: '',
        category: 'general',
        body: '',
    });

    useEffect(() => {
        window.Echo.channel('threads')
            .listen('ThreadCreated', (e) => {
                if (e.thread.user_id !== auth.user.id) {
                     setLiveThreads(prevThreads => [e.thread, ...prevThreads]);
                }
            });

        // Cleanup listener when the component unmounts
        return () => {
            window.Echo.leaveChannel('threads');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('threads.store'), { 
            onSuccess: (page) => {
                reset();
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
                
                <form onSubmit={submit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
                    <div className="flex gap-4 mb-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                value={data.title}
                                placeholder="What's on your mind?"
                                className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                onChange={e => setData('title', e.target.value)}
                            />
                            {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
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
                    {errors.body && <div className="text-red-500 text-sm mt-1">{errors.body}</div>}

                    <div className="mt-4 flex justify-end">
                        <button 
                            type="submit" 
                            disabled={processing}
                            className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-500 focus:bg-indigo-500 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                        >
                            Post Thread
                        </button>
                    </div>
                </form>

                <div className="space-y-4">
                    {liveThreads.map(thread => (
                        <div key={thread.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{thread.user.name}</span>
                                <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 rounded-full uppercase font-bold tracking-wider">
                                    {thread.category}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-1">{thread.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap font-mono text-sm mt-2 bg-gray-50 dark:bg-gray-900 p-3 rounded border border-gray-200 dark:border-gray-700">
                                {thread.body}
                            </p>
                        </div>
                    ))}
                    
                    {liveThreads.length === 0 && (
                        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                            No discussions yet. Be the first to post!
                        </div>
                    )}
                </div>

            </div>
        </AuthenticatedLayout>
    );
}
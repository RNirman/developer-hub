import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Cpu } from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-blueprint-bg text-blueprint-fg font-sans relative selection:bg-blueprint-accent/30 selection:text-white">
            {/* Blueprint Grid Background - Opacity reduced */}
            <div className="fixed inset-0 bg-blueprint-pattern bg-blueprint opacity-10 z-0 pointer-events-none"></div>
            
            <nav className="border-b border-blueprint-grid bg-blueprint-bg/80 backdrop-blur-sm relative z-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/" className="flex items-center gap-2">
                                    <div className="border border-blueprint-accent p-1.5 bg-blueprint-bg rounded-md">
                                        <Cpu className="w-5 h-5 text-blueprint-accent" />
                                    </div>
                                    <span className="text-blueprint-accent font-bold tracking-wider text-lg hidden sm:block font-mono">DEV_HUB</span>
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink 
                                    href={route('threads.index')} 
                                    active={route().current('threads.index')}
                                    className="font-medium tracking-wide text-sm border-blueprint-accent"
                                >
                                    Discussions
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-transparent px-3 py-2 text-sm font-medium tracking-wide text-blueprint-secondary transition duration-150 ease-in-out hover:text-blueprint-accent focus:outline-none"
                                            >
                                                {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content contentClasses="py-1 bg-blueprint-bg border border-blueprint-grid rounded-md shadow-lg">
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                            className="text-blueprint-fg hover:bg-blueprint-grid hover:text-blueprint-accent text-sm"
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="text-blueprint-fg hover:bg-blueprint-grid hover:text-blueprint-accent text-sm"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-blueprint-secondary transition duration-150 ease-in-out hover:bg-blueprint-grid hover:text-blueprint-accent focus:bg-blueprint-grid focus:text-blueprint-accent focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden border-t border-blueprint-grid'
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route('threads.index')}
                            active={route().current('threads.index')}
                        >
                            Discussions
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-blueprint-grid pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-semibold text-blueprint-accent">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-blueprint-secondary">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')} className="text-blueprint-fg hover:bg-blueprint-grid hover:text-blueprint-accent border-transparent">
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                                className="text-blueprint-fg hover:bg-blueprint-grid hover:text-blueprint-accent border-transparent"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-blueprint-bg/80 border-b border-blueprint-grid backdrop-blur-sm relative z-10">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 border-l-4 border-blueprint-accent">
                        {header}
                    </div>
                </header>
            )}

            <main className="relative z-10">{children}</main>
        </div>
    );
}

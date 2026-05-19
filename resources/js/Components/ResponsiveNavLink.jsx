import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${
                active
                    ? 'border-blueprint-accent bg-blueprint-accent/10 text-blueprint-accent'
                    : 'border-transparent text-blueprint-secondary/70 hover:border-blueprint-secondary hover:bg-blueprint-grid/50 hover:text-blueprint-secondary'
            } text-xs font-bold uppercase tracking-widest transition duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}

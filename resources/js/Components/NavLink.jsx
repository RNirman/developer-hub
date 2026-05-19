import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-2 px-1 pt-1 text-xs font-bold uppercase tracking-widest transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-blueprint-accent text-blueprint-accent'
                    : 'border-transparent text-blueprint-secondary/70 hover:border-blueprint-secondary hover:text-blueprint-secondary') +
                ' ' + className
            }
        >
            {children}
        </Link>
    );
}

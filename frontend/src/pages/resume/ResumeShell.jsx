import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

export default function ResumeShell() {
    return (
        <div className="flex flex-col min-h-screen bg-[var(--clr-bg)] font-sans">
            <header className="h-16 px-6 bg-[var(--clr-surface)] border-b border-[var(--clr-border)] flex items-center justify-between sticky top-0 z-10 shadow-sm">
                <div className="text-xl font-serif font-bold text-[color:var(--clr-accent)]">
                    AI Resume Builder
                </div>
                <nav className="flex gap-6 items-center">
                    <NavLink
                        to="/builder"
                        end
                        className={({ isActive }) => `font-medium text-sm transition-colors py-2 border-b-2 ${isActive ? 'text-[color:var(--clr-accent)] border-[color:var(--clr-accent)]' : 'text-gray-500 border-transparent hover:text-gray-900 border-transparent'}`}
                    >
                        Builder
                    </NavLink>
                    <NavLink
                        to="/preview"
                        end
                        className={({ isActive }) => `font-medium text-sm transition-colors py-2 border-b-2 ${isActive ? 'text-[color:var(--clr-accent)] border-[color:var(--clr-accent)]' : 'text-gray-500 border-transparent hover:text-gray-900 border-transparent'}`}
                    >
                        Preview
                    </NavLink>
                    <NavLink
                        to="/proof"
                        end
                        className={({ isActive }) => `font-medium text-sm transition-colors py-2 border-b-2 ${isActive ? 'text-[color:var(--clr-accent)] border-[color:var(--clr-accent)]' : 'text-gray-500 border-transparent hover:text-gray-900 border-transparent'}`}
                    >
                        Proof
                    </NavLink>
                </nav>
            </header>
            <main className="flex-1 flex flex-col overflow-hidden">
                <Outlet />
            </main>
        </div>
    );
}

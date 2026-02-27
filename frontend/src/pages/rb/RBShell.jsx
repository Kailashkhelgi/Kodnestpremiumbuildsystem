import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

export default function RBShell() {
    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const currentStepPath = pathSegments[pathSegments.length - 1]; // e.g., '01-problem'

    let stepNumber = null;
    if (currentStepPath && currentStepPath.match(/^\d{2}-/)) {
        stepNumber = parseInt(currentStepPath.substring(0, 2), 10);
    }

    return (
        <div className="flex flex-col min-h-screen bg-[var(--clr-bg)] font-sans">
            {/* Top Bar */}
            <header className="h-16 px-6 bg-[var(--clr-surface)] border-b border-[var(--clr-border)] flex items-center justify-between z-10 sticky top-0">
                <div className="text-xl font-serif font-bold text-[color:var(--clr-accent)]">
                    AI Resume Builder
                </div>

                <div className="text-sm font-medium text-gray-500">
                    {stepNumber ? `Project 3 — Step ${stepNumber} of 8` : 'Project 3 — Proof'}
                </div>

                <div>
                    <span className="px-3 py-1 bg-indigo-50 text-[color:var(--clr-accent)] text-xs font-semibold rounded-full border border-indigo-100">
                        Build Track
                    </span>
                </div>
            </header>

            {/* Main Content Area */}
            <div className="flex-1 flex overflow-hidden">
                <Outlet />
            </div>
        </div>
    );
}

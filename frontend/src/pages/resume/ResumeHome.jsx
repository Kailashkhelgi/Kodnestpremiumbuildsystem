import React from 'react';
import { Link } from 'react-router-dom';

export default function ResumeHome() {
    return (
        <div className="min-h-screen bg-[var(--clr-bg)] text-[var(--clr-text-primary)] flex flex-col font-sans">
            <header className="px-8 py-6 border-b border-[var(--clr-border)] bg-[var(--clr-surface)]">
                <div className="text-xl font-serif font-semibold text-[color:var(--clr-accent)]">AI Resume Builder</div>
            </header>
            <main className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-[var(--clr-surface-alt)]">
                <h1 className="text-5xl md:text-6xl font-serif mb-6 leading-tight max-w-4xl text-[color:var(--clr-text-primary)]">
                    Build a Resume That Gets Read.
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                    Create a beautifully simple, ATS-friendly resume using our premium design system. Structure your experience to stand out from the crowd.
                </p>
                <Link to="/builder" className="btn btn--primary text-lg h-14 px-10 py-3 flex items-center justify-center shadow-lg hover:shadow-xl transition-all">
                    Start Building
                </Link>
            </main>
            <footer className="py-8 text-center text-sm text-gray-500 bg-[var(--clr-surface)] border-t border-[var(--clr-border)]">
                &copy; {new Date().getFullYear()} KodNest Premium. All rights reserved.
            </footer>
        </div>
    );
}

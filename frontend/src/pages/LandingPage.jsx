import { Link } from 'react-router-dom';
import { Code, Video, LineChart } from 'lucide-react';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-[var(--clr-bg)] text-[var(--clr-text-primary)] flex flex-col font-sans">
            <header className="px-8 py-6 border-b border-[var(--clr-border)] flex justify-between items-center bg-[var(--clr-surface)]">
                <div className="text-xl font-serif font-semibold text-[color:var(--clr-accent)]">KodNest Placement Prep</div>
                <Link to="/dashboard" className="btn btn--secondary">Sign In</Link>
            </header>

            <main className="flex-1 flex flex-col items-center">
                {/* Hero Section */}
                <section className="text-center py-24 px-6 max-w-4xl mx-auto w-full">
                    <h1 className="text-5xl md:text-6xl font-serif mb-6 leading-tight">Ace Your Placement</h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                        Practice, assess, and prepare for your dream job with our comprehensive placement readiness platform.
                    </p>
                    <Link to="/dashboard" className="btn btn--primary text-lg h-14 px-8 py-3 w-fit">
                        Get Started
                    </Link>
                </section>

                {/* Features Grid */}
                <section className="py-20 px-6 bg-[var(--clr-surface-alt)] w-full border-y border-[var(--clr-border)]">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="card text-center hover:border-[var(--clr-accent)] transition-colors bg-white">
                            <div className="flex justify-center mb-6 text-[color:var(--clr-accent)]">
                                <Code size={48} strokeWidth={1.5} />
                            </div>
                            <h2 className="card__title border-none !pb-0 !mb-4">Practice Problems</h2>
                            <p className="text-gray-600 !mb-0">Sharpen your coding skills with industry-standard scenarios.</p>
                        </div>

                        <div className="card text-center hover:border-[var(--clr-accent)] transition-colors bg-white">
                            <div className="flex justify-center mb-6 text-[color:var(--clr-accent)]">
                                <Video size={48} strokeWidth={1.5} />
                            </div>
                            <h2 className="card__title border-none !pb-0 !mb-4">Mock Interviews</h2>
                            <p className="text-gray-600 !mb-0">Simulate real technical interviews to build your confidence.</p>
                        </div>

                        <div className="card text-center hover:border-[var(--clr-accent)] transition-colors bg-white">
                            <div className="flex justify-center mb-6 text-[color:var(--clr-accent)]">
                                <LineChart size={48} strokeWidth={1.5} />
                            </div>
                            <h2 className="card__title border-none !pb-0 !mb-4">Track Progress</h2>
                            <p className="text-gray-600 !mb-0">Measure your readiness with detailed performance analytics.</p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="py-8 text-center text-sm text-gray-500 bg-[var(--clr-surface)]">
                &copy; {new Date().getFullYear()} KodNest Premium Build System. All rights reserved.
            </footer>
        </div>
    );
}

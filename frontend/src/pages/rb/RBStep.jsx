import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronRight, FileUp, Copy, CheckCircle } from 'lucide-react';

const STEPS = [
    { path: '01-problem', title: 'Problem Statement' },
    { path: '02-market', title: 'Market Analysis' },
    { path: '03-architecture', title: 'System Architecture' },
    { path: '04-hld', title: 'High Level Design' },
    { path: '05-lld', title: 'Low Level Design' },
    { path: '06-build', title: 'Initial Build' },
    { path: '07-test', title: 'Testing & QA' },
    { path: '08-ship', title: 'Deployment' },
    { path: 'proof', title: 'Final Submission' }
];

export default function RBStep() {
    const navigate = useNavigate();
    const location = useLocation();

    // Find current step info
    const currentPathSegment = location.pathname.split('/').filter(Boolean).pop();
    const currentIndex = STEPS.findIndex(s => s.path === currentPathSegment);
    const currentStep = STEPS[currentIndex];
    const isProof = currentPathSegment === 'proof';
    const nextStep = STEPS[currentIndex + 1];

    const [artifactFiles, setArtifactFiles] = useState({});
    const [copied, setCopied] = useState(false);

    const lovablePromptText = `
System Prompt for Step ${currentIndex + 1}: ${currentStep?.title}

Instructions:
1. Act as a Staff Engineer.
2. We are building an AI Resume Builder.
3. Help me define the ${currentStep?.title} for this problem space.
    `.trim();

    // Check Gating
    useEffect(() => {
        // Simple Gating Check: if user accesses step N, they must have artifact N-1
        if (currentIndex > 0) {
            for (let i = 0; i < currentIndex; i++) {
                const prevArtifact = localStorage.getItem(`rb_step_${i + 1}_artifact`);
                if (!prevArtifact && !isProof) {
                    // Redirect back to the step they missed
                    alert(`You must complete Step ${i + 1} before proceeding.`);
                    navigate(`/rb/${STEPS[i].path}`, { replace: true });
                    return;
                }
            }
        }
    }, [currentIndex, navigate, isProof]);

    const handleCopy = () => {
        navigator.clipboard.writeText(lovablePromptText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleArtifactUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setArtifactFiles(prev => ({ ...prev, [currentIndex]: file.name }));
            // Save mock flag to LS to fulfill gating
            localStorage.setItem(`rb_step_${currentIndex + 1}_artifact`, file.name);
        }
    };

    const currentArtifact = artifactFiles[currentIndex] || localStorage.getItem(`rb_step_${currentIndex + 1}_artifact`);

    if (!currentStep) return <div className="p-8">Invalid Step Route</div>;

    if (isProof) {
        return <RBProof />;
    }

    return (
        <div className="flex w-full h-full">
            {/* Main Workspace 70% */}
            <main className="w-[70%] h-full flex flex-col p-8 overflow-y-auto">
                <header className="mb-6 border-b border-[var(--clr-border)] pb-4">
                    <h1 className="text-3xl font-serif text-[color:var(--clr-text-primary)] font-semibold mb-2">
                        {currentIndex + 1}. {currentStep.title}
                    </h1>
                    <p className="text-gray-500">
                        Context placeholder...
                    </p>
                </header>

                <div className="flex-1 bg-white border border-[var(--clr-border)] rounded-xl p-6 shadow-sm">
                    <h3 className="font-semibold text-lg mb-4 text-[color:var(--clr-text-primary)]">Workspace Area</h3>
                    <p className="text-gray-500 text-sm">
                        This area will house specific instructions, diagrams, or content related to "{currentStep.title}".
                    </p>
                </div>
            </main>

            {/* Build Panel 30% */}
            <aside className="w-[30%] bg-[var(--clr-surface)] border-l border-[var(--clr-border)] p-6 h-full flex flex-col">
                <h3 className="font-semibold text-lg text-[color:var(--clr-text-primary)] mb-4">Lovable Context Payload</h3>

                <div className="form-group flex-1 flex flex-col !mb-4">
                    <div className="flex items-center justify-between mb-2">
                        <label className="form-label text-sm !mb-0 text-gray-600">Copy This Into Lovable</label>
                        <button
                            onClick={handleCopy}
                            className="bg-indigo-50 text-[color:var(--clr-accent)] hover:bg-indigo-100 px-3 py-1 rounded text-xs font-semibold flex items-center gap-1 transition-colors"
                        >
                            {copied ? <CheckCircle size={12} /> : <Copy size={12} />}
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                    <textarea
                        className="form-input flex-1 resize-none text-sm font-mono text-gray-700 bg-gray-50/50"
                        value={lovablePromptText}
                        readOnly
                    />
                </div>

                <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 mb-6 text-center">
                    <p className="text-sm text-[color:var(--clr-accent)] font-medium">✨ Build in Lovable</p>
                </div>

                {/* Upload Action */}
                <div className="border-t border-[var(--clr-border)] pt-6 mt-auto">
                    <p className="text-sm font-semibold text-gray-700 mb-3 block">Upload Artifact as Proof</p>

                    <label className={`w-full flex items-center justify-center p-3 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${currentArtifact ? 'border-emerald-300 bg-emerald-50 text-emerald-700' : 'border-gray-300 hover:border-[color:var(--clr-accent)] text-gray-500'}`}>
                        <div className="flex items-center gap-2 text-sm font-medium">
                            {currentArtifact ? (
                                <>
                                    <CheckCircle size={18} /> {currentArtifact.slice(0, 20)}...
                                </>
                            ) : (
                                <>
                                    <FileUp size={18} /> Choose File
                                </>
                            )}
                        </div>
                        <input type="file" className="hidden" onChange={handleArtifactUpload} accept="image/*,.pdf" />
                    </label>

                    <button
                        className="btn btn--primary w-full mt-4 flex justify-between items-center px-4"
                        disabled={!currentArtifact}
                        onClick={() => navigate(`/rb/${nextStep.path}`)}
                    >
                        <span>Proceed Context</span>
                        <ChevronRight size={18} />
                    </button>
                </div>
            </aside>
        </div>
    );
}

// Subcomponent for the final Proof Page
function RBProof() {
    return (
        <div className="w-full flex justify-center py-12 px-6 overflow-y-auto">
            <div className="max-w-2xl w-full">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-4">
                        <CheckCircle size={32} />
                    </div>
                    <h1 className="text-4xl font-serif text-[color:var(--clr-text-primary)] font-bold mb-3">Project Complete</h1>
                    <p className="text-gray-500">You've successfully built the AI Resume Builder using Lovable.</p>
                </div>

                <div className="bg-white border border-[var(--clr-border)] rounded-xl p-8 shadow-sm">
                    <h3 className="font-bold text-lg border-b border-[var(--clr-border)] pb-3 mb-6">Final Proof Submission</h3>

                    <div className="space-y-4 mb-8">
                        <div className="form-group !mb-0">
                            <label className="form-label text-sm">Lovable Share Link</label>
                            <input type="url" className="form-input" placeholder="https://lovable.dev/..." />
                        </div>
                        <div className="form-group !mb-0">
                            <label className="form-label text-sm">GitHub Repository Link</label>
                            <input type="url" className="form-input" placeholder="https://github.com/..." />
                        </div>
                        <div className="form-group !mb-0">
                            <label className="form-label text-sm">Live Deployment Link</label>
                            <input type="url" className="form-input" placeholder="https://your-app.vercel.app/" />
                        </div>
                    </div>

                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg mb-6">
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Artifact Status Logs</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            {STEPS.slice(0, 8).map((step, i) => {
                                const exists = localStorage.getItem(`rb_step_${i + 1}_artifact`);
                                return (
                                    <div key={i} className="flex items-center gap-2">
                                        {exists ? (
                                            <CheckCircle size={14} className="text-emerald-500" />
                                        ) : (
                                            <div className="w-3.5 h-3.5 rounded-full border-2 border-red-300" />
                                        )}
                                        <span className={exists ? 'text-gray-700' : 'text-gray-400'}>Step {i + 1} Done</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <button className="btn btn--primary w-full h-12 text-lg">
                        Submit Final Proof Portfolio
                    </button>
                </div>
            </div>
        </div>
    );
}

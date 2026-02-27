import React from 'react';
import { CheckCircle } from 'lucide-react';

export default function ResumeProof() {
    return (
        <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-[var(--clr-surface-alt)]">
            <div className="max-w-2xl w-full">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-4 shadow-sm">
                        <CheckCircle size={32} />
                    </div>
                    <h1 className="text-4xl font-serif text-[color:var(--clr-text-primary)] font-bold mb-3">Project Proof Placeholder</h1>
                    <p className="text-gray-500">Awaiting backend connection to store artifacts and ATS scores.</p>
                </div>

                <div className="bg-white border border-[var(--clr-border)] rounded-xl p-8 shadow-sm">
                    <h3 className="font-bold text-lg border-b border-[var(--clr-border)] pb-3 mb-6">Generated Resume Verification</h3>

                    <div className="space-y-4 mb-8">
                        <div className="p-4 bg-gray-50 rounded text-sm text-gray-600 text-center border border-dashed border-gray-300">
                            Artifact placeholders ready for Phase 2 API integration.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

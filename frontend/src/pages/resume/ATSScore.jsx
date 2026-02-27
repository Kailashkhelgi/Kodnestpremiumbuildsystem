import React from 'react';

export default function ATSScore({ data }) {
    if (!data) return null;

    let score = 0;
    const suggestions = [];

    // Length of summary (approx. word count)
    const summaryWords = data.summary ? data.summary.trim().split(/\s+/).length : 0;
    if (summaryWords >= 40 && summaryWords <= 120) {
        score += 15;
    } else {
        suggestions.push("Write a stronger summary (40–120 words).");
    }

    // Projects count
    if (data.projects && data.projects.length >= 2) {
        score += 10;
    } else {
        suggestions.push("Add at least 2 projects.");
    }

    if (data.experience && data.experience.length >= 1) {
        score += 10;
    } else {
        suggestions.push("Add internship or project experience.");
    }

    // Skills length
    let skillsArray = [];
    if (data.skills) {
        if (typeof data.skills === 'string') {
            skillsArray = data.skills.split(',').map(s => s.trim()).filter(Boolean);
        } else {
            skillsArray = [
                ...(data.skills.technical || []),
                ...(data.skills.soft || []),
                ...(data.skills.tools || [])
            ];
        }
    }
    if (skillsArray.length >= 8) {
        score += 10;
    } else {
        suggestions.push("Add more skills (target 8+).");
    }

    // Links exist
    if ((data.links?.github && data.links.github.trim()) || (data.links?.linkedin && data.links.linkedin.trim())) {
        score += 10;
    } else {
        suggestions.push("Include a GitHub or LinkedIn link.");
    }

    // Numbers in bullets
    const bulletText = [
        ...(data.experience || []).map(e => e.description),
        ...(data.projects || []).map(p => p.description)
    ].join(' ');

    // Simple regex to find numbers (digits, %, k, x multipliers)
    // Looking for digits or explicit common metric indicators
    if (/[0-9]/.test(bulletText) || /%|\bk\b|\bx\b/i.test(bulletText)) {
        score += 15;
    } else {
        suggestions.push("Add measurable impact (numbers/metrics) in points.");
    }

    // Complete education fields
    let hasCompleteEdu = false;
    if (data.education && data.education.length > 0) {
        hasCompleteEdu = data.education.some(edu =>
            edu.school?.trim() && edu.degree?.trim() && edu.year?.trim()
        );
        if (hasCompleteEdu) score += 10;
    }
    if (!hasCompleteEdu) {
        suggestions.push("Ensure your education entries have complete details.");
    }

    if (score > 100) score = 100;

    // We only take the top 3 suggestions
    const displaySuggestions = suggestions.slice(0, 3);

    return (
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 mt-6 mb-6">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">ATS Readiness Score</h3>

            <div className="flex items-center gap-6 mb-4">
                <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <path
                            className="text-white"
                            stroke="currentColor"
                            strokeWidth="3"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                            className="text-[color:var(--clr-accent)] transition-all duration-500 ease-out"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeDasharray={`${score}, 100`}
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-serif font-bold text-[color:var(--clr-text-primary)]">{score}</span>
                    </div>
                </div>

                <div className="flex-1">
                    {displaySuggestions.length > 0 ? (
                        <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-gray-800">Top 3 Improvements:</h4>
                            <ul className="text-sm text-gray-600 space-y-1 list-disc pl-4">
                                {displaySuggestions.map((s, i) => (
                                    <li key={i}>{s}</li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div>
                            <h4 className="text-sm font-semibold text-emerald-700">Excellent!</h4>
                            <p className="text-sm text-gray-600 mt-1">Your resume matches core ATS heuristic parameters perfectly.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

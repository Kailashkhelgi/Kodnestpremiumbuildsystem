import React from 'react';

export default function ATSScore({ data }) {
    if (!data) return null;

    let score = 0;
    const suggestions = [];

    if (data.personal?.name && data.personal.name.trim().length > 0) {
        score += 10;
    } else {
        suggestions.push("Add your full name (+10 points)");
    }

    if (data.personal?.email && data.personal.email.trim().length > 0) {
        score += 10;
    } else {
        suggestions.push("Add an email address (+10 points)");
    }

    if (data.personal?.phone && data.personal.phone.trim().length > 0) {
        score += 5;
    } else {
        suggestions.push("Add a phone number (+5 points)");
    }

    const summaryText = data.summary ? data.summary.trim() : "";
    if (summaryText.length > 50) {
        score += 10;
    } else {
        suggestions.push("Add a professional summary > 50 chars (+10 points)");
    }

    const verbsRegex = /\b(built|led|designed|improved|developed|created|optimized|managed|implemented|engineered)\b/i;
    if (summaryText.length > 0 && verbsRegex.test(summaryText)) {
        score += 10;
    } else if (summaryText.length > 0) {
        suggestions.push("Use action verbs in summary (+10 points)");
    }

    let hasExpBullets = false;
    if (data.experience && data.experience.length > 0) {
        hasExpBullets = data.experience.some(e => e.description && e.description.trim().length > 0);
        if (hasExpBullets) {
            score += 15;
        } else {
            suggestions.push("Add bullet points to your experience (+15 points)");
        }
    } else {
        suggestions.push("Add at least 1 experience entry with bullets (+15 points)");
    }

    if (data.education && data.education.length >= 1) {
        score += 10;
    } else {
        suggestions.push("Add at least 1 education entry (+10 points)");
    }

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
    if (skillsArray.length >= 5) {
        score += 10;
    } else {
        suggestions.push("Add at least 5 skills (+10 points)");
    }

    if (data.projects && data.projects.length >= 1) {
        score += 10;
    } else {
        suggestions.push("Add at least 1 project (+10 points)");
    }

    if (data.links?.linkedin && data.links.linkedin.trim().length > 0) {
        score += 5;
    } else {
        suggestions.push("Add a LinkedIn profile link (+5 points)");
    }

    if (data.links?.github && data.links.github.trim().length > 0) {
        score += 5;
    } else {
        suggestions.push("Add a GitHub profile link (+5 points)");
    }

    if (score > 100) score = 100;

    let scoreColor = "text-red-500";
    let strokeColor = "#ef4444"; // red-500
    let scoreLabel = "Needs Work";

    if (score > 40 && score <= 70) {
        scoreColor = "text-amber-500";
        strokeColor = "#f59e0b"; // amber-500
        scoreLabel = "Getting There";
    } else if (score > 70) {
        scoreColor = "text-emerald-500";
        strokeColor = "#10b981"; // emerald-500
        scoreLabel = "Strong Resume";
    }

    const displaySuggestions = suggestions.slice(0, 3);

    return (
        <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-6 mt-6 mb-6">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Live Form Parser</h3>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-2">
                <div className="flex flex-col items-center gap-2">
                    <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                            <path
                                className="text-gray-100"
                                stroke="currentColor"
                                strokeWidth="3"
                                fill="none"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path
                                className="transition-all duration-700 ease-out"
                                stroke={strokeColor}
                                strokeWidth="3"
                                strokeDasharray={`${score}, 100`}
                                fill="none"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className={`text-3xl font-bold ${scoreColor}`}>{score}</span>
                        </div>
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-wider ${scoreColor}`}>{scoreLabel}</span>
                </div>

                <div className="flex-1 w-full pt-2">
                    {displaySuggestions.length > 0 ? (
                        <div className="space-y-3">
                            <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">How to Improve (<span className="text-gray-500">{score}/100</span>):</h4>
                            <ul className="text-[13px] text-gray-600 space-y-2">
                                {displaySuggestions.map((s, i) => (
                                    <li key={i} className="flex gap-2 items-start">
                                        <span className="text-amber-400 mt-0.5">•</span>
                                        <span>{s}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col justify-center pb-4">
                            <h4 className="text-sm font-bold text-emerald-600 mb-1">Maximum Score Reached!</h4>
                            <p className="text-[13px] text-gray-500 leading-relaxed">Your resume perfectly matches all heuristic data parsing conditions. Excellent work.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { ArrowLeft, CheckCircle2, Copy, Download, ThumbsUp, AlertCircle, PlaySquare, Building2, Map } from 'lucide-react';

export default function Results() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [liveScore, setLiveScore] = useState(0);

    // Initialize data and load from localStorage
    useEffect(() => {
        try {
            const history = JSON.parse(localStorage.getItem('kodnest_jd_history') || '[]');
            const found = history.find(item => item.id === id);

            if (!found && history.length > 0) {
                navigate(`/dashboard/results/${history[0].id}`);
            } else if (!found) {
                navigate('/dashboard/assessments');
            } else {
                // Assert required baseline structure for resilience
                if (!found.skillConfidenceMap || !found.plan7Days) throw new Error("Schema violation");
                setData(found);
            }
        } catch (err) {
            // Corrupt or old schema entry handling
            const confirmNew = window.confirm("One saved entry couldn't be loaded (likely from an older version format). Create a new analysis?");
            if (confirmNew) {
                navigate('/dashboard/assessments');
            } else {
                navigate('/dashboard');
            }
        }
    }, [id, navigate]);

    // Recalculate Live Score whenever data changes
    useEffect(() => {
        if (!data) return;

        let scoreMod = 0;
        Object.values(data.skillConfidenceMap).forEach(val => {
            if (val === 'know') scoreMod += 2;
        });

        // Calculate up from baseScore considering 'practice' is the baseline finalScore logic now
        const offsetMax = Object.keys(data.skillConfidenceMap).length * 2;
        let newScore = (data.baseScore - offsetMax) + scoreMod;

        if (newScore > 100) newScore = 100;
        if (newScore < 0) newScore = 0;

        setLiveScore(Math.max(0, newScore));
    }, [data]);

    // Handle Toggle & Persist
    const toggleSkill = (skill) => {
        const currentVal = data.skillConfidenceMap[skill];
        const newVal = currentVal === 'know' ? 'practice' : 'know';

        const updatedData = {
            ...data,
            skillConfidenceMap: {
                ...data.skillConfidenceMap,
                [skill]: newVal
            },
            finalScore: liveScore,
            updatedAt: new Date().toISOString()
        };

        setData(updatedData);

        // Persist completely
        const history = JSON.parse(localStorage.getItem('kodnest_jd_history') || '[]');
        const updatedHistory = history.map(item => item.id === id ? updatedData : item);
        localStorage.setItem('kodnest_jd_history', JSON.stringify(updatedHistory));
    };


    // Export Utilities
    const copyPlan = () => {
        const text = data.plan7Days.map(p => `${p.day} - ${p.focus}\n${p.tasks.join(', ')}`).join('\n\n');
        navigator.clipboard.writeText(`7-Day Plan:\n\n${text}`);
        alert("7-Day plan copied to clipboard!");
    };

    const copyChecklist = () => {
        const text = data.checklist.map(r => `${r.roundTitle}\n` + r.items.map(i => `- ${i}`).join('\n')).join('\n\n');
        navigator.clipboard.writeText(`Interview Checklist:\n\n${text}`);
        alert("Checklist copied to clipboard!");
    };

    const copyQuestions = () => {
        const text = data.questions.map((q, i) => `${i + 1}. ${q}`).join('\n');
        navigator.clipboard.writeText(`Mock Questions:\n\n${text}`);
        alert("Questions copied to clipboard!");
    };

    const downloadTXT = () => {
        const planText = data.plan7Days.map(p => `${p.day} - ${p.focus}\n${p.tasks.join(', ')}`).join('\n\n');
        const checklistText = data.checklist.map(r => `${r.roundTitle}\n` + r.items.map(i => `- ${i}`).join('\n')).join('\n\n');
        const questionsText = data.questions.map((q, i) => `${i + 1}. ${q}`).join('\n');

        const fullBlob = `KODNEST PLACEMENT PREP\n${data.role} @ ${data.company}\n\n=====================\n7-DAY STRATEGIC PLAN\n=====================\n${planText}\n\n=====================\nINTERVIEW CHECKLIST\n=====================\n${checklistText}\n\n=====================\nMOCK QUESTIONS\n=====================\n${questionsText}`;

        const element = document.createElement("a");
        const file = new Blob([fullBlob], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `${data.company.replace(/\s+/g, '_')}_Preparation_Plan.txt`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    // Derive top 3 weak skills
    const weakSkills = data ? Object.entries(data.skillConfidenceMap).filter(([_, val]) => val === 'practice').map(([k]) => k).slice(0, 3) : [];


    if (!data) return <div className="p-8 font-sans">Loading analysis...</div>;

    return (
        <div className="space-y-8 pb-12 font-sans">
            {/* Header Info & Actions */}
            <div className="flex justify-between flex-wrap gap-4 items-end border-b border-[var(--clr-border)] pb-6">
                <div>
                    <button
                        onClick={() => navigate('/dashboard/assessments')}
                        className="flex items-center gap-2 text-[color:var(--clr-accent)] mb-4 hover:underline text-sm font-medium transition-all"
                    >
                        <ArrowLeft size={16} /> Back to History
                    </button>
                    <h2 className="text-3xl font-serif font-semibold text-[color:var(--clr-text-primary)]">
                        {data.role}
                    </h2>
                    <p className="text-lg text-gray-500 mt-1">{data.company}</p>
                </div>

                <div className="flex items-center gap-4 bg-[var(--clr-surface-alt)] px-6 py-4 rounded-xl border border-[var(--clr-border)] text-center transition-all">
                    <div>
                        <div className="text-sm font-medium text-gray-500 uppercase tracking-widest">Live Score</div>
                        <div className="text-4xl font-serif text-[color:var(--clr-accent)] font-bold transition-all duration-300 transform">
                            {liveScore}
                            <span className="text-xl text-gray-400 font-normal">/100</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Col - 2/3 */}
                <div className="lg:col-span-2 space-y-8">

                    {/* A) Extracted Skills Interactive */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle>Skill Self-Assessment</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-500 mb-6">Toggle your confidence in each detected skill to update your live readiness score.</p>
                            <div className="flex flex-wrap gap-x-8 gap-y-6">
                                {Object.entries(data.extractedSkills).filter(([_, arr]) => arr && arr.length > 0).map(([category, skills]) => (
                                    <div key={category} className="space-y-3 min-w-[200px]">
                                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{category.replace('coreCS', 'Core CS')}</h4>
                                        <div className="flex flex-col gap-2">
                                            {skills.map(skill => {
                                                const isKnown = data.skillConfidenceMap[skill] === 'know';
                                                return (
                                                    <button
                                                        key={skill}
                                                        onClick={() => toggleSkill(skill)}
                                                        className={`flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium border transition-all duration-200 ${isKnown
                                                            ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                                                            : 'bg-indigo-50 border-indigo-200 text-[color:var(--clr-accent)]'
                                                            }`}
                                                    >
                                                        <span>{skill}</span>
                                                        {isKnown ? <ThumbsUp size={14} /> : <AlertCircle size={14} />}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* C) 7-Day Plan */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle>Strategic 7-Day Plan</CardTitle>
                            <button onClick={copyPlan} className="btn btn--secondary h-8 px-3 text-xs flex gap-2">
                                <Copy size={12} /> Copy Plan
                            </button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6 mt-4">
                                {data.plan7Days.map((item, idx) => (
                                    <div key={idx} className="flex gap-4 border-l-2 border-[color:var(--clr-accent)] pl-4">
                                        <div className="w-20 shrink-0 font-serif font-bold text-[color:var(--clr-accent)]">{item.day}</div>
                                        <div>
                                            <h4 className="font-semibold text-[color:var(--clr-text-primary)]">{item.focus}</h4>
                                            <ul className="text-sm text-gray-600 mt-1 list-disc pl-4">
                                                {item.tasks.map((task, tIdx) => (
                                                    <li key={tIdx}>{task}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* D) Likely Interview Questions */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle>Targeted Mock Questions</CardTitle>
                            <button onClick={copyQuestions} className="btn btn--secondary h-8 px-3 text-xs flex gap-2">
                                <Copy size={12} /> Copy Questions
                            </button>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-decimal pl-5 space-y-4 mt-4">
                                {data.questions.map((q, idx) => (
                                    <li key={idx} className="text-[color:var(--clr-text-primary)] leading-relaxed">
                                        <span className="font-semibold">{q}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                </div>

                {/* Right Col - 1/3 */}
                <div className="space-y-8">

                    {/* Master Export Button */}
                    <button onClick={downloadTXT} className="btn btn--primary w-full flex gap-2 items-center justify-center py-6 h-auto shadow-sm">
                        <Download size={20} />
                        Download Full Strategy (TXT)
                    </button>

                    {/* Company Intel Block */}
                    {data.companyIntel && (
                        <Card className="bg-gradient-to-br from-[var(--clr-bg)] to-[var(--clr-surface)]">
                            <CardHeader className="pb-3 border-b border-[var(--clr-border)]">
                                <CardTitle className="flex items-center gap-2">
                                    <Building2 className="text-[color:var(--clr-accent)]" size={18} /> Company Intel
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4 space-y-4">
                                <div>
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Industry & Size</h4>
                                    <p className="font-semibold text-[color:var(--clr-text-primary)]">{data.companyIntel.industry}</p>
                                    <p className="text-sm text-gray-500">{data.companyIntel.size}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Typical Hiring Focus</h4>
                                    <p className="text-sm text-gray-700 leading-relaxed">{data.companyIntel.typicalFocus}</p>
                                </div>
                                <p className="text-[10px] text-gray-400 pt-2 italic">Demo Mode: Company intel generated heuristically.</p>
                            </CardContent>
                        </Card>
                    )}

                    {/* Dynamic Round Mapping */}
                    {data.roundMapping && (
                        <Card>
                            <CardHeader className="pb-3 border-b border-[var(--clr-border)]">
                                <CardTitle className="flex items-center gap-2">
                                    <Map className="text-[color:var(--clr-accent)]" size={18} /> Predicted Round Flow
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6 relative">
                                {/* Vertical Line */}
                                <div className="absolute left-[39px] top-6 bottom-6 w-0.5 bg-gray-100 hidden md:block" />

                                <div className="space-y-6">
                                    {data.roundMapping.map((r, i) => (
                                        <div key={i} className="flex gap-4 relative z-10">
                                            {/* Node */}
                                            <div className="w-8 h-8 rounded-full bg-indigo-50 border-2 border-[color:var(--clr-accent)] text-[color:var(--clr-accent)] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                                                {i + 1}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-[color:var(--clr-text-primary)]">{r.roundTitle}</h4>
                                                <div className="text-sm font-medium text-[color:var(--clr-accent)] mb-1">
                                                    {r.focusAreas.join(", ")}
                                                </div>
                                                <p className="text-xs text-gray-500">{r.whyItMatters}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* B) Interview Rounds Checklist */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle>Rounds Checklist</CardTitle>
                            <button onClick={copyChecklist} className="btn btn--secondary h-8 px-3 text-xs flex gap-2">
                                <Copy size={12} /> Copy
                            </button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-8 mt-4">
                                {data.checklist.map((round, idx) => (
                                    <div key={idx}>
                                        <h4 className="font-bold text-gray-800 pb-2 border-b border-[var(--clr-border)] mb-3 flex items-center gap-2">
                                            {round.roundTitle.split(': ')[0]} <span className="text-gray-400 font-normal text-sm">: {round.roundTitle.split(': ')[1] || ""}</span>
                                        </h4>
                                        <ul className="space-y-3">
                                            {round.items.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                                    <CheckCircle2 size={16} className="text-[color:var(--clr-accent)] mt-0.5 shrink-0" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                </div>

            </div>

            {/* Action Next Box */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-8 mt-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                <div>
                    <h3 className="text-xl font-serif font-bold text-[color:var(--clr-text-primary)] flex items-center gap-2 mb-2">
                        <PlaySquare className="text-[color:var(--clr-accent)]" /> Your Action Next
                    </h3>
                    {weakSkills.length > 0 ? (
                        <p className="text-gray-600 max-w-2xl text-sm">
                            Based on your self-assessment, prioritize revising <span className="font-semibold text-gray-800">{weakSkills.join(', ')}</span>.
                        </p>
                    ) : (
                        <p className="text-gray-600 max-w-2xl text-sm">Great shape! You are confident across all technical parameters.</p>
                    )}
                </div>
                <button className="btn btn--primary h-12 px-8 shrink-0 shadow-md">
                    Start Day 1 Plan Now
                </button>
            </div>

        </div>
    );
}

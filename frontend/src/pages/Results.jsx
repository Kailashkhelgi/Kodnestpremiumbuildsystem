import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function Results() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);

    useEffect(() => {
        const history = JSON.parse(localStorage.getItem('kodnest_jd_history') || '[]');
        const found = history.find(item => item.id === id);
        if (!found && history.length > 0) {
            // Fallback to latest
            setData(history[0]);
        } else if (!found) {
            navigate('/dashboard/assessments');
        } else {
            setData(found);
        }
    }, [id, navigate]);

    if (!data) return <div className="p-8">Loading analysis...</div>;

    return (
        <div className="space-y-8 pb-12">
            {/* Header Info */}
            <div className="flex justify-between flex-wrap gap-4 items-end border-b border-[var(--clr-border)] pb-6">
                <div>
                    <button
                        onClick={() => navigate('/dashboard/assessments')}
                        className="flex items-center gap-2 text-[color:var(--clr-accent)] mb-4 hover:underline text-sm font-medium"
                    >
                        <ArrowLeft size={16} /> Back to History
                    </button>
                    <h2 className="text-3xl font-serif font-semibold text-[color:var(--clr-text-primary)]">
                        {data.role}
                    </h2>
                    <p className="text-lg text-gray-500 mt-1">{data.company}</p>
                </div>

                <div className="flex items-center gap-4 bg-[var(--clr-surface-alt)] px-6 py-4 rounded-xl border border-[var(--clr-border)] text-center">
                    <div>
                        <div className="text-sm font-medium text-gray-500 uppercase tracking-widest">Score</div>
                        <div className="text-3xl font-serif text-[color:var(--clr-accent)] font-bold">{data.readinessScore}/100</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Col - 2/3 */}
                <div className="lg:col-span-2 space-y-8">

                    {/* A) Extracted Skills */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Extracted Skills Profile</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-6">
                                {Object.entries(data.extractedSkills).map(([category, skills]) => (
                                    <div key={category} className="space-y-2">
                                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{category}</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {skills.map(skill => (
                                                <span key={skill} className="px-3 py-1 bg-indigo-50 text-[color:var(--clr-accent)] rounded-full text-sm font-medium border border-indigo-200">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* C) 7-Day Plan */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Strategic 7-Day Plan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {data.plan.map((item, idx) => (
                                    <div key={idx} className="flex gap-4 border-l-2 border-[color:var(--clr-accent)] pl-4">
                                        <div className="w-20 font-serif font-bold text-[color:var(--clr-accent)]">{item.day}</div>
                                        <div>
                                            <h4 className="font-semibold text-[color:var(--clr-text-primary)]">{item.focus}</h4>
                                            <p className="text-sm text-gray-600 mt-1">{item.detail}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* D) Likely Interview Questions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Targeted Mock Questions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-decimal pl-5 space-y-4">
                                {data.questions.map((q, idx) => (
                                    <li key={idx} className="text-[color:var(--clr-text-primary)] leading-relaxed">
                                        <span className="font-semibold">{q.q}</span>
                                        <div className="text-xs text-[color:var(--clr-accent)] font-medium mt-1">Focus: {q.skill}</div>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                </div>

                {/* Right Col - 1/3 */}
                <div className="space-y-8">

                    {/* B) Interview Rounds Checklist */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Round-wise Checklist</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-8">
                                {data.checklist.map((round, idx) => (
                                    <div key={idx}>
                                        <h4 className="font-bold text-gray-800 pb-2 border-b border-[var(--clr-border)] mb-3 flex items-center gap-2">
                                            {round.round.split(': ')[0]} <span className="text-gray-400 font-normal text-sm">: {round.round.split(': ')[1]}</span>
                                        </h4>
                                        <ul className="space-y-3">
                                            {round.items.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                                    <CheckCircle2 size={16} className="text-gray-300 mt-0.5 shrink-0" />
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

        </div>
    );
}

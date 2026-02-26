import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeJD } from '../utils/analyzer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { FileText, Clock, ChevronRight } from 'lucide-react';

export default function Assessments() {
    const navigate = useNavigate();
    const [company, setCompany] = useState('');
    const [role, setRole] = useState('');
    const [jdText, setJdText] = useState('');
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('kodnest_jd_history') || '[]');
        // Sort by newest
        saved.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setHistory(saved);
    }, []);

    const handleAnalyze = (e) => {
        e.preventDefault();
        if (!jdText.trim()) return;

        const result = analyzeJD(jdText, company, role);

        const currentHistory = JSON.parse(localStorage.getItem('kodnest_jd_history') || '[]');
        const newHistory = [result, ...currentHistory];

        // Persist
        localStorage.setItem('kodnest_jd_history', JSON.stringify(newHistory));

        // Navigate to results
        navigate(`/dashboard/results/${result.id}`);
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-serif font-semibold text-[color:var(--clr-text-primary)]">
                    JD Analyzer & Assessments
                </h2>
                <p className="text-gray-500">Paste a Job Description to generate a custom preparation plan.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Input Form */}
                <Card className="h-fit">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="text-[color:var(--clr-accent)]" /> New Analysis
                        </CardTitle>
                        <CardDescription>Enter details to extract skills and generate your plan.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleAnalyze} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="form-group !mb-0">
                                    <label className="form-label text-sm">Company Name (Optional)</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="e.g. Google"
                                        value={company}
                                        onChange={e => setCompany(e.target.value)}
                                    />
                                </div>
                                <div className="form-group !mb-0">
                                    <label className="form-label text-sm">Target Role (Optional)</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="e.g. Frontend Engineer"
                                        value={role}
                                        onChange={e => setRole(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="form-group !mb-0">
                                <label className="form-label text-sm">Job Description *</label>
                                <textarea
                                    className="form-input h-32 py-3 resize-none"
                                    placeholder="Paste the full job description here..."
                                    required
                                    value={jdText}
                                    onChange={e => setJdText(e.target.value)}
                                />
                            </div>

                            <button type="submit" className="btn btn--primary w-full mt-4" disabled={!jdText.trim()}>
                                Analyze JD
                            </button>
                        </form>
                    </CardContent>
                </Card>

                {/* History List */}
                <Card className="h-fit">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="text-[color:var(--clr-accent)]" /> Analysis History
                        </CardTitle>
                        <CardDescription>Review your past readiness plans.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {history.length === 0 ? (
                            <div className="text-center py-8 text-gray-500 bg-gray-50 rounded border border-dashed border-gray-200">
                                No history found. Analyze a JD to get started!
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-2">
                                {history.map(item => (
                                    <div
                                        key={item.id}
                                        onClick={() => navigate(`/dashboard/results/${item.id}`)}
                                        className="p-4 border border-[var(--clr-border)] rounded-lg hover:border-[color:var(--clr-accent)] transition-colors cursor-pointer flex justify-between items-center group bg-white"
                                    >
                                        <div>
                                            <h4 className="font-semibold text-gray-800">{item.role} @ {item.company}</h4>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {new Date(item.createdAt).toLocaleDateString()} • Score: {item.readinessScore}/100
                                            </p>
                                        </div>
                                        <div className="text-gray-300 group-hover:text-[color:var(--clr-accent)] transition-colors">
                                            <ChevronRight />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}

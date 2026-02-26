import React, { useEffect, useState } from 'react';
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer
} from 'recharts';
import { PlayCircle, Calendar, CheckSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

// Mock data for the radar chart
const radarData = [
    { subject: 'DSA', A: 75, fullMark: 100 },
    { subject: 'System Design', A: 60, fullMark: 100 },
    { subject: 'Communication', A: 80, fullMark: 100 },
    { subject: 'Resume', A: 85, fullMark: 100 },
    { subject: 'Aptitude', A: 70, fullMark: 100 },
];

// Circular Progress Component
const CircularProgress = ({ value, label }) => {
    const [progress, setProgress] = useState(0);
    const size = 160;
    const strokeWidth = 14;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;

    useEffect(() => {
        // Animate to value
        const timer = setTimeout(() => setProgress(value), 300);
        return () => clearTimeout(timer);
    }, [value]);

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
                {/* Background circle */}
                <svg className="transform -rotate-90 w-full h-full">
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke="currentColor"
                        strokeWidth={strokeWidth}
                        fill="transparent"
                        className="text-gray-100"
                    />
                    {/* Progress circle */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke="currentColor"
                        strokeWidth={strokeWidth}
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        className="text-[color:var(--clr-accent)] transition-all duration-1000 ease-out"
                    />
                </svg>
                {/* Center Text */}
                <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-4xl font-serif font-bold text-[color:var(--clr-text-primary)]">
                        {value}
                    </span>
                    <span className="text-sm font-medium text-gray-400">/ 100</span>
                </div>
            </div>
            <p className="mt-4 font-medium text-gray-600">{label}</p>
        </div>
    );
};

export default function DashboardOverview() {
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const activeDays = [true, true, true, false, false, false, false]; // Mon-Wed active

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-serif font-semibold text-[color:var(--clr-text-primary)]">
                Dashboard
            </h2>

            {/* 2-Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* 1. Overall Readiness */}
                <Card>
                    <CardHeader>
                        <CardTitle>Overall Readiness</CardTitle>
                        <CardDescription>Your aggregated placement probability score based on recent tasks.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center py-6">
                        <CircularProgress value={72} label="Readiness Score" />
                    </CardContent>
                </Card>

                {/* 2. Skill Breakdown */}
                <Card>
                    <CardHeader>
                        <CardTitle>Skill Breakdown</CardTitle>
                        <CardDescription>Performance across core competency areas.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                                    <PolarGrid stroke="#e5e7eb" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#4b5563', fontSize: 12 }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                    <Radar
                                        name="Skills"
                                        dataKey="A"
                                        stroke="var(--clr-accent)"
                                        fill="var(--clr-accent)"
                                        fillOpacity={0.4}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* 3. Continue Practice */}
                <Card>
                    <CardHeader>
                        <CardTitle>Continue Practice</CardTitle>
                        <CardDescription>Pick up right where you left off.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="bg-[var(--clr-surface-alt)] p-4 rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-[var(--clr-border)]">
                            <div>
                                <h4 className="font-semibold text-lg flex items-center gap-2">
                                    <PlayCircle className="text-[color:var(--clr-accent)]" size={20} />
                                    Dynamic Programming
                                </h4>
                                <div className="mt-2 text-sm text-gray-500 mb-2">3/10 completed</div>
                                {/* Linear Progress Bar */}
                                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden w-48">
                                    <div className="h-full bg-[color:var(--clr-accent)]" style={{ width: '30%' }}></div>
                                </div>
                            </div>
                            <button className="btn btn--primary py-2 h-auto text-sm">
                                Continue
                            </button>
                        </div>
                    </CardContent>
                </Card>

                {/* 4. Weekly Goals */}
                <Card>
                    <CardHeader>
                        <CardTitle>Weekly Goals</CardTitle>
                        <CardDescription>Consistency is the key to mastering code.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4 flex justify-between items-center text-sm">
                            <span className="font-medium text-gray-700">Problems Solved</span>
                            <span className="text-[color:var(--clr-accent)] font-semibold">12 / 20</span>
                        </div>

                        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-6">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: '60%' }}></div>
                        </div>

                        <div className="flex justify-between items-center px-2">
                            {days.map((day, idx) => (
                                <div key={idx} className="flex flex-col items-center gap-2">
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium border
                      ${activeDays[idx]
                                                ? 'bg-[color:var(--clr-accent)] text-white border-[color:var(--clr-accent)]'
                                                : 'bg-white text-gray-400 border-gray-200'}`}
                                    >
                                        {activeDays[idx] && <CheckSquare size={14} className="absolute opacity-20" />}
                                        {day}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* 5. Upcoming Assessments */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Upcoming Assessments</CardTitle>
                        <CardDescription>Your schedule for scheduled mock tests and reviews.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {/* Item 1 */}
                            <div className="flex items-center gap-4 p-4 border border-[var(--clr-border)] rounded-lg hover:border-[color:var(--clr-accent)] transition-colors">
                                <div className="p-3 bg-indigo-50 text-[color:var(--clr-accent)] rounded-lg">
                                    <Calendar size={24} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-[color:var(--clr-text-primary)]">DSA Mock Test</h4>
                                    <p className="text-sm text-gray-500">Tomorrow, 10:00 AM</p>
                                </div>
                                <button className="btn btn--secondary h-10 px-4 text-sm">Reschedule</button>
                            </div>

                            {/* Item 2 */}
                            <div className="flex items-center gap-4 p-4 border border-[var(--clr-border)] rounded-lg hover:border-[color:var(--clr-accent)] transition-colors">
                                <div className="p-3 bg-indigo-50 text-[color:var(--clr-accent)] rounded-lg">
                                    <Calendar size={24} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-[color:var(--clr-text-primary)]">System Design Review</h4>
                                    <p className="text-sm text-gray-500">Wednesday, 2:00 PM</p>
                                </div>
                                <button className="btn btn--secondary h-10 px-4 text-sm">Reschedule</button>
                            </div>

                            {/* Item 3 */}
                            <div className="flex items-center gap-4 p-4 border border-[var(--clr-border)] rounded-lg hover:border-[color:var(--clr-accent)] transition-colors">
                                <div className="p-3 bg-indigo-50 text-[color:var(--clr-accent)] rounded-lg">
                                    <Calendar size={24} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-[color:var(--clr-text-primary)]">HR Interview Prep</h4>
                                    <p className="text-sm text-gray-500">Friday, 11:00 AM</p>
                                </div>
                                <button className="btn btn--secondary h-10 px-4 text-sm">Reschedule</button>
                            </div>

                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}

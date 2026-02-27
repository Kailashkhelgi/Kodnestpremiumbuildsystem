import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';
import LivePreview from './LivePreview';
import ATSScore from './ATSScore';
import TemplateTabs from './TemplateTabs';

export default function ResumeBuilder() {
    const { data, setData, loadSampleData } = useResume();

    const updatePersonal = (field, value) => {
        setData(prev => ({ ...prev, personal: { ...prev.personal, [field]: value } }));
    };

    const updateLinks = (field, value) => {
        setData(prev => ({ ...prev, links: { ...prev.links, [field]: value } }));
    };

    // Generic array updater
    const addArrayItem = (field, item) => {
        setData(prev => ({ ...prev, [field]: [...prev[field], item] }));
    };

    const removeArrayItem = (field, id) => {
        setData(prev => ({ ...prev, [field]: prev[field].filter(i => i.id !== id) }));
    };

    const updateArrayItem = (field, id, key, value) => {
        setData(prev => ({ ...prev, [field]: prev[field].map(i => i.id === id ? { ...i, [key]: value } : i) }));
    };

    const getBulletGuidance = (text) => {
        if (!text || text.trim().length === 0) return null;

        const lines = text.split('\n').filter(l => l.trim().length > 0);
        let missingVerb = false;
        let missingNumber = false;

        const verbsRegex = /^(Built|Developed|Designed|Implemented|Led|Improved|Created|Optimized|Automated)\b/i;
        const numberRegex = /[0-9]|%|\bk\b|\bx\b/i;

        lines.forEach(line => {
            const clean = line.replace(/^[\*\-\s]+/, '').trim();
            if (clean.length > 0) {
                if (!verbsRegex.test(clean)) missingVerb = true;
                if (!numberRegex.test(clean)) missingNumber = true;
            }
        });

        const warnings = [];
        if (missingVerb) warnings.push("Start with a strong action verb.");
        if (missingNumber) warnings.push("Add measurable impact (numbers).");

        if (warnings.length === 0) return null;

        return (
            <div className="mt-2 text-xs text-indigo-700 font-medium bg-indigo-50/70 border border-indigo-100 px-3 py-2 rounded">
                <span className="font-bold">Tip:</span> {warnings.join(' ')}
            </div>
        );
    };

    return (
        <div className="flex flex-1 h-full overflow-hidden">
            {/* Left: Form */}
            <div className="w-1/2 overflow-y-auto p-8 border-r border-[var(--clr-border)] bg-[var(--clr-surface)]">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-serif font-semibold text-[color:var(--clr-text-primary)]">Resume Details</h2>
                    <button onClick={loadSampleData} className="btn btn--secondary h-8 px-3 text-xs">Load Sample Data</button>
                </div>

                <ATSScore data={data} />

                <div className="space-y-8">
                    {/* Personal Info */}
                    <section>
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Personal Info</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <input className="form-input" placeholder="Full Name" value={data.personal.name} onChange={e => updatePersonal('name', e.target.value)} />
                            <input className="form-input" placeholder="Email" value={data.personal.email} onChange={e => updatePersonal('email', e.target.value)} />
                            <input className="form-input" placeholder="Phone" value={data.personal.phone} onChange={e => updatePersonal('phone', e.target.value)} />
                            <input className="form-input" placeholder="Location" value={data.personal.location} onChange={e => updatePersonal('location', e.target.value)} />
                        </div>
                    </section>

                    {/* Summary */}
                    <section>
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Professional Summary</h3>
                        <textarea className="form-input h-24 resize-none" placeholder="Brief summary of your background..." value={data.summary} onChange={e => setData(prev => ({ ...prev, summary: e.target.value }))}></textarea>
                    </section>

                    {/* Links */}
                    <section>
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Links</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <input className="form-input" placeholder="GitHub URL" value={data.links.github} onChange={e => updateLinks('github', e.target.value)} />
                            <input className="form-input" placeholder="LinkedIn URL" value={data.links.linkedin} onChange={e => updateLinks('linkedin', e.target.value)} />
                        </div>
                    </section>

                    {/* Education */}
                    <section>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Education</h3>
                            <button onClick={() => addArrayItem('education', { id: Date.now(), school: '', degree: '', year: '' })} className="text-[color:var(--clr-accent)] hover:text-indigo-800 text-sm font-medium flex items-center gap-1"><Plus size={14} /> Add</button>
                        </div>
                        {data.education.map(edu => (
                            <div key={edu.id} className="p-4 border border-[var(--clr-border)] rounded-lg mb-3 bg-white relative group shadow-sm transition-all hover:border-[color:var(--clr-accent)]">
                                <button onClick={() => removeArrayItem('education', edu.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></button>
                                <div className="space-y-3">
                                    <input className="form-input" placeholder="School / University" value={edu.school} onChange={e => updateArrayItem('education', edu.id, 'school', e.target.value)} />
                                    <div className="grid grid-cols-2 gap-3">
                                        <input className="form-input" placeholder="Degree" value={edu.degree} onChange={e => updateArrayItem('education', edu.id, 'degree', e.target.value)} />
                                        <input className="form-input" placeholder="Year (e.g., 2018 - 2022)" value={edu.year} onChange={e => updateArrayItem('education', edu.id, 'year', e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* Experience */}
                    <section>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Experience</h3>
                            <button onClick={() => addArrayItem('experience', { id: Date.now(), company: '', role: '', duration: '', description: '' })} className="text-[color:var(--clr-accent)] hover:text-indigo-800 text-sm font-medium flex items-center gap-1"><Plus size={14} /> Add</button>
                        </div>
                        {data.experience.map(exp => (
                            <div key={exp.id} className="p-4 border border-[var(--clr-border)] rounded-lg mb-3 bg-white relative group shadow-sm transition-all hover:border-[color:var(--clr-accent)]">
                                <button onClick={() => removeArrayItem('experience', exp.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></button>
                                <div className="space-y-3">
                                    <div className="grid grid-cols-2 gap-3">
                                        <input className="form-input" placeholder="Company Name" value={exp.company} onChange={e => updateArrayItem('experience', exp.id, 'company', e.target.value)} />
                                        <input className="form-input" placeholder="Role" value={exp.role} onChange={e => updateArrayItem('experience', exp.id, 'role', e.target.value)} />
                                    </div>
                                    <input className="form-input" placeholder="Duration (e.g., Jan 2020 - Present)" value={exp.duration} onChange={e => updateArrayItem('experience', exp.id, 'duration', e.target.value)} />
                                    <div>
                                        <textarea className="form-input h-20 resize-none !mb-0" placeholder="Description/Responsibilities..." value={exp.description} onChange={e => updateArrayItem('experience', exp.id, 'description', e.target.value)}></textarea>
                                        {getBulletGuidance(exp.description)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* Projects */}
                    <section>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Projects</h3>
                            <button onClick={() => addArrayItem('projects', { id: Date.now(), name: '', link: '', description: '' })} className="text-[color:var(--clr-accent)] hover:text-indigo-800 text-sm font-medium flex items-center gap-1"><Plus size={14} /> Add</button>
                        </div>
                        {data.projects.map(proj => (
                            <div key={proj.id} className="p-4 border border-[var(--clr-border)] rounded-lg mb-3 bg-white relative group shadow-sm transition-all hover:border-[color:var(--clr-accent)]">
                                <button onClick={() => removeArrayItem('projects', proj.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></button>
                                <div className="space-y-3">
                                    <div className="grid grid-cols-2 gap-3">
                                        <input className="form-input" placeholder="Project Name" value={proj.name} onChange={e => updateArrayItem('projects', proj.id, 'name', e.target.value)} />
                                        <input className="form-input" placeholder="Link" value={proj.link} onChange={e => updateArrayItem('projects', proj.id, 'link', e.target.value)} />
                                    </div>
                                    <div>
                                        <textarea className="form-input h-20 resize-none !mb-0" placeholder="Project Description..." value={proj.description} onChange={e => updateArrayItem('projects', proj.id, 'description', e.target.value)}></textarea>
                                        {getBulletGuidance(proj.description)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* Skills */}
                    <section>
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Skills</h3>
                        <input className="form-input" placeholder="React, Node.js, Python..." value={data.skills} onChange={e => setData(prev => ({ ...prev, skills: e.target.value }))} />
                        <p className="text-xs text-gray-500 mt-2">Comma separated values</p>
                    </section>
                </div>
            </div>

            {/* Right: Live Preview */}
            <div className="w-1/2 bg-[var(--clr-surface-alt)] p-8 overflow-y-auto hidden md:block">
                <div className="flex justify-between items-center mb-6 max-w-[700px] mx-auto scale-95 origin-top w-full">
                    <TemplateTabs />
                </div>
                <div className="bg-white shadow-xl rounded w-full min-h-[842px] max-w-[700px] mx-auto p-12 relative scale-95 transform-gpu origin-top -mt-8">
                    {/* Reuse layout from preview component */}
                    <LivePreview data={data} />
                </div>
            </div>
        </div>
    );
}

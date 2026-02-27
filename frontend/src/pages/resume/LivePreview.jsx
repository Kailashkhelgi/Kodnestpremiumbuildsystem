import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

export default function LivePreview({ data }) {
    if (!data) return null;

    const tpl = data.template || 'Classic';

    let wrapperClass = "text-black leading-relaxed";
    let headerClass = "mb-6 pb-4";
    let nameClass = "text-3xl font-bold uppercase tracking-wider mb-2";
    let sectionHeaderClass = "text-sm font-bold uppercase tracking-widest pb-1 mb-2";

    if (tpl === 'Classic') {
        wrapperClass += " font-serif";
        headerClass += " text-center border-b-2 border-black";
        sectionHeaderClass += " border-b border-black";
    } else if (tpl === 'Modern') {
        wrapperClass += " font-sans";
        headerClass += " flex flex-col md:flex-row justify-between items-end border-b border-gray-400";
        nameClass = "text-4xl font-extrabold tracking-tight mb-1 text-black";
        sectionHeaderClass += " border-b-2 border-black";
    } else if (tpl === 'Minimal') {
        wrapperClass += " font-mono text-sm";
        headerClass += " text-left border-b border-black";
        nameClass = "text-2xl font-medium tracking-widest uppercase mb-3";
    }

    return (
        <div className={wrapperClass}>
            {/* Header */}
            <div className={headerClass}>
                <div className={tpl === 'Modern' ? 'text-left' : ''}>
                    <h1 className={nameClass}>{data.personal.name || 'YOUR NAME'}</h1>
                    <div className={`text-sm flex ${tpl === 'Classic' ? 'justify-center' : 'justify-start'} gap-3 text-gray-800 flex-wrap`}>
                        {data.personal.email && <span>{data.personal.email}</span>}
                        {data.personal.phone && <span>• {data.personal.phone}</span>}
                        {data.personal.location && <span>• {data.personal.location}</span>}
                    </div>
                </div>
                <div className={`text-sm flex ${tpl === 'Classic' ? 'justify-center mt-1' : (tpl === 'Modern' ? 'text-right' : 'justify-start mt-1')} gap-3 text-gray-800`}>
                    {data.links?.github && <span>GitHub: {data.links.github}</span>}
                    {data.links?.linkedin && <span>• LinkedIn: {data.links.linkedin}</span>}
                </div>
            </div>

            {/* Content blocks */}
            {data.summary && (
                <div className="mb-5">
                    <h2 className={sectionHeaderClass}>Professional Summary</h2>
                    <p className="text-sm text-gray-900 leading-snug">{data.summary}</p>
                </div>
            )}

            {data.education && data.education.length > 0 && (
                <div className="mb-5">
                    <h2 className={sectionHeaderClass}>Education</h2>
                    {data.education.map(edu => (
                        <div key={edu.id} className="mb-2">
                            <div className="flex justify-between font-bold text-sm">
                                <span>{edu.school || 'School Name'}</span>
                                <span>{edu.year || 'Year'}</span>
                            </div>
                            <div className="italic text-sm text-gray-800">{edu.degree || 'Degree'}</div>
                        </div>
                    ))}
                </div>
            )}

            {data.experience && data.experience.length > 0 && (
                <div className="mb-5">
                    <h2 className={sectionHeaderClass}>Experience</h2>
                    {data.experience.map(exp => (
                        <div key={exp.id} className="mb-3 block">
                            <div className="flex justify-between font-bold text-sm">
                                <span>{exp.role || 'Role'} {exp.role && exp.company ? '•' : ''} {exp.company || 'Company'}</span>
                                <span>{exp.duration || 'Duration'}</span>
                            </div>
                            <p className="text-sm mt-1 whitespace-pre-wrap">{exp.description || 'Description of responsibilities.'}</p>
                        </div>
                    ))}
                </div>
            )}

            {data.projects && data.projects.length > 0 && (
                <div className="mb-5">
                    <h2 className={sectionHeaderClass}>Projects</h2>
                    {data.projects.map(proj => (
                        <div key={proj.id} className="mb-3 block">
                            <div className="flex justify-between font-bold text-sm">
                                <span>{proj.name || 'Project Name'}</span>
                                <div className="text-xs font-normal flex gap-2">
                                    {proj.liveUrl && <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-gray-600 hover:text-black transition-colors"><ExternalLink size={12} /> Live</a>}
                                    {proj.githubUrl && <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-gray-600 hover:text-black transition-colors"><Github size={12} /> GitHub</a>}
                                </div>
                            </div>
                            <p className="text-sm mt-1 whitespace-pre-wrap">{proj.description}</p>
                            {proj.techStack && proj.techStack.length > 0 && (
                                <div className="mt-1.5 flex flex-wrap gap-1">
                                    {proj.techStack.map((tech, i) => (
                                        <span key={i} className="inline-block border border-gray-300 rounded px-1.5 py-0.5 text-[10px] text-gray-600 uppercase tracking-wider">{tech}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {(data.skills?.technical?.length > 0 || data.skills?.soft?.length > 0 || data.skills?.tools?.length > 0 || typeof data.skills === 'string') && (
                <div className="mb-5">
                    <h2 className={sectionHeaderClass}>Skills</h2>

                    {typeof data.skills === 'string' ? (
                        <p className="text-sm">{data.skills}</p>
                    ) : (
                        <div className="space-y-2">
                            {data.skills?.technical?.length > 0 && (
                                <div className="text-sm flex flex-wrap items-center gap-1.5">
                                    <span className="font-bold mr-1">Technical:</span>
                                    {data.skills.technical.map((s, i) => (
                                        <span key={i} className="inline-block bg-gray-100 border border-gray-200 text-gray-800 rounded px-1.5 py-0.5 text-xs">{s}</span>
                                    ))}
                                </div>
                            )}
                            {data.skills?.soft?.length > 0 && (
                                <div className="text-sm flex flex-wrap items-center gap-1.5">
                                    <span className="font-bold mr-1">Soft Skills:</span>
                                    {data.skills.soft.map((s, i) => (
                                        <span key={i} className="inline-block bg-gray-100 border border-gray-200 text-gray-800 rounded px-1.5 py-0.5 text-xs">{s}</span>
                                    ))}
                                </div>
                            )}
                            {data.skills?.tools?.length > 0 && (
                                <div className="text-sm flex flex-wrap items-center gap-1.5">
                                    <span className="font-bold mr-1">Tools:</span>
                                    {data.skills.tools.map((s, i) => (
                                        <span key={i} className="inline-block bg-gray-100 border border-gray-200 text-gray-800 rounded px-1.5 py-0.5 text-xs">{s}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

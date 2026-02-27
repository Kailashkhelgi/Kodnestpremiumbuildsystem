import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

export default function LivePreview({ data }) {
    if (!data) return null;

    const tpl = data.template || 'Classic';
    const accentColor = data.themeColor || 'hsl(168, 60%, 40%)';
    const hasSkills = data.skills?.technical?.length > 0 || data.skills?.soft?.length > 0 || data.skills?.tools?.length > 0 || typeof data.skills === 'string';

    const renderSkills = (isSidebar) => {
        if (!hasSkills) return null;

        const textClass = isSidebar ? "text-white/90 text-sm" : "text-sm text-gray-800";
        const tagClass = isSidebar ? "bg-black/20 text-white border-white/10" : "bg-gray-100 border-gray-200 text-gray-800";

        return (
            <div className="mb-5">
                <h2 className={isSidebar ? "text-sm font-bold uppercase tracking-widest pb-1 mb-3 border-b border-white/30" : "text-sm font-bold uppercase tracking-widest pb-1 mb-2 border-b border-current"}>
                    Skills
                </h2>
                {typeof data.skills === 'string' ? (
                    <p className={`text-sm ${textClass}`}>{data.skills}</p>
                ) : (
                    <div className="space-y-4">
                        {data.skills?.technical?.length > 0 && (
                            <div className={`text-sm flex flex-col gap-1.5 ${textClass}`}>
                                <span className={isSidebar ? "font-bold text-white uppercase text-[10px] tracking-widest" : "font-bold"}>Technical</span>
                                <div className="flex flex-wrap gap-1.5">
                                    {data.skills.technical.map((s, i) => (
                                        <span key={i} className={`inline-block border rounded px-1.5 py-0.5 text-xs ${tagClass}`}>{s}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                        {data.skills?.soft?.length > 0 && (
                            <div className={`text-sm flex flex-col gap-1.5 ${textClass}`}>
                                <span className={isSidebar ? "font-bold text-white uppercase text-[10px] tracking-widest" : "font-bold"}>Soft Skills</span>
                                <div className="flex flex-wrap gap-1.5">
                                    {data.skills.soft.map((s, i) => (
                                        <span key={i} className={`inline-block border rounded px-1.5 py-0.5 text-xs ${tagClass}`}>{s}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                        {data.skills?.tools?.length > 0 && (
                            <div className={`text-sm flex flex-col gap-1.5 ${textClass}`}>
                                <span className={isSidebar ? "font-bold text-white uppercase text-[10px] tracking-widest" : "font-bold"}>Tools</span>
                                <div className="flex flex-wrap gap-1.5">
                                    {data.skills.tools.map((s, i) => (
                                        <span key={i} className={`inline-block border rounded px-1.5 py-0.5 text-xs ${tagClass}`}>{s}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    };

    if (tpl === 'Modern') {
        return (
            <div className="flex w-[calc(100%+8rem)] min-h-[1100px] font-sans -m-16 overflow-hidden bg-white print:m-0 print:w-full">
                <div className="w-[35%] py-12 px-8 text-white h-full min-h-[1100px]" style={{ backgroundColor: accentColor }}>
                    <h1 className="text-3xl font-extrabold mb-1 tracking-tight">{data.personal.name || 'YOUR NAME'}</h1>

                    <div className="mt-8 mb-10 space-y-2 text-sm text-white/90">
                        {data.personal.email && <div>{data.personal.email}</div>}
                        {data.personal.phone && <div>{data.personal.phone}</div>}
                        {data.personal.location && <div>{data.personal.location}</div>}
                        <div className="pt-4 space-y-2 font-medium">
                            {data.links?.github && <div className="break-words">GitHub: {data.links.github}</div>}
                            {data.links?.linkedin && <div className="break-words">LinkedIn: {data.links.linkedin}</div>}
                        </div>
                    </div>

                    {renderSkills(true)}
                </div>

                <div className="w-[65%] py-12 px-10 bg-white text-gray-800 h-full">
                    {data.summary && (
                        <div className="mb-8">
                            <h2 className="text-[13px] font-bold uppercase tracking-widest pb-1.5 mb-3 border-b-2" style={{ borderColor: accentColor, color: accentColor }}>Professional Summary</h2>
                            <p className="text-[13px] leading-relaxed text-gray-600">{data.summary}</p>
                        </div>
                    )}

                    {data.experience && data.experience.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-[13px] font-bold uppercase tracking-widest pb-1.5 mb-4 border-b-2" style={{ borderColor: accentColor, color: accentColor }}>Experience</h2>
                            {data.experience.map(exp => (
                                <div key={exp.id} className="mb-5 block">
                                    <div className="flex justify-between font-bold text-sm text-black">
                                        <span>{exp.role || 'Role'} {exp.role && exp.company ? '•' : ''} {exp.company || 'Company'}</span>
                                        <span className="text-gray-500 font-medium text-xs scale-90 origin-right">{exp.duration || 'Duration'}</span>
                                    </div>
                                    <p className="text-[13px] mt-1.5 whitespace-pre-wrap text-gray-600 leading-relaxed">{exp.description || 'Description of responsibilities.'}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {data.projects && data.projects.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-[13px] font-bold uppercase tracking-widest pb-1.5 mb-4 border-b-2" style={{ borderColor: accentColor, color: accentColor }}>Projects</h2>
                            {data.projects.map(proj => (
                                <div key={proj.id} className="mb-5 block">
                                    <div className="flex justify-between font-bold text-sm text-black mb-1">
                                        <span>{proj.name || 'Project Name'}</span>
                                        <div className="text-[11px] font-medium flex gap-2">
                                            {proj.liveUrl && <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-gray-400 hover:text-black transition-colors"><ExternalLink size={10} /> Live</a>}
                                            {proj.githubUrl && <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-gray-400 hover:text-black transition-colors"><Github size={10} /> Source</a>}
                                        </div>
                                    </div>
                                    <p className="text-[13px] mt-1 whitespace-pre-wrap text-gray-600 leading-relaxed">{proj.description}</p>
                                    {proj.techStack && proj.techStack.length > 0 && (
                                        <div className="mt-2 flex flex-wrap gap-1">
                                            {proj.techStack.map((tech, i) => (
                                                <span key={i} className="inline-block bg-gray-50 border border-gray-200 rounded px-1.5 text-[9px] font-bold text-gray-500 uppercase tracking-widest py-0.5">{tech}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {data.education && data.education.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-[13px] font-bold uppercase tracking-widest pb-1.5 mb-4 border-b-2" style={{ borderColor: accentColor, color: accentColor }}>Education</h2>
                            {data.education.map(edu => (
                                <div key={edu.id} className="mb-3">
                                    <div className="flex justify-between font-bold text-sm text-black">
                                        <span>{edu.school || 'School Name'}</span>
                                        <span className="text-gray-500 font-medium text-xs scale-90 origin-right">{edu.year || 'Year'}</span>
                                    </div>
                                    <div className="text-[13px] text-gray-600 mt-0.5">{edu.degree || 'Degree'}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Classic / Minimal
    let wrapperClass = "text-black leading-relaxed";
    let headerClass = "mb-6 pb-4";
    let nameClass = "text-3xl font-bold uppercase tracking-wider mb-2";
    let sectionHeaderClass = "text-[13px] font-bold uppercase tracking-widest pb-1.5 mb-3";

    // CSS rules based strictly on standard formatting
    const ruleStyle = tpl === 'Classic' ? { borderColor: accentColor } : { borderColor: 'transparent' };
    const headingStyle = tpl === 'Classic' ? { color: accentColor } : {};

    if (tpl === 'Classic') {
        wrapperClass += " font-serif";
        headerClass += " text-center border-b-2";
        sectionHeaderClass += " border-b mt-6";
    } else { // Minimal
        wrapperClass += " font-sans text-[13px]";
        headerClass += " text-left border-b border-gray-100 mt-2 mb-8 pb-8";
        sectionHeaderClass += " mb-4 font-semibold tracking-widest mt-8";
        nameClass = "text-2xl font-bold uppercase mb-2 text-gray-900";
    }

    return (
        <div className={wrapperClass}>
            {/* Header */}
            <div className={headerClass} style={ruleStyle}>
                <h1 className={nameClass} style={headingStyle}>{data.personal.name || 'YOUR NAME'}</h1>
                <div className={`text-[13px] flex ${tpl === 'Classic' ? 'justify-center' : 'justify-start'} gap-3 flex-wrap ${tpl === 'Minimal' ? 'text-gray-500 font-medium' : 'text-gray-600'}`}>
                    {data.personal.email && <span>{data.personal.email}</span>}
                    {data.personal.phone && <span>• {data.personal.phone}</span>}
                    {data.personal.location && <span>• {data.personal.location}</span>}
                </div>
                {(data.links?.github || data.links?.linkedin) && (
                    <div className={`text-[13px] flex ${tpl === 'Classic' ? 'justify-center mt-1' : 'justify-start mt-1'} gap-3 font-medium ${tpl === 'Minimal' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {data.links?.github && <span>GitHub: {data.links.github}</span>}
                        {data.links?.linkedin && <span>• LinkedIn: {data.links.linkedin}</span>}
                    </div>
                )}
            </div>

            {/* Content blocks */}
            {data.summary && (
                <div className="mb-5">
                    <h2 className={sectionHeaderClass} style={{ ...ruleStyle, ...headingStyle }}>Professional Summary</h2>
                    <p className={`text-[13px] leading-relaxed ${tpl === 'Minimal' ? 'text-gray-600' : 'text-gray-800'}`}>{data.summary}</p>
                </div>
            )}

            {data.experience && data.experience.length > 0 && (
                <div className="mb-5">
                    <h2 className={sectionHeaderClass} style={{ ...ruleStyle, ...headingStyle }}>Experience</h2>
                    {data.experience.map(exp => (
                        <div key={exp.id} className="mb-4 block">
                            <div className="flex justify-between font-bold text-[13px]">
                                <span>{exp.role || 'Role'} {exp.role && exp.company ? '•' : ''} {exp.company || 'Company'}</span>
                                <span className={tpl === 'Minimal' ? 'text-gray-400' : ''}>{exp.duration || 'Duration'}</span>
                            </div>
                            <p className={`text-[13px] mt-1.5 whitespace-pre-wrap leading-relaxed ${tpl === 'Minimal' ? 'text-gray-600' : ''}`}>{exp.description || 'Description of responsibilities.'}</p>
                        </div>
                    ))}
                </div>
            )}

            {data.projects && data.projects.length > 0 && (
                <div className="mb-5">
                    <h2 className={sectionHeaderClass} style={{ ...ruleStyle, ...headingStyle }}>Projects</h2>
                    {data.projects.map(proj => (
                        <div key={proj.id} className="mb-4 block">
                            <div className="flex justify-between font-bold text-[13px] mb-1">
                                <span>{proj.name || 'Project Name'}</span>
                                <div className={`text-[11px] font-normal flex gap-2 ${tpl === 'Minimal' ? 'text-gray-400' : ''}`}>
                                    {proj.liveUrl && <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-black transition-colors"><ExternalLink size={10} /> Live</a>}
                                    {proj.githubUrl && <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-black transition-colors"><Github size={10} /> Source</a>}
                                </div>
                            </div>
                            <p className={`text-[13px] mt-1 whitespace-pre-wrap leading-relaxed ${tpl === 'Minimal' ? 'text-gray-600' : ''}`}>{proj.description}</p>
                            {proj.techStack && proj.techStack.length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-1">
                                    {proj.techStack.map((tech, i) => (
                                        <span key={i} className={`inline-block border rounded px-1.5 text-[9px] uppercase tracking-wider py-0.5 ${tpl === 'Classic' ? 'border-gray-300 text-gray-500 font-bold' : 'bg-gray-50 border-gray-200 text-gray-500 font-medium'}`}>{tech}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {data.education && data.education.length > 0 && (
                <div className="mb-5">
                    <h2 className={sectionHeaderClass} style={{ ...ruleStyle, ...headingStyle }}>Education</h2>
                    {data.education.map(edu => (
                        <div key={edu.id} className="mb-3 block">
                            <div className="flex justify-between font-bold text-[13px]">
                                <span>{edu.school || 'School Name'}</span>
                                <span className={tpl === 'Minimal' ? 'text-gray-400' : ''}>{edu.year || 'Year'}</span>
                            </div>
                            <div className={`italic text-[13px] mt-0.5 ${tpl === 'Minimal' ? 'text-gray-500' : 'text-gray-800'}`}>{edu.degree || 'Degree'}</div>
                        </div>
                    ))}
                </div>
            )}

            {!hasSkills ? null : (
                <div className="mb-5">
                    <h2 className={sectionHeaderClass} style={{ ...ruleStyle, ...headingStyle }}>Skills</h2>

                    {typeof data.skills === 'string' ? (
                        <p className={`text-[13px] ${tpl === 'Minimal' ? 'text-gray-600' : ''}`}>{data.skills}</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {data.skills?.technical?.length > 0 && (
                                <div className="text-[13px] flex flex-col gap-1.5">
                                    <span className="font-bold text-gray-900">Technical</span>
                                    <div className="flex flex-wrap gap-1">
                                        {data.skills.technical.map((s, i) => (
                                            <span key={i} className={`inline-block border rounded px-1.5 text-[10px] uppercase font-medium tracking-wide py-0.5 ${tpl === 'Classic' ? 'border-gray-300 text-gray-600 font-bold' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>{s}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {data.skills?.soft?.length > 0 && (
                                <div className="text-[13px] flex flex-col gap-1.5">
                                    <span className="font-bold text-gray-900">Soft Skills</span>
                                    <div className="flex flex-wrap gap-1">
                                        {data.skills.soft.map((s, i) => (
                                            <span key={i} className={`inline-block border rounded px-1.5 text-[10px] uppercase font-medium tracking-wide py-0.5 ${tpl === 'Classic' ? 'border-gray-300 text-gray-600 font-bold' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>{s}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {data.skills?.tools?.length > 0 && (
                                <div className="text-[13px] flex flex-col gap-1.5">
                                    <span className="font-bold text-gray-900">Tools</span>
                                    <div className="flex flex-wrap gap-1">
                                        {data.skills.tools.map((s, i) => (
                                            <span key={i} className={`inline-block border rounded px-1.5 text-[10px] uppercase font-medium tracking-wide py-0.5 ${tpl === 'Classic' ? 'border-gray-300 text-gray-600 font-bold' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>{s}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

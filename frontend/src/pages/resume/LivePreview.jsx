import React from 'react';

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
                                <span className="text-xs font-normal underline">{proj.link}</span>
                            </div>
                            <p className="text-sm mt-1 whitespace-pre-wrap">{proj.description}</p>
                        </div>
                    ))}
                </div>
            )}

            {data.skills && (
                <div className="mb-5">
                    <h2 className={sectionHeaderClass}>Skills</h2>
                    <p className="text-sm">{data.skills}</p>
                </div>
            )}
        </div>
    );
}

import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import LivePreview from './LivePreview';
import TemplateTabs from './TemplateTabs';
import { Printer, Copy, AlertCircle, Check } from 'lucide-react';

export default function ResumePreview() {
    const { data } = useResume();
    const [copied, setCopied] = useState(false);
    const validateData = () => {
        const warnings = [];
        if (!data.personal.name || data.personal.name.trim() === '') {
            warnings.push("Name");
        }
        if ((!data.experience || data.experience.length === 0) && (!data.projects || data.projects.length === 0)) {
            warnings.push("At least one project or experience");
        }
        return warnings;
    };

    const warnings = validateData();

    const handlePrint = () => {
        window.print();
    };

    const handleCopyText = () => {
        let text = `${data.personal.name || 'YOUR NAME'}\n`;

        const contact = [data.personal.email, data.personal.phone, data.personal.location].filter(Boolean);
        if (contact.length) text += `${contact.join(' | ')}\n`;

        const links = [data.links?.github, data.links?.linkedin].filter(Boolean);
        if (links.length) text += `${links.join(' | ')}\n`;

        text += '\n';

        if (data.summary) text += `SUMMARY\n${data.summary}\n\n`;

        if (data.education && data.education.length > 0) {
            text += `EDUCATION\n`;
            data.education.forEach(edu => {
                text += `${edu.school || ''} | ${edu.year || ''}\n${edu.degree || ''}\n\n`;
            });
        }

        if (data.experience && data.experience.length > 0) {
            text += `EXPERIENCE\n`;
            data.experience.forEach(exp => {
                text += `${exp.role || ''} | ${exp.company || ''} | ${exp.duration || ''}\n${exp.description || ''}\n\n`;
            });
        }

        if (data.projects && data.projects.length > 0) {
            text += `PROJECTS\n`;
            data.projects.forEach(proj => {
                text += `${proj.name || ''} ${proj.link ? `| ${proj.link}` : ''}\n${proj.description || ''}\n\n`;
            });
        }

        if (data.skills) text += `SKILLS\n${data.skills}\n`;

        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex-1 overflow-y-auto bg-[var(--clr-surface-alt)] py-12 flex flex-col items-center">

            {warnings.length > 0 && (
                <div className="mb-6 max-w-[850px] w-full bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded flex items-start gap-3 justify-center no-print">
                    <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                    <div className="text-sm">
                        <span className="font-semibold block mb-1">Your resume may look incomplete. Missing:</span>
                        <ul className="list-disc pl-4 space-y-0.5">
                            {warnings.map(w => <li key={w}>{w}</li>)}
                        </ul>
                    </div>
                </div>
            )}

            <div className="mb-6 max-w-[850px] w-full flex justify-between items-center no-print z-10 relative">
                <TemplateTabs />
                <div className="flex gap-3">
                    <button onClick={handleCopyText} className="btn btn--secondary h-10 px-4 bg-white hover:bg-gray-50 flex items-center gap-2">
                        {copied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
                        {copied ? 'Copied' : 'Copy as Text'}
                    </button>
                    <button onClick={handlePrint} className="btn btn--primary h-10 px-6 flex items-center gap-2 shadow-sm">
                        <Printer size={16} /> Print / Save as PDF
                    </button>
                </div>
            </div>

            <div className="bg-white shadow-2xl w-full max-w-[850px] min-h-[1100px] p-16 print-container relative z-0">
                <LivePreview data={data} />
            </div>
        </div>
    );
}

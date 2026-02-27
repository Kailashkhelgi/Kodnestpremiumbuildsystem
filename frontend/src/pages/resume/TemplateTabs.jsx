import React from 'react';
import { useResume } from '../../context/ResumeContext';

export default function TemplateTabs() {
    const { data, setData } = useResume();
    const current = data.template || 'Classic';

    return (
        <div className="flex bg-white rounded-lg p-1 border border-[var(--clr-border)] shadow-sm max-w-fit mb-4">
            {['Classic', 'Modern', 'Minimal'].map(tpl => (
                <button
                    key={tpl}
                    onClick={() => setData(prev => ({ ...prev, template: tpl }))}
                    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${current === tpl ? 'bg-indigo-50 text-[color:var(--clr-accent)] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                >
                    {tpl}
                </button>
            ))}
        </div>
    );
}

import React from 'react';
import { useResume } from '../../context/ResumeContext';
import LivePreview from './LivePreview';
import TemplateTabs from './TemplateTabs';

export default function ResumePreview() {
    const { data } = useResume();
    return (
        <div className="flex-1 overflow-y-auto bg-[var(--clr-surface-alt)] py-12 flex flex-col items-center">
            <div className="mb-6 max-w-[850px] w-full flex justify-center">
                <TemplateTabs />
            </div>
            <div className="bg-white shadow-2xl w-full max-w-[850px] min-h-[1100px] p-16">
                <LivePreview data={data} />
            </div>
        </div>
    );
}

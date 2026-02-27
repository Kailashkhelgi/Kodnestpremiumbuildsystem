import React from 'react';
import { useResume } from '../../context/ResumeContext';
import LivePreview from './LivePreview';

export default function ResumePreview() {
    const { data } = useResume();
    return (
        <div className="flex-1 overflow-y-auto bg-[var(--clr-surface-alt)] py-12 flex justify-center">
            <div className="bg-white shadow-2xl w-full max-w-[850px] min-h-[1100px] p-16">
                <LivePreview data={data} />
            </div>
        </div>
    );
}

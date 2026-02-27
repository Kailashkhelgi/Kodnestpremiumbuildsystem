import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Check } from 'lucide-react';

export default function TemplateTabs() {
    const { data, setData } = useResume();
    const currentTpl = data.template || 'Classic';
    const currentColor = data.themeColor || 'hsl(168, 60%, 40%)';

    const colors = [
        { name: 'Teal', value: 'hsl(168, 60%, 40%)' },
        { name: 'Navy', value: 'hsl(220, 60%, 35%)' },
        { name: 'Burgundy', value: 'hsl(345, 60%, 35%)' },
        { name: 'Forest', value: 'hsl(150, 50%, 30%)' },
        { name: 'Charcoal', value: 'hsl(0, 0%, 25%)' }
    ];

    const templates = [
        { id: 'Classic', label: 'Classic' },
        { id: 'Modern', label: 'Modern' },
        { id: 'Minimal', label: 'Minimal' }
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-100/50 w-full mb-6 no-print">
            <div className="mb-6">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Template Picker</div>
                <div className="flex gap-4 justify-center sm:justify-start">
                    {templates.map(t => (
                        <div
                            key={t.id}
                            onClick={() => setData(prev => ({ ...prev, template: t.id }))}
                            className={`relative cursor-pointer w-[120px] aspect-[1/1.3] bg-gray-50 rounded-lg border-2 transition-all ${currentTpl === t.id ? 'border-blue-500 shadow-md ring-2 ring-blue-500/20' : 'border-gray-200 hover:border-gray-300'}`}
                        >
                            {/* Visual representation of templates */}
                            {t.id === 'Classic' && (
                                <div className="absolute inset-2 flex flex-col gap-1.5 p-1 bg-white border border-gray-100 shadow-sm overflow-hidden">
                                    <div className="h-2 w-3/4 mx-auto bg-gray-300 rounded-[1px] mt-1"></div>
                                    <div className="w-full border-b border-gray-300 my-0.5"></div>
                                    <div className="h-1.5 w-1/3 bg-gray-300 rounded-[1px]"></div>
                                    <div className="h-1 w-full bg-gray-200 rounded-[1px]"></div>
                                    <div className="h-1 w-5/6 bg-gray-200 rounded-[1px]"></div>
                                    <div className="w-full border-b border-gray-300 my-0.5"></div>
                                    <div className="h-1.5 w-1/3 bg-gray-300 rounded-[1px]"></div>
                                    <div className="h-1 w-full bg-gray-200 rounded-[1px]"></div>
                                </div>
                            )}
                            {t.id === 'Modern' && (
                                <div className="absolute inset-2 flex bg-white border border-gray-100 shadow-sm overflow-hidden">
                                    <div className="w-[35%] h-full bg-gray-300 p-1 flex flex-col gap-1.5">
                                        <div className="h-2.5 w-full bg-gray-500 rounded-[1px] mt-1"></div>
                                        <div className="h-1 w-full bg-gray-400 rounded-[1px] mt-2"></div>
                                        <div className="h-1 w-4/5 bg-gray-400 rounded-[1px]"></div>
                                        <div className="h-1 w-4/5 bg-gray-400 rounded-[1px] mt-2"></div>
                                    </div>
                                    <div className="w-[65%] h-full p-1.5 flex flex-col gap-1">
                                        <div className="h-1.5 w-1/3 bg-gray-300 rounded-[1px] mt-1"></div>
                                        <div className="h-1 w-full bg-gray-200 rounded-[1px]"></div>
                                        <div className="h-1 w-5/6 bg-gray-200 rounded-[1px]"></div>
                                        <div className="h-1.5 w-1/3 bg-gray-300 rounded-[1px] mt-2"></div>
                                        <div className="h-1 w-full bg-gray-200 rounded-[1px]"></div>
                                    </div>
                                </div>
                            )}
                            {t.id === 'Minimal' && (
                                <div className="absolute inset-2 flex flex-col gap-1.5 p-1.5 bg-white border border-gray-100 shadow-sm overflow-hidden">
                                    <div className="h-2.5 w-1/2 bg-gray-300 rounded-[1px]"></div>
                                    <div className="h-1 w-1/3 bg-gray-200 rounded-[1px] mb-1"></div>
                                    <div className="h-1.5 w-1/4 bg-gray-300 rounded-[1px] mt-1"></div>
                                    <div className="flex gap-2">
                                        <div className="h-1 w-1/4 bg-gray-200 rounded-[1px]"></div>
                                        <div className="h-1 w-2/3 bg-gray-100 rounded-[1px]"></div>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="h-1 w-1/4 bg-gray-200 rounded-[1px]"></div>
                                        <div className="h-1 w-1/2 bg-gray-100 rounded-[1px]"></div>
                                    </div>
                                </div>
                            )}

                            {currentTpl === t.id && (
                                <div className="absolute -top-2.5 -right-2.5 bg-blue-500 text-white rounded-full p-0.5 shadow-sm border border-white">
                                    <Check size={14} strokeWidth={3} />
                                </div>
                            )}
                            <div className="absolute -bottom-6 w-full text-center text-[10px] font-bold text-gray-500">{t.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-8 pt-5 border-t border-gray-100">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Color Theme</div>
                <div className="flex gap-3 justify-center sm:justify-start">
                    {colors.map(c => (
                        <button
                            key={c.name}
                            onClick={() => setData(prev => ({ ...prev, themeColor: c.value }))}
                            className={`w-7 h-7 rounded-full transition-all focus:outline-none ${currentColor === c.value ? 'scale-110 ring-2 ring-offset-2 ring-gray-400 shadow-md' : 'border-transparent hover:scale-110 shadow-sm opacity-90 hover:opacity-100'}`}
                            style={{ backgroundColor: c.value }}
                            title={c.name}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function TagInput({ tags = [], onChange, placeholder }) {
    const [input, setInput] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const val = input.trim();
            if (val && !tags.includes(val)) {
                onChange([...tags, val]);
                setInput('');
            }
        }
    };

    const removeTag = (tagToRemove) => {
        onChange(tags.filter(tag => tag !== tagToRemove));
    };

    return (
        <div className="w-full border border-[var(--clr-border)] rounded-md bg-white focus-within:border-[var(--clr-text-primary)] transition-colors">
            <div className="flex flex-wrap gap-2 p-2">
                {tags.map((tag, idx) => (
                    <span key={idx} className="flex items-center gap-1 bg-gray-100 text-sm px-2 py-1 rounded border border-gray-200 text-gray-800">
                        {tag}
                        <button type="button" onClick={() => removeTag(tag)} className="text-gray-400 hover:text-red-500 w-4 h-4 flex items-center justify-center rounded-full bg-white shadow-sm border border-gray-100 hover:border-red-200 ml-1">
                            <X size={10} />
                        </button>
                    </span>
                ))}
                <input
                    className="flex-1 outline-none min-w-[120px] text-sm py-1 bg-transparent text-[var(--clr-text-primary)]"
                    placeholder={tags.length === 0 ? placeholder : ''}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </div>
    );
}

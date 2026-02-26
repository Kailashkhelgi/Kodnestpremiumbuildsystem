export default function Resources() {
    return (
        <div className="card w-full border-l-4 border-l-[color:var(--clr-accent)]">
            <h2 className="text-2xl font-serif mb-4">Preparation Toolkit</h2>
            <p className="text-gray-600">Company-wise interview questions and curated articles.</p>
            <ul className="mt-6 flex flex-col gap-3 text-[color:var(--clr-accent)] underline">
                <li>Top 50 Backend Questions</li>
                <li>System Design Masterclass</li>
                <li>Frontend Architecture Guidelines</li>
            </ul>
        </div>
    );
}

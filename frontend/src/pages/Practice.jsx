export default function Practice() {
    return (
        <div className="card w-full text-center">
            <div className="flex justify-center mb-6 mt-8">
                <div className="p-4 bg-indigo-50 text-[color:var(--clr-accent)] rounded-lg">
                    MOCK PRACTICE PROBLEMS
                </div>
            </div>
            <h2 className="card__title !mb-4 !border-none text-2xl">Practice Module</h2>
            <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                Solve over 300+ data structures, algorithms, and system design problems crafted by industry experts.
            </p>
            <button className="btn btn--primary">Start Daily Challenge</button>
        </div>
    );
}

export default function DashboardOverview() {
    return (
        <div className="card w-full">
            <h3 className="card__title">Welcome Back!</h3>
            <p className="text-gray-600 mb-6">
                You are making great progress today. Complete your pending mock interviews to unlock higher tier resources.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mt-4">
                <div className="border border-[var(--clr-border)] rounded p-6 bg-white shadow-sm">
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Problems Solved</h4>
                    <div className="text-3xl font-serif">42 / 100</div>
                </div>
                <div className="border border-[var(--clr-border)] rounded p-6 bg-white shadow-sm">
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Interviews Token</h4>
                    <div className="text-3xl font-serif">2</div>
                </div>
                <div className="border border-[var(--clr-border)] rounded p-6 bg-white shadow-sm">
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Assessments Run</h4>
                    <div className="text-3xl font-serif">7</div>
                </div>
                <div className="border border-[var(--clr-border)] rounded p-6 bg-white shadow-sm">
                    <h4 className="text-sm font-medium text-[color:var(--clr-accent)] mb-2">Current Tier</h4>
                    <div className="text-3xl font-serif text-[color:var(--clr-accent)]">Silver</div>
                </div>
            </div>
        </div>
    );
}

export default function Profile() {
    return (
        <div className="card max-w-2xl mx-auto">
            <div className="flex items-center gap-6 mb-8 border-b pb-6 border-[var(--clr-border)]">
                <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center text-3xl font-serif text-[color:var(--clr-accent)]">
                    JD
                </div>
                <div>
                    <h2 className="text-3xl font-serif">John Doe</h2>
                    <p className="text-gray-500">Full Stack Aspirant • Tier A Member</p>
                </div>
            </div>

            <div className="flex flex-col gap-4 text-gray-700">
                <div className="flex justify-between border-b pb-2 border-gray-100"><span className="font-semibold text-gray-800">Email</span> j.doe@student.kodnest.com</div>
                <div className="flex justify-between border-b pb-2 border-gray-100"><span className="font-semibold text-gray-800">Phone</span> +91 98765 43210</div>
                <div className="flex justify-between border-b pb-2 border-gray-100"><span className="font-semibold text-gray-800">Location</span> Bengaluru, India</div>
            </div>
        </div>
    );
}

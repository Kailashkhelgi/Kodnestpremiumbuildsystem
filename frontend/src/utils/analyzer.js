export const SKILL_CATEGORIES = {
    "Core CS": ["dsa", "oop", "dbms", "os", "networks", "data structures", "algorithms", "operating systems"],
    "Languages": ["java", "python", "javascript", "typescript", "c", "c++", "c#", "go", "ruby"],
    "Web": ["react", "next.js", "node.js", "node", "express", "rest", "graphql", "spring boot", "django"],
    "Data": ["sql", "mongodb", "postgresql", "mysql", "redis", "nosql"],
    "Cloud/DevOps": ["aws", "azure", "gcp", "docker", "kubernetes", "ci/cd", "linux"],
    "Testing": ["selenium", "cypress", "playwright", "junit", "pytest", "jest"]
};

const QUESTION_BANK = {
    sql: "Explain indexing and when it helps.",
    react: "Explain state management options in React.",
    dsa: "How would you optimize search in sorted data?",
    java: "Explain the difference between abstract classes and interfaces in Java.",
    python: "What are decorators and how do they work behind the scenes?",
    javascript: "Can you explain closures and the event loop?",
    "c++": "Explain memory management and smart pointers in C++.",
    "node.js": "How does Node.js handle asynchronous operations despite being single-threaded?",
    docker: "What is the difference between an image and a container?",
    kubernetes: "How do Deployments differ from StatefulSets?",
    mongodb: "When would you choose an unstructured NoSQL database over a relational database?",
    aws: "Explain the difference between EC2 and Lambda.",
    cypress: "What makes Cypress different from Selenium?",
    oop: "Can you give a real-world example of polymorphism?",
    rest: "What are true RESTful architectural constraints?",
    "ci/cd": "Describe the stages of a standard CI/CD pipeline."
};

export function analyzeJD(jdText, company, role) {
    const text = jdText.toLowerCase();

    // 1. Extract Skills
    const extractedSkills = {};
    let totalCategoriesDetected = 0;

    Object.keys(SKILL_CATEGORIES).forEach(category => {
        const found = SKILL_CATEGORIES[category].filter(skill => text.includes(skill.toLowerCase()));
        if (found.length > 0) {
            // Deduplicate and prioritize explicit naming
            extractedSkills[category] = Array.from(new Set(found));
            totalCategoriesDetected++;
        }
    });

    const allDetectedSkills = Object.values(extractedSkills).flat();
    const hasFormatting = allDetectedSkills.length > 0;

    // 2. Generate Checklist
    const checklist = [
        {
            round: "Round 1: Aptitude / Basics",
            items: [
                "Time & Work, Speed & Distance math problems",
                "Logical reasoning and pattern detection",
                "Basic verbal comprehension",
                "Core foundational programming questions",
                hasFormatting ? "General language syntax review" : "General fresher Aptitude review"
            ]
        },
        {
            round: "Round 2: DSA + Core CS",
            items: [
                "Arrays, Strings, and Maps implementation",
                "Sorting & searching algorithms",
                extractedSkills["Core CS"]?.includes("oop") ? "Object-Oriented Design patterns" : "Basic OOP concepts",
                extractedSkills["Core CS"]?.includes("dbms") ? "Database normalization and basic queries" : "Memory management overview",
                "Time & Space complexity analysis"
            ]
        },
        {
            round: "Round 3: Tech Interview (Projects + Stack)",
            items: [
                "In-depth explanation of recent projects",
                extractedSkills["Web"] ? `Deep dive into web stack (${extractedSkills["Web"].join(", ")})` : "General web knowledge",
                extractedSkills["Data"] ? `Database optimizations (${extractedSkills["Data"].join(", ")})` : "Data persistence concepts",
                extractedSkills["Cloud/DevOps"] ? "Deployment architectures discussion" : "Code versioning (Git) practices",
                "Handling edge cases in API development"
            ]
        },
        {
            round: "Round 4: Managerial / HR",
            items: [
                "Introduction and background walkthrough",
                "Discussion on strengths and weaknesses",
                "Behavioral questions (STAR method)",
                `Why do you want to join ${company || "our company"}?`,
                "Salary expectations and notice period"
            ]
        }
    ];

    // 3. Generate 7-Day Plan
    const plan = [
        { day: "Day 1-2", focus: "Basics + Core CS", detail: "Revise OOP, DBMS, OS concepts. Practice easy array/string problems." },
        { day: "Day 3-4", focus: "DSA + Coding Practice", detail: "Focus on Trees, Graphs, DP. Complete 10 mid-level LeetCode problems." },
        { day: "Day 5", focus: "Project + Resume Alignment", detail: `Map resume points to JD skills: ${allDetectedSkills.slice(0, 3).join(", ") || "General tech"}.` },
        { day: "Day 6", focus: "Mock Interview Questions", detail: "Do a 1-hour P2P mock interview focusing on technical depth." },
        { day: "Day 7", focus: "Revision + Weak Areas", detail: "Review behavioral answers, read company core values, rest." }
    ];

    if (extractedSkills["Web"]?.includes("react")) {
        plan[2].detail += " Include React lifecycle/hooks revision.";
    }

    // 4. Generate 10 Questions
    let questions = [];
    allDetectedSkills.forEach(skill => {
        if (QUESTION_BANK[skill.toLowerCase()] && questions.length < 10) {
            questions.push({ skill, q: QUESTION_BANK[skill.toLowerCase()] });
        }
    });

    // Fill up to 10 with generic if needed
    const genericQuestions = [
        "Tell me about a time you solved a difficult technical problem.",
        "How do you ensure your code is maintainable and scalable?",
        "Explain an architectural decision you made in a recent project.",
        "How do you handle disagreements with team members over code?",
        "Describe your debugging process when facing a critical production bug.",
        "What is the most interesting technical challenge you've faced?",
        "How do you stay updated with new technologies?",
        "Can you explain the difference between processes and threads?",
        "What comes to mind when you hear 'Clean Code'?",
        "Where do you see yourself technically in 3 years?"
    ];

    while (questions.length < 10 && genericQuestions.length > 0) {
        questions.push({ skill: "General", q: genericQuestions.shift() });
    }

    // 5. Readiness Score
    let score = 35;
    score += Math.min(totalCategoriesDetected * 5, 30);
    if (company && company.trim().length > 0) score += 10;
    if (role && role.trim().length > 0) score += 10;
    if (jdText.length > 800) score += 10;

    if (score > 100) score = 100;

    return {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        company: company || "Unknown Company",
        role: role || "General Developer",
        jdText,
        extractedSkills: hasFormatting ? extractedSkills : { "General": ["General fresher stack"] },
        plan,
        checklist,
        questions,
        readinessScore: score
    };
}

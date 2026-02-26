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
    const extractedSkills = {
        coreCS: [],
        languages: [],
        web: [],
        data: [],
        cloud: [],
        testing: [],
        other: []
    };

    const categoryMap = {
        "Core CS": "coreCS",
        "Languages": "languages",
        "Web": "web",
        "Data": "data",
        "Cloud/DevOps": "cloud",
        "Testing": "testing"
    };

    let totalCategoriesDetected = 0;

    Object.keys(SKILL_CATEGORIES).forEach(category => {
        const found = SKILL_CATEGORIES[category].filter(skill => text.includes(skill.toLowerCase()));
        if (found.length > 0) {
            // Deduplicate and prioritize explicit naming
            extractedSkills[categoryMap[category]] = Array.from(new Set(found));
            totalCategoriesDetected++;
        }
    });

    const allDetectedSkills = Object.values(extractedSkills).flat();
    const hasFormatting = allDetectedSkills.length > 0;

    if (!hasFormatting) {
        extractedSkills.other = ["Communication", "Problem solving", "Basic coding", "Projects"];
    }

    // 1b. Generate Company Intel
    const knownEnterprises = ["amazon", "microsoft", "google", "meta", "apple", "netflix", "infosys", "tcs", "wipro", "accenture", "cognizant", "ibm", "oracle", "cisco", "intel", "adobe", "salesforce"];

    let companySize = "Startup (<200)";
    let industry = "Technology Services";
    let typicalFocus = "Practical problem solving, rapid development, and stack depth.";

    const compLower = (company || "").toLowerCase();

    if (compLower) {
        if (knownEnterprises.some(e => compLower.includes(e))) {
            companySize = "Enterprise (2000+)";
            typicalFocus = "Structured DSA, core CS fundamentals, and scalable system design.";
        } else if (compLower.includes("bank") || compLower.includes("finance") || compLower.includes("capital")) {
            industry = "FinTech / Banking";
            companySize = "Mid-size (200-2000)";
            typicalFocus = "Security, robust testing, and complex data handling.";
        } else if (compLower.includes("health") || compLower.includes("med")) {
            industry = "HealthTech";
        }
    }

    const companyIntel = {
        name: company || "Unknown Company",
        industry,
        size: companySize,
        typicalFocus
    };

    // 1c. Dynamic Round Mapping Engine
    const roundMapping = [];
    const isEnterprise = companySize === "Enterprise (2000+)";
    const hasReactNode = extractedSkills.web.includes("react") || extractedSkills.web.includes("node.js") || extractedSkills.web.includes("express");
    const hasDSA = extractedSkills.coreCS.includes("dsa") || extractedSkills.coreCS.includes("algorithms");

    if (isEnterprise || hasDSA) {
        roundMapping.push({ roundTitle: "Round 1: Online Assessment (OA)", focusAreas: ["Aptitude", "Basic coding", "Core CS MCQs"], whyItMatters: "Enterprises use OAs to filter thousands of initial applications." });
        roundMapping.push({ roundTitle: "Round 2: Technical Interview I", focusAreas: ["Medium/Hard DSA", "Problem-solving"], whyItMatters: "Tests your ability to write optimized code under pressure." });
        roundMapping.push({ roundTitle: "Round 3: Technical Interview II", focusAreas: ["Low Level Design (LLD)", "Core CS depth"], whyItMatters: "Evaluates architectural thinking and OOP application." });
        roundMapping.push({ roundTitle: "Round 4: Managerial / HR", focusAreas: ["Behavioral fit", "Leadership principles"], whyItMatters: "Checks culture fit and long-term retention probability." });
    } else {
        roundMapping.push({ roundTitle: "Round 1: Take-home Assignment", focusAreas: ["Practical feature implementation"], whyItMatters: "Startups need engineers who can ship code immediately." });
        roundMapping.push({ roundTitle: "Round 2: Technical Dive", focusAreas: hasReactNode ? ["State management", "APIs", "Rendering"] : ["Deep dive into your primary language/framework"], whyItMatters: "Validates your resume claims against real-world tasks." });
        roundMapping.push({ roundTitle: "Round 3: Culture Fit", focusAreas: ["Vision", "Pace", "Adaptability"], whyItMatters: "Startups require highly autonomous, adaptable individuals." });
    }

    // 2. Generate Checklist
    const checklist = [
        {
            roundTitle: "Round 1: Aptitude / Basics",
            items: [
                "Time & Work, Speed & Distance math problems",
                "Logical reasoning and pattern detection",
                "Basic verbal comprehension",
                "Core foundational programming questions",
                hasFormatting ? "General language syntax review" : "General fresher Aptitude review"
            ]
        },
        {
            roundTitle: "Round 2: DSA + Core CS",
            items: [
                "Arrays, Strings, and Maps implementation",
                "Sorting & searching algorithms",
                extractedSkills.coreCS.includes("oop") ? "Object-Oriented Design patterns" : "Basic OOP concepts",
                extractedSkills.coreCS.includes("dbms") ? "Database normalization and basic queries" : "Memory management overview",
                "Time & Space complexity analysis"
            ]
        },
        {
            roundTitle: "Round 3: Tech Interview (Projects + Stack)",
            items: [
                "In-depth explanation of recent projects",
                extractedSkills.web.length > 0 ? `Deep dive into web stack (${extractedSkills.web.join(", ")})` : "General web knowledge",
                extractedSkills.data.length > 0 ? `Database optimizations (${extractedSkills.data.join(", ")})` : "Data persistence concepts",
                extractedSkills.cloud.length > 0 ? "Deployment architectures discussion" : "Code versioning (Git) practices",
                "Handling edge cases in API development"
            ]
        },
        {
            roundTitle: "Round 4: Managerial / HR",
            items: [
                "Introduction and background walkthrough",
                "Discussion on strengths and weaknesses",
                "Behavioral questions (STAR method)",
                `Why do you want to join ${company || "this company"}?`,
                "Salary expectations and notice period"
            ]
        }
    ];

    // 3. Generate 7-Day Plan
    const plan7Days = [
        { day: "Day 1-2", focus: "Basics + Core CS", tasks: ["Revise OOP, DBMS, OS concepts", "Practice easy array/string problems"] },
        { day: "Day 3-4", focus: "DSA + Coding Practice", tasks: ["Focus on Trees, Graphs, DP", "Complete 10 mid-level LeetCode problems"] },
        { day: "Day 5", focus: "Project + Resume Alignment", tasks: [`Map resume points to JD skills: ${allDetectedSkills.slice(0, 3).join(", ") || "General tech"}`] },
        { day: "Day 6", focus: "Mock Interview Questions", tasks: ["Do a 1-hour P2P mock interview focusing on technical depth"] },
        { day: "Day 7", focus: "Revision + Weak Areas", tasks: ["Review behavioral answers", "Read company core values"] }
    ];

    if (extractedSkills.web.includes("react")) {
        plan7Days[2].tasks.push("Include React lifecycle/hooks revision");
    }

    // 4. Generate 10 Questions
    let questions = [];
    allDetectedSkills.forEach(skill => {
        if (QUESTION_BANK[skill.toLowerCase()] && questions.length < 10) {
            questions.push(`[${skill}] ${QUESTION_BANK[skill.toLowerCase()]}`);
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
        questions.push(`[General] ${genericQuestions.shift()}`);
    }

    // 5. Readiness Score
    let score = 35;
    score += Math.min(totalCategoriesDetected * 5, 30);
    if (company && company.trim().length > 0) score += 10;
    if (role && role.trim().length > 0) score += 10;
    if (jdText.length > 800) score += 10;

    if (score > 100) score = 100;

    const skillConfidenceMap = {};
    Object.values(extractedSkills).flat().forEach(skill => {
        skillConfidenceMap[skill] = 'practice';
    });

    const finalScore = score - (Object.keys(skillConfidenceMap).length * 2); // all default 'practice'

    return {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        company: company || "",
        role: role || "",
        jdText,
        extractedSkills,
        companyIntel,
        roundMapping,
        plan7Days,
        checklist,
        questions,
        baseScore: score,
        skillConfidenceMap,
        finalScore: Math.max(0, finalScore)
    };
}

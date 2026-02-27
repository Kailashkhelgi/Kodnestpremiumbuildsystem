import React, { createContext, useState, useContext } from 'react';

const ResumeContext = createContext();

export const useResume = () => useContext(ResumeContext);

export const ResumeProvider = ({ children }) => {
    const defaultData = {
        personal: { name: '', email: '', phone: '', location: '' },
        summary: '',
        education: [],
        experience: [],
        projects: [],
        skills: { technical: [], soft: [], tools: [] },
        links: { github: '', linkedin: '' },
        template: 'Classic'
    };

    const [data, setData] = useState(() => {
        try {
            let saved = localStorage.getItem('resumeBuilderData');
            if (saved) {
                saved = JSON.parse(saved);
                if (typeof saved.skills === 'string') {
                    saved.skills = {
                        technical: saved.skills.split(',').map(s => s.trim()).filter(Boolean),
                        soft: [],
                        tools: []
                    };
                }
                if (saved.projects) {
                    saved.projects = saved.projects.map(p => ({
                        ...p,
                        techStack: p.techStack || [],
                        liveUrl: p.liveUrl || p.link || '',
                        githubUrl: p.githubUrl || ''
                    }));
                }
                return saved;
            }
            return defaultData;
        } catch {
            return defaultData;
        }
    });

    React.useEffect(() => {
        localStorage.setItem('resumeBuilderData', JSON.stringify(data));
    }, [data]);

    const loadSampleData = () => {
        setData({
            personal: { name: 'Alex Peterson', email: 'alex.peterson@example.com', phone: '(555) 123-4567', location: 'San Francisco, CA' },
            summary: 'Experienced Software Engineer with a passion for building scalable web applications. Strong background in React, Node.js, and system architecture.',
            education: [{ id: 1, school: 'University of Technology', degree: 'B.S. Computer Science', year: '2018 - 2022' }],
            experience: [{ id: 1, company: 'Tech Corp', role: 'Frontend Engineer', duration: '2022 - Present', description: 'Developed and maintained key features for the core product. Improved load times by 40% using code splitting.' }],
            projects: [{ id: 1, name: 'AI Resume Builder', liveUrl: '', githubUrl: 'github.com/alex/resume', description: 'Built a premium resume builder tool using React and Tailwind CSS.', techStack: ['React', 'Tailwind CSS'] }],
            skills: {
                technical: ['JavaScript', 'React', 'TypeScript', 'Node.js', 'Python', 'SQL'],
                soft: ['Problem Solving', 'Team Leadership'],
                tools: ['AWS', 'Git']
            },
            links: { github: 'github.com/alex', linkedin: 'linkedin.com/in/alexp' }
        });
    };

    return (
        <ResumeContext.Provider value={{ data, setData, loadSampleData }}>
            {children}
        </ResumeContext.Provider>
    );
};

import React, { useMemo, useState, useRef, useEffect } from 'react';
import InteractiveScene, { type SceneHotspot } from './components/InteractiveScene';
import ProjectDetailsPanel, { type Project } from './components/ProjectDetailsPanel';
import profilePic from './assets/profile.jpg';

function scrollToId(id: string) {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Section(props: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={props.id} className="resumeSection">
      <h2>{props.title}</h2>
      {props.children}
    </section>
  );
}
 
export default function App() {
  const profile = useMemo(
    () => ({
      name: 'LIM WAN YEE',
      phoneNumber: '+6011-11800102',
      email: 'cocolimwanyee@gmail.com',
      siswaEmail: '24004499@siswa.um.edu.my',
      linkedin: 'https://www.linkedin.com/in/wylim05ai',
      github: 'https://github.com/WYlim1003',
    }),
    [],
  );

  type TimelineProject = Project & { sortKey: string; dateLabel: string; repoUrl?: string };

  const timelineProjects = useMemo<TimelineProject[]>(
  () => [
    {
      id: 'zenttravel',
      title: 'ZenTravel',
      subtitle: 'AI travel recovery plans + rebooking automation',
      dateLabel: 'Apr 2026',
      sortKey: '2026-04-22',
      repoUrl: 'https://github.com/WYlim1003/ZenTravel',
      description:
        'ZenTravel is a mobile-first travel companion designed to turn travel chaos into structured recovery. Built for the UM Hackathon, the app utilizes the GLM reasoning engine to bridge the gap between "what happened" and "what to do next" using a multi-stage Brain Master workflow.',
      skills: ['React', 'Tailwind CSS', 'Capacitor', 'Vite', 'Firebase', 'Z.AI', 'EmailJS', 'Google Maps API'],
      techStack: ['GLM (ilmu-glm-5.1)', 'Multi-stage Brain Master workflow', 'Email ingestion'],
    } as TimelineProject,
    {
      id: 'umact',
      title: 'UMACT Hackathon 2026',
      subtitle: 'Value-Based DRG Bundled Payment & Actuarial ML Framework',
      dateLabel: 'Apr 2026',
      sortKey: '2026-04-12',
      repoUrl: 'https://colab.research.google.com/drive/1z8fLm6w5caDWe7nIzp01rWTXtelDMadn',
      description:
        'Developed a sustainable machine learning-driven repricing framework to curb medical inflation for the Base MHIT Plan. The project features a Value-Based DRG Bundled Payment Model using Unsupervised K-Means clustering for severity tiering and a Target-Encoded Random Forest Regressor to establish "Fair Market Value" (FMV) benchmarks, successfully simulating RM 21.21M in insurer savings and identifying RM 60.75M in unjustified medical inflation.',
      skills: [
        'Python',
        'Actuarial Modeling',
        'Machine Learning',
        'K-Means Clustering',
        'Random Forest Regression',
        'Data Engineering',
        'Financial Simulation'
      ],
      techStack: [
        'Severity Tiering (K-Means)',
        'FMV Predictive Modeling (RFR)',
        'Value-Based Capitation Ecosystem'
      ],
    } as TimelineProject,
    {
      id: 'expertsystem',
      title: 'expertSystem',
      subtitle: 'Rule-based “Degree Finder” expert system',
      dateLabel: 'Apr 2026',
      sortKey: '2026-04-12',
      repoUrl: 'https://github.com/WYlim1003/expertSystem',
      description:
        'A chat-style degree finder expert system using declarative facts and forward-chaining rules. Designed like a career-advisor consultation by mapping user preferences into recommended directions.',
      skills: ['Rule-based AI', 'Forward-chaining', 'Reasoning', 'JavaScript', 'UI'],
      techStack: ['Declarative facts', 'Forward-chaining rules'],
    } as TimelineProject,
        {
      id: 'vhack-fraud_frontend',
      title: 'vHack Fraud Detection Frontend',
      subtitle: 'Full-stack AI fraud monitoring system',
      dateLabel: 'March 2026',
      sortKey: '2026-03-12',
      repoUrl: 'https://github.com/WYlim1003/vhack_fraud_frontend',
      description:
        'A dual-repo platform (frontend/backend) built for vHack to monitor and detect financial fraud using AI reasoning.',
      skills: ['React', 'Node.js', 'Express', 'AI Integration', 'Data Visualization'],
      techStack: ['Frontend & Backend integration'],
    } as TimelineProject,
    {
      id: 'vhack-fraud_backend',
      title: 'vHack Fraud Detection',
      subtitle: 'Full-stack AI fraud monitoring system',
      dateLabel: 'March 2026',
      sortKey: '2026-03-12',
      repoUrl: 'https://github.com/WYlim1003/vhack_fraud_backend',
      description:
        'A dual-repo platform (frontend/backend) built for vHack to monitor and detect financial fraud using AI reasoning.',
      skills: ['React', 'Node.js', 'Express', 'AI Integration', 'Data Visualization'],
      techStack: ['Frontend & Backend integration'],
    } as TimelineProject,
    {
      id: 'cool-um',
      title: 'C.O.O.L-UM',
      subtitle: 'Smart sustainability dashboard demo (campus analytics)',
      dateLabel: 'Mar 2026',
      sortKey: '2026-03-11',
      repoUrl: 'https://github.com/WYlim1003/C.O.O.L-UM',
      description:
        'A smart sustainability dashboard demo for Universiti Malaya. Includes a campus map experience and interactive sections for temperature, energy usage and biodiversity metrics.',
      skills: ['Data analytics UX', 'Map visualization', 'Interactive dashboard', 'JavaScript', 'UI design'],
      techStack: ['OpenStreetMap/Leaflet', 'Data visualization'],
    } as TimelineProject,
        {
      id: 'medisafe',
      title: 'MediSafe',
      subtitle: 'AI medication companion with OCR-based guidance',
      dateLabel: 'Feb 2026',
      sortKey: '2026-02-09',
      repoUrl: 'https://github.com/WYlim1003/MediSafe',
      description:
        'MediSafe is a mobile AI-powered medication companion designed to reduce medication misuse. It combines on-device OCR with cloud-based AI reasoning to help users understand medicines in simple language.',
      skills: ['Flutter', 'Dart', 'Firebase', 'Google Maps API', 'Gemini API', 'OCR'],
      techStack: ['OCR + cloud AI reasoning', 'Safety warnings', 'Dosing guidance'],
    } as TimelineProject,
    {
      id: 'deriv-ai',
      title: 'Deriv AI Hackathon',
      subtitle: 'AI-driven financial trading assistant',
      dateLabel: 'Feb 2026',
      sortKey: '2026-02-07',
      repoUrl: 'https://www.figma.com/design/uKt9H8HjcH0s7e4hLHngZn/DerivAIHack?node-id=0-1',
      description:
        'A prototype designed for the Deriv AI Hackathon focusing on enhancing user trading experiences through AI-driven insights.',
      skills: ['UI/UX Design', 'Figma', 'Prototyping', 'AI Strategy'],
      techStack: ['Figma Design System'],
    } as TimelineProject,
    {
      id: 'bwm-carvings',
      title: 'BWM_Carvings',
      subtitle: 'Malay carving motifs site with quiz + feedback + export',
      dateLabel: 'Jan 2026',
      sortKey: '2026-01-01',
      repoUrl: 'https://github.com/WYlim1003/BWM_Carvings',
      description:
        'A web experience exploring Malay wood carving traditions. Includes category pages for Flora, Fauna and Cosmos, along with an interactive quiz and feedback form.',
      skills: ['JavaScript', 'Interactive UI', 'Quiz logic', 'HTML', 'CSS'],
      techStack: ['Web export', 'Submission data'],
    } as TimelineProject,
    {
      id: 'tasteland',
      title: 'Tasteland',
      subtitle: 'Sustainable eating + inventory/expiry tracking',
      dateLabel: 'Nov 2025',
      sortKey: '2025-11-18',
      repoUrl: 'https://github.com/WYlim1003/Tasteland',
      description:
        'A comprehensive mobile application designed to promote sustainable eating habits and reduce food waste. Assists users in managing food inventory and tracking expiry dates.',
      skills: ['Java & XML', 'Android Studio', 'Supabase', 'PostgreSQL', 'Retrofit'],
      techStack: ['Supabase & PostgreSQL', 'Retrofit API integration'],
    } as TimelineProject,
        {
      id: 'ml-assignment',
      title: 'Machine-Learning-Assignment',
      subtitle: 'Predictive modeling for transit ridership',
      dateLabel: 'May 2025',
      sortKey: '2025-05-15',
      repoUrl: 'https://github.com/WYlim1003/Machine-Learning-Assignment',
      description:
        'University project utilizing hourly origin-destination data to predict KTM Komuter ridership using regression and classification techniques.',
      skills: ['Machine Learning', 'Python', 'Jupyter Notebook', 'Matplotlib'],
      techStack: ['Regression Analysis', 'Feature Engineering'],
    } as TimelineProject,
    {
      id: 'smartbin',
      title: 'SMARTBIN',
      subtitle: 'IoT + ML waste classification + monitoring',
      dateLabel: 'May 2025',
      sortKey: '2025-05-09',
      repoUrl: 'https://github.com/WYlim1003/SMARTBIN',
      description:
        'Integrated hardware/software solution using IoT sensors and ML to automate waste classification and provide real-time bin capacity monitoring.',
      skills: ['Arduino', 'IoT', 'Machine Learning', 'SolidWorks', 'JavaScript'],
      techStack: ['Ultrasonic sensors', 'ML waste classification', 'Web dashboard'],
    } as TimelineProject,
    {
      id: 'gdg-banana',
      title: 'gdg2025-Banana',
      subtitle: 'GDG Hackathon project',
      dateLabel: 'April 2025',
      sortKey: '2025-04-23',
      repoUrl: 'https://github.com/WYlim1003/gdg2025-Banana',
      description:
        'Innovative tech solution developed during the GDG 2025 hackathon focusing on daily efficiency[cite: 1].',
      skills: ['Mobile Development', 'Frontend Integration', 'API usage'],
      techStack: ['Firebase', 'React Native / Flutter'],
    } as TimelineProject,
    {
      id: 'wix1002assignment',
      title: 'WIX1002Assignment',
      subtitle: 'Course web assignment (UI + content pages)',
      dateLabel: 'Jan 2025',
      sortKey: '2025-01-03',
      repoUrl: 'https://github.com/WYlim1003/WIX1002Assignment',
      description: 'A course assignment built to practice responsive UI, layout and page navigation using Wix.',
      skills: ['Wix', 'HTML/CSS', 'UI design'],
      techStack: ['Wix Platform'],
    } as TimelineProject,
    {
      id: 'wy-idsassignment',
      title: 'WY-IDSASSIGNMENT',
      subtitle: 'Customer Churn Prediction & Data Science Framework',
      dateLabel: 'Dec 2024',
      sortKey: '2024-12-23',
      repoUrl: 'https://github.com/WYlim1003/WY-IDSASSIGNMENT',
      description:
        'An end-to-end data science project focused on predicting customer churn through machine learning. The study involves comprehensive data preprocessing, exploratory data analysis (EDA) and the training of predictive models to identify high-risk customers, enabling data-driven retention strategies.',
      skills: ['Machine Learning', 'Data Preprocessing', 'Predictive Modeling', 'Exploratory Data Analysis (EDA)', 'Python'],
      techStack: ['Classification Models', 'Scikit-learn', 'Pandas/NumPy'],
    } as TimelineProject,
    {
      id: 'sapu',
      title: 'SAPU',
      subtitle: 'Student Ride-Sharing App',
      dateLabel: 'Nov 2024',
      sortKey: '2024-11-26',
      repoUrl: 'https://github.com/WYlim1003/SAPU',
      description:
         'A simple ride-booking website that connects passengers with Universiti Malaya student drivers, offering a more affordable alternative to traditional ride-hailing services.',
      skills: ['UI/UX Design', 'Problem Solving', 'Python', 'Pandas'],
      techStack: ['Frontend Development', 'Backend Integration'],
    } as TimelineProject,
  ],
  [],
);

  const orderedProjects = useMemo<TimelineProject[]>(() => {
    return [...timelineProjects].sort((a, b) => a.sortKey.localeCompare(b.sortKey));
  }, [timelineProjects]);


  const sceneHotspots = useMemo<SceneHotspot[]>(() => {
    const n = orderedProjects.length;
    const marginTop = 80;
    const marginBottom = 80;
    const available = 1200 - marginTop - marginBottom;
    const spacing = n <= 1 ? 0 : available / (n - 1);
    const baseX = 500; 
    const amp = 380;   

    return orderedProjects.map((p, i) => ({
      id: p.id,
      title: p.title,
      x: baseX + Math.sin(i * 0.6) * amp,
      y: marginTop + i * spacing,
      dateLabel: p.dateLabel,
    }));
  }, [orderedProjects]);


  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedProject = selectedId ? orderedProjects.find((p) => p.id === selectedId) ?? null : null;
  const [moveToId, setMoveToId] = useState<string | null>(null);

  return (
    <div className="app">
      <header className="topNav">
        <div className="topNavInner">
          <div className="brand" aria-label="Portfolio header">
            <img 
                alt="Lim Wan Yee" 
                src={profilePic}
                style={{
                  width: '48px', 
                  height: '48px', 
                  borderRadius: '12px', 
                  objectFit: 'cover',
                  marginRight: '12px'
                }} 
              />
              <div className="brandText">
                <div className="name">LIM WAN YEE</div>
                <div className="role">AI / Frontend / Mobile • Portfolio</div>
              </div>
          </div>

          <nav className="navLinks" aria-label="Portfolio navigation">
            <button className="navBtn" type="button" onClick={() => scrollToId('about')}>
              About
            </button>
            <button className="navBtn" type="button" onClick={() => scrollToId('projects')}>
              Projects
            </button>
            <button className="navBtn" type="button" onClick={() => scrollToId('skills')}>
              Skills
            </button>
            <button className="navBtn" type="button" onClick={() => scrollToId('experience')}>
              Work
            </button>
            <button className="navBtn" type="button" onClick={() => scrollToId('leadership')}>
              Leadership
            </button>
            <button className="navBtn" type="button" onClick={() => scrollToId('contact')}>
              Contact
            </button>
          </nav>
        </div>
      </header>

      <main className="container">
        {/* NEW: Professional Overview Section */}
        <section className="professional-overview" style={{ marginBottom: '40px', padding: '0 20px' }}>
          <div className="sceneCard" style={{ padding: '30px' }}>
            <h1 style={{ marginBottom: '15px', color: 'var(--primary-color)' }}>Overview</h1>
            
            {/* Aligned description block using your preferred margins */}
            <div style={{ marginLeft: '0.2cm', marginRight: '0.5cm', fontSize: '1.05em', lineHeight: '1.6', color: '#333' }}>
              <p>
                I am a <strong>Year 2 Computer Science (Artificial Intelligence)</strong> student at Universiti Malaya 
                (CGPA: 3.98) with specialized expertise in Knowledge Representation and Reasoning and Cognitive Science. 
                Currently seeking a <strong>6-month internship (mid-July/ Aug 2025 – Jan 2026)</strong> to gain industry experience and learn from professionals in the field.
              </p>
              <p style={{ marginTop: '15px' }}>
                From developing <strong>ZenTravel’s</strong> reasoning engines to <strong>SMARTBIN’s</strong> ML-based 
                waste classification, I thrive in hackathons and leadership roles that demand technical adaptability 
                and user-centered problem-solving. I am eager to contribute to professional agile environments 
                and develop industry-ready skills in AI engineering and backend development.
              </p>
            </div>
          </div>
        </section>
        <div className="heroSceneWrap" style={{ display: 'block' }}>
          <div
            className="sceneCard"
            style={{
              width: '100%'
            }}
          >
            <div className="sceneHeader">
              <div>
                <h1>Projects Route</h1>
                <p>
                  Click a timeline dot to see the project details.
                </p>
              </div>
              <div className="sceneHint">Click timeline dots</div>
            </div>

            <InteractiveScene
              hotspots={sceneHotspots}
              disabled={selectedProject !== null}
              moveToId={moveToId}
              onSelect={(id) => {
                setSelectedId(id);
                setMoveToId(null);
              }}
            />
          </div>
        </div>

        <div className="resume" aria-label="Resume sections">
          <Section id="about" title="About Me (Education Info)">
            <div className="grid2">
              <div className="entry">
                <div className="entryTitle">
                  <h3>Education</h3>
                  <div className="entryMeta">Academic background</div>
                </div>
                <ul className="list">
                  <li>SMK Tun Mutahir 10A (6A + 3A + 1A-)</li>
                  <li>Malacca Matriculation College (KMM) — CGPA: 4.0, MUET: 4.0</li>
                  <li>Universiti Malaya (Faculty of Computer Science and Information Technology) — CGPA: 3.98/4.00  
                    <br></br>Sep 2025 – Feb 2028 (Expected completion)</li>
                </ul>
              </div>

              <div className="entry">
                <div className="entryTitle">
                  <h3>Focus</h3>
                  <div className="entryMeta">What I build</div>
                </div>
                <p>
                  I enjoy building data-driven applications and backend-ready experiences by combining strong fundamentals (Java, data structures,
                  algorithms and data extraction) with practical analytics and AI workflows (OCR, reasoning pipelines and automation).
                </p>
              </div>
            </div>
          </Section>

          <Section id="projects" title="Projects">
            <div className="grid2">
              {orderedProjects.map((p) => (
                <div key={p.id} className="entry">
                  <div className="entryTitle">
                    <h3>{p.title}</h3>
                    <div className="entryMeta">{p.dateLabel}</div>
                  </div>
                  <p>{p.description}</p>
                  <div style={{ marginTop: 12,display: 'flex', gap: "10px"}}>
                    <button className="navBtn" type="button" onClick={() => setMoveToId(p.id)}>
                      View details
                    </button>
                    {/* New GitHub Redirect Button */}
                    {p.repoUrl && (
                      <a 
                        href={p.repoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="navBtn"
                        style={{ 
                          textDecoration: 'none', 
                          display: 'inline-flex', 
                          alignItems: 'center',
                          backgroundColor: '#24292e', // Optional: GitHub dark theme color
                          color: 'white'
                        }}
                      >
                        View GitHub/ Project
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="skills" title="Skills">
            <div className="grid2">
              <div className="entry">
                <div className="entryTitle">
                  <h3>Software</h3>
                  <div className="entryMeta">Tools</div>
                </div>
                <ul className="list">
                  <li>Programming: Java, Python, HTML, CSS, JavaScript</li>
                  <li>IDEs: NetBeans, VS Code, Android Studio</li>
                  <li>AI Tools: Claude, Cursor, Lovable, ChatGPT, Gemini, Google AI Studio</li>
                  <li>Data Science: Google Colab, SPSS</li>
                  <li>Design Tools: Adobe Photoshop, Adobe Illustrator, Canva, Figma</li>
                  <li>Database: Oracle, Firebase, Supabase, AWS</li>
                  <li>Version Control: GitHub</li>
                  <li>Simulation Tools: Cisco Packet Tracer, Tinkercad</li>
                  <li>APIs: Google API (Geolocation, Gemini API), Postman</li>
                  <li>Framework: Flutter SDK, React</li>
                </ul>
              </div>

              <div className="entry">
                <div className="entryTitle">
                  <h3>Technical</h3>
                  <div className="entryMeta">Core knowledge</div>
                </div>
                <ul className="list">
                  <li>Machine Learning</li>
                  <li>Data Structures</li>
                  <li>Algorithms</li>
                  <li>Operating Systems</li>
                  <li>Knowledge Representation and Reasoning</li>
                  <li>Cognitive Science</li>
                  <li>Internet of Things (IoT)</li>
                  <li>Mobile Application Development</li>
                  <li>Project Management</li>
                </ul>
              </div>

              <div className="entry">
                <div className="entryTitle">
                  <h3>Hardware</h3>
                  <div className="entryMeta">Prototyping</div>
                </div>
                <ul className="list">
                  <li>Arduino</li>
                  <li>Laser Cutter Operation</li>
                  <li>Basic Electronics Prototyping</li>
                  <li>IoT Device Integration</li>
                </ul>
              </div>

              <div className="entry">
                <div className="entryTitle">
                  <h3>Soft Skills</h3>
                  <div className="entryMeta">Behavior</div>
                </div>
                <ul className="list">
                  <li>Communication Skills</li>
                  <li>Teamwork</li>
                  <li>Problem Solving</li>
                  <li>Creative Design</li>
                </ul>
              </div>

              <div className="entry" style={{ gridColumn: '1 / -1' }}>
                <div className="entryTitle">
                  <h3>Language</h3>
                  <div className="entryMeta">Communication</div>
                </div>
                <ul className="list">
                  <li>English</li>
                  <li>Bahasa Melayu</li>
                  <li>Chinese</li>
                  <li>Hokkien</li>
                  <li>Cantonese</li>
                </ul>
              </div>
            </div>
          </Section>

          <Section id="experience" title="Work Experience">
            {/* YTL AI Labs Entry */}
            <div className="entry" style={{ marginBottom: 25 }}>
              <div className="entryTitle" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ marginBottom: 0 }}>AI Data Annotator</h3>
                  <div className="entryMeta" style={{ fontWeight: 'bold' }}>
                    YTL AI Labs | Malaysia
                  </div>
                </div>
                <div className="entryMeta" style={{ textAlign: 'right', fontSize: '0.9em' }}>
                  Jul 2025 – Aug 2025
                </div>
              </div>

              <ul className="list" style={{ marginTop: 10, listStyleType: 'none', paddingLeft: 0 }}>
                <li><strong>Skills:</strong> OCR Validation, MCQ Validation, Quality Assurance, Data Annotation</li>
              </ul>

              <div style={{ marginLeft: '0.2cm', marginRight: '0.5cm', marginTop: 10, fontSize: '0.95em', lineHeight: '1.4' }}>
                <p>
                  Ensured high-quality data for AI model training by performing rigorous OCR and MCQ validation tasks. 
                  Consistently maintained Tier 1 performance with an accuracy rate exceeding 90% while meeting strict 
                  daily deadlines and quality standards.
                </p>
              </div>
            </div>

            {/* Live Company Entry */}
            <div className="entry">
              <div className="entryTitle" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ marginBottom: 0 }}>E-Commerce Operations Intern</h3>
                  <div className="entryMeta" style={{ fontWeight: 'bold' }}>
                    123 Live Mall (Live Company) | Melaka, Malaysia
                  </div>
                </div>
                <div className="entryMeta" style={{ textAlign: 'right', fontSize: '0.9em' }}>
                  Apr 2023 – Jun 2023 <br />
                  Jun 2024 – Sept 2024 <br />
                  Jul 2025 – Sept 2025
                </div>
              </div>

              <ul className="list" style={{ marginTop: 10, listStyleType: 'none', paddingLeft: 0 }}>
                <li><strong>Skills:</strong> JamboLive, Financial Operations, Data Analysis, Event Logistics, Customer Relations</li>
              </ul>

              <div style={{ marginLeft: '0.2cm', marginRight: '0.5cm', marginTop: 10, fontSize: '0.95em', lineHeight: '1.4' }}>
                <p>
                  Utilized JamboLive to streamline multi-platform order processing and managed end-to-end 
                  financial documentation, including bank reconciliation and transaction auditing.
                </p>

                <p style={{ marginTop: 8 }}>
                  Analyzed sales and operational data to generate marketing insights. Provided personalized 
                  support during high-traffic sessions and coordinated logistics for large-scale corporate events.
                </p>
              </div>
            </div>
          </Section>

          <Section id="leadership" title="Leadership + Awards">
            <div className="grid2">
              {/* Leadership Section */}
              <div className="entry">
                <div className="entryTitle">
                  <h3>Leadership</h3>
                  <div className="entryMeta">Roles & responsibilities</div>
                </div>
                <ul className="list">
                  {/* Drawer Entry */}
                  <li>
                    <details>
                      <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                        Vice Director, UM Game Jam (2025–2026)
                      </summary>
                      <p style={{ padding: '10px 0', fontSize: '0.9em', color: '#555' }}>
                        Co-led event planning and execution by coordinating cross-functional departments, 
                        managing sponsor communications and organizing program flow as well as arranging 
                        meetings to ensure smooth dry runs and successful event day operations.
                      </p>
                    </details>
                  </li>

                  {/* Drawer Entry */}
                  <li>
                    <details>
                      <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                        Head of Art Department, DAXIANG20 (2025–2026)
                      </summary>
                      <p style={{ padding: '10px 0', fontSize: '0.9em', color: '#555' }}>
                        Led the design and production of event stage props for crosstalk event, including 
                        backdrops, gimmicks and photo booth. Directed a creative team by distributing tasks, 
                        coordinating timelines, ensuring design consistency and managing financial planning 
                        under a limited budget while sourcing cost-effective materials.
                      </p>
                    </details>
                  </li>

                  <li>
                    <details>
                      <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                        Creative & Multimedia Member, Universiti Malaya Data Analytics Club (2025–2026)
                      </summary>
                      <p style={{ padding: '10px 0', fontSize: '0.9em', color: '#555' }}>
                        Designed promotional materials including event posters, certificates and sponsorship visuals for various 
                        non-flagship events such as workshops and cross-faculty collaborations. Edited directory and promotional 
                        videos to enhance audience engagement. 
                      </p>
                    </details>
                  </li>

                  <li>
                    <details>
                      <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                        Head of Multimedia, AI Day (2025)
                      </summary>
                      <p style={{ padding: '10px 0', fontSize: '0.9em', color: '#555' }}>
                        Led the multimedia team for an internal event involving AI students, including trips and networking 
                        activities. Designed event posters and T-shirt graphics using Adobe Illustrator. Coordinated with 
                        multiple departments through frequent discussions to track progress and ensure alignment. Developed 
                        leadership, project coordination and cross-functional communication skills. 
                      </p>
                    </details>
                  </li>

                  <li>
                    <details>
                      <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                        Creative & Multimedia Member, Datathon 2025 (2025)
                      </summary>
                      <p style={{ padding: '10px 0', fontSize: '0.9em', color: '#555' }}>
                        Created promotional posters for a flagship national-level event. Contributed as an event-day 
                        photographer and videographer to capture key moments and supporting media coverage. Enhanced 
                        adaptability and teamwork in a fast-paced environment.
                      </p>
                    </details>
                  </li>

                  <li>
                    <details>
                      <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                        Publicity & Publication Member, PTUM (2024–2025)
                      </summary>
                      <p style={{ padding: '10px 0', fontSize: '0.9em', color: '#555' }}>
                        Designed promotional materials using Adobe Illustrator and Photoshop for major events including an 
                        opening ceremony, carnival exhibition and stage play. Coordinated with media partners such as Sin Chew Daily 
                        and GOXUAN, including preparing scripts and publicity content. Developed skills in media communication, 
                        content creation and stakeholder coordination.
                      </p>
                    </details>
                  </li>

                  <li>
                    <details>
                      <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                        Venue Setup Team Member, KMMC (2024)
                      </summary>
                      <p style={{ padding: '10px 0', fontSize: '0.9em', color: '#555' }}>
                        Assisted in setting up and decorating the venue for a Chinese New Year gala event. Contributed to 
                        stage design and overall event atmosphere. Built teamwork, time management and hands-on event 
                        execution skills.
                      </p>
                    </details>
                  </li>

                  <li>
                    <details>
                      <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                        Peer-Assisted Learning (PAL) Leader – Mathematics (2023–2024)
                      </summary>
                      <p style={{ padding: '10px 0', fontSize: '0.9em', color: '#555' }}>
                        Conducted weekly tutoring sessions for matriculation students, simplifying complex mathematical concepts 
                        through creative teaching methods. Adapted explanations to suit different learning styles in order to 
                        improve students’ understanding and engagement. Strengthened communication, teaching and problem-solving 
                        skills.
                      </p>
                    </details>
                  </li>

                  <li>
                    <details>
                      <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                        Assistant Secretary, Culture Club (2023)
                      </summary>
                      <p style={{ padding: '10px 0', fontSize: '0.9em', color: '#555' }}>
                        Supported the secretary in managing administrative tasks, including documentation, meeting minutes 
                        and event coordination records. Ensured accurate record-keeping and smooth communication within the 
                        committee. Developed organizational skills, attention to detail and administrative efficiency.
                      </p>
                    </details>
                  </li>

                  <li>
                    <details>
                      <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                        Vice President, Futsal Club (2022)
                      </summary>
                      <p style={{ padding: '10px 0', fontSize: '0.9em', color: '#555' }}>
                        Co-organized futsal competitions and coordinated training sessions for team members. Assisted in 
                        planning team strategies and managing logistics. Built leadership, teamwork and event management skills.
                      </p>
                    </details>
                  </li>

                  <li>
                    <details>
                      <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                        Treasurer, Girl Guides (2022)
                      </summary>
                      <p style={{ padding: '10px 0', fontSize: '0.9em', color: '#555' }}>
                        Managed financial operations, including collecting membership fees, tracking expenses and 
                        preparing financial reports. Ensured transparency and accuracy in budgeting for club activities. 
                        Strengthened financial management, responsibility and organizational skills.
                      </p>
                    </details>
                  </li>

                  <li>
                    <details>
                      <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                        Vice President, Skim Pinjaman Buku Teks Club (2022)
                      </summary>
                      <p style={{ padding: '10px 0', fontSize: '0.9em', color: '#555' }}>
                        Led initiatives to organize textbook distribution processes and train members in proper book handling 
                        procedures. Promoted awareness on the importance of maintaining textbooks among students. Organized 
                        booths during school events such as Hari Kantin. Developed leadership, training and event coordination 
                        skills.
                      </p>
                    </details>
                  </li>

                  <li>
                    <details>
                      <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                        Vice President (Prefect), Skim Pinjaman Buku Teks (2022)
                      </summary>
                      <p style={{ padding: '10px 0', fontSize: '0.9em', color: '#555' }}>
                        Organized and coordinated the entire school textbook distribution process, 
                        including scheduling collection of textbooks, supervising collection and return activities. 
                        Conducted monitoring of textbook condition and assisted in the disposal process of 
                        outdated textbook editions in compliance with school guidelines.
                      </p>
                    </details>
                  </li>
                </ul>
              </div>

              {/* Awards Section */}
              <div className="entry">
                <div className="entryTitle">
                  <h3>Awards</h3>
                  <div className="entryMeta">Olympiads & competitions</div>
                </div>
                <ul className="list">
                  <li><strong>Deriv AI Hackathon</strong> – Finalist (Fraud Detection Figma) (2026)</li>
                  <li><strong>KitaHack</strong> – Participant (MediSafe) (2026)</li>
                  <li><strong>VHack</strong> – Participant (Fraud Shield) (2026)</li>
                  <li><strong>UM SPROUTS 6.0</strong> – Participant (C.O.O.L UM) (2026)</li>
                  <li><strong>UMACT Hackathon</strong> – TBA (Fraud Detection Machine Learning) (2026)</li>
                  <li><strong>UM Hackathon</strong> – TBA (ZenTravel) (2026)</li>
                  <li><strong>EDMAT-46</strong> – Finalist (4th Place) (SMARTBIN) (2025)</li>
                  <li><strong>i-UM Disrupt 2025</strong> – Special Mention Award (SMARTBIN) (2025)</li>
                  <li><strong>Website Building Competition</strong> – Participant (Banana) (2025)</li>
                  <li><strong>Technothon</strong> – Participant (2025)</li>
                  <li><strong>GODAMLah 2.0</strong> – Participant (HealthLink) (2025)</li>
                  <li><strong>UM Internal Hackathon (Open Category)</strong> – Finalist (SAPU) (2024)</li>
                  <li><strong>Maths Brainiac</strong> – Top 10 (2024)</li>
                  <li><strong>Battle Code</strong> – Top 10 (2024)</li>
                  <li><strong>MASTECC 3.0</strong> – Gold (State/College) (2023)</li>
                  <li><strong>HIKMJ 2023 Innovation for Students</strong> – Silver (State/College) (2023)</li>
                  <li><strong>International Mathematical Olympiad of Southeast Asia</strong> – Bronze (2022)</li>
                  <li><strong>MiMAS Mathematical Arithmetic Olympiad</strong> – Merit (2022)</li>
                </ul>
              </div>
            </div>
          </Section>

          <Section id="contact" title="Contact">
            <div className="contactRow">
              <a className="contactPill" href={`mailto:${profile.phoneNumber}`} aria-label="Phone">
                <strong>Phone</strong> <span>{profile.phoneNumber}</span>
              </a>
              <a className="contactPill" href={`mailto:${profile.email}`} aria-label="Email">
                <strong>Personal Email</strong> <span>{profile.email}</span>
              </a>
              <a className="contactPill" href={`mailto:${profile.siswaEmail}`} aria-label="Siswa email">
                <strong>Siswamail</strong> <span>{profile.siswaEmail}</span>
              </a>
              <a className="contactPill" href={profile.linkedin} target="_blank" rel="noreferrer">
                <strong>LinkedIn</strong> <span>View profile</span>
              </a>
              <a className="contactPill" href={profile.github} target="_blank" rel="noreferrer">
                <strong>GitHub</strong> <span>Repositories</span>
              </a>
            </div>

          </Section>
        </div>

        {selectedProject ? (
          <ProjectDetailsPanel
            project={selectedProject}
            onClose={() => {
              setSelectedId(null);
              setMoveToId(null);
            }}
          />
        ) : null}
      </main>
    </div>
  );
}


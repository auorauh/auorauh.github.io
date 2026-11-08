export const portContent = [
  {
    title: 'About Me',
    layout: 'about',
    main: (
      <p className="portLead">
        I am a hardworking, energetic, passionate worker. I am always laughing,
        I get along well with others, and make friends easily. I love learning
        and developing new concepts and ideas. When I find something I enjoy, I
        put everything into it — passion is my driving force.
      </p>
    ),
    subSection: (
      <div className="portReasons">
        <p className="portReasonsTitle">Why I love writing code</p>
        <ul className="portReasonList">
          <li>
            <strong>Challenging &amp; fun.</strong> Solving problems and
            shipping something new always feels like an accomplishment.
          </li>
          <li>
            <strong>Creative.</strong> There are endless possibilities — I
            never get bored because there is always something new to explore.
          </li>
          <li>
            <strong>Rewarding.</strong> Knowing people use what I have built
            makes the work feel worthwhile.
          </li>
        </ul>
      </div>
    ),
    sections: [
      {
        heading: 'Background',
        items: [
          'Born and raised in Utah',
          'Child of an immigrant',
          'Dual citizen (US / Canada)',
        ],
      },
      {
        heading: 'Work History',
        items: [
          'Senior Salesforce Developer',
          'Freelance Developer',
          'Account Management / Supervisor / Sales',
        ],
      },
      {
        heading: 'Education',
        items: [
          'Utah Valley University',
          'Utah County Academy of Sciences',
          'Revature / Coding Bootcamp',
        ],
      },
    ],
  },
  {
    title: 'Skills',
    layout: 'skills',
    main: (
      <div className="skills">
        <div className="skillsGroup">
          <p className="skillsGroupTitle">Frontend &amp; Tools</p>
          <div className="column">
            <div className="tech-icon">
              <i className="devicon-javascript-plain colored" />
              <span>JavaScript</span>
            </div>
            <div className="tech-icon">
              <i className="devicon-css3-plain colored" />
              <span>CSS</span>
            </div>
            <div className="tech-icon">
              <i className="devicon-react-original colored" />
              <span>React</span>
            </div>
            <div className="tech-icon">
              <i className="devicon-vercel-original" />
              <span>Vercel</span>
            </div>
            <div className="tech-icon">
              <i className="devicon-nodejs-plain colored" />
              <span>NodeJS</span>
            </div>
            <div className="tech-icon">
              <i className="devicon-cursor-plain" />
              <span>Cursor</span>
            </div>
          </div>
        </div>
        <div className="skillsGroup">
          <p className="skillsGroupTitle">Platform &amp; Process</p>
          <div className="column">
            <div className="tech-icon">
              <i className="devicon-salesforce-plain colored" />
              <span>Salesforce</span>
            </div>
            <div className="tech-icon">
              <i className="devicon-salesforce-plain colored" />
              <span>SF LWC</span>
            </div>
            <div className="tech-icon">
              <i className="devicon-git-plain" />
              <span>Git</span>
            </div>
            <div className="tech-icon">
              <i className="devicon-jest-plain colored" />
              <span>Jest</span>
            </div>
            <div className="tech-icon">
              <i className="devicon-cucumber-plain" />
              <span>Cucumber</span>
            </div>
            <div className="tech-icon">
              <i className="devicon-linux-plain colored" />
              <span>Linux</span>
            </div>
          </div>
        </div>
        <div className="skillsGroup">
          <p className="skillsGroupTitle">Backend &amp; Creative</p>
          <div className="column">
            <div className="tech-icon">
              <i className="devicon-photoshop-plain colored" />
              <span>Photoshop</span>
            </div>
            <div className="tech-icon">
              <i className="devicon-java-plain-wordmark" />
              <span>Java</span>
            </div>
            <div className="tech-icon">
              <i className="devicon-tomcat-line colored" />
              <span>Tomcat</span>
            </div>
            <div className="tech-icon">
              <i className="devicon-spring-plain colored" />
              <span>Spring</span>
            </div>
            <div className="tech-icon">
              <i className="devicon-docker-plain colored" />
              <span>Docker</span>
            </div>
            <div className="tech-icon">
              <i className="devicon-postgresql-plain colored" />
              <span>PostgreSQL</span>
            </div>
          </div>
        </div>
      </div>
    ),
    sections: [
      {
        heading: 'Certifications',
        items: [
          'Salesforce Platform Developer (PD1)',
          'Salesforce Admin (ADM1)',
          'Responsive Web Design (FCC)',
        ],
      },
      {
        heading: 'Management',
        items: [
          'Managed a team of 20 reps',
          'Weekly coachings — KPI results',
          'Daily standups / Scrum',
        ],
      },
      {
        heading: 'Customer Service',
        items: [
          'Expectation management',
          'Friendly, honest demeanor',
          'Conflict management / de-escalation',
        ],
      },
    ],
  },
  {
    title: 'Projects',
    layout: 'projects',
    projects: [
      { name: '64 Floors', href: 'https://64floors.com', note: 'Creative art project' },
      { name: 'Access to the Internet', href: 'https://accesstotheinternet.com', note: 'Music / media' },
      { name: 'Everest Peak Construction', href: 'https://everestpeakconstruction.com', note: 'Business site' },
      { name: 'Viddy Studio', href: 'https://viddystudio.com', note: 'Studio site' },
      { name: "That's Valid", href: 'https://thats-valid.vercel.app', note: 'Web app' },
      { name: 'Freedom Flyers', href: 'https://freedomflyers.co', note: 'Brand site' },
    ],
  },
  {
    title: 'Contact',
    layout: 'contact',
    main: (
      <div className="contactBlock">
        <p className="contactLabel">Email</p>
        <a
          className="contactEmail"
          href="mailto:dr.teasdale.trenton@gmail.com"
        >
          dr.teasdale.trenton@gmail.com
        </a>
        <p className="contactHint">Open to freelance, collaboration, and full-time roles.</p>
      </div>
    ),
  },
];

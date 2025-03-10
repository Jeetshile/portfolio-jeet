// Simple React component for your portfolio
const ProjectCard = ({ title, description, technologies, imageUrl, projectUrl }) => {
  return (
    <div className="project-card">
      <img src={imageUrl} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="tech-stack">
        {technologies.map((tech, index) => (
          <span key={index} className="tech-tag">{tech}</span>
        ))}
      </div>
      <a href={projectUrl} target="_blank" rel="noopener noreferrer">View Project</a>
    </div>
  );
};

const ProjectsShowcase = () => {
  const projects = [
    {
      title: "E-commerce Platform",
      description: "A fully responsive e-commerce site with cart functionality",
      technologies: ["React", "Node.js", "MongoDB"],
      imageUrl: "https://via.placeholder.com/350x200?text=E-commerce+Project",
      projectUrl: "https://github.com/yourusername/project1"
    },
    {
      title: "Weather App",
      description: "Real-time weather application using weather API",
      technologies: ["JavaScript", "API Integration", "CSS3"],
      imageUrl: "https://via.placeholder.com/350x200?text=Weather+App",
      projectUrl: "https://github.com/yourusername/project2"
    },
    {
      title: "Task Management System",
      description: "A productivity app for managing daily tasks and projects",
      technologies: ["React", "Redux", "Firebase"],
      imageUrl: "https://via.placeholder.com/350x200?text=Task+Management",
      projectUrl: "https://github.com/yourusername/project3"
    }
  ];

  return (
    <div className="projects-container">
      {projects.map((project, index) => (
        <ProjectCard key={index} {...project} />
      ))}
    </div>
  );
};

// Render the React component
ReactDOM.render(
  <ProjectsShowcase />,
  document.getElementById('react-root')
); 
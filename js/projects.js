// JavaScript for handling completed projects
document.addEventListener('DOMContentLoaded', () => {
  // Project data
  const projects = [
    {
      title: "Build a Build Script",
      description: "Practice using bash scripts by creating a build script.",
      category: "bash"
    },
    {
      title: "Basta Fazoolin'",
      description: "In this restauranteur project you'll design software that handles operations for a chain of restaurants!",
      category: "python"
    },
    {
      title: "Hacking The Fender",
      description: "Use your knowledge of Python files to take down an evil hacker once and for all.",
      category: "python"
    },
    {
      title: "Scrabble",
      description: "Use your Python dictionary skills to keep point totals for 4 people playing a game of scrabble! Say goodbye to the pencil-and-notebook scoring method of the past.",
      category: "python"
    },
    {
      title: "Time Traveler's Toolkit",
      description: "Test your knowledge of Python modules by simulating time travel!",
      category: "python"
    },
    {
      title: "Thread Shed",
      description: "Parse a CSV of the daily transactions at the sewing supply store Thread Shed! Then use your knowledge of Python to iterate through some strings and lists to answer several important questions about Thread Shed.",
      category: "python"
    },
    {
      title: "Grocery Store",
      description: "In this project, we'll build the foundations for a grocery store's digital presence.",
      category: "python"
    },
    {
      title: "Getting Ready for Physics Class",
      description: "Let's prepare to teach physics by writing some Python functions.",
      category: "python"
    },
    {
      title: "Carly's Clippers",
      description: "Use your newfound knowledge of loops to discover trends in the operation of the newest hair salon in town, Carly's Clippers.",
      category: "python"
    },
    {
      title: "Len's Slice",
      description: "Practice your usage of Python lists to organize some pizza data.",
      category: "python"
    },
    {
      title: "Gradebook",
      description: "Get practice using Python lists by keeping track of grades in multiple school subjects.",
      category: "python"
    },
    {
      title: "Sal's Shipping",
      description: "Use your knowledge of control flow to create a program that will help Sal's customers get the best deals on all their shipping needs.",
      category: "python"
    },
    {
      title: "Magic 8-Ball",
      description: "We've learned about and explored a powerful tool in Python — control flow! It's so powerful, in fact, that it can be used to tell someone's fortune.",
      category: "python"
    },
    {
      title: "Receipts for Lovely Loveseats",
      description: "Keep receipts for your lovely loveseats. Programming is a treat with this sweet suite of feats! Use strings and numbers to save a catalog of furniture, then perform concatenation and math calculations to create a receipt.",
      category: "python"
    },
    {
      title: "Block Letters",
      description: "Display your initials on screen in block characters to create an ASCII art.",
      category: "python"
    },
    {
      title: "Math Magic",
      description: "It's time to build fluency with operators in Java. In this project, we're going to practice arithmetic in Java so you can hone your skills and feel confident taking them to the real world.",
      category: "java"
    },
    {
      title: "Java Variables: Mad Libs",
      description: "In this project, we're going to practice creating variables and printing. We're going to put your skills to the test by generating a story, Mad Libs style.",
      category: "java"
    },
    {
      title: "Planting a Tree",
      description: "Write your first Java program from scratch by introducing yourself to users and planting a tree for them. You'll practice creating a class, defining the main method, and organizing print statements.",
      category: "java"
    },
    {
      title: "The Box Model: Davie's Burgers",
      description: "In this project, we're going to practice box manipulation so you can hone your skills and feel confident taking them to the real world.",
      category: "html-css"
    },
    {
      title: "Olivia Woodruff Portfolio",
      description: "In this project, we're going to practice Visual Rules in CSS so you can hone your skills and feel confident taking them to the real world.",
      category: "html-css"
    },
    {
      title: "Healthy Recipes",
      description: "Using CSS selectors, you'll give a recipe website style.",
      category: "html-css"
    },
    {
      title: "New York City Blog",
      description: "Create a blog about New York City using various semantic elements to show off how amazing the Big Apple is!",
      category: "html-css"
    },
    {
      title: "Wine Festival Schedule",
      description: "In this project, we're going to practice tabular organization in HTML so you can hone your skills and feel confident taking them to the real world.",
      category: "html-css"
    },
    {
      title: "Fashion Blog",
      description: "It's time to build fluency in HTML Fundamentals. In this next project, we're going to practice Structure in HTML so you can hone your skills and feel confident taking them to the real world.",
      category: "html-css"
    },
    {
      title: "Race Day",
      description: "Design the logic for an app that will give runners information on race day!",
      category: "javascript"
    },
    {
      title: "Magic Eight Ball",
      description: "Build a virtual Magic Eight Ball using control flow in JavaScript. You'll practice building decision-making into your programs and gain confidence in writing more robust JavaScript code.",
      category: "javascript"
    },
    {
      title: "Dog Years",
      description: "In this project, we're going to practice variables and strings in JavaScript so you can hone your skills and feel confident taking them to the real world.",
      category: "javascript"
    },
    {
      title: "Kelvin Weather",
      description: "In this project, we're going to practice variables and printing to the console in JavaScript so you can hone your skills and feel confident taking them to the real world.",
      category: "javascript"
    }
  ];

  // Function to render projects
  function renderProjects(projectsToRender) {
    const projectsContainer = document.querySelector('.completed-projects');
    projectsContainer.innerHTML = '';

    projectsToRender.forEach(project => {
      const projectElement = document.createElement('div');
      projectElement.className = 'project-item';
      projectElement.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <span class="project-category">${getCategoryName(project.category)}</span>
      `;
      projectsContainer.appendChild(projectElement);
    });
  }

  // Function to get category display name
  function getCategoryName(category) {
    const categoryNames = {
      'python': 'Python',
      'javascript': 'JavaScript',
      'html-css': 'HTML & CSS',
      'java': 'Java',
      'bash': 'Bash'
    };
    return categoryNames[category] || category;
  }

  // Initialize projects
  renderProjects(projects);

  // Filter functionality
  const filterButtons = document.querySelectorAll('.projects-filter .filter-btn');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Filter projects
      const category = button.getAttribute('data-category');
      const filteredProjects = category === 'all' 
        ? projects 
        : projects.filter(project => project.category === category);
      
      renderProjects(filteredProjects);
    });
  });

  // Add animation for projects
  ScrollTrigger.create({
    trigger: '#projects',
    start: 'top center',
    onEnter: () => {
      gsap.from('.project-item', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
      });
    },
    once: true
  });
}); 
// Motivational Quotes
const quotes = [
    // Personal aspirations
    { text: "Hi! I'm Jeet, and I love turning complex problems into elegant solutions", author: "Jeet Shile" },
    { text: "My goal is to create software that makes people's lives easier and more enjoyable", author: "Jeet Shile" },
    { text: "I believe in writing code that tells a story and solves real problems", author: "Jeet Shile" },
    { text: "Let's build something amazing together!", author: "Jeet Shile" },
    { text: "I'm always excited to learn new technologies and meet fellow developers", author: "Jeet Shile" },
    
    // Friendly personality
    { text: "Feel free to reach out! I love collaborating on interesting projects", author: "Jeet Shile" },
    { text: "Programming is more fun when we share knowledge and help each other grow", author: "Jeet Shile" },
    { text: "I enjoy creating user-friendly experiences that bring smiles to people's faces", author: "Jeet Shile" },
    { text: "Every line of code is an opportunity to make the world a bit better", author: "Jeet Shile" },
    { text: "Passionate about Python, excited about web development, and always ready to learn", author: "Jeet Shile" },
    
    // Technical aspirations
    { text: "Striving to master Python and create impactful applications", author: "Jeet Shile" },
    { text: "Combining creativity with technical skills to build innovative solutions", author: "Jeet Shile" },
    { text: "Dedicated to writing clean, maintainable, and efficient code", author: "Jeet Shile" },
    { text: "Exploring the endless possibilities of web development and Python", author: "Jeet Shile" },
    { text: "Working towards becoming a full-stack developer who makes a difference", author: "Jeet Shile" }
];

function createFloatingQuote(container, quote) {
    const quoteElement = document.createElement('div');
    quoteElement.className = 'floating-quote';
    quoteElement.innerHTML = `
        <p class="quote-text">"${quote.text}"</p>
        <p class="quote-author">- ${quote.author}</p>
    `;
    
    container.appendChild(quoteElement);

    // Start from top with random horizontal position
    const maxX = container.clientWidth - quoteElement.offsetWidth;
    const x = Math.random() * maxX;
    
    // Initial position at the top
    quoteElement.style.transform = `translate(${x}px, -100%)`;
    quoteElement.style.opacity = '0';
    
    // Animate downward
    requestAnimationFrame(() => {
        quoteElement.style.transition = 'transform 8s ease-in-out, opacity 1s ease-in-out';
        quoteElement.style.transform = `translate(${x}px, 100%)`;
        quoteElement.style.opacity = '1';
    });

    // Remove after animation
    setTimeout(() => {
        quoteElement.style.opacity = '0';
        setTimeout(() => quoteElement.remove(), 1000);
    }, 7000);
}

function showRandomQuote(containerId) {
    const container = document.getElementById(containerId);
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    createFloatingQuote(container, quote);
}

// Add quotes style
const style = document.createElement('style');
style.textContent = `
    .quote-container {
        position: relative;
        min-height: 150px;
        margin-top: 20px;
        overflow: hidden;
    }
    
    .floating-quote {
        position: absolute;
        background: rgba(74, 108, 247, 0.1);
        backdrop-filter: blur(5px);
        border-radius: 10px;
        padding: 15px;
        max-width: 300px;
        border: 1px solid rgba(74, 108, 247, 0.2);
        box-shadow: 0 4px 15px rgba(74, 108, 247, 0.1);
    }
    
    .quote-text {
        color: #4a6cf7;
        font-size: 0.9rem;
        margin: 0 0 8px 0;
        font-style: italic;
        line-height: 1.4;
    }
    
    .quote-author {
        color: #666;
        font-size: 0.8rem;
        margin: 0;
        text-align: right;
        font-weight: 500;
    }
    
    body.dark-mode .floating-quote {
        background: rgba(100, 255, 218, 0.1);
        border-color: rgba(100, 255, 218, 0.2);
        box-shadow: 0 4px 15px rgba(100, 255, 218, 0.1);
    }
    
    body.dark-mode .quote-text {
        color: #64ffda;
    }
    
    body.dark-mode .quote-author {
        color: #aaa;
    }
`;
document.head.appendChild(style);

// Add periodic quote display
function startQuoteInterval(containerId) {
    const showQuote = () => {
        showRandomQuote(containerId);
        // Random interval between 4 and 8 seconds
        setTimeout(showQuote, 4000 + Math.random() * 4000);
    };
    showQuote();
}

// Initialize quotes when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        startQuoteInterval('cube-quotes');
        startQuoteInterval('wave-quotes');
    }, 2000);
}); 
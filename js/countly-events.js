// Countly Custom Events
document.addEventListener('DOMContentLoaded', function() {
    // Track CV downloads
    const cvButton = document.querySelector('.cv-download');
    if (cvButton) {
        cvButton.addEventListener('click', function() {
            Countly.q.push(['add_event', {
                key: 'cv_download',
                count: 1,
                segmentation: {
                    type: 'PDF'
                }
            }]);
        });
    }

    // Track contact form submissions
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            Countly.q.push(['add_event', {
                key: 'contact_form_submit',
                count: 1
            }]);
        });
    }

    // Track project filter clicks
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            Countly.q.push(['add_event', {
                key: 'project_filter',
                count: 1,
                segmentation: {
                    category: this.dataset.category
                }
            }]);
        });
    });

    // Track 3D demo interactions
    const cubeContainer = document.getElementById('cube-container');
    const waveContainer = document.getElementById('wave-container');

    if (cubeContainer) {
        cubeContainer.addEventListener('mouseenter', function() {
            Countly.q.push(['add_event', {
                key: 'cube_demo_interaction',
                count: 1,
                segmentation: {
                    type: 'hover'
                }
            }]);
        });
    }

    if (waveContainer) {
        waveContainer.addEventListener('mouseenter', function() {
            Countly.q.push(['add_event', {
                key: 'wave_demo_interaction',
                count: 1,
                segmentation: {
                    type: 'hover'
                }
            }]);
        });
    }

    // Track social link clicks
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            Countly.q.push(['add_event', {
                key: 'social_link_click',
                count: 1,
                segmentation: {
                    platform: this.title
                }
            }]);
        });
    });

    // Track theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            Countly.q.push(['add_event', {
                key: 'theme_toggle',
                count: 1,
                segmentation: {
                    theme: document.body.classList.contains('dark-mode') ? 'dark' : 'light'
                }
            }]);
        });
    }
}); 
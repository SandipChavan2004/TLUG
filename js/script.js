// JavaScript will go here 


// Gallery Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Gallery Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Lightbox Functionality
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = lightbox.querySelector('img');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            const caption = item.querySelector('.gallery-item-info h3').textContent;
            
            lightboxImg.src = imgSrc;
            lightboxCaption.textContent = caption;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close lightbox on outside click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Close lightbox on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Lazy Loading Images
    const lazyImages = document.querySelectorAll('.gallery-item img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('loading');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });

    // Masonry Layout
    const masonryGrid = document.querySelector('.gallery-grid.masonry');
    if (masonryGrid) {
        const items = masonryGrid.querySelectorAll('.gallery-item');
        items.forEach(item => {
            item.addEventListener('load', () => {
                masonryGrid.style.opacity = '1';
            });
        });
    }
});

// Members Section Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Member Filtering
    const filterButtons = document.querySelectorAll('.category-btn');
    const memberCards = document.querySelectorAll('.member-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-category');

            memberCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Lazy Loading Images
    const lazyImages = document.querySelectorAll('.member-image img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('loading');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });

    // Skill Tags Animation
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-2px)';
        });
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateY(0)';
        });
    });

    // Social Links Animation
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-3px)';
        });
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0)';
        });
    });
});

// About Section Animations
document.addEventListener('DOMContentLoaded', function() {
    // Timeline animations
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    timelineItems.forEach(item => {
        observer.observe(item);
    });

    // Value cards hover effect
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.value-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        });

        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.value-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Mission and Vision cards animation
    const missionVisionCards = document.querySelectorAll('.mission-card, .vision-card');
    missionVisionCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Announcements Section Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const announcementCards = document.querySelectorAll('.announcement-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.textContent.toLowerCase();
            
            announcementCards.forEach(card => {
                const category = card.querySelector('.announcement-category').textContent.toLowerCase();
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            announcementCards.forEach(card => {
                const title = card.querySelector('.announcement-title').textContent.toLowerCase();
                const content = card.querySelector('.announcement-content').textContent.toLowerCase();
                const category = card.querySelector('.announcement-category').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || content.includes(searchTerm) || category.includes(searchTerm)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    }

    // Pagination functionality
    const pageButtons = document.querySelectorAll('.page-btn');
    pageButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (!button.disabled) {
                pageButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Add loading animation to cards
                announcementCards.forEach(card => {
                    card.classList.add('loading');
                });
                
                // Simulate loading delay
                setTimeout(() => {
                    announcementCards.forEach(card => {
                        card.classList.remove('loading');
                    });
                }, 500);
            }
        });
    });

    // Share button functionality
    const shareButtons = document.querySelectorAll('.share-btn');
    shareButtons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.announcement-card');
            const title = card.querySelector('.announcement-title').textContent;
            const content = card.querySelector('.announcement-content').textContent;
            
            // Create shareable text
            const shareText = `${title}\n\n${content}\n\nShared from TLUG Announcements`;
            
            // Check if Web Share API is available
            if (navigator.share) {
                navigator.share({
                    title: title,
                    text: content,
                    url: window.location.href
                }).catch(console.error);
            } else {
                // Fallback: Copy to clipboard
                navigator.clipboard.writeText(shareText).then(() => {
                    // Show success message
                    const originalText = button.innerHTML;
                    button.innerHTML = '<i class="fas fa-check"></i> Copied!';
                    setTimeout(() => {
                        button.innerHTML = originalText;
                    }, 2000);
                }).catch(console.error);
            }
        });
    });

    // View button functionality
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.announcement-card');
            const title = card.querySelector('.announcement-title').textContent;
            const content = card.querySelector('.announcement-content').textContent;
            const date = card.querySelector('.announcement-date').textContent;
            const category = card.querySelector('.announcement-category').textContent;
            
            // Create modal content
            const modal = document.createElement('div');
            modal.className = 'announcement-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <button class="modal-close">&times;</button>
                    <h2>${title}</h2>
                    <div class="modal-meta">
                        <span class="modal-date">${date}</span>
                        <span class="modal-category">${category}</span>
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                </div>
            `;
            
            // Add modal to page
            document.body.appendChild(modal);
            
            // Show modal with animation
            setTimeout(() => {
                modal.style.opacity = '1';
                modal.querySelector('.modal-content').style.transform = 'translateY(0)';
            }, 10);
            
            // Close modal functionality
            const closeButton = modal.querySelector('.modal-close');
            closeButton.addEventListener('click', () => {
                modal.style.opacity = '0';
                modal.querySelector('.modal-content').style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    modal.remove();
                }, 300);
            });
            
            // Close on outside click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeButton.click();
                }
            });
        });
    });
});

// Contact Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const formInputs = contactForm.querySelectorAll('.form-input');
        const submitBtn = contactForm.querySelector('.submit-btn');
        const successMessage = contactForm.querySelector('.success-message');

        // Form validation
        function validateInput(input) {
            const value = input.value.trim();
            let isValid = true;
            let errorMessage = '';

            switch (input.type) {
                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    isValid = emailRegex.test(value);
                    errorMessage = 'Please enter a valid email address';
                    break;
                case 'tel':
                    if (value) {
                        const phoneRegex = /^\+?[\d\s-]{10,}$/;
                        isValid = phoneRegex.test(value);
                        errorMessage = 'Please enter a valid phone number';
                    }
                    break;
                default:
                    isValid = value.length > 0;
                    errorMessage = 'This field is required';
            }

            if (!isValid) {
                input.classList.add('error');
                const errorDiv = input.nextElementSibling.nextElementSibling;
                if (!errorDiv || !errorDiv.classList.contains('error-message')) {
                    const error = document.createElement('div');
                    error.className = 'error-message';
                    error.textContent = errorMessage;
                    input.parentNode.insertBefore(error, input.nextElementSibling.nextElementSibling);
                }
            } else {
                input.classList.remove('error');
                const errorDiv = input.nextElementSibling.nextElementSibling;
                if (errorDiv && errorDiv.classList.contains('error-message')) {
                    errorDiv.remove();
                }
            }

            return isValid;
        }

        // Real-time validation
        formInputs.forEach(input => {
            input.addEventListener('blur', () => {
                validateInput(input);
            });

            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    validateInput(input);
                }
            });
        });

        // Form submission
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Validate all inputs
            let isValid = true;
            formInputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });

            if (!isValid) {
                return;
            }

            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.querySelector('span').textContent = 'Sending...';

            try {
                // Simulate form submission
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Show success message
                successMessage.style.display = 'block';
                contactForm.reset();

                // Reset button state
                submitBtn.classList.remove('loading');
                submitBtn.querySelector('span').textContent = 'Send Message';

                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            } catch (error) {
                console.error('Error submitting form:', error);
                submitBtn.classList.remove('loading');
                submitBtn.querySelector('span').textContent = 'Send Message';
            }
        });

        // Floating label animation
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentNode.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentNode.classList.remove('focused');
                }
            });

            // Check initial state
            if (input.value) {
                input.parentNode.classList.add('focused');
            }
        });

        // Social link hover effect
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                const icon = link.querySelector('i');
                icon.style.transform = 'scale(1.2) rotate(5deg)';
            });

            link.addEventListener('mouseleave', () => {
                const icon = link.querySelector('i');
                icon.style.transform = 'scale(1) rotate(0deg)';
            });
        });

        // Info item hover effect
        const infoItems = document.querySelectorAll('.info-item');
        infoItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const icon = item.querySelector('.info-icon');
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            });

            item.addEventListener('mouseleave', () => {
                const icon = item.querySelector('.info-icon');
                icon.style.transform = 'scale(1) rotate(0deg)';
            });
        });
    }
});

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.getElementById('main-menu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', function() {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !expanded);
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
} 
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryGrid = document.querySelector('.gallery-grid');
    let currentPage = 1;
    let isLoading = false;
    let currentFilter = 'all';
    const itemsPerPage = 8;

    // Enhanced gallery items data with event grouping
    const galleryEvents = [
        {
            id: 'linux-workshop-2024',
            category: 'events',
            title: 'Linux Workshop 2024',
            date: '2024-12-15',
            description: 'Annual Linux workshop for beginners covering basic commands, file management.',
            location: 'TKIET Computer Lab',
            organizer: 'TLUG Team',
            mainImage: 'assets/gallery/1.jpeg',
            images: [
                {
                    src: 'assets/gallery/1.jpeg',
                    alt: 'Git Basics Introduction',
                    description: 'Introduction to version control concepts'
                },
                {
                    src: 'assets/gallery/2.jpeg',
                    alt: 'Git Basics Introduction',
                    description: 'Introduction to version control concepts'
                },
                {
                    src: 'assets/gallery/3.jpeg',
                    alt: 'Git Basics Introduction',
                    description: 'Introduction to version control concepts'
                },
                {
                    src: 'assets/gallery/4.jpeg',
                    alt: 'Git Basics Introduction',
                    description: 'Introduction to version control concepts'
                }
            ]
        },
        {
            id: 'git-workshop-2024',
            category: 'workshops',
            title: 'Git Workshop',
            date: '2024-11-20',
            description: 'Comprehensive workshop on version control fundamentals using Git and GitHub.',
            location: 'TKIET Seminar Hall',
            organizer: 'TLUG Development Team',
            mainImage: 'assets/gallery/5.jpeg',
            images: [
                {
                    src: 'assets/gallery/5.jpeg',
                    alt: 'Git Basics Introduction',
                    description: 'Introduction to version control concepts'
                },
                {
                    src: 'assets/gallery/6.jpeg',
                    alt: 'Repository Setup',
                    description: 'Students setting up their first Git repository'
                },
                {
                    src: 'assets/gallery/7.jpeg',
                    alt: 'Collaborative Coding',
                    description: 'Team collaboration using Git branches'
                },
                {
                    src: 'assets/gallery/8.jpeg',
                    alt: 'Workshop Completion',
                    description: 'Participants with their Git certificates'
                }
            ]
        }
    ];

    // Function to create event card HTML
    function createEventCard(event) {
        return `
            <div class="event-card" data-event-id="${event.id}" data-category="${event.category}">
                <div class="event-image">
                    <img src="${event.mainImage}" alt="${event.title}" loading="lazy">
                    <div class="event-overlay">
                        <div class="event-info">
                            <h3>${event.title}</h3>
                            <p class="event-date">${formatDate(event.date)}</p>
                            <p class="event-location">📍 ${event.location}</p>
                            <p class="event-description">${event.description}</p>
                            <button class="view-event-btn">View All Photos</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Function to format date
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Function to create event gallery modal
    function createEventGalleryModal(event) {
        const modal = document.createElement('div');
        modal.className = 'event-gallery-modal';
        
        let imagesHTML = '';
        event.images.forEach((image, index) => {
            imagesHTML += `
                <div class="event-gallery-item" data-index="${index}">
                    <img src="${image.src}" alt="${image.alt}" loading="lazy">
                    <div class="image-description">
                        <h4>${image.alt}</h4>
                        <p>${image.description}</p>
                    </div>
                </div>
            `;
        });

        modal.innerHTML = `
            <div class="event-gallery-content">
                <div class="event-gallery-header">
                    <div class="event-details">
                        <h2>${event.title}</h2>
                        <p class="event-date">${formatDate(event.date)}</p>
                        <p class="event-location">📍 ${event.location}</p>
                        <p class="event-organizer">Organized by: ${event.organizer}</p>
                    </div>
                    <button class="close-event-gallery">&times;</button>
                </div>
                <div class="event-description-full">
                    <p>${event.description}</p>
                </div>
                <div class="event-gallery-grid">
                    ${imagesHTML}
                </div>
            </div>
        `;

        return modal;
    }

    // Function to get filtered events
    function getFilteredEvents(filter) {
        if (filter === 'all') {
            return galleryEvents;
        }
        return galleryEvents.filter(event => event.category === filter);
    }

    // Function to load events
    function loadEvents() {
        if (isLoading) return;
        isLoading = true;

        // Show loading spinner
        const loadingSpinner = document.createElement('div');
        loadingSpinner.className = 'loading active';
        loadingSpinner.innerHTML = '<div class="loading-spinner"></div>';
        galleryGrid.appendChild(loadingSpinner);

        // Simulate API call delay
        setTimeout(() => {
            const filteredEvents = getFilteredEvents(currentFilter);
            
            // Clear existing content
            galleryGrid.innerHTML = '';

            // Add event cards
            filteredEvents.forEach(event => {
                const eventElement = document.createElement('div');
                eventElement.innerHTML = createEventCard(event);
                galleryGrid.appendChild(eventElement.firstElementChild);
            });

            // Remove loading spinner
            loadingSpinner.remove();
            isLoading = false;

            // Add click event listeners to event cards
            addEventCardListeners();
        }, 500);
    }

    // Function to add event card click listeners
    function addEventCardListeners() {
        const eventCards = document.querySelectorAll('.event-card');
        eventCards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.classList.contains('view-event-btn')) {
                    e.stopPropagation();
                } else {
                    const eventId = card.getAttribute('data-event-id');
                    const event = galleryEvents.find(e => e.id === eventId);
                    if (event) {
                        showEventGallery(event);
                    }
                }
            });
        });
    }

    // Function to show event gallery modal
    function showEventGallery(event) {
        const modal = createEventGalleryModal(event);
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        // Add event listeners for modal
        const closeBtn = modal.querySelector('.close-event-gallery');
        const galleryItems = modal.querySelectorAll('.event-gallery-item');

        // Close modal
        const closeModal = () => {
            document.body.removeChild(modal);
            document.body.style.overflow = 'auto';
        };

        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Close with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        });

        // Add click listeners to gallery items for lightbox
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const index = parseInt(item.getAttribute('data-index'));
                showImageLightbox(event.images, index);
            });
        });
    }

    // Function to show image lightbox
    function showImageLightbox(images, currentIndex) {
        const lightbox = document.createElement('div');
        lightbox.className = 'image-lightbox';
        
        const currentImage = images[currentIndex];
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-nav prev">&lt;</button>
                <button class="lightbox-nav next">&gt;</button>
                <button class="close-lightbox">&times;</button>
                <img src="${currentImage.src}" alt="${currentImage.alt}">
                <div class="lightbox-info">
                    <h3>${currentImage.alt}</h3>
                    <p>${currentImage.description}</p>
                    <div class="lightbox-counter">${currentIndex + 1} / ${images.length}</div>
                </div>
            </div>
        `;

        document.body.appendChild(lightbox);

        const closeLightbox = () => {
            document.body.removeChild(lightbox);
        };

        const updateImage = (newIndex) => {
            if (newIndex >= 0 && newIndex < images.length) {
                const img = lightbox.querySelector('img');
                const info = lightbox.querySelector('.lightbox-info');
                const counter = lightbox.querySelector('.lightbox-counter');
                const newImage = images[newIndex];
                
                img.src = newImage.src;
                img.alt = newImage.alt;
                info.querySelector('h3').textContent = newImage.alt;
                info.querySelector('p').textContent = newImage.description;
                counter.textContent = `${newIndex + 1} / ${images.length}`;
                
                currentIndex = newIndex;
            }
        };

        // Navigation buttons
        lightbox.querySelector('.prev').addEventListener('click', () => {
            updateImage(currentIndex - 1);
        });

        lightbox.querySelector('.next').addEventListener('click', () => {
            updateImage(currentIndex + 1);
        });

        // Close button
        lightbox.querySelector('.close-lightbox').addEventListener('click', closeLightbox);

        // Click outside to close
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                updateImage(currentIndex - 1);
            } else if (e.key === 'ArrowRight') {
                updateImage(currentIndex + 1);
            }
        });
    }

    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            // Update current filter
            currentFilter = button.getAttribute('data-filter');
            
            // Load events for the selected category
            loadEvents();
        });
    });

    // Initial load
    loadEvents();
});
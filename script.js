document.addEventListener('DOMContentLoaded', function() {
    // Initialize brand animation
    initBrandAnimation();
    
    // Initialize animations
    initAnimations();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize portfolio
    initPortfolio();
    
    // Initialize customizer
    initCustomizer();
    
    // Initialize before/after slider
    initBeforeAfterSlider();
    
    // Initialize testimonials
    initTestimonials();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize back to top button
    initBackToTop();
});

// Brand Animation
function initBrandAnimation() {
    const brandText = document.getElementById('brandText');
    if (!brandText) return;
    
    // Cores
    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color').trim();
    const blackColor = '#000';
    
    // Variável para controlar se a animação está em andamento
    let animationInProgress = false;
    
    // Função para animar o texto
    function animateBrandText() {
        // Evita múltiplas animações simultâneas
        if (animationInProgress) return;
        animationInProgress = true;
        
        // Configuração do CSS para a animação
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            @keyframes cursor-blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }
            
            .cursor {
                display: inline-block;
                width: 2px;
                height: 1.1em;
                background-color: ${primaryColor};
                margin-left: 2px;
                margin-right: 1px;
                vertical-align: middle;
                animation: cursor-blink 0.8s infinite;
                position: relative;
                top: -2px;
            }
        `;
        document.head.appendChild(styleElement);
        
        // Texto inicial: "Building Home" com a palavra "Building" em laranja e um cursor piscando
        brandText.innerHTML = `<span style="color:${primaryColor}">Building</span><span class="cursor"></span> <span style="color:${blackColor}">Home</span>`;
        
        // Após 1 segundo, começa a animação de apagar letra por letra
        setTimeout(() => {
            // Palavra original
            const word = "Building";
            // Começa com o texto completo
            let currentText = word;
            
            // Função para remover uma letra por vez com efeito de cursor
            function removeOneLetter() {
                if (currentText.length > 1) {
                    // Remove a última letra
                    currentText = currentText.slice(0, -1);
                    // Atualiza o texto com o cursor piscando
                    brandText.innerHTML = `<span style="color:${primaryColor}">${currentText}</span><span class="cursor"></span> <span style="color:${blackColor}">Home</span>`;
                    
                    // Variação aleatória no tempo para parecer mais natural (entre 40ms e 80ms)
                    const randomDelay = Math.floor(Math.random() * 40) + 40;
                    setTimeout(removeOneLetter, randomDelay);
                } else {
                    // Quando só sobrar o "B", adiciona o ponto após uma pequena pausa
                    setTimeout(() => {
                        // Adiciona o ponto com o cursor piscando
                        brandText.innerHTML = `<span style="color:${primaryColor}">${currentText}.</span><span class="cursor"></span> <span style="color:${blackColor}">Home</span>`;
                        
                        // Após um tempo, remove o cursor
                        setTimeout(() => {
                            brandText.innerHTML = `<span style="color:${primaryColor}">${currentText}.</span> <span style="color:${blackColor}">Home</span>`;
                            // Libera a animação para ser executada novamente
                            setTimeout(() => {
                                animationInProgress = false;
                                // Remove o estilo quando a animação terminar
                                if (styleElement.parentNode) {
                                    styleElement.parentNode.removeChild(styleElement);
                                }
                            }, 500);
                        }, 1000);
                    }, 300);
                }
            }
            
            // Inicia o processo de remoção de letras
            removeOneLetter();
        }, 1000);
    }
    
    // Executa a animação quando a página carrega
    animateBrandText();
    
    // Reinicia a animação quando clicar no link para a seção inicial
    document.querySelectorAll('a[href="#home"]').forEach(link => {
        link.addEventListener('click', () => {
            if (!animationInProgress) {
                animateBrandText();
            }
        });
    });
    
    // Reinicia a animação quando clicar no logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', () => {
            if (!animationInProgress) {
                animateBrandText();
            }
        });
    }
    
    // Reinicia a animação quando rolar de volta para o topo
    let isAtTop = true;
    window.addEventListener('scroll', () => {
        if (window.scrollY < 100) {
            if (!isAtTop && !animationInProgress) {
                animateBrandText();
                isAtTop = true;
            }
        } else {
            isAtTop = false;
        }
    });
}

// Animations
function initAnimations() {
    // Fade in elements when they come into view
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Initial check for elements in viewport
    checkFadeElements();
    
    // Check elements on scroll
    window.addEventListener('scroll', checkFadeElements);
    
    function checkFadeElements() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
}

// Navigation
function initNavigation() {
    const header = document.querySelector('.header');
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Change header background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navList.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navList.classList.remove('active');
        });
    });
    
    // Active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Portfolio
function initPortfolio() {
    // Portfolio items data
    const portfolioItems = [
        {
            id: 1,
            category: 'modern',
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            title: 'Casa Moderna Vista Mar',
            description: 'Projeto contemporâneo com vista para o mar'
        },
        {
            id: 2,
            category: 'classic',
            image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            title: 'Residência Clássica',
            description: 'Elegância e sofisticação em cada detalhe'
        },
        {
            id: 3,
            category: 'minimalist',
            image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            title: 'Casa Minimalista',
            description: 'Simplicidade e funcionalidade em harmonia'
        },
        {
            id: 4,
            category: 'modern',
            image: 'loft.png',
            title: 'Loft Urbano',
            description: 'Espaço moderno para vida urbana'
        },
        {
            id: 5,
            category: 'classic',
            image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            title: 'Mansão Colonial',
            description: 'Inspirada na arquitetura colonial brasileira'
        },
        {
            id: 6,
            category: 'minimalist',
            image: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            title: 'Casa de Campo',
            description: 'Simplicidade e integração com a natureza'
        }
    ];
    
    // Generate portfolio items
    const portfolioGrid = document.querySelector('.portfolio-grid');
    
    portfolioItems.forEach(item => {
        const portfolioItem = document.createElement('div');
        portfolioItem.classList.add('portfolio-item');
        portfolioItem.dataset.category = item.category;
        
        portfolioItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="portfolio-img">
            <div class="portfolio-overlay">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <a href="#" class="portfolio-btn">Ver Detalhes</a>
            </div>
        `;
        
        portfolioGrid.appendChild(portfolioItem);
    });
    
    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItemElements = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter value
            const filterValue = button.dataset.filter;
            
            // Filter items
            portfolioItemElements.forEach(item => {
                if (filterValue === 'all' || item.dataset.category === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Customizer
function initCustomizer() {
    const styleButtons = document.querySelectorAll('[data-style]');
    const colorOptions = document.querySelectorAll('[data-color]');
    const floorButtons = document.querySelectorAll('[data-floors]');
    const houseImage = document.getElementById('house-image');
    
    // House images based on options
    const houseImages = {
        modern: {
            white: {
                1: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                2: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            },
            beige: {
                1: 'https://images.unsplash.com/photo-1600566753376-12c8ab8e1744?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                2: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            },
            gray: {
                1: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                2: 'https://images.unsplash.com/photo-1600607687644-c7f34b5e189f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            },
            blue: {
                1: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                2: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            }
        },
        classic: {
            white: {
                1: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                2: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            },
            beige: {
                1: 'https://images.unsplash.com/photo-1600566753376-12c8ab8e1744?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                2: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            },
            gray: {
                1: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                2: 'https://images.unsplash.com/photo-1600607687644-c7f34b5e189f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            },
            blue: {
                1: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                2: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            }
        },
        minimalist: {
            white: {
                1: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                2: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            },
            beige: {
                1: 'https://images.unsplash.com/photo-1600566753376-12c8ab8e1744?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                2: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            },
            gray: {
                1: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                2: 'https://images.unsplash.com/photo-1600607687644-c7f34b5e189f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            },
            blue: {
                1: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                2: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            }
        }
    };
    
    // Current options
    let currentStyle = 'modern';
    let currentColor = 'white';
    let currentFloors = '1';
    
    // Update house image
    function updateHouseImage() {
        try {
            const imageUrl = houseImages[currentStyle][currentColor][currentFloors];
            houseImage.src = imageUrl;
        } catch (error) {
            console.error('Image not found for the selected options');
            houseImage.src = 'https://via.placeholder.com/600x400/f5f5f5/333333?text=Casa+Modelo';
        }
    }
    
    // Style buttons
    styleButtons.forEach(button => {
        button.addEventListener('click', () => {
            styleButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentStyle = button.dataset.style;
            updateHouseImage();
        });
    });
    
    // Color options
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            colorOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            currentColor = option.dataset.color;
            updateHouseImage();
        });
    });
    
    // Floor buttons
    floorButtons.forEach(button => {
        button.addEventListener('click', () => {
            floorButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentFloors = button.dataset.floors;
            updateHouseImage();
        });
    });
    
    // Initialize with default options
    updateHouseImage();
}

// Before/After Slider
function initBeforeAfterSlider() {
    const slider = document.querySelector('.img-comp-slider');
    const overlay = document.querySelector('.img-comp-overlay');
    const container = document.querySelector('.img-comp-container');
    
    if (!slider || !overlay || !container) return;
    
    let active = false;
    
    // Set initial position
    positionSlider(50);
    
    // Position the slider
    function positionSlider(percent) {
        overlay.style.width = percent + '%';
        slider.style.left = percent + '%';
    }
    
    // Mouse events
    slider.addEventListener('mousedown', () => {
        active = true;
    });
    
    window.addEventListener('mouseup', () => {
        active = false;
    });
    
    window.addEventListener('mousemove', (e) => {
        if (!active) return;
        
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percent = (x / rect.width) * 100;
        
        if (percent < 0) positionSlider(0);
        else if (percent > 100) positionSlider(100);
        else positionSlider(percent);
    });
    
    // Touch events
    slider.addEventListener('touchstart', () => {
        active = true;
    });
    
    window.addEventListener('touchend', () => {
        active = false;
    });
    
    window.addEventListener('touchmove', (e) => {
        if (!active) return;
        
        const rect = container.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        const percent = (x / rect.width) * 100;
        
        if (percent < 0) positionSlider(0);
        else if (percent > 100) positionSlider(100);
        else positionSlider(percent);
        
        e.preventDefault();
    }, { passive: false });
}

// Testimonials
function initTestimonials() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dotsContainer = document.querySelector('.testimonial-dots');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (!slides.length || !dotsContainer || !prevBtn || !nextBtn) return;
    
    let currentSlide = 0;
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        
        dot.addEventListener('click', () => {
            showSlide(index);
        });
        
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    // Show slide
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }
    
    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto slide
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause on hover
    const carousel = document.querySelector('.testimonial-carousel');
    
    carousel.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    // Initialize first slide
    showSlide(0);
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        // Simulate form submission
        alert(`Obrigado ${name}! Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.`);
        contactForm.reset();
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

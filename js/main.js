// ============================================
// PHOTOFOLIO - COMPLETE JAVASCRIPT
// Single Page Portfolio Website
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // 1. MOBILE MENU TOGGLE
    // ============================================
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // ============================================
    // 2. ACTIVE NAVIGATION ON SCROLL
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    function updateActiveNav() {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    // ============================================
    // 3. PORTFOLIO GALLERY WITH LOAD MORE
    // ============================================
    const allPortfolioImages = [
        { category: "weddings", url: "https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Wedding couple embracing at sunset" },
        { category: "weddings", url: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Wedding ceremony with flower arch" },
        { category: "weddings", url: "https://images.pexels.com/photos/2573947/pexels-photo-2573947.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Bride and groom laughing" },
        { category: "weddings", url: "https://images.pexels.com/photos/3015042/pexels-photo-3015042.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Wedding rings on flowers" },
        { category: "portraits", url: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Creative outdoor portrait" },
        { category: "portraits", url: "https://images.pexels.com/photos/2380794/pexels-photo-2380794.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Woman smiling naturally" },
        { category: "portraits", url: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Man in suit portrait" },
        { category: "events", url: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Corporate gala event photography" },
        { category: "events", url: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Music concert crowd shot" },
        { category: "events", url: "https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Birthday party celebration" },
        { category: "corporate", url: "https://images.pexels.com/photos/3184419/pexels-photo-3184419.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Team corporate headshots" },
        { category: "picnics", url: "https://images.pexels.com/photos/3184420/pexels-photo-3184420.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Outdoor picnic scene" },
        { category: "house-parties", url: "https://images.pexels.com/photos/3184421/pexels-photo-3184421.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Fun house party gathering" },
        { category: "baby-showers", url: "https://images.pexels.com/photos/3184422/pexels-photo-3184422.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Delicate baby shower setup" },
        { category: "corporate", url: "https://images.pexels.com/photos/3184459/pexels-photo-3184459.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Conference keynote speaker" },
        { category: "corporate", url: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Office team meeting" },
        { category: "events", url: "https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Award ceremony" },
        { category: "portraits", url: "https://images.pexels.com/photos/1130624/pexels-photo-1130624.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Family portrait session" }
    ];
    
    let currentFilter = 'all';
    let imagesToShow = 6;
    let currentDisplayCount = imagesToShow;
    
    function getFilteredImages() {
        if (currentFilter === 'all') {
            return [...allPortfolioImages];
        }
        return allPortfolioImages.filter(img => img.category === currentFilter);
    }
    
    function renderGallery() {
        const galleryGrid = document.getElementById('galleryGrid');
        if (!galleryGrid) return;
        
        const filtered = getFilteredImages();
        const imagesToDisplay = filtered.slice(0, currentDisplayCount);
        
        galleryGrid.innerHTML = imagesToDisplay.map(img => `
            <div class="gallery-item" data-category="${img.category}">
                <img src="${img.url}" alt="${img.alt}" loading="lazy">
                <div class="gallery-overlay">${img.alt}</div>
            </div>
        `).join('');
        
        // Show/hide load more button
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            if (currentDisplayCount >= filtered.length) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'inline-block';
            }
        }
        
        attachLightboxEvents();
    }
    
    function loadMoreImages() {
        const filtered = getFilteredImages();
        if (currentDisplayCount < filtered.length) {
            currentDisplayCount += 6;
            renderGallery();
        }
    }
    
    function attachLightboxEvents() {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightboxImg');
        const closeBtn = document.querySelector('.close-lightbox');
        
        if (!lightbox || !lightboxImg) return;
        
        document.querySelectorAll('.gallery-item img').forEach(img => {
            img.addEventListener('click', function() {
                lightbox.style.display = 'block';
                lightboxImg.src = this.src;
                document.body.style.overflow = 'hidden';
            });
        });
        
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
        
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    function setupFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        if (filterBtns.length === 0) return;
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                currentFilter = this.getAttribute('data-filter');
                currentDisplayCount = imagesToShow;
                renderGallery();
            });
        });
    }
    
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreImages);
    }
    
    if (document.getElementById('galleryGrid')) {
        renderGallery();
        setupFilters();
    }

    // ============================================
    // 4. TESTIMONIALS DATA
    // ============================================
    const testimonialsData = [
        {
            name: "John Larson",
            role: "Entrepreneur",
            text: "Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos export minim fugiat. Quis quorum aliqua sint quem legam fore sunt eram irure aliqua veniam tempor noster veniam.",
            rating: 5
        },
        {
            name: "Matt Brandon",
            role: "Freelancer",
            text: "Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla quem minim velit minim dolor enim duis veniam veniam enim culpa labore duis sunt culpa.",
            rating: 5
        },
        {
            name: "Sarah Johnson",
            role: "Wedding Planner",
            text: "Quis quorum aliqua sint quem legam fore amet nulla culpa multos export minim fugiat quae magna enim sint quorum nulla quem sunt eram irure aliqua veniam.",
            rating: 5
        }
    ];
    
    function renderTestimonials() {
        const container = document.getElementById('testimonialsGrid');
        if (!container) return;
        
        container.innerHTML = testimonialsData.map(t => `
            <div class="testimonial-card">
                <div class="stars">${'⭐'.repeat(t.rating)}</div>
                <p class="testimonial-text">"${t.text}"</p>
                <div class="testimonial-author">
                    <strong>${t.name}</strong>
                    <span>${t.role}</span>
                </div>
            </div>
        `).join('');
    }
    
    if (document.getElementById('testimonialsGrid')) {
        renderTestimonials();
    }

    // ============================================
    // 5. PRICE LIST PDF DOWNLOAD
    // ============================================
    const downloadBtn = document.getElementById('downloadPriceListBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // Open the pricing guide in a new tab (which auto-prints)
            // Create a temporary link to the pricing guide HTML
            const pricingGuideHTML = generatePricingGuideHTML();
            const blob = new Blob([pricingGuideHTML], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
            setTimeout(() => URL.revokeObjectURL(url), 1000);
        });
    }
    
    function generatePricingGuideHTML() {
        return `<!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>James Mwangi Photography - Pricing Guide</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #1a1a1a; padding: 40px; }
                .guide-container { max-width: 900px; margin: 0 auto; }
                .header { text-align: center; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 3px solid #e2a63b; }
                .header h1 { font-size: 2.5rem; margin-bottom: 10px; }
                .contact-info { margin: 20px 0; font-size: 0.9rem; }
                .package { margin-bottom: 40px; page-break-inside: avoid; }
                .package h2 { background: #e2a63b; color: #1a1a1a; padding: 10px 20px; border-radius: 5px; margin-bottom: 20px; }
                .package-details { display: flex; justify-content: space-between; margin-bottom: 15px; padding: 15px; background: #f5f5f5; border-radius: 5px; }
                .price { font-size: 1.8rem; font-weight: bold; color: #e2a63b; }
                .features { list-style: none; margin: 20px 0; }
                .features li { padding: 8px 0; border-bottom: 1px solid #eee; }
                .addons { margin: 30px 0; padding: 20px; background: #f9f9f9; border-radius: 5px; }
                .footer { margin-top: 50px; text-align: center; font-size: 0.8rem; color: #666; border-top: 1px solid #ddd; padding-top: 20px; }
                @media print { body { padding: 0; } .package { page-break-inside: avoid; } }
            </style>
        </head>
        <body>
            <div class="guide-container">
                <div class="header">
                    <h1>James Mwangi Photography</h1>
                    <p>Professional Photography Pricing Guide 2026</p>
                    <div class="contact-info">📞 0712 345 678 | 📧 james@jmphotography.com | 📍 Nairobi, Kenya</div>
                </div>
                <div class="package"><h2>📸 Portrait Photography</h2><div class="package-details"><span>2-hour session</span><span class="price">KSh 16,000</span></div><ul class="features"><li>✓ 30+ edited photos</li><li>✓ 3 outfit changes</li><li>✓ Online gallery</li><li>✓ Print rights included</li></ul></div>
                <div class="package"><h2>⚡ Sports Photography</h2><div class="package-details"><span>3-hour coverage</span><span class="price">KSh 20,000</span></div><ul class="features"><li>✓ 100+ edited photos</li><li>✓ Action shots</li><li>✓ Fast 5-day delivery</li><li>✓ Commercial rights</li></ul></div>
                <div class="package"><h2>💍 Wedding Photography</h2><div class="package-details"><span>Full day (8+ hours)</span><span class="price">KSh 50,000</span></div><ul class="features"><li>✓ 2 photographers</li><li>✓ 400+ edited photos</li><li>✓ Sneak peek in 48 hours</li><li>✓ 14-day delivery</li></ul></div>
                <div class="package"><h2>👗 Fashion Photography</h2><div class="package-details"><span>4-hour shoot</span><span class="price">KSh 30,000</span></div><ul class="features"><li>✓ 80+ edited photos</li><li>✓ Professional styling</li><li>✓ Full commercial rights</li><li>✓ 7-day delivery</li></ul></div>
                <div class="package"><h2>🖼️ Still Life Photography</h2><div class="package-details"><span>Product/Food</span><span class="price">KSh 12,000</span></div><ul class="features"><li>✓ 20+ edited photos</li><li>✓ White background setups</li><li>✓ Commercial usage</li><li>✓ 5-day delivery</li></ul></div>
                <div class="package"><h2>📰 Photojournalism</h2><div class="package-details"><span>Documentary style</span><span class="price">KSh 20,000</span></div><ul class="features"><li>✓ 100+ edited photos</li><li>✓ Candid moments</li><li>✓ Storytelling approach</li><li>✓ Editorial rights</li></ul></div>
                <div class="addons"><h3>Add-Ons & Extras</h3><ul class="features"><li>📸 Extra hour - KSh 5,000</li><li>🖼️ Premium album - KSh 8,000</li><li>💾 USB drive - KSh 3,000</li><li>✈️ Travel (per 100km) - KSh 2,000</li></ul></div>
                <div class="footer"><p>For bookings: WhatsApp 0712 345 678 | © 2026 James Mwangi Photography</p></div>
            </div>
            <script>setTimeout(() => window.print(), 500);<\/script>
        </body>
        </html>`;
    }

    // ============================================
    // 6. CONTACT FORM HANDLER
    // ============================================
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name')?.value || '',
                email: document.getElementById('email')?.value || '',
                subject: document.getElementById('subject')?.value || '',
                message: document.getElementById('message')?.value || ''
            };
            
            if (!formData.name || !formData.email || !formData.message) {
                if (formStatus) {
                    formStatus.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Please fill in all required fields.';
                    formStatus.className = 'form-status error';
                }
                return;
            }
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                if (formStatus) {
                    formStatus.innerHTML = '<i class="fas fa-check-circle"></i> Message sent! I\'ll get back to you within 24 hours.';
                    formStatus.className = 'form-status success';
                }
                contactForm.reset();
                
                setTimeout(() => {
                    if (formStatus && formStatus.classList.contains('success')) {
                        formStatus.innerHTML = '';
                        formStatus.className = 'form-status';
                    }
                }, 5000);
            } catch (error) {
                if (formStatus) {
                    formStatus.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Something went wrong. Please try again or WhatsApp me directly.';
                    formStatus.className = 'form-status error';
                }
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    
    // ============================================
    // 7. SMOOTH SCROLL FOR NAVIGATION
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
    
    console.log("PhotoFolio - Site loaded successfully");
});
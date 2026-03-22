(function () {
    'use strict';

    // ─── DOM CACHE ────────────────────────────────────────
    var navbar       = document.querySelector('.navbar');
    var navLinks     = document.querySelectorAll('#navMenu .nav-link');
    var navCollapse  = document.getElementById('navMenu');
    var hero         = document.getElementById('hero');
    var dayBtns      = document.querySelectorAll('.day-btn');
    var scheduleRows = document.querySelectorAll('.schedule-row');
    var tickerTrack  = document.querySelector('.ticker-track');
    var backToTop    = document.getElementById('backToTop');
    var registerForm = document.querySelector('.register-form');
    var ticketSelect = document.getElementById('ticketType');
    var progressBar  = document.getElementById('scrollProgress');


    // ═══════════════════════════════════════════════════════
    //  1. PRELOADER
    // ═══════════════════════════════════════════════════════
    window.addEventListener('load', function () {
        var preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('loaded');
            setTimeout(function () { preloader.remove(); }, 800);
        }
    });


    // ═══════════════════════════════════════════════════════
    //  2. CUSTOM CURSOR
    // ═══════════════════════════════════════════════════════
    var cursorDot     = document.querySelector('.cursor-dot');
    var cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline && window.matchMedia('(pointer: fine)').matches) {
        var mouseX = 0, mouseY = 0;
        var outlineX = 0, outlineY = 0;

        document.addEventListener('mousemove', function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top  = mouseY + 'px';
        });

        // Smooth follower
        (function animateCursor() {
            var dx = mouseX - outlineX;
            var dy = mouseY - outlineY;
            if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
                outlineX += dx * 0.15;
                outlineY += dy * 0.15;
                cursorOutline.style.left = outlineX + 'px';
                cursorOutline.style.top  = outlineY + 'px';
            }
            requestAnimationFrame(animateCursor);
        })();

        // Grow on interactive elements
        document.querySelectorAll('a, button, .artist-card, .mosaic-cell, .pricing-card, .faq-question').forEach(function (el) {
            el.addEventListener('mouseenter', function () {
                cursorOutline.classList.add('cursor-hover');
                cursorDot.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', function () {
                cursorOutline.classList.remove('cursor-hover');
                cursorDot.classList.remove('cursor-hover');
            });
        });
    } else {
        // Hide custom cursor on touch devices
        if (cursorDot) cursorDot.style.display = 'none';
        if (cursorOutline) cursorOutline.style.display = 'none';
    }


    // ═══════════════════════════════════════════════════════
    //  3. HERO PARTICLES (Canvas)
    // ═══════════════════════════════════════════════════════
    var canvas = document.getElementById('heroParticles');
    if (canvas && hero) {
        var ctx = canvas.getContext('2d');
        var particles = [];
        var particleCount = 60;
        var particleColorRGB = getComputedStyle(document.documentElement).getPropertyValue('--clr-primary-rgb').trim() || '255, 45, 85';

        function resizeCanvas() {
            canvas.width  = hero.offsetWidth;
            canvas.height = hero.offsetHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        function Particle() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.1;
        }

        Particle.prototype.update = function () {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        };

        Particle.prototype.draw = function () {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(' + particleColorRGB + ', ' + this.opacity + ')';
            ctx.fill();
        };

        for (var i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        var heroVisible = true;
        var particleVisObserver = new IntersectionObserver(function (entries) {
            heroVisible = entries[0].isIntersecting;
        });
        particleVisObserver.observe(hero);

        function animateParticles() {
            if (!heroVisible) { requestAnimationFrame(animateParticles); return; }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(function (p) {
                p.update();
                p.draw();
            });

            // Draw connections
            for (var a = 0; a < particles.length; a++) {
                for (var b = a + 1; b < particles.length; b++) {
                    var dx = particles[a].x - particles[b].x;
                    var dy = particles[a].y - particles[b].y;
                    var distSq = dx * dx + dy * dy;
                    if (distSq < 14400) {
                        var dist = Math.sqrt(distSq);
                        ctx.beginPath();
                        ctx.strokeStyle = 'rgba(' + particleColorRGB + ', ' + (0.08 * (1 - dist / 120)) + ')';
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }


    // ═══════════════════════════════════════════════════════
    //  4. SCROLL PROGRESS BAR + UNIFIED SCROLL HANDLER
    // ═══════════════════════════════════════════════════════
    var ticking = false;
    var lastScrollY = 0;
    var navHidden = false;

    window.addEventListener('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(function () {
                onScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    function onScroll() {
        var y = window.scrollY;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;

        // Scroll progress bar
        if (progressBar && docHeight > 0) {
            progressBar.style.width = (y / docHeight * 100) + '%';
        }

        // Navbar: compact on scroll
        navbar.classList.toggle('scrolled', y > 50);

        // Navbar hide/show on scroll direction
        var delta = y - lastScrollY;
        if (y > 200) {
            if (delta > 10 && !navHidden) {
                navbar.style.transform = 'translateY(-100%)';
                navHidden = true;
            } else if (delta < -10 && navHidden) {
                navbar.style.transform = 'translateY(0)';
                navHidden = false;
            }
        } else {
            navbar.style.transform = 'translateY(0)';
            navHidden = false;
        }
        lastScrollY = y;

        // Back to top visibility
        if (backToTop) {
            backToTop.classList.toggle('visible', y > 500);
        }

        // Hero parallax
        if (hero && y < window.innerHeight) {
            hero.style.backgroundPositionY = y * 0.4 + 'px';
        }
    }


    // ═══════════════════════════════════════════════════════
    //  5. ACTIVE NAV LINK (IntersectionObserver)
    // ═══════════════════════════════════════════════════════
    var sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var id = entry.target.getAttribute('id');
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: '-80px 0px -60% 0px' });

    document.querySelectorAll('section[id]').forEach(function (sec) {
        sectionObserver.observe(sec);
    });


    // ═══════════════════════════════════════════════════════
    //  6. MOBILE NAV AUTO-CLOSE
    // ═══════════════════════════════════════════════════════
    document.querySelectorAll('#navMenu .nav-link, #navMenu .btn-glow').forEach(function (link) {
        link.addEventListener('click', function () {
            var instance = bootstrap.Collapse.getInstance(navCollapse);
            if (instance) instance.hide();
        });
    });


    // ═══════════════════════════════════════════════════════
    //  7. COUNTDOWN TIMER
    // ═══════════════════════════════════════════════════════
    var festivalDate = new Date('2026-06-20T12:00:00-04:00').getTime();

    function updateCountdown() {
        var diff = festivalDate - Date.now();

        if (diff <= 0) {
            var el = document.getElementById('countdown');
            if (el) el.innerHTML = '<span class="countdown-live">LIVE NOW</span>';
            return;
        }

        var d = Math.floor(diff / 86400000);
        var h = Math.floor((diff % 86400000) / 3600000);
        var m = Math.floor((diff % 3600000) / 60000);
        var s = Math.floor((diff % 60000) / 1000);

        setVal('cd-days', pad(d));
        setVal('cd-hours', pad(h));
        setVal('cd-minutes', pad(m));
        setVal('cd-seconds', pad(s));
    }

    function pad(n) { return n < 10 ? '0' + n : String(n); }
    function setVal(id, val) {
        var el = document.getElementById(id);
        if (el && el.textContent !== val) {
            el.textContent = val;
            el.classList.remove('flip');
            void el.offsetWidth;
            el.classList.add('flip');
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);


    // ═══════════════════════════════════════════════════════
    //  8. STATS COUNTER ANIMATION
    // ═══════════════════════════════════════════════════════
    var statNumbers = document.querySelectorAll('.stat-number[data-target]');
    var statsAnimated = false;

    var statsObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                animateCounters();
                statsObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });

    var statsSection = document.getElementById('stats');
    if (statsSection) statsObserver.observe(statsSection);

    function animateCounters() {
        statNumbers.forEach(function (num) {
            var target = parseInt(num.getAttribute('data-target'), 10);
            var duration = 2000;
            var startTime = null;

            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                var progress = Math.min((timestamp - startTime) / duration, 1);
                // Ease out cubic
                var eased = 1 - Math.pow(1 - progress, 3);
                num.textContent = Math.floor(eased * target);
                if (progress < 1) requestAnimationFrame(step);
                else num.textContent = target;
            }
            requestAnimationFrame(step);
        });
    }


    // ═══════════════════════════════════════════════════════
    //  9. DAY SELECTOR
    // ═══════════════════════════════════════════════════════
    function filterSchedule(day) {
        scheduleRows.forEach(function (row) {
            if (row.getAttribute('data-day') === day) {
                row.style.display = 'flex';
                row.style.opacity = '0';
                row.style.transform = 'translateY(15px)';
                setTimeout(function () {
                    row.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    row.style.opacity = '1';
                    row.style.transform = 'translateY(0)';
                }, 30);
            } else {
                row.style.display = 'none';
            }
        });
    }

    dayBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            dayBtns.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            filterSchedule(btn.getAttribute('data-day'));
        });
    });

    filterSchedule('fri');


    // ═══════════════════════════════════════════════════════
    //  10. SCROLL REVEAL (IntersectionObserver)
    // ═══════════════════════════════════════════════════════
    var revealTargets = document.querySelectorAll(
        '.artist-card, .mosaic-cell, .pricing-card, .section-header, .register-form, .alert-info, .stage-legend, .day-selector, .stat-item, .faq-item, .testimonial-slider'
    );

    var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealTargets.forEach(function (el) {
        el.classList.add('reveal-on-scroll');
        var siblings = el.parentElement.querySelectorAll('.reveal-on-scroll');
        var idx = Array.prototype.indexOf.call(siblings, el);
        el.style.transitionDelay = (idx * 0.1) + 's';
        revealObserver.observe(el);
    });


    // ═══════════════════════════════════════════════════════
    //  11. TESTIMONIAL CAROUSEL
    // ═══════════════════════════════════════════════════════
    var testimonialTrack = document.querySelector('.testimonial-track');
    var testimonialCards = document.querySelectorAll('.testimonial-card');
    var testimonialDots  = document.querySelector('.testimonial-dots');
    var prevBtn = document.querySelector('.testimonial-prev');
    var nextBtn = document.querySelector('.testimonial-next');
    var currentSlide = 0;
    var totalSlides = testimonialCards.length;
    var autoSlideTimer;

    if (testimonialTrack && totalSlides > 0) {
        // Create dots
        for (var d = 0; d < totalSlides; d++) {
            var dot = document.createElement('button');
            dot.className = 'dot' + (d === 0 ? ' active' : '');
            dot.setAttribute('data-index', d);
            dot.setAttribute('aria-label', 'Slide ' + (d + 1));
            testimonialDots.appendChild(dot);
        }

        function goToSlide(index) {
            currentSlide = (index + totalSlides) % totalSlides;
            testimonialTrack.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
            var dots = testimonialDots.querySelectorAll('.dot');
            dots.forEach(function (d, i) {
                d.classList.toggle('active', i === currentSlide);
            });
        }

        if (prevBtn) prevBtn.addEventListener('click', function () {
            goToSlide(currentSlide - 1);
            resetAutoSlide();
        });
        if (nextBtn) nextBtn.addEventListener('click', function () {
            goToSlide(currentSlide + 1);
            resetAutoSlide();
        });

        testimonialDots.addEventListener('click', function (e) {
            var dot = e.target.closest('.dot');
            if (dot) {
                goToSlide(parseInt(dot.getAttribute('data-index')));
                resetAutoSlide();
            }
        });

        // Auto-advance
        function startAutoSlide() {
            autoSlideTimer = setInterval(function () {
                goToSlide(currentSlide + 1);
            }, 5000);
        }
        function resetAutoSlide() {
            clearInterval(autoSlideTimer);
            startAutoSlide();
        }
        startAutoSlide();

        // Swipe support
        var touchStartX = 0;
        testimonialTrack.addEventListener('touchstart', function (e) {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });
        testimonialTrack.addEventListener('touchend', function (e) {
            var diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
                goToSlide(diff > 0 ? currentSlide + 1 : currentSlide - 1);
                resetAutoSlide();
            }
        }, { passive: true });
    }


    // ═══════════════════════════════════════════════════════
    //  12. FAQ ACCORDION
    // ═══════════════════════════════════════════════════════
    document.querySelectorAll('.faq-question').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var item = btn.closest('.faq-item');
            var isOpen = item.classList.contains('open');

            // Close all
            document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
                openItem.classList.remove('open');
                openItem.querySelector('.faq-answer').style.maxHeight = null;
            });

            // Open clicked (if it was closed)
            if (!isOpen) {
                item.classList.add('open');
                var answer = item.querySelector('.faq-answer');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });


    // ═══════════════════════════════════════════════════════
    //  13. BUY TICKET → PRE-SELECT & SCROLL
    // ═══════════════════════════════════════════════════════
    var ticketMap = { 'General': 'general', 'VIP': 'vip', 'Backstage': 'backstage' };

    document.querySelectorAll('.pricing-card .btn-glow').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var card = btn.closest('.pricing-card');
            var tier = card.querySelector('h3').textContent.trim();
            var value = ticketMap[tier];

            if (ticketSelect && value) {
                ticketSelect.value = value;
                ticketSelect.classList.add('field-flash');
                setTimeout(function () { ticketSelect.classList.remove('field-flash'); }, 1000);
            }

            document.getElementById('register').scrollIntoView({ behavior: 'smooth' });
        });
    });


    // ═══════════════════════════════════════════════════════
    //  14. 3D TILT ON PRICING CARDS
    // ═══════════════════════════════════════════════════════
    document.querySelectorAll('.pricing-card').forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
            var rect = card.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            var centerX = rect.width / 2;
            var centerY = rect.height / 2;
            var rotateX = ((y - centerY) / centerY) * -8;
            var rotateY = ((x - centerX) / centerX) * 8;

            var baseScale = card.classList.contains('featured') ? 1.05 : 1;
            card.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale(' + baseScale + ')';
        });

        card.addEventListener('mouseleave', function () {
            card.style.transform = card.classList.contains('featured') ? 'scale(1.05)' : '';
            card.style.transition = 'transform 0.5s ease';
            setTimeout(function () { card.style.transition = ''; }, 500);
        });
    });


    // ═══════════════════════════════════════════════════════
    //  15. BUTTON RIPPLE EFFECT
    // ═══════════════════════════════════════════════════════
    document.querySelectorAll('.btn-glow').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            var ripple = document.createElement('span');
            ripple.className = 'ripple';
            var rect = btn.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left) + 'px';
            ripple.style.top  = (e.clientY - rect.top) + 'px';
            btn.appendChild(ripple);
            setTimeout(function () { ripple.remove(); }, 600);
        });
    });


    // ═══════════════════════════════════════════════════════
    //  16. IMAGE LIGHTBOX FOR EXPERIENCE GRID
    // ═══════════════════════════════════════════════════════
    document.querySelectorAll('.mosaic-cell').forEach(function (cell) {
        cell.addEventListener('click', function () {
            var bg = getComputedStyle(cell).backgroundImage;
            var url = bg.replace(/url\(['"]?/, '').replace(/['"]?\)/, '');
            var label = cell.querySelector('.mosaic-label');
            var title = label ? label.textContent : '';

            var lightbox = document.createElement('div');
            lightbox.className = 'lightbox-overlay';
            lightbox.innerHTML =
                '<div class="lightbox-content">' +
                    '<button class="lightbox-close" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>' +
                    '<img src="' + url + '" alt="' + escapeHtml(title) + '">' +
                    (title ? '<p class="lightbox-title">' + escapeHtml(title) + '</p>' : '') +
                '</div>';

            document.body.appendChild(lightbox);
            requestAnimationFrame(function () { lightbox.classList.add('visible'); });

            lightbox.querySelector('.lightbox-close').addEventListener('click', function () { closeLightbox(lightbox); });
            lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(lightbox); });
        });
    });

    function escapeHtml(str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function closeLightbox(lb) {
        lb.classList.remove('visible');
        setTimeout(function () { lb.remove(); }, 300);
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            var lb = document.querySelector('.lightbox-overlay');
            if (lb) closeLightbox(lb);
            var modal = document.querySelector('.success-modal-overlay');
            if (modal) closeModal(modal);
        }
    });


    // ═══════════════════════════════════════════════════════
    //  17. FORM VALIDATION
    // ═══════════════════════════════════════════════════════
    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var isValid = true;
            var fields = registerForm.querySelectorAll('[required]');

            fields.forEach(function (field) {
                removeError(field);
                if (!field.value || (field.type === 'checkbox' && !field.checked)) {
                    showError(field, getErrorMsg(field));
                    isValid = false;
                } else if (field.type === 'email' && !validEmail(field.value)) {
                    showError(field, 'Please enter a valid email address');
                    isValid = false;
                }
            });

            if (!isValid) {
                var firstError = registerForm.querySelector('.is-invalid');
                if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }

            var btn = registerForm.querySelector('[type="submit"]');
            var originalText = btn.textContent;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Registering...';
            btn.disabled = true;

            setTimeout(function () {
                registerForm.reset();
                btn.textContent = originalText;
                btn.disabled = false;
                showSuccessModal();
            }, 1500);
        });

        // Real-time on blur
        registerForm.querySelectorAll('.form-control, .form-select').forEach(function (field) {
            field.addEventListener('blur', function () {
                removeError(field);
                if (field.hasAttribute('required') && !field.value) {
                    showError(field, getErrorMsg(field));
                } else if (field.type === 'email' && field.value && !validEmail(field.value)) {
                    showError(field, 'Please enter a valid email address');
                } else if (field.value) {
                    field.classList.add('is-valid');
                }
            });
            field.addEventListener('input', function () { removeError(field); });
        });
    }

    function showError(field, msg) {
        field.classList.add('is-invalid');
        field.classList.remove('is-valid');
        var div = document.createElement('div');
        div.className = 'invalid-feedback';
        div.textContent = msg;
        field.parentNode.appendChild(div);
    }

    function removeError(field) {
        field.classList.remove('is-invalid', 'is-valid');
        var fb = field.parentNode.querySelector('.invalid-feedback');
        if (fb) fb.remove();
    }

    function getErrorMsg(field) {
        var msgs = { fullName: 'Full name is required', emailAddress: 'Email is required', ticketType: 'Please select a ticket type', termsCheck: 'You must agree to the terms' };
        return msgs[field.id] || 'This field is required';
    }

    function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }


    // ═══════════════════════════════════════════════════════
    //  18. SUCCESS MODAL
    // ═══════════════════════════════════════════════════════
    function showSuccessModal() {
        var overlay = document.createElement('div');
        overlay.className = 'success-modal-overlay';
        overlay.innerHTML =
            '<div class="success-modal">' +
                '<div class="success-checkmark"><i class="fa-solid fa-circle-check"></i></div>' +
                '<h3>Registration Successful!</h3>' +
                '<p>Check your email for confirmation details.</p>' +
                '<button class="btn btn-glow modal-close-btn">Got it!</button>' +
            '</div>';

        document.body.appendChild(overlay);
        requestAnimationFrame(function () { overlay.classList.add('visible'); });

        overlay.querySelector('.modal-close-btn').addEventListener('click', function () { closeModal(overlay); });
        overlay.addEventListener('click', function (e) { if (e.target === overlay) closeModal(overlay); });
    }

    function closeModal(overlay) {
        overlay.classList.remove('visible');
        setTimeout(function () { overlay.remove(); }, 300);
    }


    // ═══════════════════════════════════════════════════════
    //  19. NEWSLETTER + TOAST
    // ═══════════════════════════════════════════════════════
    var newsletterForm = document.querySelector('.footer-main form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var input = this.querySelector('input');
            if (input.value && validEmail(input.value)) {
                this.reset();
                showToast('Subscribed successfully!');
            } else {
                showToast('Please enter a valid email', true);
            }
        });
    }

    function showToast(message, isError) {
        var toast = document.createElement('div');
        toast.className = 'toast-notification' + (isError ? ' toast-error' : '');
        toast.innerHTML = '<i class="fa-solid ' + (isError ? 'fa-circle-xmark' : 'fa-circle-check') + '"></i> ' + message;
        document.body.appendChild(toast);
        requestAnimationFrame(function () { toast.classList.add('visible'); });
        setTimeout(function () {
            toast.classList.remove('visible');
            setTimeout(function () { toast.remove(); }, 300);
        }, 3000);
    }


    // ═══════════════════════════════════════════════════════
    //  20. BACK TO TOP
    // ═══════════════════════════════════════════════════════
    if (backToTop) {
        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }


    // ═══════════════════════════════════════════════════════
    //  21. TICKER PAUSE ON HOVER/TOUCH
    // ═══════════════════════════════════════════════════════
    if (tickerTrack) {
        tickerTrack.addEventListener('mouseenter', function () { tickerTrack.style.animationPlayState = 'paused'; });
        tickerTrack.addEventListener('mouseleave', function () { tickerTrack.style.animationPlayState = 'running'; });
        tickerTrack.addEventListener('touchstart', function () { tickerTrack.style.animationPlayState = 'paused'; }, { passive: true });
        tickerTrack.addEventListener('touchend', function () { tickerTrack.style.animationPlayState = 'running'; }, { passive: true });
    }


    // ═══════════════════════════════════════════════════════
    //  22. TYPING EFFECT ON HERO SUBTITLE
    // ═══════════════════════════════════════════════════════
    var heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        var phrases = ['Where Music Meets Magic', 'Feel the Beat, Live the Moment', 'Three Days of Pure Energy'];
        var phraseIndex = 0;
        var charIndex = 0;
        var isDeleting = false;
        var typingSpeed = 100;

        setTimeout(function startTyping() {
            var current = phrases[phraseIndex];

            if (isDeleting) {
                heroSubtitle.textContent = current.substring(0, charIndex - 1);
                charIndex--;
            } else {
                heroSubtitle.textContent = current.substring(0, charIndex + 1);
                charIndex++;
            }

            var delay = typingSpeed;

            if (!isDeleting && charIndex === current.length) {
                delay = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                delay = 500;
            } else if (isDeleting) {
                delay = 50;
            }

            setTimeout(startTyping, delay);
        }, 3000);
    }


    // ═══════════════════════════════════════════════════════
    //  23. DYNAMIC COPYRIGHT YEAR
    // ═══════════════════════════════════════════════════════
    var yearEl = document.getElementById('copyrightYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

})();

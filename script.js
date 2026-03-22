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

    // ─── ARTIST DATA ────────────────────────────────────────
    var artistData = {
        'vegas-like-mike': {
            name: 'VEGAS & LIKE MIKE',
            genre: 'Rock',
            badgeClass: 'badge-rock',
            image: 'img/pexels-erxmart-2247677.jpg',
            bio: 'Vegas & Like Mike have been defining rock music for over a decade. Known for their electrifying live performances and anthemic hits, this duo from Las Vegas brings an unmatched energy to every stage they touch. Their 2025 world tour sold out in minutes, cementing their status as rock icons.',
            stage: 'Main Stage',
            time: '9:00 PM',
            day: 'Day 1 - Friday',
            followers: '2.4M',
            origin: 'Las Vegas, NV',
            setlist: [
                { song: 'Midnight Thunder', duration: '4:32' },
                { song: 'Rise Up', duration: '3:58' },
                { song: 'Electric Dreams', duration: '5:12' },
                { song: 'Born to Rock', duration: '4:05' },
                { song: 'Unstoppable', duration: '4:28' }
            ],
            social: { instagram: '@vegaslikemike', twitter: '@VegasLikeMike', spotify: 'vegaslikemike' }
        },
        'dj-thunder': {
            name: 'DJ THUNDER',
            genre: 'EDM',
            badgeClass: 'badge-edm',
            image: 'img/pexels-david-bartus-43782-844928.jpg',
            bio: 'DJ Thunder is a master of electronic beats and crowd control. Rising from the underground scene in Berlin, he has become one of the most sought-after EDM artists worldwide. His signature sound combines bass-heavy drops with melodic progressions that create unforgettable moments on the dance floor.',
            stage: 'Electronic Arena',
            time: '11:00 PM',
            day: 'Day 3 - Sunday',
            followers: '1.8M',
            origin: 'Berlin, Germany',
            setlist: [
                { song: 'Storm Rising', duration: '5:45' },
                { song: 'Bass Cannon', duration: '4:20' },
                { song: 'Neon Nights', duration: '6:00' },
                { song: 'Drop It Low', duration: '4:15' },
                { song: 'Thunderstruck 2026', duration: '5:30' }
            ],
            social: { instagram: '@djthundermusic', twitter: '@DJThunder', spotify: 'dj-thunder' }
        },
        'luna-waves': {
            name: 'LUNA WAVES',
            genre: 'Pop',
            badgeClass: 'badge-pop',
            image: 'img/aleksandr-popov-hTv8aaPziOQ-unsplash.jpg',
            bio: 'Luna Waves captivates audiences with her ethereal voice and infectious pop melodies. After her viral breakthrough in 2023, Luna has become a festival favorite, blending pop, R&B, and electronic elements into a unique sonic experience that resonates with fans worldwide.',
            stage: 'Main Stage',
            time: '7:30 PM',
            day: 'Day 1 - Friday',
            followers: '3.2M',
            origin: 'Los Angeles, CA',
            setlist: [
                { song: 'Moonlight Serenade', duration: '3:45' },
                { song: 'Golden Hour', duration: '4:02' },
                { song: 'Waves', duration: '3:55' },
                { song: 'Starlight', duration: '4:15' },
                { song: 'Dancing in the Dark', duration: '4:30' }
            ],
            social: { instagram: '@lunawavesmusic', twitter: '@LunaWaves', spotify: 'luna-waves' }
        },
        'mc-blaze': {
            name: 'MC BLAZE',
            genre: 'Hip Hop',
            badgeClass: 'badge-hiphop',
            image: 'img/junel-mujar-TpdyCbvJHFU-unsplash.jpg',
            bio: 'MC Blaze is fire on the mic. Known for lightning-fast delivery and clever wordplay, this Brooklyn native has been turning heads in the hip-hop scene since 2021. His energetic performances and authentic lyrics have earned him a devoted following and critical acclaim.',
            stage: 'Discovery Stage',
            time: '5:00 PM',
            day: 'Day 2 - Saturday',
            followers: '890K',
            origin: 'Brooklyn, NY',
            setlist: [
                { song: 'City Lights', duration: '3:30' },
                { song: 'Blaze It', duration: '4:00' },
                { song: 'Rise and Grind', duration: '3:45' },
                { song: 'Flow State', duration: '4:20' },
                { song: 'Top of the Game', duration: '4:10' }
            ],
            social: { instagram: '@mcblazeofficial', twitter: '@MC_Blaze', spotify: 'mc-blaze' }
        },
        'echo-saints': {
            name: 'ECHO SAINTS',
            genre: 'Rock',
            badgeClass: 'badge-rock',
            image: 'img/victor-rodvang-rbSpGv1wb5M-unsplash.jpg',
            bio: 'Echo Saints bring a fresh take on alternative rock, blending grunge influences with modern production. Their atmospheric sound and introspective lyrics create a powerful emotional connection with audiences. Based in Seattle, they draw inspiration from the legendary rock scene while forging their own path.',
            stage: 'Main Stage',
            time: '4:00 PM',
            day: 'Day 1 - Friday',
            followers: '1.1M',
            origin: 'Seattle, WA',
            setlist: [
                { song: 'Echoes', duration: '5:00' },
                { song: 'Fade to Grey', duration: '4:30' },
                { song: 'Hollow Ground', duration: '4:45' },
                { song: 'Saints & Sinners', duration: '5:15' },
                { song: 'Last Light', duration: '6:00' }
            ],
            social: { instagram: '@echosaintsband', twitter: '@EchoSaints', spotify: 'echo-saints' }
        },
        'neon-pulse': {
            name: 'NEON PULSE',
            genre: 'EDM',
            badgeClass: 'badge-edm',
            image: 'img/brock-wegner-bLUko-RjuFk-unsplash.jpg',
            bio: 'Neon Pulse delivers high-octane electronic music that pushes the boundaries of the genre. Known for spectacular light shows and immersive productions, every Neon Pulse set is a multisensory experience. Their collaboration with top visual artists has set new standards for festival performances.',
            stage: 'Electronic Arena',
            time: '10:00 PM',
            day: 'Day 2 - Saturday',
            followers: '2.1M',
            origin: 'Amsterdam, Netherlands',
            setlist: [
                { song: 'Neon Dreams', duration: '5:30' },
                { song: 'Pulse', duration: '4:45' },
                { song: 'Color Spectrum', duration: '6:00' },
                { song: 'Digital Love', duration: '5:15' },
                { song: 'Infinite', duration: '7:00' }
            ],
            social: { instagram: '@neonpulseedm', twitter: '@NeonPulseEDM', spotify: 'neon-pulse' }
        },
        'ava-strings': {
            name: 'AVA STRINGS',
            genre: 'Pop',
            badgeClass: 'badge-pop',
            image: 'img/kamil-feczko-r1UCyK3dIfI-unsplash.jpg',
            bio: 'Ava Strings brings a unique acoustic-pop sound featuring virtuosic violin playing alongside her soulful vocals. Her innovative approach has earned her a special place in the festival circuit, offering intimate moments of musical brilliance in the Acoustic Tent.',
            stage: 'Acoustic Tent',
            time: '3:00 PM',
            day: 'Day 2 - Saturday',
            followers: '650K',
            origin: 'Nashville, TN',
            setlist: [
                { song: 'Strings Attached', duration: '4:00' },
                { song: 'Heartstrings', duration: '3:45' },
                { song: 'Golden', duration: '4:15' },
                { song: 'Whispered Melody', duration: '5:00' },
                { song: 'Ava Maria', duration: '4:30' }
            ],
            social: { instagram: '@avastringsmusic', twitter: '@AvaStrings', spotify: 'ava-strings' }
        }
    };


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


    // ═══════════════════════════════════════════════════════
    //  24. VENUE MAP INTERACTION
    // ═══════════════════════════════════════════════════════
    var mapZones = document.querySelectorAll('.map-zone');
    var mapTooltip = document.getElementById('mapTooltip');
    var mapLegendItems = document.querySelectorAll('.map-legend-item');

    if (mapZones.length > 0) {
        mapZones.forEach(function(zone) {
            zone.addEventListener('mouseenter', function(e) {
                var zoneName = zone.getAttribute('data-name');
                var zoneDesc = zone.getAttribute('data-desc');
                
                if (mapTooltip) {
                    mapTooltip.querySelector('h4').textContent = zoneName;
                    mapTooltip.querySelector('p').textContent = zoneDesc;
                    mapTooltip.classList.add('visible');
                }
                
                var zoneType = zone.getAttribute('data-zone');
                mapLegendItems.forEach(function(item) {
                    item.classList.toggle('active', item.getAttribute('data-zone') === zoneType);
                });
            });

            zone.addEventListener('mousemove', function(e) {
                if (mapTooltip) {
                    var rect = zone.closest('.map-wrapper').getBoundingClientRect();
                    var x = e.clientX - rect.left + 15;
                    var y = e.clientY - rect.top - 10;
                    
                    if (x + 280 > rect.width) {
                        x = x - 300;
                    }
                    if (y + 100 > rect.height) {
                        y = y - 100;
                    }
                    
                    mapTooltip.style.left = x + 'px';
                    mapTooltip.style.top = y + 'px';
                }
            });

            zone.addEventListener('mouseleave', function() {
                if (mapTooltip) {
                    mapTooltip.classList.remove('visible');
                }
                mapLegendItems.forEach(function(item) {
                    item.classList.remove('active');
                });
            });

            zone.addEventListener('click', function() {
                var zoneType = zone.getAttribute('data-zone');
                var targetSection = document.querySelector('#' + (zoneType === 'main-stage' ? 'schedule' : zoneType));
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        mapLegendItems.forEach(function(item) {
            item.addEventListener('mouseenter', function() {
                var zoneType = item.getAttribute('data-zone');
                var zone = document.querySelector('.map-zone[data-zone="' + zoneType + '"]');
                if (zone) {
                    var zoneName = zone.getAttribute('data-name');
                    var zoneDesc = zone.getAttribute('data-desc');
                    if (mapTooltip) {
                        mapTooltip.querySelector('h4').textContent = zoneName;
                        mapTooltip.querySelector('p').textContent = zoneDesc;
                        mapTooltip.classList.add('visible');
                    }
                    mapLegendItems.forEach(function(li) { li.classList.remove('active'); });
                    item.classList.add('active');
                }
            });

            item.addEventListener('mouseleave', function() {
                if (mapTooltip) mapTooltip.classList.remove('visible');
                mapLegendItems.forEach(function(li) { li.classList.remove('active'); });
            });
        });
    }


    // ═══════════════════════════════════════════════════════
    //  25. ARTIST PROFILE MODALS
    // ═══════════════════════════════════════════════════════
    var artistCards = document.querySelectorAll('.artist-card[data-artist]');

    artistCards.forEach(function(card) {
        card.addEventListener('click', function() {
            var artistId = card.getAttribute('data-artist');
            var artist = artistData[artistId];
            if (artist) {
                showArtistModal(artist);
            }
        });

        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                var artistId = card.getAttribute('data-artist');
                var artist = artistData[artistId];
                if (artist) {
                    showArtistModal(artist);
                }
            }
        });
    });

    function showArtistModal(artist) {
        var existingModal = document.querySelector('.artist-modal-overlay');
        if (existingModal) existingModal.remove();

        var setlistHtml = artist.setlist.map(function(item, index) {
            return '<div class="setlist-item"><span class="song-name">' + (index + 1) + '. ' + item.song + '</span><span class="song-duration">' + item.duration + '</span></div>';
        }).join('');

        var socialHtml = '';
        if (artist.social.instagram) {
            socialHtml += '<a href="https://instagram.com/' + artist.social.instagram.replace('@', '') + '" target="_blank" class="artist-social-link" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>';
        }
        if (artist.social.twitter) {
            socialHtml += '<a href="https://twitter.com/' + artist.social.twitter.replace('@', '') + '" target="_blank" class="artist-social-link" aria-label="Twitter"><i class="fa-brands fa-x-twitter"></i></a>';
        }
        if (artist.social.spotify) {
            socialHtml += '<a href="https://open.spotify.com/artist/' + artist.social.spotify + '" target="_blank" class="artist-social-link" aria-label="Spotify"><i class="fa-brands fa-spotify"></i></a>';
        }

        var modalHtml = 
            '<div class="artist-modal-overlay">' +
                '<div class="artist-modal">' +
                    '<div class="artist-modal-header" style="background-image: url(\'' + artist.image + '\')">' +
                        '<button class="artist-modal-close" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>' +
                    '</div>' +
                    '<div class="artist-modal-content">' +
                        '<h2 class="artist-modal-name">' + artist.name + '</h2>' +
                        '<div class="artist-modal-genre"><span class="genre-badge ' + artist.badgeClass + '">' + artist.genre + '</span></div>' +
                        '<p class="artist-modal-bio">' + artist.bio + '</p>' +
                        '<div class="artist-modal-details">' +
                            '<div class="artist-detail-item">' +
                                '<i class="fa-solid fa-tower-broadcast"></i>' +
                                '<span class="detail-label">Stage</span>' +
                                '<span class="detail-value">' + artist.stage + '</span>' +
                            '</div>' +
                            '<div class="artist-detail-item">' +
                                '<i class="fa-solid fa-clock"></i>' +
                                '<span class="detail-label">Performance</span>' +
                                '<span class="detail-value">' + artist.day + ', ' + artist.time + '</span>' +
                            '</div>' +
                            '<div class="artist-detail-item">' +
                                '<i class="fa-solid fa-users"></i>' +
                                '<span class="detail-label">Followers</span>' +
                                '<span class="detail-value">' + artist.followers + '</span>' +
                            '</div>' +
                            '<div class="artist-detail-item">' +
                                '<i class="fa-solid fa-location-dot"></i>' +
                                '<span class="detail-label">Origin</span>' +
                                '<span class="detail-value">' + artist.origin + '</span>' +
                            '</div>' +
                        '</div>' +
                        '<div class="artist-modal-setlist">' +
                            '<h4>SETLIST</h4>' +
                            setlistHtml +
                        '</div>' +
                        '<div class="artist-modal-social">' +
                            socialHtml +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>';

        document.body.insertAdjacentHTML('beforeend', modalHtml);
        var modal = document.querySelector('.artist-modal-overlay');
        
        requestAnimationFrame(function() {
            modal.classList.add('visible');
        });

        var closeBtn = modal.querySelector('.artist-modal-close');
        closeBtn.addEventListener('click', function() {
            closeArtistModal(modal);
        });

        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeArtistModal(modal);
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('visible')) {
                closeArtistModal(modal);
            }
        });
    }

    function closeArtistModal(modal) {
        modal.classList.remove('visible');
        setTimeout(function() { modal.remove(); }, 400);
    }


    // ═══════════════════════════════════════════════════════
    //  26. SOCIAL SHARING
    // ═══════════════════════════════════════════════════════
    var shareUrl = encodeURIComponent(window.location.href);
    var shareTitle = encodeURIComponent('EVENTRIX 2026 - The Ultimate Music Festival Experience');
    var shareDesc = encodeURIComponent('Join 50+ artists across 3 stages in New York City. June 20-22, 2026!');

    function getShareUrl(platform) {
        var urls = {
            'twitter': 'https://twitter.com/intent/tweet?url=' + shareUrl + '&text=' + shareTitle + ' ' + shareDesc,
            'facebook': 'https://www.facebook.com/sharer/sharer.php?u=' + shareUrl,
            'whatsapp': 'https://wa.me/?text=' + shareTitle + ' ' + shareDesc + ' ' + shareUrl,
            'linkedin': 'https://www.linkedin.com/shareArticle?mini=true&url=' + shareUrl + '&title=' + shareTitle + '&summary=' + shareDesc
        };
        return urls[platform] || '';
    }

    document.querySelectorAll('.share-btn, .share-btn-main').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            var platform = btn.getAttribute('data-platform');
            var url = getShareUrl(platform);
            if (url) {
                window.open(url, '_blank', 'width=600,height=400');
            }
        });
    });

    var copyBtn = document.getElementById('copyLinkBtn');
    var shareLink = document.getElementById('shareLink');
    if (copyBtn && shareLink) {
        copyBtn.addEventListener('click', function() {
            navigator.clipboard.writeText(shareLink.value).then(function() {
                copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
                copyBtn.classList.add('copied');
                setTimeout(function() {
                    copyBtn.innerHTML = '<i class="fa-solid fa-copy"></i> Copy';
                    copyBtn.classList.remove('copied');
                }, 2000);
            });
        });
    }

})();

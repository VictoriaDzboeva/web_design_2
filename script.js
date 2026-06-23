document.addEventListener('DOMContentLoaded', function() {

    const preloader = document.getElementById('preloader');
    const customCursor = document.getElementById('customCursor');
    const starWrapper = document.getElementById('loaderStarWrapper');
    const siteWrapper = document.getElementById('siteWrapper');
    const header = document.getElementById('header');
    const headerLogo = document.getElementById('headerLogo');
    const headerRight = document.getElementById('headerRight');
    const hero = document.getElementById('hero');
    const heroTitle = document.getElementById('heroTitle');
    const mission = document.getElementById('mission');
    const goal = document.getElementById('goal');
    const features = document.getElementById('features');
    const how = document.getElementById('how');
    const reviews = document.getElementById('reviews');
    const contactBlock = document.getElementById('contactBlock');
    const cta = document.getElementById('cta');
    const footer = document.getElementById('footer');
    const popupOverlay = document.getElementById('popupOverlay');
    const popupCloseBtn = document.getElementById('popupCloseBtn');
    const sendBtn = document.getElementById('sendBtn');
    const userPhone = document.getElementById('userPhone');
    let isDone = false;


    let lastScrollY = 0;
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollY;
        lastScrollY = currentScrollY;

        if (currentScrollY > 50) {
            headerLogo.classList.add('hidden');
        } else {
            headerLogo.classList.remove('hidden');
        }

        if (headerRight) {
            const translateY = Math.min(25, currentScrollY * 0.04);
            headerRight.style.transform = `translateY(${translateY}px)`;
        }
    });

   
    document.addEventListener('mousemove', function(e) {
        if (isDone) return;
        customCursor.style.left = e.clientX + 'px';
        customCursor.style.top = e.clientY + 'px';
    });

    customCursor.style.left = window.innerWidth / 2 + 'px';
    customCursor.style.top = window.innerHeight / 2 + 'px';

    setTimeout(() => {
        customCursor.classList.add('expanding');
        customCursor.classList.add('show-text');
    }, 500);

    setTimeout(() => {
        customCursor.classList.add('done');
        isDone = true;

        starWrapper.classList.add('hide');

        setTimeout(() => {
            siteWrapper.classList.add('visible');
            header.classList.add('visible');
            headerLogo.classList.add('visible');
            hero.classList.add('visible');

            
            if (!('ontouchstart' in window)) {
                heroTitle.classList.add('animating');
                setTimeout(() => {
                    heroTitle.classList.remove('animating');
                }, 3500);

                let mouseX = 50;
                let mouseY = 50;
                let radius = 0;
                let targetRadius = 0;
                let isHovering = false;

                function updateMask() {
                    heroTitle.style.setProperty('--mouse-x', mouseX + '%');
                    heroTitle.style.setProperty('--mouse-y', mouseY + '%');
                    heroTitle.style.setProperty('--radius', radius);
                }

                function animateRadius() {
                    const diff = targetRadius - radius;
                    if (Math.abs(diff) > 0.5) {
                        radius += diff * 0.12;
                        updateMask();
                        requestAnimationFrame(animateRadius);
                    } else {
                        radius = targetRadius;
                        updateMask();
                    }
                }

                heroTitle.addEventListener('mouseenter', function(e) {
                    isHovering = true;
                    targetRadius = 200;
                    if (radius < targetRadius - 1) {
                        animateRadius();
                    }
                    heroTitle.classList.add('active');
                });

                heroTitle.addEventListener('mousemove', function(e) {
                    const rect = heroTitle.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                    mouseX = Math.min(100, Math.max(0, x));
                    mouseY = Math.min(100, Math.max(0, y));
                    updateMask();
                });

                heroTitle.addEventListener('mouseleave', function() {
                    isHovering = false;
                    targetRadius = 0;
                    heroTitle.classList.remove('active');
                    if (radius > 0.5) {
                        animateRadius();
                    } else {
                        radius = 0;
                        updateMask();
                    }
                });

                updateMask();
            }

  
            const menuToggle = document.getElementById('menuToggle');
            const headerMenu = document.getElementById('headerMenu');

            menuToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                headerMenu.classList.toggle('open');
            });

            document.addEventListener('click', function(e) {
                if (!headerMenu.contains(e.target) && e.target !== menuToggle && !menuToggle
                    .contains(e.target)) {
                    headerMenu.classList.remove('open');
                }
            });

            headerMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', function() {
                    headerMenu.classList.remove('open');
                });
            });

  
            setTimeout(() => {
                mission.classList.add('visible');
            }, 3800);

            setTimeout(() => {
                goal.classList.add('visible');
                initGoalColoring();
            }, 4100);

            setTimeout(() => {
                features.classList.add('visible');
            }, 4400);

            setTimeout(() => {
                how.classList.add('visible');
                initHowCards();
            }, 4700);

            setTimeout(() => {
                reviews.classList.add('visible');
                initReviewCards();
            }, 5000);

            setTimeout(() => {
                contactBlock.classList.add('visible');
            }, 5200);

            setTimeout(() => {
                cta.classList.add('visible');
                initCtaWaveText('ctaTitle');
                initCtaCursor();
            }, 5400);

            setTimeout(() => {
                footer.classList.add('visible');
            }, 5600);

        }, 500);

        setTimeout(() => {
            preloader.classList.add('hide');
            document.body.classList.add('cursor-default');

            setTimeout(() => {
                preloader.style.display = 'none';
            }, 400);
        }, 800);

    }, 3200);


    function initGoalColoring() {
        const element = document.getElementById('goalTitle');
        if (!element) return;

        const originalHTML = element.innerHTML;
        const words = originalHTML.split('<br>');
        let newHTML = '';
        words.forEach((word, index) => {
            if (index > 0) newHTML += '<br>';
            const chars = word.split('');
            chars.forEach(char => {
                if (char === ' ') {
                    newHTML += ' ';
                } else {
                    newHTML += `<span class="char">${char}</span>`;
                }
            });
        });
        element.innerHTML = newHTML;

        const chars = element.querySelectorAll('.char');
        let isRevealed = false;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !isRevealed) {
                    isRevealed = true;
                    chars.forEach((char, index) => {
                        setTimeout(() => {
                            char.classList.add('visible');
                        }, index * 60);
                    });
                } else if (!entry.isIntersecting && isRevealed) {
                    isRevealed = false;
                    chars.forEach((char) => {
                        char.classList.remove('visible');
                    });
                }
            });
        }, { threshold: 0.4 });

        observer.observe(element);
    }

    function initHowCards() {
        const cards = document.querySelectorAll('.how-card');
        const cursorField = document.getElementById('cursorField');
        let isCardHovered = false;

        function checkCards() {
            cards.forEach(c => {
                if (c.getBoundingClientRect().top < window.innerHeight - 60) {
                    setTimeout(() => {
                        c.classList.add('show-card');
                    }, parseInt(c.dataset.delay) || 0);
                }
            });
        }


        if (!('ontouchstart' in window)) {
            cards.forEach(card => {
                card.addEventListener('mouseenter', function(e) {
                    isCardHovered = true;
                    cursorField.classList.add('visible');
                    updateCursorFieldPosition(e);
                });

                card.addEventListener('mousemove', function(e) {
                    if (isCardHovered) {
                        updateCursorFieldPosition(e);
                    }
                });

                card.addEventListener('mouseleave', function() {
                    isCardHovered = false;
                    cursorField.classList.remove('visible');
                });
            });

            function updateCursorFieldPosition(e) {
                cursorField.style.left = e.clientX + 'px';
                cursorField.style.top = e.clientY + 'px';
            }
        }

        window.addEventListener('scroll', checkCards);
        checkCards();
    }


    function initReviewCards() {
        const cards = document.querySelectorAll('.review-card');

        function checkCards() {
            cards.forEach(c => {
                if (c.getBoundingClientRect().top < window.innerHeight - 60) {
                    setTimeout(() => {
                        c.classList.add('show-card');
                    }, parseInt(c.dataset.delay) || 0);
                }
            });
        }

        window.addEventListener('scroll', checkCards);
        checkCards();

        const reviewsWrapper = document.getElementById('reviewsWrapper');

        window.addEventListener('scroll', function() {
            const rect = reviewsWrapper?.getBoundingClientRect();
            if (!rect) return;
            const windowHeight = window.innerHeight;
            if (rect.top < windowHeight && rect.bottom > 0) {
                const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
                const maxScroll = reviewsWrapper.scrollWidth - reviewsWrapper.clientWidth;
                reviewsWrapper.scrollLeft = progress * maxScroll;
            }
        });
    }


    function initCtaWaveText(elementId) {
        const element = document.getElementById(elementId);
        if (!element) return;

        const originalHTML = element.innerHTML;
        const words = originalHTML.split('<br>');
        let newHTML = '';
        words.forEach((word, index) => {
            if (index > 0) newHTML += '<br>';
            const chars = word.split('');
            chars.forEach(char => {
                if (char === ' ') {
                    newHTML += ' ';
                } else {
                    newHTML += `<span class="char">${char}</span>`;
                }
            });
        });
        element.innerHTML = newHTML;


        if ('ontouchstart' in window) return;

        let animationFrame = null;
        let targetScales = new Map();
        let currentScales = new Map();
        const chars = element.querySelectorAll('.char');

        chars.forEach(char => {
            currentScales.set(char, 1);
            targetScales.set(char, 1);
        });

        function animateWave() {
            let needsUpdate = false;
            chars.forEach(char => {
                const target = targetScales.get(char) || 1;
                const current = currentScales.get(char) || 1;
                const diff = target - current;
                if (Math.abs(diff) > 0.0005) {
                    const newVal = current + diff * 0.08;
                    currentScales.set(char, newVal);
                    const weight = 700 + (newVal - 1) * 200;
                    char.style.transform = `scale(${newVal})`;
                    char.style.fontWeight = Math.min(900, Math.max(700, weight));
                    needsUpdate = true;
                } else if (current !== target) {
                    currentScales.set(char, target);
                    const weight = 700 + (target - 1) * 200;
                    char.style.transform = `scale(${target})`;
                    char.style.fontWeight = Math.min(900, Math.max(700, weight));
                }
            });

            if (needsUpdate) {
                animationFrame = requestAnimationFrame(animateWave);
            } else {
                animationFrame = null;
            }
        }

        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const width = rect.width;

            chars.forEach((char) => {
                const charRect = char.getBoundingClientRect();
                const charCenterX = charRect.left + charRect.width / 2 - rect.left;
                const distance = Math.abs(mouseX - charCenterX);
                const maxDistance = width * 0.35;
                const scale = Math.max(1, 1 + 0.5 * Math.exp(-distance / maxDistance));
                targetScales.set(char, scale);
            });

            if (!animationFrame) {
                animationFrame = requestAnimationFrame(animateWave);
            }
        });

        element.addEventListener('mouseleave', function() {
            chars.forEach(char => {
                targetScales.set(char, 1);
            });
            if (!animationFrame) {
                animationFrame = requestAnimationFrame(animateWave);
            }
        });
    }


    function initCtaCursor() {

        if ('ontouchstart' in window) return;

        const ctaSection = document.getElementById('cta');
        const cursorDownload = document.getElementById('cursorDownload');
        let isHovered = false;

        ctaSection.addEventListener('mouseenter', function(e) {
            isHovered = true;
            cursorDownload.classList.add('visible');
            updateCursorPosition(e);
        });

        ctaSection.addEventListener('mousemove', function(e) {
            if (isHovered) {
                updateCursorPosition(e);
            }
        });

        ctaSection.addEventListener('mouseleave', function() {
            isHovered = false;
            cursorDownload.classList.remove('visible');
        });

        function updateCursorPosition(e) {
            cursorDownload.style.left = e.clientX + 'px';
            cursorDownload.style.top = e.clientY + 'px';
        }
    }


    userPhone.addEventListener('input', function(e) {
        let value = this.value.replace(/\D/g, '');
        let formatted = '+7';
        if (value.length > 1) {
            const numbers = value.substring(1);
            if (numbers.length > 0) formatted += ' ' + numbers.substring(0, 3);
            if (numbers.length > 3) formatted += ' ' + numbers.substring(3, 6);
            if (numbers.length > 6) formatted += ' ' + numbers.substring(6, 10);
        }
        this.value = formatted;
    });

    sendBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const name = document.getElementById('userName').value.trim();
        const phone = document.getElementById('userPhone').value.trim();
        const message = document.getElementById('userMessage').value.trim();

        if (!name || !phone || !message) {
            alert('Пожалуйста, заполните все поля!');
            return;
        }

        popupOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });


    popupCloseBtn.addEventListener('click', function() {
        popupOverlay.classList.remove('active');
        document.body.style.overflow = '';
        document.getElementById('userName').value = '';
        document.getElementById('userPhone').value = '';
        document.getElementById('userMessage').value = '';
    });

    popupOverlay.addEventListener('click', function(e) {
        if (e.target === this) {
            popupOverlay.classList.remove('active');
            document.body.style.overflow = '';
            document.getElementById('userName').value = '';
            document.getElementById('userPhone').value = '';
            document.getElementById('userMessage').value = '';
        }
    });

    document.querySelectorAll('.hero-btn, .join-btn, .footer-download').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

});
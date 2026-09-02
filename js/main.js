// =============================================
// PORTFOLIO - Main JavaScript
// =============================================

document.addEventListener('DOMContentLoaded', function() {

    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });


    // ===== ACTIVE NAV LINK ON SCROLL =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function setActiveNav() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (
                scrollY >= sectionTop &&
                scrollY < sectionTop + sectionHeight
            ) {
                navLinks.forEach(link => {
                    link.classList.remove('active');

                    if (
                        link.getAttribute('href') === '#' + sectionId
                    ) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', setActiveNav);


    // ===== MOBILE MENU =====
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileClose = document.getElementById('mobileClose');
    const mobileLinks = document.querySelectorAll('[data-nav]');

    function openMobileMenu() {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    mobileToggle.addEventListener('click', openMobileMenu);
    mobileClose.addEventListener('click', closeMobileMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });


    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const target = document.querySelector(
                this.getAttribute('href')
            );

            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });

    });


    // ===== FADE-IN ON SCROLL =====
    const fadeElements = document.querySelectorAll('.fade-in');

    const fadeObserver = new IntersectionObserver(
        function(entries) {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add('visible');

                    fadeObserver.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        }
    );

    fadeElements.forEach(el => {
        fadeObserver.observe(el);
    });


    // ===== COUNTER ANIMATION =====
    const counters = document.querySelectorAll('[data-count]');
    let counterDone = false;

    const counterObserver = new IntersectionObserver(
        function(entries) {

            entries.forEach(entry => {

                if (entry.isIntersecting && !counterDone) {

                    counterDone = true;

                    counters.forEach(counter => {

                        const target = parseInt(
                            counter.getAttribute('data-count')
                        );

                        const suffix =
                            counter.innerHTML.includes('<span')
                                ? counter.querySelector('.accent').outerHTML
                                : '';

                        let current = 0;

                        const step = target / 125;

                        const tick = function() {

                            current += step;

                            if (current < target) {

                                counter.innerHTML =
                                    Math.floor(current) + suffix;

                                requestAnimationFrame(tick);

                            } else {

                                counter.innerHTML =
                                    target + suffix;

                            }
                        };

                        tick();

                    });

                }

            });

        },
        {
            threshold: 0.5
        }
    );

    const statsEl = document.querySelector('.hero-stats');

    if (statsEl) {
        counterObserver.observe(statsEl);
    }


    // ===== SKILL BAR ANIMATION =====
    const skillBars =
        document.querySelectorAll('.skill-bar-fill');

    const skillObserver = new IntersectionObserver(
        function(entries) {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.width =
                        entry.target.getAttribute('data-width') + '%';

                    skillObserver.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.5
        }
    );

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });


    // ===== PORTFOLIO FILTER =====
    const filterBtns =
        document.querySelectorAll('.filter-btn');

    const portfolioItems =
        document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {

        btn.addEventListener('click', function() {

            filterBtns.forEach(b => {
                b.classList.remove('active');
            });

            this.classList.add('active');

            const filter =
                this.getAttribute('data-filter');

            portfolioItems.forEach((item, i) => {

                const cat =
                    item.getAttribute('data-category');

                if (filter === 'all' || cat === filter) {

                    item.classList.remove('hidden');
                    item.classList.add('show');

                    item.style.animationDelay =
                        (i * 0.08) + 's';

                } else {

                    item.classList.add('hidden');
                    item.classList.remove('show');

                }

            });

        });

    });


    // =============================================
    // CONTACT FORM - WEB3FORMS
    // =============================================

    const form =
        document.getElementById('contactForm');

    const successMsg =
        document.getElementById('formSuccess');

    const submitBtn =
        document.getElementById('submitBtn');


    if (form) {

        form.addEventListener('submit', async function(e) {

            // Mencegah halaman berpindah
            e.preventDefault();

            // Bersihkan pesan error sebelumnya
            document.querySelectorAll('.form-error').forEach(el => {
                el.textContent = '';
            });


            // ===== AMBIL DATA FORM =====

            const name =
                form.name.value.trim();

            const email =
                form.email.value.trim();

            const subject =
                form.subject.value.trim();

            const message =
                form.message.value.trim();


            // ===== VALIDASI =====

            let valid = true;


            if (name.length < 2) {

                document.getElementById('nameError').textContent =
                    'Nama minimal 2 karakter';

                valid = false;
            }


            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {

                document.getElementById('emailError').textContent =
                    'Email tidak valid';

                valid = false;
            }


            if (subject.length < 3) {

                document.getElementById('subjectError').textContent =
                    'Subjek minimal 3 karakter';

                valid = false;
            }


            if (message.length < 20) {

                document.getElementById('messageError').textContent =
                    'Pesan minimal 20 karakter';

                valid = false;
            }


            // Kalau data tidak valid
            if (!valid) {
                return;
            }


            // =============================================
            // KIRIM DATA KE WEB3FORMS
            // =============================================

            submitBtn.textContent = 'Mengirim...';
            submitBtn.disabled = true;


            try {

                // Mengambil semua data dari form
                const formData = new FormData(form);


                // Kirim ke Web3Forms
                const response = await fetch(
                    form.action,
                    {
                        method: 'POST',
                        body: formData
                    }
                );


                // Ambil response dari Web3Forms
                const result = await response.json();


                // =============================================
                // BERHASIL
                // =============================================

                if (result.success) {

                    successMsg.style.display = 'block';

                    form.reset();


                    submitBtn.innerHTML =
                        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
                        '<line x1="22" y1="2" x2="11" y2="13"/>' +
                        '<polygon points="22 2 15 22 11 13 2 9 22 2"/>' +
                        '</svg> Kirim Pesan';


                    successMsg.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });


                    // Hilangkan pesan setelah 5 detik
                    setTimeout(function() {

                        successMsg.style.display = 'none';

                    }, 5000);


                } else {

                    // =============================================
                    // GAGAL DARI WEB3FORMS
                    // =============================================

                    console.error(
                        'Web3Forms Error:',
                        result
                    );

                    alert(
                        'Pesan gagal dikirim. Silakan coba lagi.'
                    );

                }


            } catch (error) {

                // =============================================
                // ERROR KONEKSI
                // =============================================

                console.error(
                    'Error mengirim form:',
                    error
                );

                alert(
                    'Terjadi kesalahan saat mengirim pesan. Periksa koneksi internet Anda.'
                );

            }


            // Aktifkan kembali tombol
            submitBtn.disabled = false;

        });


        // ===== HAPUS ERROR SAAT USER MENGETIK =====

        form.querySelectorAll(
            '.form-input, .form-textarea'
        ).forEach(input => {

            input.addEventListener('input', function() {

                const err =
                    document.getElementById(
                        this.id + 'Error'
                    );

                if (err) {
                    err.textContent = '';
                }

            });

        });

    }


    // ===== YEAR =====
    const yearEl =
        document.getElementById('year');

    if (yearEl) {
        yearEl.textContent =
            new Date().getFullYear();
    }


    // ===== PARALLAX =====
    window.addEventListener('scroll', function() {

        const s =
            window.pageYOffset;

        const bg =
            document.querySelector('.hero-bg');

        if (
            bg &&
            s < window.innerHeight
        ) {

            bg.style.transform =
                'translateY(' + (s * 0.3) + 'px)';

        }

    });


    console.log('Portfolio loaded! 🚀');

});

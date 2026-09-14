/**
 * site.js – Scroll animations, counter animation, general UI
 */
(function ($) {
    'use strict';

    /* ── Scroll reveal (Intersection Observer) ── */
    function initFadeUp() {
        if (!('IntersectionObserver' in window)) {
            // Fallback: show all
            $('.fade-up').addClass('visible');
            return;
        }
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    $(entry.target).addClass('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        $('.fade-up').each(function () {
            observer.observe(this);
        });
    }

    /* ── Animated counter ── */
    function animateCounter($el) {
        var target  = parseInt($el.data('target'), 10);
        var suffix  = $el.data('suffix') || '';
        var duration = 1600;
        var start   = 0;
        var step    = Math.ceil(duration / target);

        var timer = setInterval(function () {
            start += 1;
            $el.text(start + suffix);
            if (start >= target) {
                clearInterval(timer);
                $el.text(target + suffix);
            }
        }, step);
    }

    function initCounters() {
        if (!('IntersectionObserver' in window)) {
            $('.counter').each(function () {
                var $el = $(this);
                $el.text($el.data('target') + ($el.data('suffix') || ''));
            });
            return;
        }
        var counterObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCounter($(entry.target));
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        $('.counter').each(function () { counterObserver.observe(this); });
    }

    /* ── Floating WhatsApp tooltip show on mobile tap ── */
    function initFloatWA() {
        var $floatWA = $('#float-wa');
        var $tooltip = $floatWA.find('.float-wa-tooltip');

        // On mobile, show tooltip briefly on first load
        if (window.innerWidth <= 768) {
            setTimeout(function () {
                $tooltip.css({ opacity: 1, transform: 'translateX(0)' });
                setTimeout(function () {
                    $tooltip.css({ opacity: 0, transform: 'translateX(10px)' });
                }, 2500);
            }, 2000);
        }
    }

    /* ── Card hover ripple effect ── */
    function initCardRipple() {
        $(document).on('mouseenter', '.card, .why-item, .service-card', function () {
            $(this).addClass('hovered');
        }).on('mouseleave', '.card, .why-item, .service-card', function () {
            $(this).removeClass('hovered');
        });
    }

    /* ── Init on DOM ready ── */
    $(function () {
        initFadeUp();
        initCounters();
        initFloatWA();
        initCardRipple();
    });

}(jQuery));

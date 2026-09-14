/**
 * navigation.js – Sticky header, hamburger menu, smooth scroll, active nav
 */
(function ($) {
    'use strict';

    /* ── Sticky header scroll ── */
    var $header = $('#site-header');
    $(window).on('scroll.header', function () {
        if ($(this).scrollTop() > 40) {
            $header.addClass('scrolled');
        } else {
            $header.removeClass('scrolled');
        }
    });

    /* ── Mobile hamburger toggle ── */
    var $hamburger = $('#hamburger-btn');
    var $mobileNav = $('#mobile-nav');

    $hamburger.on('click', function () {
        $(this).toggleClass('open');
        $mobileNav.toggleClass('open');
        // Accessibility
        var expanded = $(this).hasClass('open');
        $(this).attr('aria-expanded', expanded);
        $mobileNav.attr('aria-hidden', !expanded);
    });

    // Close mobile nav on link click
    $mobileNav.find('a').on('click', function () {
        $hamburger.removeClass('open').attr('aria-expanded', false);
        $mobileNav.removeClass('open').attr('aria-hidden', true);
    });

    // Close on outside click
    $(document).on('click', function (e) {
        if (!$header[0].contains(e.target)) {
            $hamburger.removeClass('open').attr('aria-expanded', false);
            $mobileNav.removeClass('open').attr('aria-hidden', true);
        }
    });

    /* ── Active nav link by current page ── */
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    $('#site-header .nav-link, #mobile-nav .nav-link').each(function () {
        var href = $(this).attr('href');
        if (href === currentPage ||
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === 'index.html')) {
            $(this).addClass('active');
        }
    });

    /* ── Smooth scroll for anchor links ── */
    $(document).on('click', 'a[href^="#"]', function (e) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 550, 'swing');
        }
    });

}(jQuery));

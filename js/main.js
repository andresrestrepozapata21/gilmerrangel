/**
 *	Dora - Personal Portfolio Templete (HTML)
 *	Author: codeefly
 *	Author URL: http://themeforest.net/user/codeefly
 *	Copyright © Dora by codeefly. All Rights Reserved.
 **/

(function ($) {
  "use strict";
  var dora = {
    /* Dora init */
    init() {
      dora.imgToSvg(),
        dora.smoothScrolling(),
        dora.customMouse(),
        dora.animation(),
        dora.magnificPopup(),
        dora.stickNav(),
        dora.scrollToActiveNav(),
        dora.navbarToggle(),
        dora.skillBarActive(),
        dora.serviceSlider(),
        dora.feedBackSlider(),
        dora.filter();
    },

    /* Svg to image */
    imgToSvg() {
      document.querySelectorAll("img.svg").forEach((el) => {
        const imgID = el.getAttribute("id");
        const imgClass = el.getAttribute("class");
        const imgURL = el.getAttribute("src");
        fetch(imgURL)
          .then((data) => data.text())
          .then((response) => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(response, "text/html");
            let svg = xmlDoc.querySelector("svg");
            if (typeof imgID !== "undefined") {
              svg.setAttribute("id", imgID);
            }

            if (typeof imgClass !== "undefined") {
              svg.setAttribute("class", imgClass + " replaced-svg");
            }

            svg.removeAttribute("xmlns:a");
            if (el.parentNode) {
              el.parentNode.replaceChild(svg, el);
            }
          });
      });
    },

    /* Smooth Scrolling */
    smoothScrolling() {
      $('a[href*="#"]')
        .not('[href="#"]')
        .not('[href="#0"]')
        .not('[href="#popup-1"]')
        .not('[href="#blog-popup-1"]')
        .not('[href="#blog-popup-2"]')
        .not('[href="#blog-popup-3"]')
        .not('[href="#blog-popup-4"]')
        .not('[href="#blog-popup-5"]')
        .not('[href="#blog-popup-6"]')
        .not('[href="#blog-popup-7"]')
        .not('[href="#blog-popup-8"]')
        .not('[href="#blog-popup-9"]')
        .not('[href="#blog-popup-10"]')
        .not('[href="#blog-popup-11"]')
        .not('[href="#blog-popup-12"]')
        .not('[href="#blog-popup-13"]')
        .not('[href="#blog-popup-14"]')
        .not('[href="#blog-popup-15"]')
        .click(function (event) {
          // On-page links
          if (
            location.pathname.replace(/^\//, "") ==
              this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
          ) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length
              ? target
              : $("[name=" + this.hash.slice(1) + "]");
            // Does a scroll target exist?
            if (target.length) {
              // Only prevent default if animation is actually gonna happen
              event.preventDefault();
              $("html, body").animate(
                {
                  scrollTop: target.offset().top,
                },
                750,
                function () {
                  // Callback after animation
                  // Must change focus!
                  var $target = $(target);
                  $target.focus();
                  if ($target.is(":focus")) {
                    // Checking if the target was focused
                    return false;
                  } else {
                    $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
                    $target.focus(); // Set focus again
                  }
                }
              );
            }
          }
        });
    },

    /* Custom Mouse */
    customMouse() {
      const e = document.querySelector(".cursor");
      let n,
        i = 0,
        o = !1;
      setTimeout(() => {
        window.onmousemove = function (s) {
          o ||
            (e.style.transform =
              "translate(" + s.clientX + "px, " + s.clientY + "px)"),
            (n = s.clientY),
            (i = s.clientX);
        };
      }, 1000);
      $("body").on(
        "mouseenter",
        "a, .c-pointer, button , .works-list-ul li",
        function () {
          e.classList.add("cursor-hover");
        }
      ),
        $("body").on(
          "mouseleave",
          "a, .c-pointer, button , .works-list-ul li",
          function () {
            ($(this).is("a") && $(this).closest(".c-pointer").length) ||
              e.classList.remove("cursor-hover");
          }
        ),
        (e.style.visibility = "visible");
    },

    /* Wow js scrolling animaiton */
    animation() {
      new WOW().init();
    },

    /* Preloader */
    preloader() {
      // Gsap 3 version
      const preloadDot = $(".preloader__container__preload__dot");
      const tl = gsap.timeline({ repeat: 3 });
      tl.to(preloadDot, 0.3, { delay: 0.3, scale: 1.4, stagger: 0.1 }).to(
        preloadDot,
        0.3,
        {
          scale: 1,
          stagger: {
            amount: 0.35,
            from: "start",
          },
        }
      );

      let counter = 0;
      const loaderTimer = setInterval(function () {
        counter++;
        $(".preloader__container__percent").text(counter + "%");
        if (counter == 100) {
          clearInterval(loaderTimer);
          gsap.to(".preloader", 0.3, { delay: 0.5, y: "-100%" });
        }
      }, 5);
    },
    /* Magnific popup */
    magnificPopup() {
      $(".popup a").magnificPopup({
        type: "image",
        gallery: {
          enabled: true,
        },
        mainClass: "mfp-fade",
      });
      $(".youtube a, .vimeo a").each(function () {
        $(this).magnificPopup({
          type: "iframe",
          mainClass: "mfp-fade",
          preloader: false,
          fixedContentPos: true,
        });
      });
      $(".soundcloud a").magnificPopup({
        type: "iframe",
        gallery: {
          enabled: true,
        },
      });
      $(".details-item,.item__ a").magnificPopup({
        type: "inline",
        overflowY: "auto",
        closeBtnInside: true,
        mainClass: "mfp-fade dora-popup",
      });
    },
    /* stick Nav */
    stickNav() {
      $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
          $(".header").addClass("fixed");
        } else {
          $(".header").removeClass("fixed");
        }
      });
    },
    /* Scroll nav */
    scrollToActiveNav() {
      $("nav ul").onePageNav();
    },
    /* Nav bar toggle */
    navbarToggle() {
      let menutoggle = $(".toggle"),
        header = $("header"),
        nav = $(".nav");
      $(window).resize(function () {
        if ($(window).width() > 991.97) {
          $(nav).css({ display: "flex" });
          header.removeClass("active");
        } else {
          $(nav).css({ display: "none" });
        }
      });

      menutoggle.on("click", function () {
        nav.slideToggle();
        if (header.hasClass("active")) {
          header.removeClass("active");
          nav.slideUp();
        } else {
          header.addClass("active");
          nav.slideDown();
        }
      });
    },

    /* Skill bar active with scrolling */
    skillBarActive() {
      var offsetTop = $("#about").offset().top;
      $(window).scroll(function () {
        var height = $(window).height();
        if ($(window).scrollTop() + height > offsetTop) {
          jQuery(".progress-line").each(function () {
            jQuery(this)
              .find("span")
              .animate(
                {
                  width: jQuery(this).attr("data-percent"),
                },
                2000
              );
          });
        }
      });
    },

    /* Sliders */
    serviceSlider() {
      new Swiper(".services-cont", {
        slidesPerView: 4,
        spaceBetween: 30,
        loop: true,
        centerSlider: true,
        fade: true,
        grabCursor: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          dynamicBullets: true,
        },
        navigation: {
          nextEl: ".service-swiper-button-right",
          prevEl: ".service-swiper-button-left",
        },
        breakpoints: {
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          // when window width is >= 320px
          574: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          // when window width is >= 766px
          860: {
            slidesPerView: 2,
            spaceBetween: 25,
          },
          1000: {
            slidesPerView: 3,
            spaceBetween: 25,
          },
          // when window width is >= 1024px
          1240: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        },
      });
    },
    feedBackSlider() {
      new Swiper(".feedback-items-cont", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        grabCursor: true,
        navigation: {
          nextEl: ".feedback-right",
          prevEl: ".feedback-left",
        },
        breakpoints: {
          // when window width is >= 1024px
          1400: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
        },
      });
    },

    /* Isotope */
    filter() {
      if ($(".work-isotope-filter").length) {
        $(".work-isotope-filter").imagesLoaded(function () {
          // items on button click
          $(".works-list-ul").on("click", "li", function () {
            var filterValue = $(this).attr("data-filter");
            $grid.isotope({
              filter: filterValue,
            });
          });
          // menu active class
          $(".works-list-ul li").on("click", function (e) {
            $(this).siblings(".active").removeClass("active");
            $(this).addClass("active");
            e.preventDefault();
          });
          var $grid = $(".works-row").isotope({
            itemSelector: ".works-col",
            percentPosition: true,
            masonry: {
              columnWidth: 3,
            },
          });
        });
      }
    },
  };

  $(document).ready(function () {
    dora.init();
  }),
    $(window).on("load", function () {
      dora.preloader();
    });
})(jQuery);

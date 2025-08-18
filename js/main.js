/* -------------------------------------------

Name: 		Ruizarch
Version:    1.0
Developer:	Nazar Miller (millerDigitalDesign)
Portfolio:  https://themeforest.net/user/millerdigitaldesign/portfolio?ref=MillerDigitalDesign

p.s. I am available for Freelance hire (UI design, web development). email: miller.themes@gmail.com

------------------------------------------- */

$(function () {
  "use strict";

  /***************************

    swup

    ***************************/
  const options = {
    containers: ["#swupMain", "#swupMenu"],
    animateHistoryBrowsing: true,
    linkSelector: "a:not([data-no-swup])",
    animationSelector: '[class="mil-main-transition"]',
  };
  const swup = new Swup(options);

  /***************************

    register gsap plugins

    ***************************/
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  /***************************

    color variables

    ***************************/

  var accent = "rgba(255, 152, 0, 1)";
  var dark = "#000";
  var light = "#fff";

  /***************************

    preloader

    ***************************/

  var timeline = gsap.timeline();

  timeline.to(".mil-preloader-animation", {
    opacity: 1,
  });

  timeline.fromTo(
    ".mil-animation-1 .mil-h3",
    {
      y: "30px",
      opacity: 0,
    },
    {
      y: "0px",
      opacity: 1,
      stagger: 0.4,
    }
  );

  timeline.to(
    ".mil-animation-1 .mil-h3",
    {
      opacity: 0,
      y: "-30",
    },
    "+=.3"
  );

  timeline.fromTo(
    ".mil-reveal-box",
    0.1,
    {
      opacity: 0,
    },
    {
      opacity: 1,
      x: "-30",
    }
  );

  timeline.to(
    ".mil-reveal-box",
    0.45,
    {
      width: "100%",
      x: 0,
    },
    "+=.1"
  );
  timeline.to(".mil-reveal-box", {
    right: "0",
  });
  timeline.to(".mil-reveal-box", 0.3, {
    width: "0%",
  });
  timeline.fromTo(
    ".mil-animation-2 .mil-h3",
    {
      opacity: 0,
    },
    {
      opacity: 1,
    },
    "-=.5"
  );
  timeline.to(
    ".mil-animation-2 .mil-h3",
    0.6,
    {
      opacity: 0,
      y: "-30",
    },
    "+=.5"
  );
  timeline.to(
    ".mil-preloader",
    0.8,
    {
      opacity: 0,
      ease: "sine",
    },
    "+=.2"
  );
  timeline.fromTo(
    ".mil-up",
    0.8,
    {
      opacity: 0,
      y: 40,
      scale: 0.98,
      ease: "sine",
    },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      onComplete: function () {
        $(".mil-preloader").addClass("mil-hidden");
      },
    },
    "-=1"
  );
  /***************************

    anchor scroll

    ***************************/
  $(document).on("click", 'a[href^="#"]', function (event) {
    event.preventDefault();

    var target = $($.attr(this, "href"));
    var offset = 0;

    if ($(window).width() < 1200) {
      offset = 90;
    }

    $("html, body").animate(
      {
        scrollTop: target.offset().top - offset,
      },
      400
    );
  });
  /***************************

    append

    ***************************/
  $(document).ready(function () {
    $(".mil-arrow").clone().appendTo(".mil-arrow-place");
    $(".mil-dodecahedron").clone().appendTo(".mil-animation");
    $(".mil-lines").clone().appendTo(".mil-lines-place");
    $(".mil-main-menu ul li.mil-active > a")
      .clone()
      .appendTo(".mil-current-page");
  });
  /***************************

    accordion

    ***************************/

  let groups = gsap.utils.toArray(".mil-accordion-group");
  let menus = gsap.utils.toArray(".mil-accordion-menu");
  let menuToggles = groups.map(createAnimation);

  menus.forEach((menu) => {
    menu.addEventListener("click", () => toggleMenu(menu));
  });

  function toggleMenu(clickedMenu) {
    menuToggles.forEach((toggleFn) => toggleFn(clickedMenu));
  }

  function createAnimation(element) {
    let menu = element.querySelector(".mil-accordion-menu");
    let box = element.querySelector(".mil-accordion-content");
    let symbol = element.querySelector(".mil-symbol");
    let minusElement = element.querySelector(".mil-minus");
    let plusElement = element.querySelector(".mil-plus");

    gsap.set(box, {
      height: "auto",
    });

    let animation = gsap
      .timeline()
      .from(box, {
        height: 0,
        duration: 0.4,
        ease: "sine",
      })
      .from(
        minusElement,
        {
          duration: 0.4,
          autoAlpha: 0,
          ease: "none",
        },
        0
      )
      .to(
        plusElement,
        {
          duration: 0.4,
          autoAlpha: 0,
          ease: "none",
        },
        0
      )
      .to(
        symbol,
        {
          background: accent,
          ease: "none",
        },
        0
      )
      .reverse();

    return function (clickedMenu) {
      if (clickedMenu === menu) {
        animation.reversed(!animation.reversed());
      } else {
        animation.reverse();
      }
    };
  }
  /***************************

    back to top

    ***************************/
  const btt = document.querySelector(".mil-back-to-top .mil-link");

  gsap.set(btt, {
    x: -30,
    opacity: 0,
  });

  gsap.to(btt, {
    x: 0,
    opacity: 1,
    ease: "sine",
    scrollTrigger: {
      trigger: "body",
      start: "top -40%",
      end: "top -40%",
      toggleActions: "play none reverse none",
    },
  });
  /***************************

    cursor

    ***************************/
  const cursor = document.querySelector(".mil-ball");

  gsap.set(cursor, {
    xPercent: -50,
    yPercent: -50,
  });

  document.addEventListener("pointermove", movecursor);

  function movecursor(e) {
    gsap.to(cursor, {
      duration: 0.6,
      ease: "sine",
      x: e.clientX,
      y: e.clientY,
    });
  }

  $(".mil-drag, .mil-more, .mil-choose").mouseover(function () {
    gsap.to($(cursor), 0.2, {
      width: 90,
      height: 90,
      opacity: 1,
      ease: "sine",
    });
  });

  $(".mil-drag, .mil-more, .mil-choose").mouseleave(function () {
    gsap.to($(cursor), 0.2, {
      width: 20,
      height: 20,
      opacity: 0.1,
      ease: "sine",
    });
  });

  $(".mil-accent-cursor").mouseover(function () {
    gsap.to($(cursor), 0.2, {
      background: accent,
      ease: "sine",
    });
    $(cursor).addClass("mil-accent");
  });

  $(".mil-accent-cursor").mouseleave(function () {
    gsap.to($(cursor), 0.2, {
      background: dark,
      ease: "sine",
    });
    $(cursor).removeClass("mil-accent");
  });

  $(".mil-drag").mouseover(function () {
    gsap.to($(".mil-ball .mil-icon-1"), 0.2, {
      scale: "1",
      ease: "sine",
    });
  });

  $(".mil-drag").mouseleave(function () {
    gsap.to($(".mil-ball .mil-icon-1"), 0.2, {
      scale: "0",
      ease: "sine",
    });
  });

  $(".mil-more").mouseover(function () {
    gsap.to($(".mil-ball .mil-more-text"), 0.2, {
      scale: "1",
      ease: "sine",
    });
  });

  $(".mil-more").mouseleave(function () {
    gsap.to($(".mil-ball .mil-more-text"), 0.2, {
      scale: "0",
      ease: "sine",
    });
  });

  $(".mil-choose").mouseover(function () {
    gsap.to($(".mil-ball .mil-choose-text"), 0.2, {
      scale: "1",
      ease: "sine",
    });
  });

  $(".mil-choose").mouseleave(function () {
    gsap.to($(".mil-ball .mil-choose-text"), 0.2, {
      scale: "0",
      ease: "sine",
    });
  });

  $(
    'a:not(".mil-choose , .mil-more , .mil-drag , .mil-accent-cursor"), input , textarea, .mil-accordion-menu'
  ).mouseover(function () {
    gsap.to($(cursor), 0.2, {
      scale: 0,
      ease: "sine",
    });
    gsap.to($(".mil-ball svg"), 0.2, {
      scale: 0,
    });
  });

  $(
    'a:not(".mil-choose , .mil-more , .mil-drag , .mil-accent-cursor"), input, textarea, .mil-accordion-menu'
  ).mouseleave(function () {
    gsap.to($(cursor), 0.2, {
      scale: 1,
      ease: "sine",
    });

    gsap.to($(".mil-ball svg"), 0.2, {
      scale: 1,
    });
  });

  $("body").mousedown(function () {
    gsap.to($(cursor), 0.2, {
      scale: 0.1,
      ease: "sine",
    });
  });
  $("body").mouseup(function () {
    gsap.to($(cursor), 0.2, {
      scale: 1,
      ease: "sine",
    });
  });
  /***************************

     menu

    ***************************/
  $(".mil-menu-btn").on("click", function () {
    $(".mil-menu-btn").toggleClass("mil-active");
    $(".mil-menu").toggleClass("mil-active");
    $(".mil-menu-frame").toggleClass("mil-active");
  });
  /***************************

    main menu

    ***************************/
  $(".mil-has-children a").on("click", function () {
    $(".mil-has-children ul").removeClass("mil-active");
    $(".mil-has-children a").removeClass("mil-active");
    $(this).toggleClass("mil-active");
    $(this).next().toggleClass("mil-active");
  });
  /***************************

    progressbar

    ***************************/
  gsap.to(".mil-progress", {
    height: "100%",
    ease: "sine",
    scrollTrigger: {
      scrub: 0.3,
    },
  });
  /***************************

    scroll animations

    ***************************/

  const appearance = document.querySelectorAll(".mil-up");

  appearance.forEach((section) => {
    gsap.fromTo(
      section,
      {
        opacity: 0,
        y: 40,
        scale: 0.98,
        ease: "sine",
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.4,
        scrollTrigger: {
          trigger: section,
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  const scaleImage = document.querySelectorAll(".mil-scale");

  scaleImage.forEach((section) => {
    var value1 = $(section).data("value-1");
    var value2 = $(section).data("value-2");
    gsap.fromTo(
      section,
      {
        ease: "sine",
        scale: value1,
      },
      {
        scale: value2,
        scrollTrigger: {
          trigger: section,
          scrub: true,
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  const parallaxImage = document.querySelectorAll(".mil-parallax");

  if ($(window).width() > 960) {
    parallaxImage.forEach((section) => {
      var value1 = $(section).data("value-1");
      var value2 = $(section).data("value-2");
      gsap.fromTo(
        section,
        {
          ease: "sine",
          y: value1,
        },
        {
          y: value2,
          scrollTrigger: {
            trigger: section,
            scrub: true,
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }

  const rotate = document.querySelectorAll(".mil-rotate");

  rotate.forEach((section) => {
    var value = $(section).data("value");
    gsap.fromTo(
      section,
      {
        ease: "sine",
        rotate: 0,
      },
      {
        rotate: value,
        scrollTrigger: {
          trigger: section,
          scrub: true,
          toggleActions: "play none none reverse",
        },
      }
    );
  });
  /***************************

    fancybox

    ***************************/
  $('[data-fancybox="gallery"]').fancybox({
    buttons: ["slideShow", "zoom", "fullScreen", "close"],
    loop: false,
    protect: true,
  });
  $.fancybox.defaults.hash = false;
  /***************************

    reviews slider

    ***************************/

  var menu = [
    '<div class="mil-custom-dot mil-slide-1"></div>',
    '<div class="mil-custom-dot mil-slide-2"></div>',
    '<div class="mil-custom-dot mil-slide-3"></div>',
    '<div class="mil-custom-dot mil-slide-4"></div>',
    '<div class="mil-custom-dot mil-slide-5"></div>',
    '<div class="mil-custom-dot mil-slide-6"></div>',
    '<div class="mil-custom-dot mil-slide-7"></div>',
  ];
  var mySwiper = new Swiper(".mil-reviews-slider", {
    // If we need pagination
    pagination: {
      el: ".mil-revi-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + menu[index] + "</span>";
      },
    },
    speed: 800,
    effect: "fade",
    parallax: true,
    navigation: {
      nextEl: ".mil-revi-next",
      prevEl: ".mil-revi-prev",
    },
  });

  /***************************

    infinite slider

    ***************************/
  var swiper = new Swiper(".mil-infinite-show", {
    slidesPerView: 2,
    spaceBetween: 30,
    speed: 5000,
    autoplay: true,
    autoplay: {
      delay: 0,
    },
    loop: true,
    freeMode: true,
    breakpoints: {
      992: {
        slidesPerView: 4,
      },
    },
  });

  /***************************

    portfolio slider

    ***************************/
  var swiper = new Swiper(".mil-portfolio-slider", {
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 800,
    parallax: true,
    mousewheel: {
      enable: true,
    },
    navigation: {
      nextEl: ".mil-portfolio-next",
      prevEl: ".mil-portfolio-prev",
    },
    pagination: {
      el: ".swiper-portfolio-pagination",
      type: "fraction",
    },
  });
  /***************************

    1 item slider

    ***************************/
  var swiper = new Swiper(".mil-1-slider", {
    slidesPerView: 1,
    spaceBetween: 30,
    speed: 800,
    parallax: true,
    navigation: {
      nextEl: ".mil-portfolio-next",
      prevEl: ".mil-portfolio-prev",
    },
    pagination: {
      el: ".swiper-portfolio-pagination",
      type: "fraction",
    },
  });
  /***************************

    2 item slider

    ***************************/
  var swiper = new Swiper(".mil-2-slider", {
    slidesPerView: 1,
    spaceBetween: 30,
    speed: 800,
    parallax: true,
    navigation: {
      nextEl: ".mil-portfolio-next",
      prevEl: ".mil-portfolio-prev",
    },
    pagination: {
      el: ".swiper-portfolio-pagination",
      type: "fraction",
    },
    breakpoints: {
      992: {
        slidesPerView: 2,
      },
    },
  });

  /***************************

    testimonials slider

    ***************************/
  var testimonialsSwiper = new Swiper(
    ".mil-testimonials-slider .swiper-container",
    {
      slidesPerView: 1,
      spaceBetween: 30,
      speed: 800,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1200: {
          slidesPerView: 1,
          spaceBetween: 30,
        },
      },
    }
  );

  /***************************

    FAQs accordion

    ***************************/
  $(document).ready(function () {
    $(".mil-faq-header").on("click", function () {
      const faqId = $(this).data("faq");
      const $content = $(`.mil-faq-content[data-faq="${faqId}"]`);
      const $icon = $(this).find(".mil-faq-icon i");

      // Cerrar todos los otros FAQs
      $(".mil-faq-content").not($content).removeClass("active");
      $(".mil-faq-icon i")
        .not($icon)
        .removeClass("fa-slash")
        .addClass("fa-plus");

      // Toggle del FAQ actual
      if ($content.hasClass("active")) {
        $content.removeClass("active");
        $icon.removeClass("fa-slash").addClass("fa-plus");
      } else {
        $content.addClass("active");
        $icon.removeClass("fa-plus").addClass("fa-slash");
      }
    });

    // Abrir el primer FAQ por defecto
    $(".mil-faq-item:first-child .mil-faq-content").addClass("active");
    $(".mil-faq-item:first-child .mil-faq-icon i")
      .removeClass("fa-plus")
      .addClass("fa-slash");
  });

  /*----------------------------------------------------------
    ------------------------------------------------------------

    REINIT

    ------------------------------------------------------------
    ----------------------------------------------------------*/
  document.addEventListener("swup:contentReplaced", function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      0
    );

    gsap.to(".mil-progress", {
      height: 0,
      ease: "sine",
      onComplete: () => {
        ScrollTrigger.refresh();
      },
    });
    /***************************

         menu

        ***************************/
    $(".mil-menu-btn").removeClass("mil-active");
    $(".mil-menu").removeClass("mil-active");
    $(".mil-menu-frame").removeClass("mil-active");
    /***************************

        append

        ***************************/
    $(document).ready(function () {
      $(
        ".mil-arrow-place .mil-arrow, .mil-animation .mil-dodecahedron, .mil-current-page a"
      ).remove();
      $(".mil-arrow").clone().appendTo(".mil-arrow-place");
      $(".mil-dodecahedron").clone().appendTo(".mil-animation");
      $(".mil-lines").clone().appendTo(".mil-lines-place");
      $(".mil-main-menu ul li.mil-active > a")
        .clone()
        .appendTo(".mil-current-page");
    });
    /***************************

        accordion

        ***************************/

    let groups = gsap.utils.toArray(".mil-accordion-group");
    let menus = gsap.utils.toArray(".mil-accordion-menu");
    let menuToggles = groups.map(createAnimation);

    menus.forEach((menu) => {
      menu.addEventListener("click", () => toggleMenu(menu));
    });

    function toggleMenu(clickedMenu) {
      menuToggles.forEach((toggleFn) => toggleFn(clickedMenu));
    }

    function createAnimation(element) {
      let menu = element.querySelector(".mil-accordion-menu");
      let box = element.querySelector(".mil-accordion-content");
      let symbol = element.querySelector(".mil-symbol");
      let minusElement = element.querySelector(".mil-minus");
      let plusElement = element.querySelector(".mil-plus");

      gsap.set(box, {
        height: "auto",
      });

      let animation = gsap
        .timeline()
        .from(box, {
          height: 0,
          duration: 0.4,
          ease: "sine",
        })
        .from(
          minusElement,
          {
            duration: 0.4,
            autoAlpha: 0,
            ease: "none",
          },
          0
        )
        .to(
          plusElement,
          {
            duration: 0.4,
            autoAlpha: 0,
            ease: "none",
          },
          0
        )
        .to(
          symbol,
          {
            background: accent,
            ease: "none",
          },
          0
        )
        .reverse();

      return function (clickedMenu) {
        if (clickedMenu === menu) {
          animation.reversed(!animation.reversed());
        } else {
          animation.reverse();
        }
      };
    }

    /***************************

        cursor

        ***************************/

    $(".mil-drag, .mil-more, .mil-choose").mouseover(function () {
      gsap.to($(cursor), 0.2, {
        width: 90,
        height: 90,
        opacity: 1,
        ease: "sine",
      });
    });

    $(".mil-drag, .mil-more, .mil-choose").mouseleave(function () {
      gsap.to($(cursor), 0.2, {
        width: 20,
        height: 20,
        opacity: 0.1,
        ease: "sine",
      });
    });

    $(".mil-accent-cursor").mouseover(function () {
      gsap.to($(cursor), 0.2, {
        background: accent,
        ease: "sine",
      });
      $(cursor).addClass("mil-accent");
    });

    $(".mil-accent-cursor").mouseleave(function () {
      gsap.to($(cursor), 0.2, {
        background: dark,
        ease: "sine",
      });
      $(cursor).removeClass("mil-accent");
    });

    $(".mil-drag").mouseover(function () {
      gsap.to($(".mil-ball .mil-icon-1"), 0.2, {
        scale: "1",
        ease: "sine",
      });
    });

    $(".mil-drag").mouseleave(function () {
      gsap.to($(".mil-ball .mil-icon-1"), 0.2, {
        scale: "0",
        ease: "sine",
      });
    });

    $(".mil-more").mouseover(function () {
      gsap.to($(".mil-ball .mil-more-text"), 0.2, {
        scale: "1",
        ease: "sine",
      });
    });

    $(".mil-more").mouseleave(function () {
      gsap.to($(".mil-ball .mil-more-text"), 0.2, {
        scale: "0",
        ease: "sine",
      });
    });

    $(".mil-choose").mouseover(function () {
      gsap.to($(".mil-ball .mil-choose-text"), 0.2, {
        scale: "1",
        ease: "sine",
      });
    });

    $(".mil-choose").mouseleave(function () {
      gsap.to($(".mil-ball .mil-choose-text"), 0.2, {
        scale: "0",
        ease: "sine",
      });
    });

    $(
      'a:not(".mil-choose , .mil-more , .mil-drag , .mil-accent-cursor"), input , textarea, .mil-accordion-menu'
    ).mouseover(function () {
      gsap.to($(cursor), 0.2, {
        scale: 0,
        ease: "sine",
      });
      gsap.to($(".mil-ball svg"), 0.2, {
        scale: 0,
      });
    });

    $(
      'a:not(".mil-choose , .mil-more , .mil-drag , .mil-accent-cursor"), input, textarea, .mil-accordion-menu'
    ).mouseleave(function () {
      gsap.to($(cursor), 0.2, {
        scale: 1,
        ease: "sine",
      });

      gsap.to($(".mil-ball svg"), 0.2, {
        scale: 1,
      });
    });

    $("body").mousedown(function () {
      gsap.to($(cursor), 0.2, {
        scale: 0.1,
        ease: "sine",
      });
    });
    $("body").mouseup(function () {
      gsap.to($(cursor), 0.2, {
        scale: 1,
        ease: "sine",
      });
    });

    /***************************

        testimonials slider

        ***************************/
    var testimonialsSwiper = new Swiper(
      ".mil-testimonials-slider .swiper-container",
      {
        slidesPerView: 1,
        spaceBetween: 30,
        speed: 800,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          992: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        },
      }
    );

    /***************************

        FAQs accordion

        ***************************/
    $(".mil-faq-header").on("click", function () {
      const faqId = $(this).data("faq");
      const $content = $(`.mil-faq-content[data-faq="${faqId}"]`);
      const $icon = $(this).find(".mil-faq-icon i");

      // Cerrar todos los otros FAQs
      $(".mil-faq-content").not($content).removeClass("active");
      $(".mil-faq-icon i")
        .not($icon)
        .removeClass("fa-slash")
        .addClass("fa-plus");

      // Toggle del FAQ actual
      if ($content.hasClass("active")) {
        $content.removeClass("active");
        $icon.removeClass("fa-slash").addClass("fa-plus");
      } else {
        $content.addClass("active");
        $icon.removeClass("fa-plus").addClass("fa-slash");
      }
    });

    // Abrir el primer FAQ por defecto
    $(".mil-faq-item:first-child .mil-faq-content").addClass("active");
    $(".mil-faq-item:first-child .mil-faq-icon i")
      .removeClass("fa-plus")
      .addClass("fa-slash");

    /***************************

      Testimonial card flip

      ***************************/
    $(".mil-testimonial-card").on("click", function () {
      const $card = $(this);
      const $inner = $card.find(".mil-testimonial-inner");

      // Toggle flip class
      $card.toggleClass("flipped");

      // Add smooth transition
      $inner.css("transition", "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)");
    });

    /***************************

        main menu

        ***************************/
    $(".mil-has-children a").on("click", function () {
      $(".mil-has-children ul").removeClass("mil-active");
      $(".mil-has-children a").removeClass("mil-active");
      $(this).toggleClass("mil-active");
      $(this).next().toggleClass("mil-active");
    });
    /***************************

        scroll animations

        ***************************/

    const appearance = document.querySelectorAll(".mil-up");

    appearance.forEach((section) => {
      gsap.fromTo(
        section,
        {
          opacity: 0,
          y: 40,
          scale: 0.98,
          ease: "sine",
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.4,
          scrollTrigger: {
            trigger: section,
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    const scaleImage = document.querySelectorAll(".mil-scale");

    scaleImage.forEach((section) => {
      var value1 = $(section).data("value-1");
      var value2 = $(section).data("value-2");
      gsap.fromTo(
        section,
        {
          ease: "sine",
          scale: value1,
        },
        {
          scale: value2,
          scrollTrigger: {
            trigger: section,
            scrub: true,
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    const parallaxImage = document.querySelectorAll(".mil-parallax");

    if ($(window).width() > 960) {
      parallaxImage.forEach((section) => {
        var value1 = $(section).data("value-1");
        var value2 = $(section).data("value-2");
        gsap.fromTo(
          section,
          {
            ease: "sine",
            y: value1,
          },
          {
            y: value2,
            scrollTrigger: {
              trigger: section,
              scrub: true,
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }

    const rotate = document.querySelectorAll(".mil-rotate");

    rotate.forEach((section) => {
      var value = $(section).data("value");
      gsap.fromTo(
        section,
        {
          ease: "sine",
          rotate: 0,
        },
        {
          rotate: value,
          scrollTrigger: {
            trigger: section,
            scrub: true,
            toggleActions: "play none none reverse",
          },
        }
      );
    });
    /***************************

        fancybox

        ***************************/
    $('[data-fancybox="gallery"]').fancybox({
      buttons: ["slideShow", "zoom", "fullScreen", "close"],
      loop: false,
      protect: true,
    });
    $.fancybox.defaults.hash = false;
    /***************************

        reviews slider

        ***************************/

    var menu = [
      '<div class="mil-custom-dot mil-slide-1"></div>',
      '<div class="mil-custom-dot mil-slide-2"></div>',
      '<div class="mil-custom-dot mil-slide-3"></div>',
      '<div class="mil-custom-dot mil-slide-4"></div>',
      '<div class="mil-custom-dot mil-slide-5"></div>',
      '<div class="mil-custom-dot mil-slide-6"></div>',
      '<div class="mil-custom-dot mil-slide-7"></div>',
    ];
    var mySwiper = new Swiper(".mil-reviews-slider", {
      // If we need pagination
      pagination: {
        el: ".mil-revi-pagination",
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + menu[index] + "</span>";
        },
      },
      speed: 800,
      effect: "fade",
      parallax: true,
      navigation: {
        nextEl: ".mil-revi-next",
        prevEl: ".mil-revi-prev",
      },
    });

    /***************************

        infinite slider

        ***************************/
    var swiper = new Swiper(".mil-infinite-show", {
      slidesPerView: 2,
      spaceBetween: 30,
      speed: 5000,
      autoplay: true,
      autoplay: {
        delay: 0,
      },
      loop: true,
      freeMode: true,
      breakpoints: {
        992: {
          slidesPerView: 4,
        },
      },
    });

    /***************************

        portfolio slider

        ***************************/
    var swiper = new Swiper(".mil-portfolio-slider", {
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 800,
      parallax: true,
      mousewheel: {
        enable: true,
      },
      navigation: {
        nextEl: ".mil-portfolio-next",
        prevEl: ".mil-portfolio-prev",
      },
      pagination: {
        el: ".swiper-portfolio-pagination",
        type: "fraction",
      },
    });
    /***************************

        1 item slider

        ***************************/
    var swiper = new Swiper(".mil-1-slider", {
      slidesPerView: 1,
      spaceBetween: 30,
      speed: 800,
      parallax: true,
      navigation: {
        nextEl: ".mil-portfolio-next",
        prevEl: ".mil-portfolio-prev",
      },
      pagination: {
        el: ".swiper-portfolio-pagination",
        type: "fraction",
      },
    });
    /***************************

        2 item slider

        ***************************/
    var swiper = new Swiper(".mil-2-slider", {
      slidesPerView: 1,
      spaceBetween: 30,
      speed: 800,
      parallax: true,
      navigation: {
        nextEl: ".mil-portfolio-next",
        prevEl: ".mil-portfolio-prev",
      },
      pagination: {
        el: ".swiper-portfolio-pagination",
        type: "fraction",
      },
      breakpoints: {
        992: {
          slidesPerView: 2,
        },
      },
    });

    /***************************

        testimonials slider

        ***************************/
    var testimonialsSwiper = new Swiper(
      ".mil-testimonials-slider .swiper-container",
      {
        slidesPerView: 1,
        spaceBetween: 30,
        speed: 800,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          992: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        },
      }
    );

    /***************************

        FAQs accordion

        ***************************/
    $(".mil-faq-header").on("click", function () {
      const faqId = $(this).data("faq");
      const $content = $(`.mil-faq-content[data-faq="${faqId}"]`);
      const $icon = $(this).find(".mil-faq-icon i");

      // Cerrar todos los otros FAQs
      $(".mil-faq-content").not($content).removeClass("active");
      $(".mil-faq-icon i")
        .not($icon)
        .removeClass("fa-slash")
        .addClass("fa-plus");

      // Toggle del FAQ actual
      if ($content.hasClass("active")) {
        $content.removeClass("active");
        $icon.removeClass("fa-slash").addClass("fa-plus");
      } else {
        $content.addClass("active");
        $icon.removeClass("fa-plus").addClass("fa-slash");
      }
    });

    // Abrir el primer FAQ por defecto
    $(".mil-faq-item:first-child .mil-faq-content").addClass("active");
    $(".mil-faq-item:first-child .mil-faq-icon i")
      .removeClass("fa-plus")
      .addClass("fa-slash");

    /***************************

      Testimonial card flip

      ***************************/
    $(".mil-testimonial-card").on("click", function () {
      const $card = $(this);
      const $inner = $card.find(".mil-testimonial-inner");

      // Toggle flip class
      $card.toggleClass("flipped");

      // Add smooth transition
      $inner.css("transition", "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)");
    });
  });
});
// Ejecutar después de cargar Swiper (colocá este script después de swiper-bundle.js)
(function () {
  // decide si estamos en mobile para desactivar freeMode (snap en mobile)
  function isMobile() {
    return window.matchMedia("(max-width: 767px)").matches;
  }

  const swiper = new Swiper(".testimonial-swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    speed: 560,
    // Mostrar 1 en mobile, 3 en >=768 (siempre exactamente 3)
    breakpoints: {
      0: { slidesPerView: 1 },
      768: { slidesPerView: 3 },
    },
    // freeMode solo en desktop para inercia (si preferís snap fijo pon freeMode:false)
    freeMode: !isMobile()
      ? { enabled: true, momentum: true, momentumBounce: false }
      : false,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 160,
      modifier: 1,
      slideShadows: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  // Si cambian dimensiones, actualizamos freeMode según corresponda
  let lastMobile = isMobile();
  window.addEventListener("resize", function () {
    const nowMobile = isMobile();
    if (nowMobile !== lastMobile) {
      lastMobile = nowMobile;
      swiper.params.freeMode = nowMobile
        ? false
        : { enabled: true, momentum: true, momentumBounce: false };
      swiper.update();
    }
  });
})();

history.scrollRestoration = "manual";
gsap.registerPlugin(ScrollTrigger);
// lenis (..?)
const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 3000);
});
gsap.ticker.lagSmoothing(0);

// 가로스크롤
a = gsap.to(".sticky", {
  scrollTrigger: {
    trigger: "main",
    start: "0% 0%",
    end: "100% 100%",
    scrub: 0,
    invalidateOnRefresh: true,
  },
  ease: "none",
  x: function () {
    return -$(".sticky").outerWidth() + window.innerWidth;
  },
});

//header
const sections = gsap.utils.toArray("section");
sections.forEach((section) => {
  ScrollTrigger.create({
    trigger: $(section).find("video"),
    containerAnimation: a,
    start: "0% 40%",
    end: "100% 40%",
    toggleClass: {
      targets: ".header, .footer",
      className: "scroll",
    },
    // markers: true,
  });
});
const totalWidth = sections.reduce((acc, section) => acc + section.offsetWidth, 0);
gsap.to(".sc-contents .group-watch", {
  x: function () {
    return $(".sc-contents").outerWidth() - $(".sc-contents .group-watch").outerWidth();
  },
  scrollTrigger: {
    trigger: ".sc-contents",
    containerAnimation: a,
    start: "0% 0%",
    end: "100% 100%",
    scrub: 0,
    // markers: true,
    invalidateOnRefresh: true,
  },
  ease: "none",
});
// sc-contents bg
const images = gsap.utils.toArray(".overlay .bg:not(:first-child)");
$(".overlay .bg:not(:first-child)").each(function (i, image) {
  gsap.set(image, { zIndex: i });
  gsap.set(".overlay .bg:not(:first-child)", { clipPath: "inset(50% 50%)" });
});
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".sc-contents",
    containerAnimation: a,
    start: `0% -100%`,
    end: "100% 200%",
    ease: "none",
    scrub: 2,
  },
});
images.forEach((element, i) => {
  tl.fromTo(
    `.sc-contents .bg:nth-child(${i + 2})`,
    { stagger: 4, opacity: 1, scale: 0.96, clipPath: "inset(50% 50%)", duration: 10, delay: 4 },
    { stagger: 4, scale: 1.05, clipPath: "inset(0% 0%)", duration: 1.5 },
    i
  );
  tl.fromTo(
    `.sc-contents .watch:nth-child(${i + 2})`,
    { stagger: 4, opacity: 1, scale: 0.96, clipPath: "inset(50% 50%)", duration: 10, delay: 4 },
    { stagger: 4, scale: 1.05, clipPath: "inset(0% 0%)", duration: 1.5 },
    i
  );
  tl.fromTo(
    `.sc-contents .watch:nth-child(${i + 1})`,
    {
      opacity: 1,
    },
    {
      opacity: 0,
    },
    "=-1.5"
  );
});
// marquee
const blocks = gsap.utils.toArray(".m-text");
const marqueeMotion = gsap.to(blocks, {
  xPercent: -100,
  duration: 10,
  repeat: -1,
  ease: "none",
  scrollTrigger: {
    trigger: ".sc-contents",
    containerAnimation: a,
  },
  modifiers: {
    xPercent: gsap.utils.wrap(-100, 0),
  },
});

// sc-content
const content1 = $("#content1");
const content2 = $("#content2");
const content3 = $("#content3");
const content4 = $("#content4");
const scContent = gsap.utils.toArray([content1, content2, content3, content4]);

$(".video-area").each(function (i, element) {
  gsap.set(".video-area", { xPercent: 0 });
});

scContent.forEach((element, i) => {
  var contentMotion = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start: "0% 50%",
      end: "100% 100%",
      scrub: 1,
      containerAnimation: a,
      // markers: true,
    },
  });
  contentMotion.to(
    `#content${i + 1} .video-area video`,
    {
      xPercent: -10,
      duration: 3,
    },
    "a"
  );
  contentMotion.to(
    `#content${i + 1} .video-area .title-wrap`,
    {
      xPercent: 5,
      duration: 3,
    },
    "a"
  );
  // titTl
  const titles = element.querySelectorAll(".title");
  titles.forEach((title) => {
    gsap.to(title, {
      scrollTrigger: {
        animation: titleTl,
        trigger: title,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
        containerAnimation: a,
        onEnter: function () {
          titleTl.play();
        },
      },
    });
    var titleTl = gsap.timeline({
      paused: true,
      defaults: {
        opacity: 1,
        stagger: 0.3,
        ease: "expo.out",
      },
    });
    titleTl.from($(title).find(".hide > *"), { opacity: 0, yPercent: 120, duration: 2 }, "a");
    titleTl.fromTo("#content4 .title .chatchline", { opacity: 0, skewX: -25 }, { opacity: 1, skewX: 0, duration: 3 }, "a");
  });
  // imgTl
  const imgs = element.querySelectorAll(".img");
  imgs.forEach((img) => {
    var prdTl = gsap.timeline({
      paused: true,
      defaults: {
        stagger: 0.3,
        ease: "expo.out",
      },
    });
    gsap.to(img, {
      scrollTrigger: {
        animation: prdTl,
        trigger: img,
        start: "0% 50%",
        end: "100% 100%",
        scrub: true,
        containerAnimation: a,
        onEnter: function () {
          prdTl.play();
        },
      },
    });
    prdTl.fromTo(img, { opacity: 0, clipPath: "inset(50% 50%)", duration: 10 }, { opacity: 1, clipPath: "inset(0% 0%)", duration: 1.5 }, "a");
  });

  gsap.to("progress", {
    value: 100,
    ease: "none",
    scrollTrigger: { scrub: 0.3 },
    // containerAnimation: a,
  });
});

$(".sc-content .swiper").each(function () {
  new Swiper(this, {
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    speed: 800,
    parallax: true,
    slidesPerView: 1,
    allowTouchMove: false,
  });
});

import barba from '@barba/core'
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../sass/main.scss";


barba.init({
    transitions: [{
        leave(data) {
            return gsap.to(data.current.container, { opacity: 0 })
        },
        enter(data) {
            return gsap.from(data.next.container, { opacity: 0 })
        }
    }]
})


gsap.registerPlugin(ScrollTrigger);

gsap.set(".testimonials-section", {
    marginTop: "-140vh"
});

const titleTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".testimonials-section",
        start: "top bottom",
        end: "200% top",
        scrub: true
    }
});

titleTl
    .to(".first-title", {
        xPercent: 70
    })
    .to(".sec-title", {
        xPercent: 25
    }, "<")
    .to(".third-title", {
        xPercent: -50
    }, "<");

const cardsTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".testimonials-section",
        start: "10% top",
        end: "200% top",
        scrub: 1.5,
        pin: true
    }
});

cardsTl.from(".vd-card", {
    yPercent: 150,
    stagger: 0.2,
    ease: "power1.inOut"
});
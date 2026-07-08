import barba from '@barba/core'
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import "../sass/main.scss";


gsap.registerPlugin(ScrollTrigger, SplitText);

let splitTextInstances = [];
let activeScrollTriggers = [];

function clearSplitText() {
    splitTextInstances.forEach((instance) => instance.revert());
    splitTextInstances = [];
}

function clearActiveScrollTriggers() {
    activeScrollTriggers.forEach((trigger) => trigger.kill());
    activeScrollTriggers = [];
}

function initHeroAnimations(container = document) {
    clearSplitText();
    clearActiveScrollTriggers();

    const heroTitles = container.querySelectorAll(".hero-title");
    const heroAbvValues = container.querySelectorAll(".hero-abv__value, .hero-abv__label");
    const heroFlavors = container.querySelectorAll(".hero-flavor");
    const heroButtons = container.querySelectorAll(".hero-btn");
    const heroMedia = container.querySelectorAll(".hero-media img");
    const aboutSection = container.querySelector(".about");
    const aboutTargetColor = aboutSection?.dataset?.aboutTargetColor || "#b85a16";

    const introTimeline = gsap.timeline();

    heroTitles.forEach((element, index) => {
        const split = new SplitText(element, { type: "chars,words" });
        splitTextInstances.push(split);
        introTimeline.from(split.chars, {
            opacity: 0,
            yPercent: 80,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.015
        }, index === 0 ? 0 : "<0.1");
    });

    heroAbvValues.forEach((element, index) => {
        const split = new SplitText(element, { type: "chars,words" });
        splitTextInstances.push(split);
        introTimeline.from(split.chars, {
            opacity: 0,
            yPercent: 80,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.03
        }, index === 0 ? "-=0.45" : "<0.1");
    });

    heroFlavors.forEach((element, index) => {
        const split = new SplitText(element, { type: "lines" });
        splitTextInstances.push(split);
        introTimeline.from(split.lines, {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.08
        }, index === 0 ? "-=0.45" : "<0.1");
    });

    if (heroButtons.length > 0) {
        introTimeline.from(heroButtons, {
            opacity: 0,
            y: 16,
            duration: 0.65,
            ease: "power2.out",
            stagger: 0.1
        }, "-=0.35");
    }

    // Animate product media last so the text settles first.
    if (heroMedia.length > 0) {
        introTimeline.from(heroMedia, {
            opacity: 0,
            yPercent: 12,
            duration: 1,
            ease: "power3.out"
        }, "-=0.1");
    }

    if (aboutSection) {
        gsap.set(aboutSection, {
            backgroundColor: "#B0E8DE",
            color: "#355468"
        });

        const aboutBlendTween = gsap.to(aboutSection, {
            backgroundColor: aboutTargetColor,
            color: "#ffffff",
            ease: "none",
            scrollTrigger: {
                trigger: aboutSection,
                start: "top 88%",
                end: "top 22%",
                scrub: true
            }
        });

        if (aboutBlendTween.scrollTrigger) {
            activeScrollTriggers.push(aboutBlendTween.scrollTrigger);
        }
    }
}

function initHeroAnimationsWhenReady(container = document) {
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => initHeroAnimations(container));
        return;
    }
    initHeroAnimations(container);
}

initHeroAnimationsWhenReady();

barba.init({
    transitions: [{
        leave(data) {
            return gsap.set(data.current.container, { opacity: 1 })
        },
        enter(data) {
            initHeroAnimationsWhenReady(data.next.container)
            return gsap.from(data.next.container, {
                opacity: 0,
                duration: 0.45,
                ease: "power1.out",
                clearProps: "opacity"
            })
        }
    }]
})
 
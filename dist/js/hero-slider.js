import { gsap } from "gsap"

export default function initHeroSlider() {
    const slider = document.querySelector("[data-hero-slider]")
    if (!slider) return

    const wrapper = slider.querySelector(".hero-slider__wrapper")
    const slides = slider.querySelectorAll(".hero-slide")

    let current = 0
    const total = slides.length
    let isAnimating = false

    function goToSlide(index) {
        if (isAnimating || index === current) return
        if (index < 0 || index >= total) return

        isAnimating = true

        const offset = -index * 100

        gsap.to(wrapper, {
            xPercent: offset,
            duration: 1,
            ease: "power3.inOut",
            onComplete: () => {
                current = index
                isAnimating = false
            }
        })

        updateTheme(slides[index])
    }

    function updateTheme(slide) {
        const bg = slide.style.getPropertyValue("--slide-bg")
        const text = slide.style.getPropertyValue("--slide-text")
        const accent = slide.style.getPropertyValue("--slide-accent")

        gsap.to(document.documentElement, {
            "--color-bg": bg,
            "--color-text": text,
            "--color-accent": accent,
            duration: 0.8,
            ease: "power2.out"
        })
    }

    // Scroll Wheel Navigation
    window.addEventListener("wheel", (e) => {
        if (isAnimating) return

        if (e.deltaY > 0) {
            goToSlide(current + 1)
        } else {
            goToSlide(current - 1)
        }
    })

    // Initialize first theme
    updateTheme(slides[0])
}
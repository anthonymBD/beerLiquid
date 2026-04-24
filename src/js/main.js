import barba from '@barba/core'
import { gsap } from 'gsap'
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


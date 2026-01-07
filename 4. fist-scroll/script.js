
const tlImpact = gsap.timeline({
    scrollTrigger: {
        trigger: ".impact-wrapper",
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // Suavizado
        pin: ".impact-sticky",
        anticipatePin: 1
    }
});

// FASE 1: ABRIR (Muestra Texto Principal)
tlImpact
    .addLabel("start")
    // Abrir los puños
    .to(".fist-left", { xPercent: -90, duration: 2, ease: "power2.inOut" }, "open1")
    .to(".fist-right", { xPercent: 90, duration: 2, ease: "power2.inOut" }, "open1")
    // Mostrar sección 1, animado
    .to(".impact-text", { opacity: 1, scale: 1, duration: 2 }, "open1")

    // Mantener el sección 1 por 1.5 
    .to({}, { duration: 1.5 })

    // Cerrar sección 1,animado
    .addLabel("closing")
    .to(".fist-left", { xPercent: 0, duration: 2, ease: "power2.inOut" }, "close1")
    .to(".fist-right", { xPercent: 0, duration: 2, ease: "power2.inOut" }, "close1")
    .to(".impact-text", { opacity: 0, scale: 0.9, duration: 1 }, "close1")

    // CAMBIO DE ESCENA
    // Mostrar sección 2
    .set(".social-content", { opacity: 0, scale: 0.9, duration: 2 })

    // FASE 3: Abrir punños
    .addLabel("opening2")
    .to(".fist-left", { xPercent: -90, duration: 2, ease: "power2.inOut" }, "open2")
    .to(".fist-right", { xPercent: 90, duration: 2, ease: "power2.inOut" }, "open2")
    // Pequeño zoom in al contenido social
    .to(".social-content", { opacity: 1, scale: 1, duration: 2 }, "open2");

// AL TERMINAR: El usuario sigue haciendo scroll y la sección se desplaza hacia arriba naturalmente.
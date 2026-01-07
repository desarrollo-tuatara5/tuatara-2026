document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    const canvas = document.getElementById("hero-lightpass");
    const context = canvas.getContext("2d");

    // Número de imágenes en total
    const frameCount = 200;

    const url = "https://webtuatara.com/insomniodev-docs/keyframe";
    const extension = "png";
    const currentFrame = (index) =>
        `${url}/keyframes-${index.toString().padStart(2, "0")}.${extension}`;

    const images = [];
    const sequence = {
        frame: 0,
    };

    // 1. Función para precargar imágenes
    const preloadImages = () => {
        for (let i = 1; i < frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            images.push(img);
            // Carga inmediatamente la primera imagen
            if (i === 0) img.onload = render;
        }
    };

    // 2. Función para dibujar la imagen correcta en el canvas
    const render = () => {
        // Calcular el índice actual
        let frameIndex = Math.round(sequence.frame);
        // obtenemos la imagen del array
        let img = images[frameIndex];

        // Limpiar canvas, para que no se acumulen imágenes
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        if (img && img.complete) {
            context.drawImage(img, 0, 0, canvas.width, canvas.height);
        } else {
            // Opcional: console.log(`Frame ${frameIndex} no listo aún`);
        }
    };

    // 3. Configuración del tamaño del canvas (Responsive)
    const setCanvasSize = () => {
        // Ajustar al tamaño de las imágenes
        canvas.width = 1920;
        canvas.height = 1080;
        render(); // Redibujar al cambiar tamaño
    };

    // Iniciar precarga y configuración inicial
    setCanvasSize();
    preloadImages();
    window.addEventListener("resize", setCanvasSize);

    // 4. Animación con GSAP ScrollTrigger
    //    Animamos la propiedad 'frame' del objeto 'sequence' de 0 a (frameCount - 1)
    gsap.to(sequence, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
            trigger: ".sequence-section",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
        },
        onUpdate: render,
    });


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
});


    

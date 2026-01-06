document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    const canvas = document.getElementById("hero-lightpass");
    const context = canvas.getContext("2d");

    // Número de imágenes en total
    const frameCount = 71;

    const url = "https://webtuatara.com/insomniodev-docs/keyframe";
    const extension = "png";
    const currentFrame = (index) =>
        `${url}/frames-${index.toString().padStart(2, "0")}.${extension}`;

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
});

const introText = document.getElementById("intro-text");
const warningText = document.getElementById("warning-text");
const secondLine = document.querySelector(".second-line");
const protectBtn = document.getElementById("protect-btn");

const introScreen = document.getElementById("intro-screen");
const terminalScreen = document.getElementById("terminal-screen");
const segfaultScreen = document.getElementById("segfault-screen");
const loveScreen = document.getElementById("love-screen");

const terminalOutput = document.getElementById("terminal-output");

const glassAudio = document.getElementById("glass-audio");
const cracks = document.getElementById("cracks");

const canvas = document.getElementById("heart-canvas");
const ctx = canvas.getContext("2d");
const finalMessage = document.getElementById("final-message");

function typeText(element, text, speed = 40) {
    return new Promise(resolve => {
        let i = 0;

        function type() {
            if (i < text.length) {
                element.textContent += text[i];
                i++;
                setTimeout(type, speed);
            } else {
                resolve();
            }
        }

        type();
    });
}

async function introSequence() {

    await typeText(
        introText,
        " Сканирование на наличие угроз..."
    );

    await wait(1800);

    secondLine.classList.remove("hidden");

    await typeText(
        warningText,
        " Ваше устройство попало под мощную хакерскую атаку! Нужно срочно его защитить!",
        35
    );

    await wait(600);

    protectBtn.classList.remove("hidden");
}

protectBtn.addEventListener("click", async () => {

    switchScreen(introScreen, terminalScreen);

    const lines = [
        "Initializing heart.PROTOCOL.v1.0...",
        "loading emotions...",
        "compiling feelings..."
    ];

    for (const line of lines) {
        await typeTerminal(line);
        await wait(700);
    }

    await wait(500);

    switchScreen(terminalScreen, segfaultScreen);

    cracks.classList.add("crack-animation");

    try {
        glassAudio.currentTime = 0;
        glassAudio.play();
    } catch {}

    await wait(2200);

    switchScreen(segfaultScreen, loveScreen);

    startHeartAnimation();
});

function typeTerminal(text) {
    return new Promise(resolve => {

        let i = 0;

        const line = document.createElement("div");
        terminalOutput.appendChild(line);

        function type() {

            if (i < text.length) {
                line.textContent += text[i];
                i++;

                setTimeout(type, 45);
            } else {
                resolve();
            }
        }

        type();
    });
}

function switchScreen(from, to) {
    from.classList.remove("active");
    to.classList.add("active");
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const particles = [];

function heartFunction(t) {
    const x = 16 * Math.pow(Math.sin(t), 3);

    const y =
        13 * Math.cos(t)
        - 5 * Math.cos(2 * t)
        - 2 * Math.cos(3 * t)
        - Math.cos(4 * t);

    return { x, y };
}

function createParticles() {

    particles.length = 0;

    const scale = Math.min(canvas.width, canvas.height) * 0.018;

    for (let i = 0; i < 900; i++) {

        const t = Math.random() * Math.PI * 2;

        const point = heartFunction(t);

        particles.push({

            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,

            targetX:
                canvas.width / 2
                + point.x * scale,

            targetY:
                canvas.height / 2
                - point.y * scale + 60,

            text: "i love you",

            alpha: 0
        });
    }
}

function animateHeart() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const p of particles) {

        p.x += (p.targetX - p.x) * 0.03;
        p.y += (p.targetY - p.y) * 0.03;

        p.alpha += (1 - p.alpha) * 0.03;

        ctx.globalAlpha = p.alpha;

        ctx.fillStyle = "#ff0033";

        ctx.font = "12px monospace";

        ctx.fillText(
            p.text,
            p.x,
            p.y
        );
    }

    requestAnimationFrame(animateHeart);
}

function startHeartAnimation() {
    createParticles();
    animateHeart();

    setTimeout(() => {
        finalMessage.classList.add("show");
    }, 5000);
}

introSequence();

/* pink_heart.js */

const canvas = document.getElementById('heart');
const ctx = canvas.getContext('2d');

let particles = [];
const heartPoints = []; // Para armazenar pontos que formam o coração

// Função para obter pontos que formam a forma de um coração
function generateHeartPoints() {
    const scale = 13; // Ajuste para o tamanho do coração
    const offset_x = canvas.width / 2;
    const offset_y = canvas.height / 2;

    for (let i = 0; i <= 2 * Math.PI; i += 0.05) {
        const x = scale * (16 * Math.pow(Math.sin(i), 3));
        const y = -scale * (13 * Math.cos(i) - 5 * Math.cos(2 * i) - 2 * Math.cos(3 * i) - Math.cos(4 * i));
        heartPoints.push({ x: x + offset_x, y: y + offset_y });
    }
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 2 + 1; // Tamanho da partícula
        this.color = 'rgba(255, 192, 203, ' + (Math.random() * 0.8 + 0.2) + ')'; // Rosa com opacidade variada
        this.velocity = { x: (Math.random() - 0.5) * 0.5, y: (Math.random() - 0.5) * 0.5 };
        this.alpha = 1;
        this.fadeRate = Math.random() * 0.01 + 0.005; // Taxa de desvanecimento
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= this.fadeRate;
        this.color = `rgba(255, 192, 203, ${this.alpha})`;

        if (this.alpha <= 0) {
            // Reinicia a partícula em um ponto do coração quando ela desvanece
            const randomPoint = heartPoints[Math.floor(Math.random() * heartPoints.length)];
            this.x = randomPoint.x + (Math.random() - 0.5) * 20; // Pequeno offset para espalhar
            this.y = randomPoint.y + (Math.random() - 0.5) * 20;
            this.radius = Math.random() * 2 + 1;
            this.alpha = 1;
            this.fadeRate = Math.random() * 0.01 + 0.005;
        }
    }
}

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    generateHeartPoints();

    // Cria um número inicial de partículas
    const numberOfParticles = 300; // Ajuste este valor
    for (let i = 0; i < numberOfParticles; i++) {
        const randomPoint = heartPoints[Math.floor(Math.random() * heartPoints.length)];
        particles.push(new Particle(randomPoint.x, randomPoint.y));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    heartPoints.length = 0; // Limpa e regenera os pontos do coração
    generateHeartPoints();
});

window.onload = function() {
    init();
    animate();
};


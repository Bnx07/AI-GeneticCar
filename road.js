const canvas = document.getElementById('raceCanvas');
const ctx = canvas.getContext('2d');
ctx.willReadFrequently = true;
const roadImage = new Image();
const carImage = new Image();
const carImag2 = new Image();

roadImage.src = '/images/road2.jpg';
carImage.src = '/images/car.png';
carImag2.src = '/images/car2.png';

let excecutionSpeed = 5; // ? MILISECONDS;

// FIXME: Darle un enfoque donde la calle y el vehículo sean imágenes

// ? CANVAS FUNCTIONS

function createRoad() {
    ctx.drawImage(roadImage, 0, 0, canvas.width, canvas.height);
}

function updateCanvas() {
    clearCanvas();
    createRoad();
    car.draw();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function getColorAtPixel(x, y) {
    const pixelData = ctx.getImageData(x, y, 1, 1).data;
    return pixelData[0];
}

// ? CAR CLASS

class Car {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.rotation = 0;
        this.speed = 0.1;
        this.brake = 0.05;
        this.acceleration = [0, 0]; // ? [ X, Y ]
        this.friction = 0.98;
        this.rotationSpeed = 2.5;
        this.isInside = true;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        if (this.isInside) {
            ctx.drawImage(carImage, -this.width / 2, -this.height / 2, this.width, this.height);
        } else {
            ctx.drawImage(carImag2, -this.width / 2, -this.height / 2, this.width, this.height);
        }
        ctx.restore();
    }

    accelerate(speed) {
        const radians = this.rotation * (Math.PI / 180);

        this.acceleration[0] += speed * Math.cos(radians);
        this.acceleration[1] += speed * Math.sin(radians);
    }

    move() {
        this.acceleration[0] *= this.friction;
        this.acceleration[1] *= this.friction;

        if (Math.abs(this.acceleration[0]) < 0.01) this.acceleration[0] = 0;
        if (Math.abs(this.acceleration[1]) < 0.01) this.acceleration[1] = 0;

        this.x += this.acceleration[0];
        this.y += this.acceleration[1];
    }

    calculateCorners() {
        // Calcula las coordenadas de las esquinas del auto en relación con el centro del auto
        const halfWidth = this.width / 2;
        const halfHeight = this.height / 2;
        const angleInRadians = this.rotation * (Math.PI / 180);

        const cosAngle = Math.cos(angleInRadians);
        const sinAngle = Math.sin(angleInRadians);

        const corners = [
            { x: -halfWidth, y: -halfHeight}, // Esquina inferior izquierda
            { x: halfWidth, y: -halfHeight},  // Esquina superior izquierda
            { x: halfWidth, y: halfHeight},   // Esquina superior derecha
            { x: -halfWidth, y: halfHeight}   // Esquina inferior derecha
        ];

        // Aplica la rotación a las esquinas del auto
        for (let i = 0; i < corners.length; i++) {
            const rotatedX = corners[i].x * cosAngle - corners[i].y * sinAngle;
            const rotatedY = corners[i].x * sinAngle + corners[i].y * cosAngle;
            corners[i].x = this.x + rotatedX;
            corners[i].y = this.y + rotatedY;
        }

        return corners;
    }

    isInsideRoad() {
        const corners = this.calculateCorners();
        const threshold = 170; // Umbral para determinar el color gris claro de la calle
        let limitCorners = 0;

        this.isInside = true;
        
        for (const corner of corners) {
            if (getColorAtPixel(corner.x, corner.y) < threshold) {
                limitCorners += 1;
            }
        }

        if (limitCorners >= 2) this.isInside = false;
    }

    calculateVision() {
        let corners = this.calculateCorners();
        let distance = [];

        let topLeft = corners[1];
        let topRight = corners[2];
        
        distance.push(this.rayCast(topLeft.x, topLeft.y, -45));
        distance.push(this.rayCast(topLeft.x, topLeft.y, -35));
        distance.push(this.rayCast(topLeft.x, topLeft.y, -25));
        distance.push(this.rayCast(topLeft.x, topLeft.y, -15));
        distance.push(this.rayCast(topLeft.x, topLeft.y));

        distance.push(this.rayCast(topRight.x, topRight.y));
        distance.push(this.rayCast(topRight.x, topRight.y, 15));
        distance.push(this.rayCast(topRight.x, topRight.y, 25));
        distance.push(this.rayCast(topRight.x, topRight.y, 35));
        distance.push(this.rayCast(topRight.x, topRight.y, 45));

        return distance;
    }

    rayCast(x, y, rayAngle = 0) {
        const rayDirectionX = Math.cos((car.rotation + rayAngle) * Math.PI / 180);
        const rayDirectionY = Math.sin((car.rotation + rayAngle) * Math.PI / 180);        
        
        let rayPosX = x;
        let rayPosY = y;
    
        while (getColorAtPixel(rayPosX, rayPosY) > 170) {
            rayPosX += rayDirectionX;
            rayPosY += rayDirectionY;
        }
    
        ctx.fillStyle = 'green';

        ctx.beginPath();
        ctx.arc(rayPosX, rayPosY, 5, 0, 2 * Math.PI); // Dibuja un círculo completo
        ctx.fill();

        const distance = Math.sqrt(Math.pow(rayPosX - car.x, 2) + Math.pow(rayPosY - car.y, 2));
        return distance;
    }
}

const car = new Car(300, 200, 50, 20);

// ? GAME EXCECUTION

setInterval(() => {
    car.move();
    updateCanvas();
}, excecutionSpeed);
createRoad();

// ? PLAYER CONTROLS

const teclasPresionadas = {};

window.addEventListener('keydown', function(event) {
    teclasPresionadas[event.key] = true;
});

window.addEventListener('keyup', function(event) {
    teclasPresionadas[event.key] = false;
});

function actualizarMovimiento() {
    if (teclasPresionadas['w']) {
        car.accelerate(car.speed);
    }
    if (teclasPresionadas['a']) {
        car.rotation -= car.rotationSpeed;
    }
    if (teclasPresionadas['s']) {
        car.accelerate(-car.brake);
    }
    if (teclasPresionadas['d']) {
        car.rotation += car.rotationSpeed;
    }

    updateCanvas();
}

function actualizarJuego() {
    actualizarMovimiento();
    car.isInsideRoad();
    car.calculateVision();
    requestAnimationFrame(actualizarJuego);
}

// Iniciar el bucle del juego
actualizarJuego();
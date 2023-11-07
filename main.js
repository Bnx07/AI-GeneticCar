// ! IMPORTS 

import Brain from './brain.js';
import Car from './car.js';
import { isKeyPressed, onKeyDown, onKeyUp } from './event-handlers.js';

// ! GLOBAL VARIABLES

const canvas = document.getElementById('raceCanvas');
const ctx = canvas.getContext('2d');
ctx.willReadFrequently = true;
let excecutionSpeed = 5; // ? MILISECONDS;

// ! IMAGES

const roadImage = new Image();
const carImage = new Image();
const carImag2 = new Image();

roadImage.src = '/images/road2.jpg';
carImage.src = '/images/car.png';
carImag2.src = '/images/car2.png';


const car = new Car(300, 200, 50, 20, {}, ctx, carImage, carImag2);

// ! CANVAS FUNCTIONS

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

// ! PLAYER MOVEMENT

window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);

function updateMovement() {
    if (isKeyPressed('w')) {
        console.log("Acelerar")
        car.accelerate(car.speed);
    }
    if (isKeyPressed('a')) {
        car.rotation -= car.rotationSpeed;
    }
    if (isKeyPressed('s')) {
        car.accelerate(-car.brake);
    }
    if (isKeyPressed('d')) {
        car.rotation += car.rotationSpeed;
    }

    updateCanvas();
}

// ! CAR CONTROL

setInterval(() => {
    car.move();
    updateCanvas();
}, excecutionSpeed);
createRoad();

// ! PHYSICS ENGINE

function actualizarJuego() {
    console.log("1")
    updateMovement();
    car.isInsideRoad();
    car.calculateVision();
    requestAnimationFrame(actualizarJuego);
}

actualizarJuego();
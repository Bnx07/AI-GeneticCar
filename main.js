// ! IMPORTS 

import Brain from './brain.js';
import Car from './car.js';
import { isKeyPressed, onKeyDown, onKeyUp, qKeyDown } from './event-handlers.js';

// ! GLOBAL VARIABLES

const canvas = document.getElementById('raceCanvas');
const ctx = canvas.getContext('2d');
ctx.willReadFrequently = true;
let excecutionSpeed = 5; // ? MILISECONDS;
let generation = 1;
let maxAgents = 10;
let aliveAgents = [];
let deadAgents = [];

// ! IMAGES

const roadImage = new Image();
const carImage = new Image();
const carImag2 = new Image();

roadImage.src = '/images/road2.jpg';
carImage.src = '/images/car.png';
carImag2.src = '/images/car2.png';


const car = new Car(300, 200, 50, 20, new Brain(9, 100, 40, 9), ctx, carImage, carImag2);

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
window.addEventListener('keydown', (event) => qKeyDown(event, car));

function updateMovement() {
    if (isKeyPressed('w')) {
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
    updateMovement();
    car.isInsideRoad();
    car.thinkMove();
    requestAnimationFrame(actualizarJuego);
}

actualizarJuego();
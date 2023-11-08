// ! IMPORTS 

import Brain from './brain.js';
import Car from './car.js';
import { isKeyPressed, onKeyDown, onKeyUp } from './event-handlers.js';
import Genetic from './genetic.js';

// ! GLOBAL VARIABLES

const canvas = document.getElementById('raceCanvas');
const ctx = canvas.getContext('2d');
ctx.willReadFrequently = true;
let excecutionSpeed = 5; // ? MILISECONDS;
let generation = 1;

const genetic = new Genetic(0.05);

// ! IMAGES

const roadImage = new Image();
const carImage = new Image();
const carImag2 = new Image();

roadImage.src = '/images/road2.jpg';
carImage.src = '/images/car.png';
carImag2.src = '/images/car2.png';

// * Excellent AI
// let car = new Car(300, 180, 50, 20, new Brain(100, 150, 70, 200), ctx, carImage, carImag2);

// * AI to evolve
let car = new Car(300, 180, 50, 20, new Brain(70, 80, 40, 90), ctx, carImage, carImag2);

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

// ! CAR CONTROL

setInterval(() => {
    car.move();
    updateCanvas();
}, excecutionSpeed);
createRoad();

// ! PHYSICS ENGINE

function actualizarJuego() {
    car.isInsideRoad();
    car.rewardExistence();
    car.thinkMove();
    if (!car.isInside) {
        genetic.isBestScore(car);
        let mutations = genetic.mutate();
        generation += 1;
        document.getElementById('generation').innerHTML = generation;
        car = new Car(300, 180, 50, 20, new Brain(Math.floor(mutations[0]), Math.floor(mutations[1]), Math.floor(mutations[2]), Math.floor(mutations[3])), ctx, carImage, carImag2);
    }
    requestAnimationFrame(actualizarJuego);
}

actualizarJuego();
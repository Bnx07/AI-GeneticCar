// ! IMPORTS 

import Brain from './brain.js';
import Car from './car.js';
import Genetic from './genetic.js';

// ! GLOBAL VARIABLES

const canvas = document.getElementById('raceCanvas');
const ctx = canvas.getContext('2d');
ctx.willReadFrequently = true;
let excecutionSpeed = 5; // ? MILISECONDS;
let generation = 1;

// ! IMAGES

const roadImage = new Image();
const carImage = new Image();
const carImag2 = new Image();

roadImage.src = '/images/road3.png';
carImage.src = '/images/car.png';
carImag2.src = '/images/car2.png';

let cars = [];

let car = new Car(300, 180, 50, 20, new Brain(100, 150, 70, 200), ctx, carImage, carImag2);

cars.push(car);

let genetic = new Genetic(0.3, cars);

// ! CANVAS FUNCTIONS

function createRoad() {
    ctx.drawImage(roadImage, 0, 0, canvas.width, canvas.height);
}

function updateCanvas() {
    clearCanvas();
    createRoad();
    // cars.forEach(car => car.draw());
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// ! CAR CONTROL

setInterval(() => {
    updateCanvas();
    genetic.alivePopulation.forEach(car => car.move());
}, excecutionSpeed);
createRoad();

// ! PHYSICS ENGINE

setTimeout(() => {
    actualizarJuego();
}, 500)

function actualizarJuego() {
    genetic.alivePopulation.forEach(car => car.isInsideRoad());
    genetic.alivePopulation.forEach(car => car.rewardExistence());
    genetic.alivePopulation.forEach(car => car.thinkMove());
    if (genetic.checkAgentAlive()) {
        generation += 1;
        document.getElementById('generation').innerHTML = generation;
        cars = [];
        for (var i = 0; i < 7; i ++) {
            let mutations = genetic.mutate();
            cars.push(new Car(300, 180, 50, 20, new Brain(Math.floor(mutations[0]), Math.floor(mutations[1]), Math.floor(mutations[2]), Math.floor(mutations[3])), ctx, carImage, carImag2));
            genetic.setNewPopulation(cars);
            console.log(genetic.bestBrain);
        }
    }
    
    requestAnimationFrame(actualizarJuego);
}
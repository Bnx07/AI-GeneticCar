// ! IMPORTS 

import Brain from './brain.js';
import Car from './car.js';
import Genetic from './genetic.js';

// ! GLOBAL VARIABLES

const canvas = document.getElementById('raceCanvas');
const ctx = canvas.getContext('2d');
ctx.willReadFrequently = true;
let excecutionSpeed = 15; // ? MILISECONDS;
let generation = 1;
let populationLimit = 7;

// ! IMAGES

const roadImage = new Image();
const carImage = new Image();
const carImag2 = new Image();

roadImage.src = '/images/road2.jpg';
carImage.src = '/images/car.png';
carImag2.src = '/images/car2.png';

let cars = [];

// Good evolved brain [83, 238, 60, 281]

let car = new Car(300, 180, 50, 20, new Brain(100, 150, 70, 200), ctx, carImage, carImag2, true);

cars.push(car);

let genetic = new Genetic(0.4, cars);

// ! CANVAS FUNCTIONS

function createRoad() {
    ctx.drawImage(roadImage, 0, 0, canvas.width, canvas.height);
}

function updateCanvas() {
    clearCanvas();
    createRoad();
    cars.forEach(car => car.draw());
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// ! CAR PHYSIC MOVEMENT

setInterval(() => {
    updateCanvas();
    genetic.alivePopulation.forEach(car => car.move());
}, excecutionSpeed / 1.5);
createRoad();

// ! PHYSICS ENGINE

setTimeout(() => {
    actualizarJuego();
}, 500)

setInterval(() => {
    actualizarJuego();
}, excecutionSpeed);

function actualizarJuego() {
    genetic.alivePopulation.forEach(car => car.isInsideRoad());
    genetic.alivePopulation.forEach(car => car.rewardExistence());
    genetic.alivePopulation.forEach(car => car.thinkMove());
    if (genetic.checkAgentAlive(generation)) {
        generation += 1;
        document.getElementById('generation').innerHTML = generation;
        cars = [];
        for (var i = 0; i < populationLimit; i ++) {
            let mutations = genetic.mutate();
            cars.push(new Car(300, 180, 50, 20, new Brain(Math.floor(mutations[0]), Math.floor(mutations[1]), Math.floor(mutations[2]), Math.floor(mutations[3])), ctx, carImage, carImag2));
            genetic.setNewPopulation(cars);
        }
        document.getElementById('bestScore').innerHTML = genetic.bestScore;
        document.getElementById('bestGen').innerHTML = genetic.bestGeneration;

        console.log(genetic.bestBrain);
        console.log(genetic.bestScore);
    }
    
    // requestAnimationFrame(actualizarJuego);
}

window.addEventListener('keydown', (event) => {
    if (event.key == "d") {
        genetic.deadPopulation = [];
        cars = [new Car(300, 180, 50, 20, new Brain(genetic.bestBrain[0], genetic.bestBrain[1], genetic.bestBrain[1], genetic.bestBrain[1]), ctx, carImage, carImag2, true)];
        genetic.alivePopulation = cars;
    } else if (event.key == "q") {
        console.log(genetic.alivePopulation)
        genetic.deadPopulation = genetic.alivePopulation;
        genetic.deadPopulation.forEach(agent => {
            agent.isInside = false;
        })
        genetic.alivePopulation = [];
    } else if (event.key == "s") {
        let copyBestScore = prompt('Input the best score');
        let copyBestBrain = prompt('Input the brain');
        let copiedBrain = JSON.parse(copyBestBrain);
        genetic.bestScore = copyBestScore;
        genetic.bestBrain = copiedBrain;
    } else if (event.key == "p") {
        console.log(genetic.alivePopulation);
    }
});
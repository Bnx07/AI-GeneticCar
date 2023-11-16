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

let roadImageLoaded = 0;
let roadImages = ['/images/road1.png', '/images/road2.png', '/images/road3.png', '/images/road4.png', '/images/road5.png', '/images/road6.png', '/images/road7.png'];

roadImage.src = '/images/road1.png';
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
        genetic.alivePopulation.forEach(agent => agent.isInside = false);
        genetic.deadPopulation = genetic.alivePopulation;
        genetic.deadPopulation.forEach(agent => genetic.isBestScore(agent, generation));
        genetic.deadPopulation = [];
        cars = [new Car(300, 180, 50, 20, new Brain(genetic.bestBrain[0], genetic.bestBrain[1], genetic.bestBrain[1], genetic.bestBrain[1]), ctx, carImage, carImag2, true)];
        genetic.alivePopulation = cars;
    } else if (event.key == "s") {
        let copyBestScore = prompt('Input the best score');
        let copyBestBrain = prompt('Input the brain');
        let copiedBrain = JSON.parse(copyBestBrain);
        genetic.bestScore = copyBestScore;
        genetic.bestBrain = copiedBrain;
    } else if (event.key == "p") {
        console.log(genetic.alivePopulation);
    } else if (event.key == 'r') {
        if (roadImageLoaded + 1 <= roadImages.length - 1) {
            roadImageLoaded += 1;
        } else {
            roadImageLoaded = 0;
        }
        roadImage.src = roadImages[roadImageLoaded];
    }
});

// TODO: Crear en branch training una función que haga un camino, si supera X puntaje, entonces que haga el siguiente, si supera Y puntaje, el siguiente, y si se realizan modificaciones en una generación, entonces que revise si sigue siendo capaz de pasar los caminos anteriores, si no puede que vuelva a entrenar ahi

// TODO: Hacer una nueva clase que sea para el TODO de arriba


// // TO DO: Crear una ruta con obstáculos en medio, como una rotonda por ejemplo
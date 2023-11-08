// ! IMPORTS 

import Brain from './brain.js';
import Car from './car.js';
import Genetic from './genetic.js';
import Road from './road.js';

// ! GLOBAL VARIABLES
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

const ctx = new Road('raceCanvas', roadImage);

let car = new Car(300, 180, 50, 20, new Brain(70, 80, 40, 90), ctx, carImage, carImag2);

ctx.setCar(car);

// ! CAR CONTROL

setInterval(() => {
    car.move();
    ctx.updateCanvas();
}, excecutionSpeed);

// ! PHYSICS ENGINE

function actualizarJuego() {
    car.isInsideRoad();
    car.rewardExistence();
    car.thinkMove();
    ctx.updateCanvas();
    if (!car.isInside) {
        genetic.isBestScore(car);
        let mutations = genetic.mutate();
        generation += 1;
        document.getElementById('generation').innerHTML = generation;
        car = new Car(300, 180, 50, 20, new Brain(Math.floor(mutations[0]), Math.floor(mutations[1]), Math.floor(mutations[2]), Math.floor(mutations[3])), ctx, carImage, carImag2);
        ctx.setCar(car)
    }
    requestAnimationFrame(actualizarJuego);
}

actualizarJuego();
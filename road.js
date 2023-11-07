// ? CANVAS FUNCTIONS



// ? CAR CLASS

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
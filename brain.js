class Brain {
    constructor(sideDistance, straightDistance, turnThreshold, speedThreshold) {
        this.isAlive = true;
        this.sideDistance = sideDistance;
        this.straightDistance = straightDistance;
        this.turnThreshold = turnThreshold;
        this.speedThreshold = speedThreshold;
    }

    decideMovement(visionValues, accelerationX, accelerationY) {

    }

    // ! INPUT LAYER
    // ? 10 calculateVision
    // ? car.acceleration.x
    // ? car.acceleration.y

    // ! HIDDEN LAYER 1
    // ? Distancia ruta izquierda
    // ? Distancia ruta recto
    // ? Distancia ruta derecha

    // ! HIDDEN LAYER 2
    // ? Ruta va izquierda/derecha -- Revisa si tiene un valor alto alguna de las dos, y cual más
    // ? Ruta tiene camino recto todavía
    // ? Velocidad del vehículo

    // ! OUTPUT LAYER
    // ? Izquierda, derecha o recto
    // ? Acelerar o frenar

    // ! RECOMPENSAS
    // ? Ligera recompensa por permanecer en la calle
    // ? Recompensa moderada por cruzar un lugar amarillo
    // ? Detención de la IA por salir de la calle
}

export default Brain;
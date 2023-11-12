class Brain {
    constructor(sideDistance, straightDistance, straightClose, turnThreshold) {
        this.isAlive = true;
        this.sideDistance = sideDistance; // ? Tells the difference between sides to consider turning
        this.straightDistance = straightDistance; // ? Tells the minimum distance in front to consider continuing straight
        this.straightClose = straightClose // ? Tells when the road finishes too close in front
        this.turnThreshold = turnThreshold; // ? Is the turn significant enough for turning?
    }

    decideMovement(visionValues) {
        // ! INPUT LAYER
        // ? 10 calculateVision
        // ? car.acceleration.x
        // ? car.acceleration.y
        
        // ! HIDDEN LAYER 1
        // ? Distancia ruta izquierda
        const leftDistances = visionValues.slice(0, 3);
        const avgLeftDistance = leftDistances.reduce((acc, val) => acc + val, 0) / leftDistances.length;

        // ? Distancia ruta derecha
        const rightDistances = visionValues.slice(7);
        const avgRightDistance = rightDistances.reduce((acc, val) => acc + val, 0) / rightDistances.length;

        // ? Distancia ruta centro
        const frontDistances = visionValues.slice(3, 7);
        const avgFrontDistance = frontDistances.reduce((acc, val) => acc + val, 0) / frontDistances.length;
    
        // ! HIDDEN LAYER 2

        // ? Detectar si hay una curva hacia la izquierda o la derecha
        const difference = avgLeftDistance - avgRightDistance;
        
        let turnDirection = 0;
        
        if (difference > this.sideDistance) turnDirection = -1; // Curva a la izquierda
        else if (difference < this.sideDistance) turnDirection = 1; // Curva a la derecha
        
        // ? Ruta tiene camino recto todavía

        let hasStraightRoad = 0;
        if (avgFrontDistance > this.straightDistance) hasStraightRoad = 1;
        else if (avgFrontDistance < this.straightClose) hasStraightRoad = -1;

        // ? Ruta va izquierda/derecha -- Revisa si tiene un valor alto alguna de las dos, y cual más
        // ? Velocidad del vehículo
    
        // ! HIDDEN LAYER 3

        // ? El doblar es muy bajo en comparacion a la distancia de frente
        let isSignificantTurn = false;
        if (turnDirection == -1) {
            if (avgLeftDistance + this.turnThreshold > avgFrontDistance) isSignificantTurn = true;
        } else if (turnDirection == 1) {
            if (avgRightDistance + this.turnThreshold > avgFrontDistance) isSignificantTurn = true;
        }

        // ! OUTPUT LAYER
        let returnValues = [];
        
        // ? Acelerar, frenar o continuar recto
        returnValues.push(hasStraightRoad);

        // ? Izquierda, derecha o recto
        if ((isSignificantTurn && hasStraightRoad == 1) || hasStraightRoad != 1) {
            returnValues.push(turnDirection);
        } else {
            returnValues.push(0);
        }

        return returnValues;
    }

    // ! RECOMPENSAS
    // ? Ligera recompensa por permanecer en la calle
    // ? Recompensa moderada por cruzar un lugar amarillo
    // ? Detención de la IA por salir de la calle
}

export default Brain;
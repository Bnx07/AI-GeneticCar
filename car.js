class Car {
    constructor(x, y, width, height, brain, ctx, carImage, carImag2) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.rotation = 0;
        this.speed = 0.1;
        this.brake = 0.05;
        this.acceleration = [0, 0]; // ? [ X, Y ]
        this.friction = 0.98;
        this.rotationSpeed = 2.5;
        this.isInside = true;
        this.brain = brain;
        this.ctx = ctx;
        this.carImage = carImage;
        this.carImag2 = carImag2;
        this.reward = 0;
        this.hasStarted = false;
    }

    draw() {
        this.ctx.ctx.save();
        this.ctx.ctx.translate(this.x, this.y);
        this.ctx.ctx.rotate(this.rotation * Math.PI / 180);
        if (this.isInside) {
            this.ctx.ctx.drawImage(this.carImage, -this.width / 2, -this.height / 2, this.width, this.height);
        } else {
            this.ctx.ctx.drawImage(this.carImag2, -this.width / 2, -this.height / 2, this.width, this.height);
        }
        this.ctx.ctx.restore();
    }

    accelerate(speed) {
        const radians = this.rotation * (Math.PI / 180);

        this.acceleration[0] += speed * Math.cos(radians);
        this.acceleration[1] += speed * Math.sin(radians);
    }

    move() {
        this.acceleration[0] *= this.friction;
        this.acceleration[1] *= this.friction;

        if (Math.abs(this.acceleration[0]) < 0.01) this.acceleration[0] = 0;
        if (Math.abs(this.acceleration[1]) < 0.01) this.acceleration[1] = 0;

        this.x += this.acceleration[0];
        this.y += this.acceleration[1];
    }

    thinkMove() {
        if (this.isInside) {
            let result = this.brain.decideMovement(this.calculateVision(), this.acceleration);
    
            if (result[0] == 1) this.accelerate(this.speed);
            else if (result[0] == -1) this.accelerate(this.brake)
    
            if (result[1] == -1) this.rotation -= this.rotationSpeed;
            else if (result[1] == 1) this.rotation += this.rotationSpeed;
        }
    }

    getColorAtPixel(x, y) {
        const pixelData = this.ctx.ctx.getImageData(x, y, 1, 1).data;
        return pixelData[0];
    }

    calculateCorners() {
        // Calcula las coordenadas de las esquinas del auto en relación con el centro del auto
        const halfWidth = this.width / 2;
        const halfHeight = this.height / 2;
        const angleInRadians = this.rotation * (Math.PI / 180);

        const cosAngle = Math.cos(angleInRadians);
        const sinAngle = Math.sin(angleInRadians);

        const corners = [
            { x: -halfWidth, y: -halfHeight}, // Esquina inferior izquierda
            { x: halfWidth, y: -halfHeight},  // Esquina superior izquierda
            { x: halfWidth, y: halfHeight},   // Esquina superior derecha
            { x: -halfWidth, y: halfHeight}   // Esquina inferior derecha
        ];

        // Aplica la rotación a las esquinas del auto
        for (let i = 0; i < corners.length; i++) {
            const rotatedX = corners[i].x * cosAngle - corners[i].y * sinAngle;
            const rotatedY = corners[i].x * sinAngle + corners[i].y * cosAngle;
            corners[i].x = this.x + rotatedX;
            corners[i].y = this.y + rotatedY;
        }

        return corners;
    }

    rewardExistence() {
        if (this.isInside) this.reward += 1;
    }

    isInsideRoad() {
        if (this.hasStarted && this.isInside) {
            const corners = this.calculateCorners();
            const threshold = 170; // Umbral para determinar el color gris claro de la calle
            let limitCorners = 0;
    
            for (const corner of corners) {
                let pixelColor = this.getColorAtPixel(corner.x, corner.y);
                if (pixelColor < threshold) {
                    limitCorners += 1;
                } else if (pixelColor > 254 && this.isInside) {
                    this.reward += 50;
                }
            }
    
            if (limitCorners >= 2) this.isInside = false;
        } else {
            this.hasStarted = true;
        }
    }

    calculateVision() {
        let corners = this.calculateCorners();
        let distance = [];

        let topLeft = corners[1];
        let topRight = corners[2];
        
        distance.push(this.rayCast(topLeft.x, topLeft.y, -45));
        distance.push(this.rayCast(topLeft.x, topLeft.y, -35));
        distance.push(this.rayCast(topLeft.x, topLeft.y, -25));
        distance.push(this.rayCast(topLeft.x, topLeft.y, -15));
        distance.push(this.rayCast(topLeft.x, topLeft.y));

        distance.push(this.rayCast(topRight.x, topRight.y));
        distance.push(this.rayCast(topRight.x, topRight.y, 15));
        distance.push(this.rayCast(topRight.x, topRight.y, 25));
        distance.push(this.rayCast(topRight.x, topRight.y, 35));
        distance.push(this.rayCast(topRight.x, topRight.y, 45));

        return distance;
    }

    rayCast(x, y, rayAngle = 0) {
        const rayDirectionX = Math.cos((this.rotation + rayAngle) * Math.PI / 180);
        const rayDirectionY = Math.sin((this.rotation + rayAngle) * Math.PI / 180);        
        
        let rayPosX = x;
        let rayPosY = y;
    
        while (this.getColorAtPixel(rayPosX, rayPosY) > 170) {
            rayPosX += rayDirectionX;
            rayPosY += rayDirectionY;
        }
    
        // this.ctx.ctx.fillStyle = 'green';

        // this.ctx.ctx.beginPath();
        // this.ctx.ctx.arc(rayPosX, rayPosY, 5, 0, 2 * Math.PI); // Dibuja un círculo completo
        // this.ctx.ctx.fill();

        const distance = Math.sqrt(Math.pow(rayPosX - this.x, 2) + Math.pow(rayPosY - this.y, 2));
        return distance;
    }
}

// ? Brain is recieved as a param of the constructor

export default Car;
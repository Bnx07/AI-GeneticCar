class Road {
    constructor(canvas, roadImage) {
        this.car;
        this.canvas = document.getElementById(canvas);
        this.ctx = this.canvas.getContext('2d');
        this.roadImage = roadImage;
    }

    setCar(car) {
        this.car = car;
    }

    createRoad() {
        this.ctx.drawImage(this.roadImage, 0, 0, this.canvas.width, this.canvas.height);
    }
    
    updateCanvas() {
        this.clearCanvas();
        this.createRoad();
        this.car.draw();
    }
    
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

export default Road;
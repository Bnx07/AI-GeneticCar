class Genetic {
    constructor(randomness) {
        this.randomness = randomness;
        this.bestScore = 0;
        this.bestBrain = [];
    }

    mutate() {
        let mutation = [];
        this.bestBrain.forEach(weight => {
            let isPositive = Math.floor(Math.random() * 2);

            if (isPositive == 1) {
                mutation.push((Math.random() * this.randomness) * weight + weight);
            } else {
                mutation.push((Math.random() * -this.randomness) * weight + weight);
            }
        })

        return mutation;
    }

    isBestScore(car) {
        if (car.reward > this.bestScore) {
            this.bestScore = car.reward
            this.bestBrain = [car.brain.sideDistance, car.brain.straightDistance, car.brain.straightClose, car.brain.turnThreshold];
        }
        console.log(this.bestBrain)
    }
}

export default Genetic;
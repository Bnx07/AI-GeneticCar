class Genetic {
    constructor(randomness, population) {
        this.randomness = randomness;
        this.bestScore = 0;
        this.bestBrain = [];
        this.alivePopulation = population;
        this.deadPopulation = [];
    }

    mutate() {
        let mutation = [];
        this.bestBrain.forEach(weight => {
            const min = weight - this.randomness * weight;
            const max = weight + this.randomness * weight;
        
            // Generar un número aleatorio entre min y max
            const resultado = Math.random() * (max - min) + min;
        
            mutation.push(resultado);
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

    checkAgentAlive() {
        if (this.alivePopulation.length != 0) {
            let removePositions = [];
            this.alivePopulation.forEach((agent, index) => {
                if (!agent.isInside) {
                    this.deadPopulation.push(this.deadPopulation.push(this.alivePopulation[index]));
                    removePositions.push(index);
                }
            })
    
            removePositions = removePositions.sort((a, b) => b - a);
    
            removePositions.forEach(pos => {
                this.isBestScore(this.alivePopulation[pos]);
            })
    
            removePositions.forEach(pos => {
                this.alivePopulation.splice(pos, 1);
            })

            return false
        } else {
            return true;
        }
    }

    setNewPopulation(population) {
        this.deadPopulation = [];
        this.alivePopulation = population;
    }
}

export default Genetic;
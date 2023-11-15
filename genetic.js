class Genetic {
    constructor(randomness, population) {
        this.randomness = randomness;
        this.bestScore = 300;
        this.bestBrain = [100, 150, 70, 200];
        this.bestGeneration = 0;
        this.alivePopulation = population;
        this.deadPopulation = [];
        this.lastRoadMutated = 0; // ? Si difiere de 0, entonces que cuando se supere el puntaje, lo mande a la ruta 0 y se reestablezca
        this.scoresToBeat = [] // ? Puntajes a superar en cada calle
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

    isBestScore(car, gen) {
        if (car.maxReward > this.bestScore) {
            this.bestScore = car.maxReward
            this.bestBrain = [car.brain.sideDistance, car.brain.straightDistance, car.brain.straightClose, car.brain.turnThreshold];
            this.bestGeneration = gen;
        }
    }

    checkAgentAlive(gen) {
        if (this.alivePopulation.length != 0) {
            if (this.alivePopulation.length == 1) this.alivePopulation[0].showAgent = true;
            let removePositions = [];
            this.alivePopulation.forEach((agent, index) => {
                if (!agent.isInside) {
                    this.deadPopulation.push(this.deadPopulation.push(this.alivePopulation[index]));
                    removePositions.push(index);
                }
            })
    
            removePositions = removePositions.sort((a, b) => b - a);
    
            removePositions.forEach(pos => {
                this.isBestScore(this.alivePopulation[pos], gen);
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
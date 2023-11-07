// function sigmoid(x) {
//     return 1 / (1 + Math.exp(-x));
// }

// // Clase de la red neuronal
// class NeuralNetwork {
//     constructor(inputNodes, hiddenNodes, outputNodes) {
//         this.inputNodes = inputNodes;
//         this.hiddenNodes = hiddenNodes;
//         this.outputNodes = outputNodes;

//         // Inicialización de los pesos
//         this.weightsInputToHidden = new Array(this.hiddenNodes).fill(null).map(() =>
//             new Array(this.inputNodes).fill(null).map(() => Math.random() * 2 - 1)
//         );

//         this.weightsHiddenToOutput = new Array(this.outputNodes).fill(null).map(() =>
//             new Array(this.hiddenNodes).fill(null).map(() => Math.random() * 2 - 1)
//         );
//     }

//     // Función de propagación hacia adelante (forward propagation)
//     predict(inputs) {
//         const hiddenInputs = this.weightsInputToHidden.map(weights =>
//             inputs.reduce((sum, input, index) => sum + input * weights[index], 0)
//         );

//         const hiddenOutputs = hiddenInputs.map(sigmoid);

//         const finalInputs = this.weightsHiddenToOutput.map(weights =>
//             hiddenOutputs.reduce((sum, output, index) => sum + output * weights[index], 0)
//         );

//         const finalOutputs = finalInputs.map(sigmoid);

//         return finalOutputs;
//     }

//     // Función de entrenamiento (backpropagation)
//     train(inputs, targets, learningRate) {
//         // Implementa el algoritmo de backpropagation para ajustar los pesos
//     }
// }

// // Ejemplo de uso
// const inputNodes = 14; // 10 distancias, aceleración X, aceleración Y, acciones: acelerar/frenar, doblar/recto
// const hiddenNodes = 8; // Número de nodos en la capa oculta
// const outputNodes = 2; // Dos salidas: aceleración y dirección

// const neuralNetwork = new NeuralNetwork(inputNodes, hiddenNodes, outputNodes);

// // Entrenamiento (debes implementar esta parte)
// const trainingData = []; // Tu conjunto de datos de entrenamiento (entradas y objetivos)

// for (let i = 0; i < numIterations; i++) {
//     for (const data of trainingData) {
//         const inputs = data.inputs;
//         const targets = data.targets;
//         neuralNetwork.train(inputs, targets, learningRate);
//     }
// }

// // Uso de la red neuronal entrenada
// const inputs = [/* tus valores de entrada */];
// const predictions = neuralNetwork.predict(inputs);
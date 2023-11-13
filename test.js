function alterarValor(val, alt) {
    const min = val - alt * val;
    const max = val + alt * val;
  
    // Generar un número aleatorio entre min y max
    const resultado = Math.random() * (max - min) + min;
  
    return resultado;
  }
  
  // Ejemplo de uso
  const valorOriginal = 10;
  const factorAlteracion = 0.3;
  
  const resultado = alterarValor(valorOriginal, factorAlteracion);
  console.log(resultado);
  
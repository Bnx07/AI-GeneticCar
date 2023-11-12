let randomNumber = (num) => {
    let random = Math.floor(Math.random() * num * 2);
    random -= num;
    return random
}
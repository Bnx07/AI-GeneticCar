let teclasPresionadas = {};

export function onKeyDown(event) {
    teclasPresionadas[event.key] = true;
}

export function onKeyUp(event) {
    teclasPresionadas[event.key] = false;
}

export function isKeyPressed(key) {
    return teclasPresionadas[key] || false;
}

export function qKeyDown(event, callback) {
    if (event.key === 'q') {
        callback.thinkMove()
    }
}
input.onButtonPressed(Button.A, function () {
    stop = !(stop)
})
function initRandom () {
    for (let x = 0; x <= 4; x++) {
        for (let y = 0; y <= 4; y++) {
            if (Math.randomBoolean()) {
                led.plot(x, y)
            } else {
                led.unplot(x, y)
            }
        }
    }
}
function litsAround (x: number, y: number) {
    q = 0
    for (let dx of deltas) {
        for (let dy of deltas) {
            if (dx == 0 && dy == 0) {
                continue;
            }
            if (led.point((5 + x + dx) % 5, (5 + y + dy) % 5)) {
                q += 1
            }
        }
    }
    return q
}
input.onGesture(Gesture.Shake, function () {
    initRandom()
})
input.onButtonPressed(Button.AB, function () {
    basic.showLeds(`
        . . . . .
        . . # . .
        . . . # .
        . # # # .
        . . . . .
        `)
})
input.onButtonPressed(Button.B, function () {
    updateBoard()
})
function updateBoard () {
    updates = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
    ]
    for (let x2 = 0; x2 <= 4; x2++) {
        for (let y2 = 0; y2 <= 4; y2++) {
            p = litsAround(x2, y2)
            if (led.point(x2, y2)) {
                if (p <= 1 || p >= 4) {
                    // led.unplot(x2, y2)
                    // led.unplot(x2, y2)
                    // led.unplot(x2, y2)
                    // led.unplot(x2, y2)
                    // led.unplot(x2, y2)
                    // led.unplot(x2, y2)
                    // led.unplot(x2, y2)
                    // led.unplot(x2, y2)
                    updates[x2 * 5 + y2] = true
                }
            } else {
                if (p == 3) {
                    // led.plot(x2, y2)
                    // led.plot(x2, y2)
                    // led.plot(x2, y2)
                    // led.plot(x2, y2)
                    // led.plot(x2, y2)
                    // led.plot(x2, y2)
                    // led.plot(x2, y2)
                    // led.plot(x2, y2)
                    updates[x2 * 5 + y2] = true
                }
            }
        }
    }
    for (let x22 = 0; x22 <= 4; x22++) {
        for (let y22 = 0; y22 <= 4; y22++) {
            if (updates[x22 * 5 + y22]) {
                led.toggle(x22, y22)
            }
        }
    }
}
let p = 0
let updates: boolean[] = []
let q = 0
let stop = false
let deltas: number[] = []
initRandom()
deltas = [-1, 0, 1]
basic.forever(function () {
	
})
loops.everyInterval(200, function () {
    if (stop) {
        updateBoard()
    }
})

const fs = require('fs')
const readLine = require('readline')


function decrypt(x) {
    switch (x) {
        case "X":
            return "A"
            break;
        case "Y":
            return "B"
            break;
        case "Z":
            return "C"
            break;
        default:
            break;
    }
}


function decryptV2(x, y) {
    // X means you need to lose,
    // Y means you need to end the round in a draw,
    // and Z means you need to win. Good luck!"
    
    switch (y) {
        case "X":
            if(x === "A") return "C"
            if(x === "B") return "A"
            if(x === "C") return "B"
            break;
        case "Y":
            return x
            break;
        case "Z":
            if(x === "A") return "B"
            if(x === "B") return "C"
            if(x === "C") return "A"
            break;
        default:
            break;
    }
}

function checkDraw(x, y) {
    return x === y
}

function checkWin(x, y) {
    if(y === "B" && x === "A") return true
    if(y === "A" && x === "C") return true
    if(y === "C" && x === "B") return true
    return false
}

function scoreChoice(x) {
    switch (x) {
        case "A":
            return 1
            break;
        case "B":
            return 2
            break;
        case "C":
            return 3
            break;
        default:
            break;
    }
}

function scoreMatch(x, y) {
    if(checkDraw(x,y)) return 3
    if(checkWin(x,y)) return 6
    return 0
}

async function scoreGame() {

    const stream = fs.createReadStream('./rock-paper-scissors.txt')
    const readInterface = readLine.createInterface({
        input: stream,
        crlf: Infinity
    })

    let sum = 0;

    for await (let line of readInterface) {
        line = line.split(" ")
        line[1] = decryptV2(line[0], line[1])
        sum += scoreChoice(line[1]) + scoreMatch(line[0], line[1])
    }

    return sum;

}

scoreGame().then((val) => {
    console.log(val)
})
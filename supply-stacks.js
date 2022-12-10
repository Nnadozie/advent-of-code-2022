const fs = require('fs')
const readline = require('readline')

const stacks = []

function parseStackLine(line) {
    const lineToArr = line.split('')
    let col = 0;
    for(let i = 1; i < lineToArr.length; i+=4){
        if(lineToArr[i] !== ' ') {
            if(stacks[col] === undefined) stacks[col] = []
            stacks[col].unshift(lineToArr[i])
        }
        col++
    }
}

function parseMove(line) {
    const move = {
        num: 0,
        from: 0,
        to: 0,
    }
    const arr = line.split(' ')
    move.num = parseInt(arr[1])
    move.from = parseInt(arr[3] - 1)
    move.to = parseInt(arr[5] - 1)

    return move
}

function move({num, from, to}) {
    const intermediate = []
    for(let i = 0; i < num; i++) {
        intermediate.push(stacks[from].pop())
    }
    for(let i = 0; i < num; i++) {
        stacks[to].push(intermediate.pop())
    }
}

function getString() {
    return stacks.reduce((prev, curr) => prev + curr.pop(), '')
}

async function processSupplyStacks() {
    const stream = fs.createReadStream('./supply-stacks.txt')
    const readInterface = readline.createInterface({
        input: stream
    })

    for await (const line of readInterface) {
        if( line.includes('[') ) {
            parseStackLine(line)
        }else if(line.charAt(0) === 'm') {
            move(parseMove(line))
        }
    }
}

processSupplyStacks().then(() => {
    console.log(getString())
})
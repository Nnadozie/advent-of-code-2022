const fs = require('fs')
const readLine = require('readline')


function contains(a, b) {
    if((a[0] <= b[0] && a[1] >= b[1]) 
    || a[0] < b[0] && a[1] >= b[0] && a[1] < b[1]
    
    ) return true
    return false
}

function parseInput(line) {
    line = line.split(',')
    line =[line[0].split('-'), line[1].split('-')]
    line[0] = line[0].map(str => parseInt(str))
    line[1] = line[1].map(str => parseInt(str))
    return line
}

async function processCleanup() {
    const readStream = fs.createReadStream('./camp-cleanup.txt')
    const readlineInterface = readLine.createInterface({
        input: readStream
    })

    let sum = 0;
    let parsed = []

    for await (const line of readlineInterface) {
        parsed = parseInput(line)
        console.log(parsed, contains(parsed[0], parsed[1]) || contains(parsed[1], parsed[0]))
        if(contains(parsed[0], parsed[1]) || contains(parsed[1], parsed[0])) sum+=1
    }

    return sum
}

processCleanup().then((val) => console.log(val))
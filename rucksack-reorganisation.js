// split string in half
// for each char in one half check if other half contains it
// if it does, get ascii decimal number
// if lower case subtract 96
// if uppercase substract 64
// keep running sum

const fs = require('fs')
const readLine = require('readline')

function splitRucksack(s) {
    const mid = (s.length/2);
    return [s.slice(0, mid).split('') , s.slice(mid, s.length).split('')]
}

function getDuplicates(a, b) {
    //console.log(a, b)
    const dups = []
    a.forEach(item => {
        if(b.includes(item) && !dups.includes(item)) dups.push(item)
    });
    return dups
}

function getPriority(s) {
    let priority = 0
    if(s === s.toLocaleLowerCase()) {
        priority = s.charCodeAt(0) - 96
    }else{
        priority = s.charCodeAt(0) - 65 + 27
    }
    //console.log(s, s.charCodeAt(0), priority)

    return priority
}

function getTriplicate(a, b, c) {
    const dups = getDuplicates(a.split(''), b.split(''))
    return getDuplicates(dups, c.split(''))[0]
}

async function processPriorites() {
    const stream = fs.createReadStream('./rucksack-reorganisation.txt')
    const readLineInterface = readLine.createInterface({
        input: stream,
    })

    let rucksack = []
    let dups = []
    let sum = 0
    let inputLines = 3
    let group = []

    for await (let line of readLineInterface) {
        // rucksack = splitRucksack(line)
        // dups = getDuplicates(rucksack[0], rucksack[1])
        // dups.forEach(dup => {
        //     console.log(dup)
        //     sum += getPriority(dup)
        // })
        group[inputLines - 1] = line
        if(inputLines === 1) {
            //console.log(group)
            sum += getPriority(getTriplicate(group[0], group[1], group[2]))
            inputLines = 3
        }else{
            inputLines--
        }
    }

    return sum
}

processPriorites().then(val => {
    console.log(val)
})
const fs = require('fs')
const readLine = require('readline')

async function processCalorieInput() {

    const stream = fs.createReadStream('./calorie-counting.txt')

    const readlineInterface  = readLine.createInterface({
        input: stream,
        crlfDelay: Infinity
    })

    let max =0; let sum = 0

    for await(let line of readlineInterface) {
        line = parseInt(line)
        if(!line) {
            max = Math.max(sum, max)
            sum = 0;
        }else {
            sum += parseInt(line)
        }
    }

    return max;

}

processCalorieInput().then((val) => {
    console.log(val)
})
const fs = require('fs')
const readLine = require('readline')

async function processCalorieInput() {

    const stream = fs.createReadStream('./calorie-counting.txt')

    const readlineInterface  = readLine.createInterface({
        input: stream,
        crlfDelay: Infinity
    })

    let max = [0,0,0]; let sum = 0

    for await(let num of readlineInterface) {
        num = parseInt(num)
        if(!num) {
            max[2] = Math.max(sum, max[2])
            max.sort((a, b) =>  b - a)
            sum = 0;
        }else {
            sum += parseInt(num)
        }
    }

    max[2] = Math.max(sum, max[2])
    max.sort((a, b) =>  b - a)

    return max;

}

processCalorieInput().then((val) => {
    console.log(val)
})
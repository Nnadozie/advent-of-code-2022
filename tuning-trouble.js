const fs = require('fs')
const readline = require('readline')

function checkUnique(arr) {
    console.log(arr)
    const seen = []
    for(let i = 0; i < arr.length; i++) {
        if(seen.includes(arr[i])) return false
        seen.push(arr[i])
    }
    return true
}

async function processTuning() {
    const rl = readline.createInterface({
        input: fs.createReadStream('./tuning-trouble.txt')
    })

    const window = []
    let num = 0;
    for await(const line of rl) {
        for(const ch of line){
            num++
            if(window.length === 4){
                window.unshift(ch); window.pop()
            } else{
                window.unshift(ch)
            }
            if(num > 3 && checkUnique(window)) {
                return num
            }
        }
    }

    return num
}

processTuning().then((val) => console.log(val))
const amount = Number(prompt("Type the amount of dice."))
const sum = Number(prompt("Type the sum."))
const sample = 10000

function rollDice() {
    return Math.floor((Math.random() * 6) + 1)
}
let probability = 0

for (let i = 0; i < sample; i++) {
    let samplesum = 0
    for (let y = 0; y < amount; y++) {
        samplesum += rollDice()
    }
    if (samplesum == sum) {
        probability++
    }
}

const percentage = (probability / sample) * 100
const text = "Probability to get sum " + sum + " with " + amount + " dice is " + percentage.toFixed(2) + "%"
console.log(text)
document.querySelector('#task10').innerHTML = text
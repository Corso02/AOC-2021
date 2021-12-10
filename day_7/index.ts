import { readFileSync } from "fs"
import { resolve } from "path"


let input: number[] = readFileSync(resolve("day_7", "input.txt"), {encoding: "utf-8"}).split(",").map(x => parseInt(x))

// let average: number = input.reduce((a,b) => a+b) / input.length

const part1 = () => {
    //sort to calculate median
    input = input.sort((a, b) => {return a - b})
    // input lenght is even 
    let median = (input[input.length / 2] + input[(input.length/2) - 1]) / 2

    let fuel_count: number = 0

    input.map(val => {
        if(val > median)
            fuel_count += (val - median)
        else
            fuel_count += (median - val)
    })

    console.log(fuel_count)
}

const get_count = (begin: number, end: number): number => {
    let count: number = 0
    let previous_increment: number = 1
    while(begin < end){
        count += previous_increment
        previous_increment++
        begin++
    }
    return count
}

const part2 = () => {
    let average = Math.ceil(input.reduce((a, b) => a+b) / input.length) // round up
    let second_average = Math.floor(input.reduce((a, b) => a+b) / input.length) // round down

    let count: number = 0
    let second_count: number = 0
    input.map(val => {
        if(val > average)
            count += get_count(average, val)
        else
            count += get_count(val, average)
        if(val > second_average)
            second_count += get_count(second_average, val)
        else
            second_count += get_count(val, second_average)
    })

    // print smaller count which is more efficient
    console.log(count > second_count ? second_count : count)
}
part2()
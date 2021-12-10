import { readFileSync } from "fs"
import { resolve } from "path"


let file = readFileSync(resolve("day_6", "input.txt"), {encoding: "utf-8"})

let file_idx: number = 0
let fish_arr: number[] = []
let day: number = 0
let state: number[] = []

while(file_idx < file.length){
    if(file[file_idx] != "\n" && file[file_idx] != '\r' && file[file_idx] != ',')
        fish_arr.push(Number(file[file_idx]))
    file_idx++
}

for(let i = 0; i < 9; i++){
    state.push(0)
}

fish_arr.map(element => state[element]++)

while(day < 256){
    let zeroDaysLeft = state[0]
    let oneDayLeft = state[1]
    let twoDaysLeft = state[2]
    let threeDaysLeft = state[3]
    let fourDaysLeft = state[4]
    let fiveDaysLeft = state[5]
    let sixDaysLeft = state[6]
    let sevenDaysLeft = state[7]
    let eightDaysLeft = state[8]

    state[0] = oneDayLeft
    state[1] = twoDaysLeft
    state[2] = threeDaysLeft
    state[3] = fourDaysLeft
    state[4] = fiveDaysLeft
    state[5] = sixDaysLeft
    state[6] = sevenDaysLeft + zeroDaysLeft
    state[7] = eightDaysLeft
    state[8] = zeroDaysLeft
    day++
}

console.log(state.reduce((a,b) => a+b))
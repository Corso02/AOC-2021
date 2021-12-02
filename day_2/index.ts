import fs = require("fs")
import path = require("path")

let file = fs.readFileSync(path.resolve("./", "day_2", "input.txt"), {encoding: "utf-8"})

let line: Array<string> = []
let horizontal_pos: number = 0
let vertical_pos: number = 0
let joined_line: string = ""
let aim: number = 0

for(let i = 0; i < file.length; i++){
    if(file[i] != '\n' && file[i] != '\r'){
        line.push(file[i])
    }
    else{
        joined_line = line.join("")
        if(joined_line.includes("forward")){
            horizontal_pos += Number(line[line.length - 1])
            vertical_pos += (Number(line[line.length - 1]) * aim)
        }
        else if(joined_line.includes("up")){
            aim -= Number(line[line.length - 1])
          //  vertical_pos -= Number(line[line.length - 1])
        }
        else{
            aim += Number(line[line.length - 1])
         //   vertical_pos += Number(line[line.length - 1])
        }
        line.length = 0 // clear array
        i++;
    }
}

console.log(horizontal_pos, vertical_pos)
console.log(horizontal_pos * vertical_pos)
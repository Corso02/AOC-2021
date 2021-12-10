import { readFileSync } from "fs"
import { resolve } from "path"

interface segment {
    top: string
    top_right: string
    top_left: string
    middle: string
    bottom_left: string
    bottom_right: string
    bottom: string
}

interface segment_num{
    number_of_chars: number
}

let zero: segment_num = {number_of_chars: 6}
let one: segment_num = {number_of_chars: 2}
let two: segment_num = {number_of_chars: 5}
let three: segment_num = {number_of_chars: 5}
let four: segment_num = {number_of_chars: 4}
let five: segment_num = {number_of_chars: 5}
let six: segment_num = {number_of_chars: 6}
let seven: segment_num = {number_of_chars: 3}
let eight: segment_num = {number_of_chars: 7}
let nine: segment_num = {number_of_chars: 6}

let one_segment_config: segment = {bottom: "", bottom_left: "", bottom_right: "", middle: "", top: "", top_left: "", top_right: ""}

// read whole file, split rows into array and then get the last part of the line (after |)
// end of substring is defined as its length - 1 because on the end we have '\r'
// then create one string where each segment is seperated by space and the divide them into array where seperator is space 
// toString wont work because it will put ',' between lines, and when I used ReplaceAll method i got 125465124615489465 errors, and I couldn't solve them so I came up with this solution
let input_lines = readFileSync(resolve("day_8", "input.txt"), {encoding: "utf-8"}).split("\n").map(line =>  line.substring(line.indexOf("|") + 2, line.length - 1)).join(" ").split(" ")

// remove last element from array, bcs its empty
input_lines.splice(input_lines.length - 1)

let count = 0

input_lines.map(sequence => {
    if(sequence.length == one.number_of_chars || sequence.length == four.number_of_chars || sequence.length == seven.number_of_chars || sequence.length == eight.number_of_chars)
        count++
})

console.log(count)
import { readFileSync } from "fs"
import { resolve } from "path"


interface point{
    x1: number
    y1: number
    x2: number
    y2: number
    isVertical: boolean
}

interface intersection{
    x: number
    y: number
    count: number
}

let point_arr: point[] = []
let number_str: string[] = []
let valid_points: point[] = []

let file = readFileSync(resolve("day_5", "sample.txt"), {encoding: "utf-8"})
let file_idx: number = 0
let point_set: boolean = false

while(file_idx < file.length){
    let new_point: point = {x1: -1, y1: -1, x2: -1, y2: -1, isVertical: false}
    while(file[file_idx] != '\n' && file[file_idx] != '\r'){
        while(file[file_idx] != ',' && file[file_idx] != '\r'){
            if(file[file_idx] == ' '){
                file_idx += 3
                break
            }
            else{
                number_str.push(file[file_idx])
                file_idx++
            }
        }
        if(number_str.length > 0){
            if(new_point.x1 == -1){
                new_point.x1 = Number(number_str.join(""))
            }
            else if(new_point.y1 == -1){
                new_point.y1 = Number(number_str.join(""))
            }
            else if(new_point.x2 == -1){
                new_point.x2 = Number(number_str.join(""))
            }
            else{
                new_point.y2 = Number(number_str.join(""))
            }
            file_idx++
        }
        number_str = []
    }
    point_arr.push(new_point)
    file_idx ++
}

for(let i = 0; i < point_arr.length; i++){
    if(point_arr[i].x1 == point_arr[i].x2 || point_arr[i].y1 == point_arr[i].y2){
        if(point_arr[i].y1 == point_arr[i].y2)
            point_arr[i].isVertical = true
        valid_points.push(point_arr[i])
    }
}

let intersecion_arr: intersection[] = []

for(let i = 0; i < valid_points.length; i++){
    for(let j = 0; j < valid_points.length; j++){
        if(i == j) continue
        
    }
}

console.log(valid_points)

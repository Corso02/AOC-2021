import { readFileSync } from "fs"
import { resolve } from "path"


const file: string = readFileSync(resolve("./", "day_1", "input.txt"), {encoding: "utf-8"})

let count: number = 0;
let last_sum: number = 0;
let curr_num_arr: Array<string>= [];
let curr_sum: number = 0;
let lines_count: number = 0;
let curr_num: number = 0;
let num_of_chars: number = 0;

for(let i = 0; i < file.length; i++){
    if(file[i] != '\r' && file[i] != '\n'){
        curr_num_arr.push(file[i])
        if(lines_count != 0)
            num_of_chars++;
    }
    else{
        if(lines_count != 0)
            num_of_chars += 2; // \n \r
        curr_num = Number(curr_num_arr.join(""))
        if(lines_count < 3){
            curr_sum += curr_num
            lines_count++;
        }
        else{
            if(last_sum < curr_sum)
                count++;
            last_sum = curr_sum
            curr_sum = 0
            lines_count = 0
            i -= num_of_chars;
            num_of_chars = 0;
        }
        curr_num_arr.splice(0, curr_num_arr.length)
        i++; // skipping one loop because after \r theres \n
     
    }
}
console.log(count) // -1 when comparing line by next line
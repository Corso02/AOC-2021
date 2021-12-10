import { readFileSync } from "fs"
import { resolve } from "path"


let file = readFileSync(resolve("./", "day_3", "input.txt"), {encoding: "utf-8"})

let binary_2d_array: number[][] = []
let row: Array<number> = []

let binary_row_idx: number = 0
let binary_col_idx: number = 0

let gamma_arr: Array<number> = []
let epsilon_arr: Array<number> = []

let count_one: number = 0
let count_zero : number = 0

let oxygen_arr: number[][] = []
let co2_arr: number[][]  = []

let col_count: number = 12

// load bin numbers from file to 2D array
for(let i = 0; i < file.length; i++){
    if(file[i] != '\n' && file[i] != '\r'){
        row.push(Number(file[i]))
        binary_col_idx++
        if(binary_col_idx == col_count){
            binary_2d_array.push(row)
            binary_col_idx = 0
            binary_row_idx++
            row = []
        }
    }
}


const gamma_epsilon_rating = () => {
    for(let j = 0; j < col_count; j++){ // col
        for(let i = 0; i < binary_row_idx; i++){
            if(binary_2d_array[i][j] == 1)
                count_one++
            else 
                count_zero++
        }
        if(count_one >= count_zero){
            gamma_arr.push(1)
            epsilon_arr.push(0)
        }
        else{
            gamma_arr.push(0)
            epsilon_arr.push(1)
        }
        count_one = 0
        count_zero = 0
    }
}


// convert binary number to decimal
const bin_to_dec = (bin: Array<number>) : number => {
    let dec_num: number = 0

    let increment: number = col_count - 1;

    for(let i = 0; i < col_count; i++){
        if(bin[i] == 1){
            dec_num += Math.pow(2, increment)
        }
        increment--;
    }

    return dec_num
}


// find the right binary number
const oxygen_co2_rating = (input_array: number[][], col: number, test_for_oxygen: boolean, num_of_rows: number) : number[][] => {

    let output_arr: number[][] = []
    let dominant_num: number = -1

    for(let j = 0; j < num_of_rows; j++){
        if(input_array[j][col] == 1)
            count_one++
        else
            count_zero++
    }

    if(count_zero > count_one)
        dominant_num = 0
    else 
        dominant_num = 1

    count_one = 0
    count_zero = 0 

    for(let i = 0; i < num_of_rows; i++){
        if(test_for_oxygen && input_array[i][col] == dominant_num)
            output_arr.push(input_array[i])

        else if(!test_for_oxygen && input_array[i][col] != dominant_num)
            output_arr.push(input_array[i])
    }

    // console.log(`${col}. output`)
    // console.log(output_arr)

    
    return output_arr

   
}

oxygen_arr = binary_2d_array
let col = 0;
do{
    oxygen_arr = oxygen_co2_rating(oxygen_arr, col, true, oxygen_arr.length)
    col++

}while(oxygen_arr.length != 1)

co2_arr = binary_2d_array
col = 0

do{
    co2_arr = oxygen_co2_rating(co2_arr, col, false, co2_arr.length)
    col++
}while(co2_arr.length != 1)


console.log(bin_to_dec(oxygen_arr[0]) * bin_to_dec(co2_arr[0]))
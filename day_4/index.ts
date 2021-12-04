import fs = require("fs")
import path = require("path")

let file: string = fs.readFileSync(path.resolve("day_4", "input.txt"), {encoding: "utf-8"})
let file_idx: number = 0;

let input: Array<number> = []
let number_str: Array<string> = []

interface one_field{
    value: number
    checked: boolean
}

interface boards{
    play_boards: one_field[][][]
  //  tmp_boards: one_field[][][]
}

// load input from file
while(file[file_idx] != '\n' && file[file_idx] != '\r'){
    while(file[file_idx] != ',' && file[file_idx] != '\r' && file[file_idx] != '\n'){
        number_str.push(file[file_idx])
        file_idx++
    }
    input.push(Number(number_str.join("")))
    number_str = []
    file_idx++
}

//get on first row in first board
while(file[file_idx] == '\n' || file[file_idx] == '\r'){
    file_idx++
}

let boards: boards = {play_boards: []}
let tmp_board: one_field[][] = []
let row: one_field[] = []
let new_line_count: number = 0
let row_idx: number = 0

while(file_idx < file.length){ // do this until EOF is reached
    while(file[file_idx] != '\n' && file[file_idx] != '\r' && file_idx < file.length){
        while(file[file_idx] != ' ' && file[file_idx] != '\r' && file[file_idx] != '\n'){
            number_str.push(file[file_idx])
            file_idx++
        }
        if(number_str.length > 0){
            let new_field: one_field = {value: Number(number_str.join("")), checked: false}
            //row.push(Number(number_str.join("")))
            row.push(new_field)
        }
        number_str = []
        file_idx++
    }
    if(row.length > 0){
        tmp_board.push(row)
        new_line_count++
        if(new_line_count == 5){
            boards.play_boards.push(tmp_board)
            tmp_board = []
            new_line_count = 0
            row_idx = 0
        }
    }
    row = []
    file_idx++
}

const mark_number = (board: one_field[][], number_to_mark: number) : one_field[][] => { //marked number will be changed to -1
    let tmp_board: one_field[][] = board
    
    for(let i = 0; i < 5; i++){
        for(let j = 0; j < 5; j++){
            if(tmp_board[i][j].value == number_to_mark){
                tmp_board[i][j].checked = true
                break;
            }
        }
    }

    return tmp_board
}

const check_board = (board: one_field[][]): boolean => {
    let count: number = 0;

    for(let i = 0; i < 5; i++){
        for(let j = 0; j < 5; j++){
            if(board[i][j].checked)
                count++
        }
        if(count == 5)
            return true
        count = 0
    }

    count = 0

    for(let j = 0; j < 5; j++){
        for(let i = 0; i < 5; i++){
            if(board[i][j].checked)
                count++
        }
        if(count == 5)
            return true
        count = 0
    }

    return false
}

let winner_board_idx: number = 0
let winner_number: number = 0 // stores called number when winner board was found
let found: boolean = false
let winner_boards_idxs: number[] = [] // part 2

for(let i = 0; i < input.length; i++){
    for(let j = 0; j < boards.play_boards.length; j++){
        if(winner_boards_idxs.includes(j)) // part 2
            continue // part 2
        boards.play_boards[j] = mark_number(boards.play_boards[j], input[i])
        if(check_board(boards.play_boards[j])){ // part 2
            winner_boards_idxs.push(j) // part 2
            if(winner_boards_idxs.length == boards.play_boards.length){ // part 2
                winner_board_idx = j
                winner_number = input[i]
                found = true
                break;
            }
        }
    }
    if(found) break
}

const get_score = (winner_board: one_field[][], winner_number: number): number => {
    let sum_of_unmarked: number = 0

    for(let i = 0; i < 5; i++){
        for(let j = 0; j < 5; j++){
            if(!winner_board[i][j].checked)
                sum_of_unmarked += winner_board[i][j].value
        }
    }


    return sum_of_unmarked * winner_number
}

console.log(get_score(boards.play_boards[winner_board_idx], winner_number))
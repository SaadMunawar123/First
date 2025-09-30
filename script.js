
let player = 'X';
let table = Array(9).fill('*');

let c = 0;

function toConsoleInThree(array,y){

    if(y !== undefined){

        console.log(c++);
    }

    console.log(" ",array[0] , array[3] , array[6] , "\n " , array[1] , array[4] , array[7] , "\n " , array[2] , array[5] , array[8]);
}

function check(element){

    if(element.textContent === ''){

        element.textContent = player;

        table[element.id] = player;

        console.log('Started')
        
        toGo();

        console.log('Ended');
    }
}

function win(array){

    let Xwins = 0;
    let Owins = 0;

    let winPairs = [[0,1,2],[0,3,6],[3,4,5],[6,7,8],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

    for(let i = 0 ; i < winPairs.length ; i++){

        let presentWinPair = winPairs[i];

        if(array[presentWinPair[0]] !== null && array[presentWinPair[0]] === array[presentWinPair[1]] && array[presentWinPair[1]] === array[presentWinPair[2]]){

            if(array[presentWinPair[0]] === "X"){

                Xwins++;
            }else{

                Owins++;
            }
        }
    }

    if(Xwins > 0 && Owins === 0){

        return ['X',Xwins];
    }else if(Owins > 0 && Xwins === 0){

        return ['O',Owins];
    }else if(Xwins > 0 && Owins > 0){

        return "both";
    }else{
        
        if(
            (array[0] != null && array[1] != null && array[2] != null && array[3] != null && array[4] != null && array[5] != null && array[6] != null && array[7] != null && array[8] != null)
        ){

            return "draw";
        }
    }
}

function toGo(){
    
    function forRemain(array , v){

        let remain = [];

        if(v === undefined){

            v = '*';
        }

        for(let i = 0 ; i < array.length ; i++){

            if(array[i] === v){

                remain.push(i);
            }
        }

        return remain;
    }

    function forPush(val){

        percentages.push(val);

        console.log(percentages);
    }

    function forComplete(array){

        for(let i = 0 ; i < array.length ; i++){

            if(array[i] === '*'){

                return false;
            }
        }

        toConsoleInThree(array);
    }

    let choosedCount = -1;

    function toDo(array , val , choosed , remain , toStop , end , out){

        if(choosed == Number(choosed)){

            choosedCount++;

            choosed = remain[choosedCount];
        }

        if(val === 'X'){

            val = 'O';
        }else if(val === 'O'){

            val = 'X';
        }

        for(let i = 0 ; i < remain.length ; i++){

            let present = remain[i];

            if(array[choosed]  === '*' && typeof choosed === 'number'){

                array[choosed] = 'O';
            }

            if(array[present] === '*'){

                array[present] = val;
            }else{

                continue;
            }
            
            forComplete(array , choosed);

            if(toStop < end){

                toStop++;

                toDo(Array.from(array) , val , 'no' , forRemain(array) , toStop , end);
            }

            array[present] = '*';
        }

        if(out < end){

            console.log('yes');

            out++;

            let r = remain;

            toDo(Array.from(table) , 'O' , 0 , r , 1 , r.length , out);
        }
    }

    let r = forRemain(table);

    toDo(Array.from(table) , 'O' , 0 , r , 1 , r.length , 1);
}
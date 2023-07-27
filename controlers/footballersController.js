const axios = require('axios');
const fs = require('fs');

//отримуємо масив об'єктів
async function getFootballers() {
    const response = await axios.get('https://run.mocky.io/v3/093c503b-5a55-4764-be41-6f4d3a8eb32b');
    return response;
}

//отримуємо масив унікальних переможців ЗМ
async function getUnicFootballers() {
    const response = await axios.get('https://run.mocky.io/v3/093c503b-5a55-4764-be41-6f4d3a8eb32b');
    let players=new Array();
    for(let i=0;i<response.data.length;i++){
        if(!players.includes(response.data[i].player))  players.push(response.data[i].player);
    }
    return players;
}

//отримуємо всю інформацюю про заданого футболіста
function playerInfo(arr,str) {
    let getPlayerInfo= new Array();

    arr.forEach((elem,i,arr1) =>{
        if( elem.player.toLowerCase().includes(str))    getPlayerInfo.push(elem);
        else if(i===arr1.length-1 && getPlayerInfo.length===0)  getPlayerInfo=404;
    })

    return getPlayerInfo;
}

//отримуємо футболіста з найбільшим показником голів в переможний рік
function mostGoals(arr){
    arr.sort((f1, f2) => f2.goalsScored - f1.goalsScored);
    return `top-1 forward: ${arr[0].player} goals scored: ${arr[0].goalsScored}`;
}

//отримуємо гравця, який перемогав більше за всіх
function mostWinner(arr,unicArr){
    let lengthWin=0,winner;
    unicArr.forEach((item) =>{
        if(arr.filter(elem => (item===elem.player)).length> lengthWin){
            lengthWin=arr.filter(elem => (item===elem.player)).length;
            winner=item;
        }
    })
    return `${winner} won ${lengthWin} times`;
}

//отримуємо наймолодшого переможця ЗМ
function youngPlayer(arr){
    const youngestGoldenBallWinner = arr.map(f => {
        const birthYear = f.dateOfBirth.split('-')[0];
        return { name: f.player, winningAge: f.year - birthYear };
    })
        .sort((f1, f2) => f1.winningAge - f2.winningAge)
        .shift();

    return `Younges golden ball winner is ${youngestGoldenBallWinner.name}. He won Golden Cup at the age of ${youngestGoldenBallWinner.winningAge}`;
}



//отримуємо масив унікальних ліг всіх переможців
function titles(arr){
    let setTitles= new Set();
    arr.forEach(elem =>{
        for( let title of elem.titlesWon){
            setTitles.add(title);
        }
    })
    return  [...setTitles].sort() ;
}


module.exports={getFootballers,getUnicFootballers,titles,mostGoals,mostWinner,youngPlayer,playerInfo};
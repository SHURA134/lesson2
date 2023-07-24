const axios = require('axios');
const fs = require('fs');


async function getFootballers() {
    const response = await axios.get('https://run.mocky.io/v3/093c503b-5a55-4764-be41-6f4d3a8eb32b');
    return response;
}

async function getUnicFootballers() {
    const response = await axios.get('https://run.mocky.io/v3/093c503b-5a55-4764-be41-6f4d3a8eb32b');
    let players=new Array();
    for(let i=0;i<response.data.length;i++){
        if(!players.includes(response.data[i].player))  players.push(response.data[i].player);
    }
    return players;
}


module.exports={getFootballers,getUnicFootballers};
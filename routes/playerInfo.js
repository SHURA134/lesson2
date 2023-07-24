const express=require(`express`);
const FootballersController= require('../controlers/footballersController');

const playerInfo= express.Router();

playerInfo.get(`/`, async (request,response) =>{
    const playersList= await FootballersController.getFootballers();
    const playerSearch=request.query.player;
    let getPlayerInfo= new Array();
    playersList.data.forEach((elem,i,arr) =>{
        if( elem.player.toLowerCase().includes(playerSearch))     getPlayerInfo.push(elem);
        else if(i===arr.length-1 && getPlayerInfo.length===0)  response.send(404);  
        else if(i===arr.length-1 && getPlayerInfo.length>0)  response.send(getPlayerInfo);
    })




    //str.includes(substr, pos)
})

module.exports={playerInfo};


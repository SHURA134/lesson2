const express=require(`express`);
const footballersController = require('../controlers/footballersController');

const winnerZm=  express.Router();


winnerZm.get(`/`, async (request,response)  =>{
    const footballersList= await footballersController.getFootballers();
    const footballersUnicList=await footballersController.getUnicFootballers();
    let lenWin=0;
    let winner;



    footballersUnicList.forEach((item) =>{
        if(footballersList.data.filter(elem => (item===elem.player)).length>lenWin){
            lenWin=footballersList.data.filter(elem => (item===elem.player)).length;
            winner=item;
        }
    })


    response.send(`${winner} won ${lenWin} times`);

})

module.exports= {winnerZm};
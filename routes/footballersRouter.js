const express=require(`express`);
const footballersController = require('../controlers/footballersController');

const footballersRouter  = express.Router();


footballersRouter.get('/', async (request, response) => {
    const footballersList=await footballersController.getFootballers();
    response.send(footballersList.data);
});



footballersRouter.get('/allWinners', async (request, response) => {
    const footballersUnicList=await footballersController.getUnicFootballers();
    response.send(footballersUnicList);
});


footballersRouter.get(`/mostGoals`,async (request,response) =>{

    const goals = await footballersController.getFootballers();
    let goalsScored = 0, goalsScoredId = 0;


    for(let i=0;i<goals.data.length;i++){
        if(goals.data[i].goalsScored>goalsScored) {
            goalsScored=goals.data[i].goalsScored;
            goalsScoredId = i;
        };
    }

    response.send(`top-1 forward: ${goals.data[goalsScoredId].player} goals scored: ${goals.data[goalsScoredId].goalsScored}` );
})


footballersRouter.get(`/youngPlayer`,async (request,response) => {
    const footballersList = await footballersController.getFootballers();
    let age = new Array();


    footballersList.data.forEach(elem => {
        let bd = elem.dateOfBirth.split('-');
        if (age.length === 0) {
            age = bd;
            age.push(elem.player);
        } else if (bd[0] > age[0] || bd[0] === age[0] && bd[1] > age[1] || bd[0] === age[0] && bd[1] === age[1] && bd[2] > age[2]) {
            age = bd;
            age.push(elem.player);
        }

    })


    response.send(age.reverse());
});

footballersRouter.get(`/mostWinner`, async (request,response)  =>{
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

    //я побачив як зробити краще, але жінка чекає мене дивитись серіал(((
    response.send(`${winner} won ${lenWin} times`);

})


footballersRouter.get(`/PlayerInfo`, async (request,response) =>{
    const playersList= await footballersController.getFootballers();
    const playerSearch=request.query.player;
    let getPlayerInfo= new Array();


    playersList.data.forEach((elem,i,arr) =>{
        if( elem.player.toLowerCase().includes(playerSearch))     getPlayerInfo.push(elem);
        else if(i===arr.length-1 && getPlayerInfo.length===0)  response.send(404);
        else if(i===arr.length-1 && getPlayerInfo.length>0)  response.send(getPlayerInfo);
    })
});


module.exports= {footballersRouter};

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

footballersRouter.get(`/PlayerInfo`, async (request,response) =>{
    const {data: playersList}= await footballersController.getFootballers();
    const playerSearch=request.query.player;
    response.send(await footballersController.playerInfo(playersList,playerSearch));
});


footballersRouter.get(`/mostGoals`,async (request,response) =>{

    const {data: goals} = await footballersController.getFootballers();
    response.send(await footballersController.mostGoals(goals));
})

footballersRouter.get(`/mostWinner`, async (request,response)  =>{
    const {data: footballersList}= await footballersController.getFootballers();
    const footballersUnicList=await footballersController.getUnicFootballers();
    response.send(await footballersController.mostWinner(footballersList,footballersUnicList));

})


footballersRouter.get(`/youngPlayer`,async (request,response) => {
    const {data: footballersList} = await footballersController.getFootballers();
    response.send(await footballersController.youngPlayer(footballersList));
});


footballersRouter.get(`/titlesSort`, async (request,response) =>{
    const {data: playersList}= await footballersController.getFootballers();
    response.send(await footballersController.titles(playersList));
});

module.exports= {footballersRouter};

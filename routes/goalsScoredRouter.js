const express=require(`express`);
const footballersController = require('../controlers/footballersController');

const goalsScoredRouter   = express.Router();

goalsScoredRouter.get(`/`,async (request,response) =>{

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
module.exports = {goalsScoredRouter};
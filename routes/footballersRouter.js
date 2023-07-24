const express=require(`express`);
const footballersController = require('../controlers/footballersController');

const footballersRouter  = express.Router();




footballersRouter.get('/', async (request, response) => {
    const footballersUnicList=await footballersController.getUnicFootballers();
    response.send(footballersUnicList);


});





module.exports= {footballersRouter};

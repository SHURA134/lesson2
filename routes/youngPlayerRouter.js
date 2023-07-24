const express=require(`express`);
const footballersController = require('../controlers/footballersController');

const youngPlayer = express.Router();


youngPlayer.get(`/`,async (request,response) =>{
    const footballersList= await footballersController.getFootballers();
    const footballersUnicList=await footballersController.getUnicFootballers();
    let age=new Array();


    footballersList.data.forEach(elem =>{
        let bd = elem.dateOfBirth.split('-');
        if(age.length===0) {
            age = bd;
        }else if(bd[0]>age[0] || bd[0]===age[0] && bd[1]>age[1] || bd[0] === age[0] && bd[1]===age[1] && bd[2]>age[2]){
            age =bd;
        }

    })


    response.send(age);




})

module.exports={youngPlayer};


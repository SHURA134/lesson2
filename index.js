const express= require (`express`);
const bodyParser= require(`body-parser`);


const {footballersRouter} = require('./routes/footballersRouter.js');
const {goalsScoredRouter} = require(`./routes/goalsScoredRouter.js`);
const {playerInfo} = require(`./routes/playerInfo.js`);
const {winnerZm} = require(`./routes/mostZmWinnerRouter.js`);


const {youngPlayer} = require(`./routes/youngPlayerRouter.js`);




const app = express();
app.use(bodyParser.json());
app.use(`/footballers`,footballersRouter);
app.use(`/goalsScored`,goalsScoredRouter);
app.use(`/playerInfo`,playerInfo);
app.use(`/zmWinner`,winnerZm);
app.use(`/youngPlayer`,youngPlayer);





const port=3002;





app.listen(port,()=>{
    console.log(`app has started on port ${port}`);
})



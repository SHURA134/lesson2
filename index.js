const express= require (`express`);
const {footballersRouter} = require('./routes/footballersRouter.js');


const app = express();
app.use(`/footballers`,footballersRouter);


const port=3002;





app.listen(port,()=>{
    console.log(`app has started on port ${port}`);
})



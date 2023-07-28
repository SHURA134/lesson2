const express= require (`express`);
const {footballersRouter} = require('./routes/footballersRouter.js');
const {usersRouter}= require('./routes/usersRouter.js');

const app = express();
app.use(`/footballers`,footballersRouter);
app.use('/users', usersRouter);

const port=3002;





app.listen(port,()=>{
    console.log(`app has started on port ${port}`);
})



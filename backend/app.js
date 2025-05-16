const express= require('express');
const app=express();
const cors = require('cors');
const db=require('./utils/db-connection');
const userRouter=require('./routes/usersRoutes');
app.use(express.json());
app.use(express.static('public'));
app.use(cors());
app.use('/api/users',userRouter);


db.sync({alter:true}).then(()=>{
app.listen(4000,()=>{
    console.log("server is listening on port 4000");
})
})
.catch((err)=>{
    console.log(err);
})

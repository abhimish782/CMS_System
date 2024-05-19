require('dotenv').config();
const express=require('express');
const app=express();
const entity_routes=require('./routes/entity_routes.js');
const table_routes=require('./routes/table_routes.js');
const cors=require('cors');
app.use(cors());
app.use(express.json());

const db=require('./db.js');

app.use('/database',entity_routes);

app.use('/existingTable',table_routes);


const port=3001;
app.listen(port,()=>{
    console.log(`Server Running on port ${port}`);
});


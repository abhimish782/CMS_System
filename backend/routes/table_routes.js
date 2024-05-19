const express=require('express');

const router=express.Router();

const {getColumnsController,createRowsController,getSpecificTableController,updateRowsController,deleteRowsController}=require('../controllers/table_controllers');

router.get('/getColumns/:table_name',getColumnsController);

router.post('/create/:table_name',createRowsController);

router.get('/read/:table_name',getSpecificTableController);

router.patch('/update/:table_name',updateRowsController);

router.delete('/delete/:table_name',deleteRowsController);

module.exports=router;
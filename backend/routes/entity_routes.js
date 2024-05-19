const express=require('express');

const {createTableController, getTableByNameController, getTablesController, deleteTableController } = require('../controllers/entity_controllers');

//const {getColumnsController, createRowsController} = require('../controllers/table_controllers');

const router=express.Router();

router.post('/createTable', createTableController);

router.get('/getTables',getTablesController);

router.get('/getTable/:table_name',getTableByNameController);

router.delete('/deleteTable/:table_name',deleteTableController);


module.exports=router;
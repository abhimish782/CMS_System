const db=require('../db.js');
//const express=require('express');
const {createTableQuery , readTableQuery,updateTableQuery} = require('../queryCreators/queryCreation.js')
const getColumnsController = (req,res)=>{
    let sqlQuery=`SELECT * FROM ${req.params.table_name}`;
    db.query(sqlQuery,(err,result,fields)=>{
        if(err){
            return res.status(500).send(err);
        }
        else{
            let columnsArray=[];
            fields.forEach((field)=>{
                let type;
                if(field.type==253) type="string";
                else if(field.type==3) type="number";
                else type="date"
                columnsArray.push({
                    name:field.name,
                    type:type
                });
            })
            res.status(200).send(columnsArray);
        }
    })
};

const createRowsController = (req,res)=>{
    let sqlQuery=`INSERT INTO ${req.params.table_name} VALUES ?`;
    let values=req.body;
    console.log(sqlQuery);
    console.log(values);
    db.query(sqlQuery,[values],(err,result)=>{
        if(err){
            return res.status(500).send(err);
        }
        else{
            console.log(result.affectedRows);
            
            res.status(200).json(result.affectedRows);
        }
    });
};

const getSpecificTableController = (req,res)=>{
    let sqlQuery=readTableQuery(req.body,req.params.table_name);
    db.query(sqlQuery,(err,result,fields)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            let resultObj={columns:fields.map((field)=>field.name),rows:result};
            res.status(200).send(resultObj);
        }
    });
};

const updateRowsController= (req,res) => {
    let sqlQuery=updateTableQuery(req.body,req.params.table_name);
    db.query(sqlQuery,(err,result)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).json(result.affectedRows);
        }
    })
};

const deleteRowsController = (req,res)=>{
    let sqlQuery=`DELETE FROM ${req.params.table_name} WHERE `;
    if(req.body.expression==""){
        res.status(404).json("Please provide a valid expression");
    }
    else{
        sqlQuery+=req.body.expression;
    }
    db.query(sqlQuery,(err,result)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).json(result.affectedRows);
        }
    });
};

module.exports={getColumnsController,createRowsController,getSpecificTableController,updateRowsController,deleteRowsController};
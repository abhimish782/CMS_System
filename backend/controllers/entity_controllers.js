//const express = require('express');
const db=require('../db.js')

const  {createTableQuery,readTableQuery,updateTableQuery} =require('../queryCreators/queryCreation.js')

const createTableController = (req,res) => {
    let sqlQuery=createTableQuery(req.body);
    db.query(sqlQuery,(err,result)=>{
        if(err){
            return res.status(500).send(err);
        }
        else{
            console.log(result);
            return res.status(201).send("Table created successfully");
                
        }
    });
};

const getTablesController = (req,res)=>{
    let allTablesArray=[];
    db.query('SHOW TABLES', (err, tables) => {
        if (err) {
            //console.error('Error executing SHOW TABLES query:', err);
            return res.status(500).send(err);
        }

        //let allTablesArray = [];
        let tablesProcessed = 0;

        tables.forEach((table) => {
            const tableName = table.Tables_in_cms; // Adjust this according to your database name

            db.query(`SELECT * FROM ${tableName}`, (err, tableInfo) => {
                if (err) {
                    console.error(`Error executing SELECT * FROM ${tableName} query:`, err);
                    return res.status(500).send(err);
                }

                allTablesArray.push({
                    name: tableName,
                    info: tableInfo
                });

                tablesProcessed++;
                if (tablesProcessed === tables.length) {
                    res.status(200).send(allTablesArray);
                    //console.dir(allTablesArray,{depth:null});
                }
            });
        });
    });
};

const getTableByNameController = (req,res)=>{
    let sqlQuery="SELECT * FROM "+req.params.table_name;
    db.query(sqlQuery,(err,result)=>{
        if(err){
            return res.status(500).send(err);
        }
        else{
            let resultObj={
                "name":req.params.table_name,
                "info":result
            }
            return res.status(200).send(resultObj);
        }
    })
};

const deleteTableController = (req,res)=>{
    let sqlQuery="DROP TABLE "+req.params.table_name;
    db.query(sqlQuery,(err,result)=>{
        if(err){
            return res.status(500).send(err);
        }
        else{
            return res.status(200).send("Table "+req.params.table_name+" deleted successfully");
        }
    });
};


module.exports= {createTableController,getTablesController,getTableByNameController,deleteTableController};



// app.post('/create-table', (req, res) => {
//     const { tableName, attributes } = req.body;
  
//     // Validate input
//     if (!tableName || typeof tableName !== 'string' || !attributes || typeof attributes !== 'object') {
//       return res.status(400).json({ error: 'Invalid input.' });
//     }
  
//     // Construct the CREATE TABLE query dynamically
//     let createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (`;
//     for (const [columnName, columnOptions] of Object.entries(attributes)) {
//       const { dataType, constraints } = columnOptions;
//       let columnDefinition = `${columnName} ${dataType}`;
  
//       // Add constraints
//       if (constraints && Array.isArray(constraints)) {
//         constraints.forEach(constraint => {
//           columnDefinition += ` ${constraint}`;
//         });
//       }
  
//       createTableQuery += `${columnDefinition}, `;
//     }
//     createTableQuery = createTableQuery.slice(0, -2); // Remove the last comma and space
//     createTableQuery += ')';
  
//     // Execute the query
//     connection.query(createTableQuery, (err, result) => {
//       if (err) {
//         console.error('Error creating table:', err);
//         return res.status(500).json({ error: 'Failed to create table.' });
//       }
//       res.json({ message: 'Table created successfully.' });
//     });
//   });

const createTableQuery = (body)=> {
    const {entity_name,attributes}=body;
    let createTableQuery=`CREATE TABLE IF NOT EXISTS ${entity_name} (`;
    for(const column in attributes){
        
        createTableQuery+=`\`${column}\` `; // never allow to make columns with spaces
        createTableQuery+=`${attributes[column].data_type}`;
        if(column.size!=-1){
            createTableQuery+=`(${attributes[column].size}) `;
        }
        else{
            createTableQuery+=` `;
        }
        attributes[column].constraints.forEach((constraint) => {
            createTableQuery+=constraint+" ";
        })
        createTableQuery+=`,`;
    }
    createTableQuery = createTableQuery.slice(0, -2);
    createTableQuery+=`);`;
    return createTableQuery;
};

const readTableQuery = (body,tableName) => {
    let query=`SELECT `;
    if(body.columns[0]=='*'){
        query+=`* FROM ${tableName} `;
    }else{
        body.columns.forEach(element => {
            query+=`\`${element}\`, `
        });
        query =query.slice(0, -2);
        query+=` FROM ${tableName} `;
    }
    if(body.expression=="") return query;
    else{
        query+=`WHERE ${body.expression}`;
    }
    console.log(query);
    return query;
}

const updateTableQuery = (body,tableName) =>{
    let query=`UPDATE ${tableName} SET `;
    body.columns.forEach((obj)=>{
        const key=Object.keys(obj);
        //const [key,value] = Object.entries(obj);
        query+=`${key[0]} = '${obj[key[0]]}', `;
    })
        
    query=query.slice(0,-2);
    query+=` WHERE ${body.expression}`;
    return query;
}

module.exports={createTableQuery,readTableQuery,updateTableQuery};
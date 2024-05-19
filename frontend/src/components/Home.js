import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import TableButton from './TableButton'
import axios from 'axios';
import './Home.css';

// NewColumn component to handle column details
const NewColumn = ({ column, index, onChange, onRemove }) => {
  const handleInputChange = (field, value) => {
    const updatedColumn = { ...column, [field]: value };
    onChange(index, updatedColumn);
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item md={3}>
        <TextField
          required
          label="Column Name"
          value={column.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
        />
      </Grid>
      <Grid item md={3}>
        <TextField
          required
          label="Data Type"
          value={column.dataType}
          onChange={(e) => handleInputChange('dataType', e.target.value)}
        />
      </Grid>
      <Grid item md={2}>
        <TextField
          label="Size"
          type="number"
          value={column.size}
          onChange={(e) => handleInputChange('size', parseInt(e.target.value))}
        />
      </Grid>
      <Grid item md={3}>
        <TextField
          label="Constraints"
          value={column.constraints}
          onChange={(e) => handleInputChange('constraints', e.target.value.split(','))}
        />
      </Grid>
      <Grid item md={1}>
        <IconButton aria-label="delete" color="error" onClick={() => onRemove(index)}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

const Home = () => {
  const [tableName, setTableName] = useState('');
  const [columns, setColumns] = useState([
    { name: '', dataType: '', size: '', constraints: '' },
  ]);
  const [responseMessage, setResponseMessage] = useState('');

  const handleAddColumn = () => {
    setColumns([...columns, { name: '', dataType: '', size: '', constraints: '' }]);
  };

  const handleRemoveColumn = (index) => {
    setColumns(columns.filter((_, colIndex) => colIndex !== index));
  };

  const handleColumnChange = (index, updatedColumn) => {
    const newColumns = columns.map((column, colIndex) => 
      colIndex === index ? updatedColumn : column
    );
    setColumns(newColumns);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const attributes = columns.reduce((acc, column) => {
      acc[column.name] = {
        data_type: column.dataType,
        size: column.size,
        constraints: column.constraints
      };
      return acc;
    }, {});

    const formData = {
      entity_name: tableName,
      attributes: attributes
    };

    try {
      const response = await axios.post('http://localhost:3001/database/createTable', formData);
      setResponseMessage(response.data.message || 'Table created successfully');
    } catch (error) {
      setResponseMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  const tablesData = [
    {
      name: 'table1',
      columns: ['Column1', 'Column2', 'Column3', 'Column4'],
      rows: [[12, 3, 7, 5], [12, 3, 7, 5], [12, 3, 7, 5], [12, 3, 7, 5]]
    },
    {
      name: 'table2',
      columns: ['Column1', 'Column2', 'Column3', 'Column4'],
      rows: [[12, 3, 7, 5], [12, 3, 7, 5], [12, 3, 7, 5], [12, 3, 7, 5]]
    },
    {
      name: 'table3',
      columns: ['Column1', 'Column2', 'Column3', 'Column4'],
      rows: [[12, 3, 7, 5], [12, 3, 7, 5], [12, 3, 7, 5], [12, 3, 7, 5]]
    },
    {
      name: 'table4',
      columns: ['Column1', 'Column2', 'Column3', 'Column4'],
      rows: [[12, 3, 7, 5], [12, 3, 7, 5], [12, 3, 7, 5], [12, 3, 7, 5]]
    }
  ];

  return (
    <div>
      <h1>Welcome</h1>
      <Grid container className="panesContainer">
        <Grid container md={6} className="leftPane">
          <Grid item md={12}><h3>YOUR TABLES</h3></Grid>
          {tablesData.map((tableData) => (
            <Grid item md={6} key={tableData.name}>
              <TableButton
                tableName={tableData.name}
                columnsList={tableData.columns}
                rowData={tableData.rows}
              />
            </Grid>
          ))}
          <Button><h3>VIEW ALL</h3></Button>
        </Grid>
        <Grid container md={6} className="rightPane">
          <Grid item md={12} className="rightPaneHeading"><h3>CREATE NEW TABLE</h3></Grid>
          <Grid item md={12} className="Form">
            <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
              <Grid item md={12}>
                <TextField
                  required
                  name="Table Name"
                  label="Table Name"
                  variant="standard"
                  value={tableName}
                  onChange={(e) => setTableName(e.target.value)}
                />
              </Grid>
              <Grid container md={12}>
                <Grid item md={4}><h4> Columns: </h4></Grid>
                <Grid item md={4} id="addColumnButton">
                  <Fab color="primary" size="small" aria-label="add" onClick={handleAddColumn}>
                    <AddIcon />
                  </Fab>
                </Grid>
              </Grid>
              {columns.map((column, index) => (
                <NewColumn
                  key={index}
                  column={column}
                  index={index}
                  onChange={handleColumnChange}
                  onRemove={handleRemoveColumn}
                />
              ))}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create
              </Button>
            </Box>
            {responseMessage && <div className="responseMessage">{responseMessage}</div>}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;

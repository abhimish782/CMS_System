import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, TextareaAutosize } from '@mui/material';
import axios from 'axios';

const ExpressionCalculator = () => {
  const [columns, setColumns] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [selectedColumnType, setSelectedColumnType] = useState('');
  const [operator, setOperator] = useState('');
  const [value, setValue] = useState('');
  const [logicalOperator, setLogicalOperator] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    // Fetch column names and types from the backend
    axios.get(`http://localhost:3001/existingTable/getColumns/something`)
      .then(response => {
        setColumns(response.data);  // Assuming response.data is an array of objects with name and type
      })
      .catch(error => {
        console.error('There was an error fetching the column names and types!', error);
      });
  }, []);

  const handleColumnSelect = (column) => {
    setSelectedColumn(column.name);
    setSelectedColumnType(column.type);
  };

  const validateValue = (value, type) => {
    if (type === 'number') {
      return !isNaN(value);
    }
    return true;
  };

  const handleAddCondition = () => {
    if (selectedColumn && operator && validateValue(value, selectedColumnType)) {
      const newCondition = `${selectedColumn} ${operator} '${value}'`;
      setQuery(prevQuery => prevQuery ? `${prevQuery} ${logicalOperator} ${newCondition}` : newCondition);
      // Reset the inputs
      setSelectedColumn('');
      setSelectedColumnType('');
      setOperator('');
      setValue('');
      setLogicalOperator('');
    } else {
      alert('Please enter a valid value for the selected column type.');
    }
  };

  const handleClear = () => {
    setQuery('');
    setSelectedColumn('');
    setSelectedColumnType('');
    setOperator('');
    setValue('');
    setLogicalOperator('');
  };

  const handleSubmit = () => {
    // Send the query to the backend
    const requestBody = {
        expression: query,
        columns: ["*"],
      };
    axios.get('http://localhost:3001/existingTable/read/something',requestBody )
      .then(response => {
        console.log('Query submitted successfully:', response.data);
      })
      .catch(error => {
        console.error('There was an error submitting the query!', error);
      });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ mb: 2 }}>
        {columns.map(column => (
          <Button 
            key={column.name} 
            variant="contained" 
            sx={{ m: 0.5 }}
            onClick={() => handleColumnSelect(column)}
          >
            {column.name}
          </Button>
        ))}
      </Box>
      <Box sx={{ mb: 2 }}>
        {['<', '<=', '>', '>=', '=', '!='].map(op => (
          <Button 
            key={op} 
            variant="contained" 
            sx={{ m: 0.5 }}
            onClick={() => setOperator(op)}
          >
            {op}
          </Button>
        ))}
      </Box>
      <Box sx={{ mb: 2 }}>
        <TextField 
          label="Value" 
          variant="outlined" 
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
          error={!validateValue(value, selectedColumnType)}
          helperText={!validateValue(value, selectedColumnType) ? `Invalid ${selectedColumnType} value` : ''}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        {['AND', 'OR', 'NOT'].map(logOp => (
          <Button 
            key={logOp} 
            variant="contained" 
            sx={{ m: 0.5 }}
            onClick={() => setLogicalOperator(logOp)}
          >
            {logOp}
          </Button>
        ))}
      </Box>
      <Box sx={{ mb: 2 }}>
        <TextareaAutosize
          minRows={3}
          style={{ width: '100%' }}
          value={query}
          readOnly
        />
      </Box>
      <Box>
        <Button 
          variant="contained" 
          sx={{ mr: 1 }} 
          onClick={handleAddCondition}
        >
          Next
        </Button>
        <Button 
          variant="contained" 
          sx={{ mr: 1 }} 
          onClick={handleClear}
        >
          Clear
        </Button>
        <Button 
          variant="contained" 
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default ExpressionCalculator;

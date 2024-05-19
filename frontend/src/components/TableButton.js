import React from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@material-ui/core';
import Button from '@mui/material/Button';
import './TableButton.css'

const TableButton = ({ tableName, columnsList, rowData }) => {
  return (
    <div className="tblButton">
      <Button>
        <TableContainer component={Paper} style={{ maxWidth: '300px', overflow:'hidden'}}>
          <h2>{tableName}</h2>
          <Table size='small'>
            <TableHead>
              <TableRow>
                {columnsList.map((column) => (
                  <TableCell >{column}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rowData.map((row) => (
                <TableRow>
                  {row.map((val) => (
                    <TableCell >{val}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Button>
    </div>
  );
};

export default TableButton;

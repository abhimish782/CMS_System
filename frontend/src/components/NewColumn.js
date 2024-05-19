import React from 'react'
import Grid from '@mui/material/Grid';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';

const NewColumn = () => {
  return (
    <div>
      <Grid container className="columnsData" md={12}>
          <Grid item md={2}>
            <TextField required name="Column Name" label="Column Name" variant="standard"></TextField>
          </Grid>
          <Grid container md={3}>
            <Grid item md={12}> <FormLabel id="demo-radio-buttons-group-label">Datatype</FormLabel></Grid>
            <Grid item md={12}>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="INT"
                  name="datatypes"
                >
                <Grid container className="datatypes" md={12}>
                  <Grid item md={12}><FormControlLabel value="INT"  control={<Radio />} label="INT" /></Grid>
                  <Grid item md={12}><FormControlLabel value="VARCHAR" control={<Radio />} label="VARCHAR" /></Grid>
                  <Grid item md={12}><FormControlLabel value="DATE" control={<Radio />} label="DATE" /></Grid>
                </Grid>
              </RadioGroup>
            </Grid>
          </Grid>
          <Grid item md={2}>
            <TextField name="Size" label="Size" type="number" variant="standard"></TextField>
          </Grid>
          <Grid container md={3}>
            <Grid item md={12} className="constraints"> <FormControlLabel control={<Checkbox name="Constraints"/> } label="Primary Key" /> </Grid>
            <Grid item md={12} className="constraints"> <FormControlLabel control={<Checkbox name="Constraints"/>} label="Unique" /> </Grid>
            <Grid item md={12} className="constraints"> <FormControlLabel control={<Checkbox name="Constraints"/>} label="Not null" /> </Grid>
          </Grid>
      </Grid>
    </div>
  )
}

export default NewColumn

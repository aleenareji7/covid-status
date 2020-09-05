import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import Charts from './Charts';
import MapChart from './MapChart';


export default function FilterDataIndia({filterData,stateData}) {
const [filterValue,setFilterValue]=useState('');
const [chartValue,setChartValue]=useState('')

const _mapToFilters = (data) => {
  const formattedFilterValue = (({ totalConfirmed, confirmedCasesIndian,discharged,deaths }) => 
  ({ totalConfirmed, confirmedCasesIndian,discharged,deaths }))(data);
  return formattedFilterValue;

}

useEffect(()=> {
  if(stateData){
    setFilterValue( _mapToFilters(stateData))

  }
  if(stateData === null){
     filterData ? delete filterData.confirmedCasesForeign:'';
    setFilterValue(filterData)
  }
},[stateData,filterData])

useEffect(()=>{
  setChartValue(filterValue)
},[filterValue,chartValue])


return(
  <Box>
  <Grid container>
    <Box
      boxShadow={3}
      bgcolor="background.paper"
      m={1}
      p={1}
      style={{ width: '8rem', height: '5rem' }}
    >
      Total cases 
      <div>
        {filterValue ? filterValue.total || filterValue.totalConfirmed :''}
      </div>
    </Box>
    <Box
          boxShadow={3}
          bgcolor="background.paper"
          m={1}
          p={1}
          style={{ width: '8rem', height: '5rem' }}
        >
          Active Cases
          <div>
          {filterValue ? filterValue.confirmedCasesIndian :''}
          </div>
        </Box>
        <Box
          boxShadow={3}
          bgcolor="background.paper"
          m={1}
          p={1}
          style={{ width: '8rem', height: '5rem' }}
        >
          Recovered
          <div>
          {filterValue ? filterValue.discharged :''}
          </div>
        </Box>
        <Box
          boxShadow={3}
          bgcolor="background.paper"
          m={1}
          p={1}
          style={{ width: '8rem', height: '5rem' }}
        >
          Death cases
          <div>
          {filterValue ? filterValue.deaths :''}
          </div>
        </Box>

    </Grid>
    <Box>
          <Charts chartValue={chartValue}/>
        </Box>
        <Box>
          <MapChart />
        </Box>
    </Box>
)}
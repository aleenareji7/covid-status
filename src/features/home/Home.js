import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

import FilterDataInIndia from './FilterDataIndia';


const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option) => option.loc,
});

 function Home(props) {
  const [filterData,setFilterData]=useState('')
  const [filterState, setFilterState]=useState(props ? props.home.regional :'');

  const retrieveCovidStatus = async () => {
    const { retrieveCovidStatus } = props.actions;
    await retrieveCovidStatus();
  };

  useEffect(() => {
    retrieveCovidStatus();
  }, []);

  useEffect (()=>{
    setFilterData(props.home.summary)
  },[props.home.summary])

  useEffect (() => {
    setFilterState(props.home.regional);
  },[props.home.regional])


  const [filter, setFilter] = useState(null);
  useEffect(() => console.log(filter,'filtered value in dropdown'), [filter]);
  const onFilterChange = (event, values) => {
    setFilter(values);
  }

  return (
  
      <Box className="home-container">
        <h1>Covid Status</h1>
        <Autocomplete
          id="filter-demo"
          options={filterState}
          onChange={onFilterChange}
          getOptionLabel={(option) => option.loc}
          filterOptions={filterOptions}
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Select State" variant="outlined" />}
        />
    
      <Box>
      <FilterDataInIndia filterData ={filterData} stateData ={filter}/>
      </Box>
      </Box>
      
  );
}

function mapStateToProps(state) {
  return {
    home: state.home.getCovidStatus,

  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

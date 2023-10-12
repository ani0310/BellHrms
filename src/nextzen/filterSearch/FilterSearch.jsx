import PropTypes from 'prop-types';

import { useState } from 'react';

import FormProvider,{ RHFSelect,RHFAutocomplete } from 'src/components/hook-form';

import {Card,TextField,InputAdornment,Autocomplete,Grid,Button} from '@mui/material';

import Iconify from 'src/components/iconify/iconify';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import dayjs from 'dayjs';

import formatDateToYYYYMMDD from '../global/GetDateFormat';


export default function SearchFilter({handleFilters,filterOptions}){
  
    const [filterData,SetFilterData] = useState([])
    const [dates, setDates] = useState({
        start_date: null,
        end_date: null,
      });

const [searchText,setSearchText] = useState('');
const [selectedValues,SetSelectedValues] = useState('');

const handleSelectedValues = (fieldName, option) => {
    SetSelectedValues((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [fieldName]: option,
    }));
  };

const handleOptions = () =>{
    const newFilterData = {};

  // Merge the selected values from Autocomplete components into filterData
  Object.keys(selectedValues).forEach((fieldName) => {
    newFilterData[fieldName] = selectedValues[fieldName];
  });

  // Add Date Range values to filterData
  if(dates?.start_date){
    newFilterData.start_date = formatDateToYYYYMMDD(dates?.start_date)
  };
  if(dates?.end_date){
    newFilterData.end_date = formatDateToYYYYMMDD(dates?.end_date)
  };

  // Add the "search" value to filterData
  if (searchText) {
    newFilterData.search = searchText;
  }
  const hasFilterCriteria = Object.keys(newFilterData).length > 0;

  if (hasFilterCriteria) {
    // Call handleFilters with the combined filterData
    handleFilters(newFilterData);
  } else {
    // Handle the case when no filter criteria are provided
    // You can decide what to do in this case, such as showing a message or doing nothing.
    // For example, you can log a message to the console.
    alert('No filter criteria provided');
  }
}

const handleFilterCancel = () =>{
    setSearchText('');
    SetFilterData([]);
    setDates({
        start_date: null,
        end_date: null,
    });
    SetSelectedValues('');
    handleFilters(filterData)
}
    return (
        <Grid container spacing={1} style={{margin:'1rem'}}>

<Grid item xs={12} sm={6} md={6} lg={3}>
         <TextField
         sx={{width:"200px"}}
            placeholder="Search..."
            defaultValue={searchText}
            onChange = {(e)=>setSearchText(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
              border:'none',
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={3}>
<LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                     
                      placeholder="Start Date"
                      value={dates?.start_date}
                      defaultValue={dates?.start_date}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          start_date: newValue,
                        }));
                      }}
                    />
                </LocalizationProvider>
        </Grid>
    
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      placeholder="End Date"
                      value={dates?.end_date}
                      defaultValue={dates?.end_date}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          end_date: newValue,
                        }));
                      }}
                    />
          </LocalizationProvider>
          </Grid>
        {filterOptions?.length <= 1?
        <Grid item xs={12} sm={6} md={6} lg={3} >
           <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={filterOptions[0]?.options}
              value={selectedValues[filterOptions[0]?.fieldName] || null}
              onChange={(event, newValue) => {
                  handleSelectedValues(filterOptions[0]?.fieldName, newValue);
              }}
              sx={{zIndex: 9999}}
                renderInput={(params) => <TextField {...params} label={filterOptions[0]?.fieldName} sx={{width:"200px"}}/>}
            />
        </Grid>
        :
           <>
           {filterOptions?.map((item,index)=>(
           <Grid item xs={12} sm={6} md={6} lg={3} >
           <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={filterOptions[index]?.options}
              value={selectedValues[filterOptions[index]?.fieldName] || null}
            onChange={(event, newValue) => {
                handleSelectedValues(filterOptions[index]?.fieldName, newValue);
            }}
              sx={{zIndex: 9999}}
                renderInput={(params) => <TextField {...params} label={filterOptions[index]?.fieldName} sx={{width:"200px"}}/>}
            />
        </Grid>
           ))}
           </>}
          <Button onClick={handleOptions}>Apply</Button>
          <Button onClick={handleFilterCancel}>Cancel</Button>
    </Grid>
    )
}

SearchFilter.propTypes={
    handleFilters: PropTypes.any,
}

SearchFilter.propTypes={
    filterOptions: PropTypes.arrayOf(
        PropTypes.shape({
          fieldName: PropTypes.string,
          options: PropTypes.arrayOf(PropTypes.string)
        })
      ),
}
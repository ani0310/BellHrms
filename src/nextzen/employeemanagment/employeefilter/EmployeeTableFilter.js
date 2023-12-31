import PropTypes, { element } from 'prop-types';

import React,{ useEffect, useState,useCallback } from 'react';

import { styled } from '@mui/system';

import FormProvider,{ RHFSelect,RHFAutocomplete } from 'src/components/hook-form';

import {Card,TextField,InputAdornment,Autocomplete,Grid,Button,Drawer,IconButton,Stack,DialogContent,
   DialogActions,Typography} from '@mui/material';

import Iconify from 'src/components/iconify/iconify';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import dayjs from 'dayjs';

import Dialog from '@mui/material/Dialog';

import DialogTitle from '@mui/material/DialogTitle';

import { Today } from '@mui/icons-material';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


import {formatDateToYYYYMMDD,formatDate} from 'src/nextzen/global/GetDateFormat';

import CustomDateRangePicker from '../../global/CustomDateRangePicker';




const defaultFilters = {
  name: '',
  type: [],
  startDate: null,
  endDate: null,
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
      overflow:"hidden"
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function EmployeeTableFilter({filterSearch,filterData}){
  const theme = useTheme();
  const pfTypenames = [
    'TypeA',
    'TypeH'
    
  ];

  const [dropdown,setDropdown]=useState({

  })

  const [dateError,setDataError]=useState("")
  const [filters,setFilters]=useState(defaultFilters)
  const [personName, setPersonName] = React.useState([]);

  const [dropdownEmployemtType,setDropdownEmployemtType]=useState([])
  const [dropdownstatus,setDropdownStatus]=useState([])

  const [datesFiledArray,setDatesFiledArray]=useState(
    [
      {
        field:'joining_date',
        from:'joining_date_from',
        to:'joining_date_to'
      },
      {
        field:'offer_date',
        from:'offer_date_from',
        to:'offer_date_to'
      }
    ]
  )

  const [dropdownFiledArray,setDropdownFiledArray]=useState(
    [
      {
        field:'pfType',
        options:[]
      },
      {
        field:'employment_type',
        options:[]
      }
    ]
  )


  const [datesSavedArray,setDatesSavedArray]=useState(["joining_date_from","joining_date_to","offer_date_from","offer_date_to"])
  const [datesData,setDatesData]=useState([])

  const [dates,setDates]=useState({
    joining_date_from:null,
    joining_date_to:null,
    offer_date_from:null,
    offer_date_to:null
  })

  function formDateDataStructure(){

    return new Promise((resolve) => {
     

      const arr1={};
       datesFiledArray.forEach((item,index)=>{  
         
        arr1[item.field]={
          from:dates[item?.from],
          to:dates[item?.to]
        }

        //  const obj={
        //    filed_name:item?.field,
        //    from:dates[item?.from],
        //    to:dates[item?.to]
        //  }
        
         
        //  arr1.push(obj);
       
         
        })
        setDatesData(arr1);
        resolve(arr1)
        
    })
    

  }

  function formWithDropdown(data){

    return new Promise((resolve) => {
     

      const arr1={};
       dropdownFiledArray.forEach((item,index)=>{  
         
        if(dropdown[item.field]?.length>0){
          const arrayOfStrings = dropdown[item.field];
          const commaSeparatedString = arrayOfStrings.join(', ');
          data[item.field]=commaSeparatedString;
        }
        

        //  const obj={
        //    filed_name:item?.field,
        //    from:dates[item?.from],
        //    to:dates[item?.to]
        //  }
        
         
        //  arr1.push(obj);
       
         
        })
        // setDatesData(arr1);
        resolve(arr1)
        
    })
    

  }
  

    const [open,setOpen]=useState(false);
    const [openDateRange,setOpendateRange]=useState(false);
    const handleClickOpen=()=>{
      setOpen(true);
    }
    const handleClickClose=()=>{
      setOpen(false)
    }


    const handleChangeDropDown = (event,field) => {
      const {
        target: { value },
      } = event;
      
      if(field==="employment_type"){
        setDropdownEmployemtType(value)
        const obj=dropdown;
        obj[field]=value;
        setDropdown(obj);
      }
      else if(field==="pfType"){
        setDropdownStatus(value)
        const obj=dropdown;
        obj[field]=value;
        setDropdown(obj);
      }
    

        // On autofill we get a stringified value.
        
      
        console.log(value);
     // console.log( typeof value === 'string' ? value.split(',') : value,)
    };

    const handleApply=async()=>{
      setDatesData([]);
      const data = await formDateDataStructure();
      const data1=await formWithDropdown(data);
      console.log(data1,'externalfiltersdata')

      filterData(data);
      // call parent function and pass it
      
      
    }

    const handleSearch=(e)=>{
      filterSearch(e?.target?.value)
    }
    

  
    return (
        <>
          <Grid container alignItems="center" justifyContent="space-between" paddingBottom="10px">
            <Grid md={6} xs={12} lg={6} item>

            <TextField placeholder='Search..' 
            fullWidth
             onChange={e=>{handleSearch(e)}}

            />
            </Grid>

            <Grid  md={6} xs={12} lg={6} item>

                    <Grid sx={{display:'flex',alignItems:'flex-end',justifyContent:'flex-end'}} spacing={2}>
                    <Grid md={2} xs={2} item>
                                <Stack sx={{display:'flex',alignItems:'flex-end'}} >
                                    <Button onClick={handleClickOpen} 
                                    // sx={{width:"80px"}}
                                    
                                    >
                                <Iconify icon="mi:filter"/>
                            </Button>

                            </Stack>
                </Grid>

                <Grid  md={4} xs={4} item>
                    <Button
                        component={RouterLink}
                        href={paths.dashboard.employee.onboardform}
                        variant="contained"
                        startIcon={<Iconify icon="mingcute:add-line" />}
                        
                    >
                        Add New Employee
                    </Button>
                    </Grid>
                    </Grid>
                 </Grid>
         </Grid>
     
      <BootstrapDialog
        onClose={handleClickClose}
        aria-labelledby="customized-dialog-title"
        open={open}

      >
        
        <DialogTitle sx={{textAlign:"center",paddingBottom:0,paddingTop:2}}>Filters
        <Button onClick={()=>setOpen(false)} sx={{float:"right"}}><Iconify icon="iconamoon:close-thin"/></Button>
        </DialogTitle>

        <DialogContent sx={{mt:0,paddingBottom:0}}>

          

          <Grid>

                {/* <Grid>
            <Typography>Joining Date</Typography>
     

            <Grid container flexDirection="row">
              <Grid item>
             <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="From Date"
                      value={dates?.joining_date_from}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          joining_date_from: newValue,
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                </Grid>
                <Grid item>
             <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="To Date"
                      value={dates?.joining_date_to}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          joining_date_to: newValue,
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                </Grid>
                </Grid>
                </Grid>
                <Grid marginTop={2}>
            <Typography>Offer Date</Typography>
     

            <Grid container flexDirection="row">
              <Grid item>
             <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="From Date"
                      value={dates?.offer_date_from}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          offer_date_from: newValue,
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                </Grid>
                <Grid item>
             <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="To Date"
                      value={dates?.offer_date_to}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          offer_date_to: newValue,
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                </Grid>
                </Grid>
                </Grid> */}

                <Grid>
                  <Grid marginTop="10px" xs={12} md={6}>
                <FormControl fullWidth >
                <InputLabel fullWidth id="status">status</InputLabel>
                <Select
                fullWidth
                  labelId="demo-multiple-name-status_1"
                  id="demo-multiple-status_1"
                  multiple
                  value={dropdownstatus}
                  onChange={(e)=>handleChangeDropDown(e,'pfType')}
                  input={<OutlinedInput label="PF Type" />}
                  MenuProps={MenuProps}
                >
                  {pfTypenames.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, personName, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
                   </Grid>

                   {/* <Grid marginTop="10px" xs={12} md={6}>
                <FormControl fullWidth >
                <InputLabel fullWidth id="employment_type">Employement Type</InputLabel>
                <Select
                fullWidth
                  labelId="demo-multiple-name-status_2"
                  id="demo-multiple-status_2"
                  multiple
                  value={dropdownEmployemtType}
                  onChange={(e)=>handleChangeDropDown(e,'employment_type')}
                  input={<OutlinedInput label="Employemt Type" />}
                  MenuProps={MenuProps}
                >
                  {names.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, personName, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
                   </Grid> */}
                </Grid>
               </Grid>


           
         </DialogContent>
         <Button onClick={()=>{handleApply()}}>Apply</Button>
   
    </BootstrapDialog>
    </>
    )
    
}

EmployeeTableFilter.propTypes={
  filterSearch: PropTypes.any,
  filterData:PropTypes.any
    
}

// SearchFilter.propTypes={
//     filterOptions: PropTypes.arrayOf(
//         PropTypes.shape({
//           fieldName: PropTypes.string,
//           options: PropTypes.arrayOf(PropTypes.string)
//         })
//       ),
// }
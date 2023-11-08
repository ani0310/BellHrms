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


import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './ShiftFilter.css'

import formatDateToYYYYMMDD from 'src/nextzen/global/GetDateFormat';

import CustomDateRangePicker from 'src/nextzen/global/CustomDateRangePicker';





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

export default function ShiftRoasterFilter({filterData,filterOptions}){
    const theme = useTheme();
    const names = [
      'Oliver Hansen',
      'Van Henry',
      'April Tucker',
      'Ralph Hubbard',
      'Omar Alexander',
      'Carlos Abbott',
      'Miriam Wagner',
      'Bradley Wilkerson',
      'Virginia Andrews',
      'Kelly Snyder',
    ];
  
    const [dropdown,setDropdown]=useState({
  
    })
  
    const [dateError,setDataError]=useState("")
    const [filters,setFilters]=useState(defaultFilters)
    const [personName, setPersonName] = React.useState([]);
  
    const [dropdownEmployemtType,setDropdownEmployemtType]=useState([])
    const [dropdownshift_name,setDropdownStatus]=useState([])
    const [dropdownProjectName,setDropdownProjectName]=useState([])
    const [dropdownActivity,setdropdownActivity]=useState([])
    const [dropdownEmployeename,setdropdownEmployeename]=useState([])
  
    const [datesFiledArray,setDatesFiledArray]=useState(
      [
        {
          field:'date_activity',
          from:'from_date',
          to:'to_date'
        },
      
      ]
    )
  
    const [dropdownFiledArray,setDropdownFiledArray]=useState(
      [
        {
          field:'shift_name',
          options:[]
        },
        {
          field:'shift_term',
          options:[]
        },
        {
          field:'shift_group',
          options:[]
        },
        {
          field:'supervisor_name',
          options:[]
        }
      ]
    )
  
  
    const [datesSavedArray,setDatesSavedArray]=useState(["from_date","to_date","offer_date_from","offer_date_to"])
    const [datesData,setDatesData]=useState([])
  
    const [dates,setDates]=useState({
      from_date:null,
      to_date:null,
   
    })
  
    function formDateDataStructure(){
  
      return new Promise((resolve) => {
       
  
        const arr1={};
         datesFiledArray.forEach((item,index)=>{  
           
          arr1[item.field]={
            from:formatDateToYYYYMMDD(dates[item?.from]),
            to:formatDateToYYYYMMDD(dates[item?.to])
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
  
    function formWithDropdown(){
  
      return new Promise((resolve) => {
       
  
        const arr1={}
         dropdownFiledArray.forEach((item,index)=>{  
           
          if(dropdown[item.field]?.length>0){
            const arrayOfStrings = dropdown[item.field];
            const commaSeparatedString = arrayOfStrings.join(', ');
            arr1[item.field]=commaSeparatedString;
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
        
        if(field==="shift_group"){
          setDropdownProjectName(value)
          const obj=dropdown;
          obj[field]=value;
          setDropdown(obj);
        }
        else if(field==="shift_name"){
          setDropdownStatus(value)
          const obj=dropdown;
          obj[field]=value;
          setDropdown(obj);
        }
        else if(field==="shift_term"){
          setdropdownActivity(value)
          const obj=dropdown;
          obj[field]=value;
          setDropdown(obj);
        }
        else if(field==="supervisor_name"){
            setdropdownEmployeename(value)
          const obj=dropdown;
          obj[field]=value;
          setDropdown(obj);
        }
      
  
          // On autofill we get a stringified value.
          
        
          console.log(value);
       // console.log( typeof value === 'string' ? value.split(',') : value,)
      };
  
      const handleApply = async()=>{
        setDatesData([]);
       
        const data1=await formWithDropdown();
        filterData(data1);
        console.log(data1,';;;')
    
      //   filterData(data);
      handleClickClose()
        
      }
      
  
    return (
        <>
          <Grid container alignItems="center" paddingBottom="10px">
            <Grid md={8} xs={8} item>

            <TextField placeholder='Search....' 
            fullWidth
            // onChange={handleSeacrch} 

            />
            </Grid>

            <Grid md={4} xs={4} item>
                
                <Grid >
                <Stack sx={{display:'flex',alignItems:'flex-end'}} >
            <Button onClick={handleClickOpen} sx={{width:"80px"}}>
           <Iconify icon="mi:filter"/>
      </Button>

      </Stack>
                </Grid>

 
      </Grid>
         </Grid>
     
      <BootstrapDialog
        onClose={handleClickClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className= "custom-dialog-width"

      >
        
        <DialogTitle sx={{textAlign:"center",paddingBottom:0,paddingTop:2}}>Filters
        <Button onClick={()=>setOpen(false)} sx={{float:"right"}}><Iconify icon="iconamoon:close-thin"/></Button>
        </DialogTitle>

        <DialogContent style={{paddingTop: '20px', paddingRight: '17px', paddingBottom: '44px', paddingLeft: '44px'}}>

          

          <Grid container spacing={2} xs={12}>

               
            <Typography style={{marginBottom:"0.8rem"}}> Date Activity</Typography>
     

            <Grid container  spacing={2} >
              <Grid item xs={6}>
              <FormControl fullWidth>
        <InputLabel id="supervisor_name">Supervisor Name</InputLabel>
        <Select
          labelId="demo-multiple-name-shift_name_1"
          id="demo-multiple-shift_name_1"
          multiple
          value={dropdownEmployeename}
          onChange={(e) => handleChangeDropDown(e, 'supervisor_name')}
          input={<OutlinedInput label="Employee Name" />}
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
                </Grid>
                <Grid item xs={6}>
                <FormControl fullWidth>
        <InputLabel id="shift_group">Shift Group</InputLabel>
        <Select
          labelId="demo-multiple-name-shift_name_1"
          id="demo-multiple-shift_name_1"
          multiple
          value={dropdownProjectName}
          onChange={(e) => handleChangeDropDown(e, 'shift_group')}
          input={<OutlinedInput label="Project Name" />}
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
                </Grid>
                </Grid>
               
                <Grid container marginTop={2}>
  {/* <Typography>Offer Date</Typography> */}
  <Grid container spacing={2}>
    <Grid item xs={6}>
      <FormControl fullWidth>
        <InputLabel id="shift_term">Shift Term</InputLabel>
        <Select
          labelId="demo-multiple-name-shift_name_1"
          id="demo-multiple-shift_name_1"
          multiple
          value={dropdownActivity}
          onChange={(e) => handleChangeDropDown(e, 'shift_term')}
          input={<OutlinedInput label="Activity Name" />}
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
    </Grid>
    <Grid item xs={6}>
      <FormControl fullWidth>
        <InputLabel id="shift_name">Shift Name</InputLabel>
        <Select
          labelId="demo-multiple-name-shift_name_2"
          id="demo-multiple-shift_name_2"
          multiple
          value={dropdownshift_name}
          onChange={(e) => handleChangeDropDown(e, 'shift_name')}
          input={<OutlinedInput label="Status" />}
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
    </Grid>
  </Grid>
</Grid>


                {/* <Grid>
                  <Grid marginTop="10px" xs={12} md={6}>
                <FormControl fullWidth >
                <InputLabel fullWidth id="shift_name">shift_name</InputLabel>
                <Select
                fullWidth
                  labelId="demo-multiple-name-shift_name_1"
                  id="demo-multiple-shift_name_1"
                  multiple
                  value={dropdownshift_name}
                  onChange={(e)=>handleChangeDropDown(e,'shift_name')}
                  input={<OutlinedInput label="shift_name" />}
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
                   </Grid>
                </Grid> */}
               </Grid>


           
         </DialogContent>
         <Button onClick={()=>{handleApply()}}>Apply</Button>
   
    </BootstrapDialog>
    </>
    )
    
}

// ShiftRoasterFilter.propTypes={
//     handleFilters: PropTypes.any,
// }
ShiftRoasterFilter.propTypes={
    filterData: PropTypes.func,
}

ShiftRoasterFilter.propTypes={
    filterOptions: PropTypes.arrayOf(
        PropTypes.shape({
          fieldName: PropTypes.string,
          options: PropTypes.arrayOf(PropTypes.string)
        })
      ),
}
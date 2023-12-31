import PropTypes, { element } from 'prop-types';
import React,{ useEffect, useState,useCallback } from 'react';
import axios from 'axios';
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
import {formatDateToYYYYMMDD,formatDate} from 'src/nextzen/global/GetDateFormat';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
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
export default function AssignShiftSearchFilter({filterSearch,filterData}){
  const theme = useTheme();
  const [leaveType,SetLeaveType]= useState();
  const getLeaveType = () => {
    const payload = {
        // companyId: "C1"
        companyId:localStorage.getItem('companyID')
    }
   
    const config = {
      method: 'POST',
      maxBodyLength: Infinity,
      url: baseUrl + `/getLeaveType`,
      // url:`https://qx41jxft-3001.inc1.devtunnels.ms/erp/getLeaveType`,
      data:  payload
    };
  
    axios.request(config).then((response) => {
      SetLeaveType(response?.data?.list)
    })
  
      .catch((error) => {
        console.log(error);
      });
  }
 
  const [dropdown,setDropdown]=useState({
// 
  })
  const [dateError,setDataError]=useState("")
  const [filters,setFilters]=useState(defaultFilters)
  const [personName, setPersonName] = React.useState([]);
  const [dropdownLeaveType,setDropdownLeaveType]=useState([])
  const [dropdownstatus,setDropdownStatus]=useState([])
  const [datesFiledArray,setDatesFiledArray]=useState(
      [
        // {
        //   field:'requestDate',
        //   from:'applyDatefrom',
        //   to:'applyDateto'
        // },
        {
          field:'start_date',
          from:'fromDatefrom',
          to:'fromDateto'
        },
        {
          field:'end_date',
          from:'toDatefrom',
          to:'toDateto'
        }
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
      }
    ]
  )
  const [datesData,setDatesData]=useState([])
  const [dates,setDates]=useState({
    applyDatefrom:"",
    applyDateto:"",
    fromDatefrom:"",
    fromDateto:"",
    toDatefrom:"",
    toDateto:"",
    shift_name: "",         // Add default value for "shift_name"
    shift_term: "",  // Add default value for "shift_term"
  })
  function formDateDataStructure(){
    return new Promise((resolve) => {
     

      const arr1={};
       datesFiledArray.forEach((item,index)=>{  
         
        arr1[item.field]={
          from:dates[item?.from],
          to:dates[item?.to]
        }
         
        })
        setDatesData(arr1);
        resolve(arr1)
        
    })
    
  }
  function formWithDropdown(data){
    return new Promise((resolve) => {
     
      const arr1 = {
        shift_name: "",
        shift_term: "",
      };
  
       dropdownFiledArray.forEach((item,index)=>{  
         
        if(dropdown[item.field]?.length>0){
          const arrayOfStrings = dropdown[item.field];
          const commaSeparatedString = arrayOfStrings.join(',');
          data[item.field]=commaSeparatedString;
        }
         
        })
        arr1.shift_name = data.shift_name;
        arr1.shift_term = data.shift_term;
        resolve(arr1)
        
    })
    
  }
  
    const [open,setOpen]=useState(false);
    const [openDateRange,setOpendateRange]=useState(false);
    const handleClickOpen=()=>{
      setOpen(true);
      getLeaveType();
    }
    const handleClickClose=()=>{
      setOpen(false)
    }
    const handleChangeDropDown = (event,field) => {
      const {
        target: { value },
      } = event;
      
      if(field==="shift_term"){
        setDropdownLeaveType(value)
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
    };
    const handleApply = async()=>{
      setDatesData([]);
      const data = await formDateDataStructure();
      const data1=await formWithDropdown(data);

      filterData(data);
      setOpen(false);
    }

    const handleCancel = async()=>{
      setDropdownStatus([]);
      setDropdownLeaveType([]);
      setDates({
    applyDatefrom:"",
    applyDateto:"",
    fromDatefrom:"",
    fromDateto:"",
    toDatefrom:"",
    toDateto:"",
    shift_name: "",        
    shift_term: "",  
      })
      setOpen(false);
    }

    const debounce = (func, delay) => {
      let debounceTimer;
      return function () {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
      };
    };
      const handleSearch=debounce((e)=>{
        filterSearch(e?.target?.value)
      },1000)
    
  
    return (
        <>
          <Grid container alignItems="center" paddingBottom="10px">
            <Grid md={8} xs={8} item>
            <TextField placeholder='Search....' 
            fullWidth
            onChange={e=>{handleSearch(e)}}
            />
            </Grid>
            <Grid md={4} xs={4} item>
        <Stack sx={{display:'flex',alignItems:'flex-end'}} >
            <Button onClick={handleClickOpen} sx={{width:"80px"}}>
           <Iconify icon="mi:filter"/>
      </Button>
      </Stack>
      </Grid>
         </Grid>
     
      <Dialog
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
            <Typography>Request Date</Typography>
     
            <Grid container flexDirection="row">
              <Grid item>
             <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="From Date"
                      value={dates?.applyDatefrom ? dayjs(dates.applyDatefrom) : null}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          applyDatefrom:newValue? formatDateToYYYYMMDD(newValue):"",
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
                      value={dates?.applyDateto ? dayjs(dates.applyDateto) : null}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          applyDateto: newValue ? formatDateToYYYYMMDD(newValue):"",
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                </Grid>
                </Grid>
                </Grid> */}
             <Grid sx={{marginTop:2}}>

             <Typography>Start Date</Typography>
     
     <Grid container flexDirection="row">
       <Grid item>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
           <DemoContainer components={['DatePicker']}>
             <DatePicker
               sx={{ width: '100%', paddingLeft: '3px' }}
               label="From Date"
               value={dates?.fromDatefrom ? dayjs(dates.fromDatefrom) : null}
               defaultValue={dayjs(new Date())}
               onChange={(newValue) => {
                 setDates((prev) => ({
                   ...prev,
                   fromDatefrom:newValue? formatDateToYYYYMMDD(newValue):"",
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
               value={dates?.fromDateto ? dayjs(dates.fromDateto) : null}
               defaultValue={dayjs(new Date())}
               onChange={(newValue) => {
                 setDates((prev) => ({
                   ...prev,
                   fromDateto: newValue ? formatDateToYYYYMMDD(newValue):"",
                 }));
               }}
             />
           </DemoContainer>
         </LocalizationProvider>
         </Grid>
         </Grid>
         </Grid>
      <Grid sx={{marginTop:2}}>

      <Typography>End Date</Typography>
     
     <Grid container flexDirection="row">
       <Grid item>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
           <DemoContainer components={['DatePicker']}>
             <DatePicker
               sx={{ width: '100%', paddingLeft: '3px' }}
               label="From Date"
               value={dates?.toDatefrom ? dayjs(dates.toDatefrom) : null}
               defaultValue={dayjs(new Date())}
               onChange={(newValue) => {
                 setDates((prev) => ({
                   ...prev,
                   toDatefrom:newValue? formatDateToYYYYMMDD(newValue):"",
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
               value={dates?.toDateto ? dayjs(dates.toDateto) : null}
               defaultValue={dayjs(new Date())}
               onChange={(newValue) => {
                 setDates((prev) => ({
                   ...prev,
                   toDateto: newValue ? formatDateToYYYYMMDD(newValue):"",
                 }));
               }}
             />
           </DemoContainer>
         </LocalizationProvider>
         </Grid>
         </Grid>
         </Grid>
      <Grid>
                  <Grid marginTop="10px" xs={12} md={6}>
                <FormControl fullWidth >
                <InputLabel fullWidth id="shift_name">Shift Name</InputLabel>
                <Select
                fullWidth
                  labelId="demo-multiple-name-status_1"
                  id="demo-multiple-status_1"
                  multiple
                  value={dropdownstatus}
                  onChange={(e)=>handleChangeDropDown(e,'shift_name')}
                  input={<OutlinedInput label="Shift Name" />}
                  MenuProps={MenuProps}
                >
                 
                    <MenuItem value="morning">Morning</MenuItem>
                    <MenuItem value="evening">Evening</MenuItem>
                    <MenuItem value="night">Night</MenuItem>
                  
                </Select>
              </FormControl>
                   </Grid>
                   <Grid marginTop="10px" xs={12} md={6}>
                <FormControl fullWidth >
                <InputLabel fullWidth id="shift_term">Shift Term</InputLabel>
                <Select
                fullWidth
                  labelId="demo-multiple-name-status_2"
                  id="demo-multiple-status_2"
                  multiple
                  value={dropdownLeaveType}
                  onChange={(e)=>handleChangeDropDown(e,'shift_term')}
                  input={<OutlinedInput label="Shift Term" />}
                  MenuProps={MenuProps}
                >
                 
 {leaveType?.map((shift_name) => {
  return (
                <MenuItem value={shift_name.leaveTypeName} key={shift_name.leaveTypeID}>
                  {shift_name.leaveTypeName}
                </MenuItem>
  )
  })}

                </Select>
              </FormControl>
                   </Grid>
                </Grid>
               </Grid>
           
         </DialogContent>
       <div style={{marginBottom:16}}>  <Button variant="contained" color='primary' sx={{float:'right',marginRight:2}} onClick={()=>{handleApply()}}>Apply</Button>
         <Button sx={{float:'right',right:15}} onClick={()=>{handleCancel()}}>Cancel</Button></div>
    </Dialog>
    </>
    )
    
}
AssignShiftSearchFilter.propTypes={
    filterSearch:PropTypes.any,
    filterData: PropTypes.any,
}
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
import CustomDateRangePicker from '../../global/CustomDateRangePicker';
import ApplyLoan from './ApplyLoan';
import { baseUrl } from '../../global/BaseUrl';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useContext } from 'react';
import UserContext from '../../context/user/UserConext';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
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
  
export default function LoanSearchFilter({filterSearch,filterData,componentPage,getTableData}){
  const theme = useTheme();
  const {user} = useContext(UserContext);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [dropdown,setDropdown]=useState({
  })

  const [dropdownstatus,setDropdownStatus]=useState([])
  const [dropdownpaymentstatus,setDropdownPaymentStatus]=useState([])
  const [dropdownapprover,setdropdownApprover] = useState([])
  const [datesFiledArray,setDatesFiledArray]=useState(
    [
      {
        field:'requestDate',
        from:'requestDateStart',
        to:'requestDateEnd'
      },
      {
        field:'paidDate',
        from:'PaidDateFrom',
        to:'PaidDateTo'
      },
    
    ]
  )
  const [dropdownFiledArray,setDropdownFiledArray]=useState(
    [
      {
        field:'status',
        options:[]
      },
      {
        field:'paymentStatus',
        options:[]
      },
      {
        field:'approverName',
        options:[]
      }
    ]
  )
  const [datesSavedArray,setDatesSavedArray]=useState(["requestDateStart","requestDateEnd","offer_date_from","offer_date_to"])
  const [datesData,setDatesData]=useState([])
  const [dates,setDates]=useState({
    requestDateStart:"",
    requestDateEnd:"",
    PaidDateFrom:"",
    PaidDateTo:"",
 
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
     
      const arr1={};
       dropdownFiledArray.forEach((item,index)=>{  
         
        if(dropdown[item.field]?.length>0){
          const arrayOfStrings = dropdown[item.field];
          const commaSeparatedString = arrayOfStrings.join(',');
          data[item.field]=commaSeparatedString;
        }
        })
        resolve(arr1)
        
    })
    
  }
  
    const [open,setOpen]=useState(false);
    const [openDateRange,setOpendateRange]=useState(false);
    const handleClickOpen=()=>{
      ApproversList()
      setOpen(true);
    }
    const handleClickClose=()=>{
      setOpen(false)
    }
    const handleChangeDropDown = (event,field) => {
      const {
        target: { value },
      } = event;
      
      
       if(field==="status"){
        setDropdownStatus(value)
        const obj=dropdown;
        obj[field]=value;
        setDropdown(obj);
      }
      else if(field==="paymentStatus"){
        setDropdownPaymentStatus(value)
        const obj=dropdown;
        obj[field]=value;
        setDropdown(obj);
      }
      else if (field==="approverName")
      {
        setdropdownApprover(value);
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
    handleClickClose()
      
    }
    const [showForm, setShowForm] = useState  (false);
    const [approversList,setApproversList]=useState();
      const handleClose = () => setShowForm(false);
      const handleTimeForm =()=>{
        setShowForm(true)
     
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
        },500)
  
      const handleCancel = async()=>{
        setDropdownStatus([]);
        setDropdownPaymentStatus([]);
        setdropdownApprover([]);
        setDates({
          requestDateStart:"",
          requestDateEnd:"",
          PaidDateFrom:"",
          PaidDateTo:"",
          approverName:""
        })
        setOpen(false);
      }

      const ApproversList = () => {
        const payload = {
          companyID:(user?.companyID)?user?.companyID:'',
        }
       
        const config = {
          method: 'POST',
          maxBodyLength: Infinity,
          url: baseUrl + `/approverDetails`,
          data:  payload
        };
      
        axios.request(config).then((response) => {
          setApproversList(response?.data)
        })
      
          .catch((error) => {
            console.log(error);
          });
      }
    return (
        <>
          {showForm && (
 <Dialog
 fullWidth
 maxWidth={false}
 open={showForm}
 onClose={handleClose}
 PaperProps={{
   sx: { maxWidth: 770 , overflow:'hidden'},
 }}
 className="custom-dialog"  
>
 <ApplyLoan currentUser={{}} handleClose={handleClose} getTableData={getTableData}/>
      </Dialog>
    )}
          <Grid container alignItems="center" justifyContent="space-between" paddingBottom="10px">
          <Grid item xs={12} md={8}>
            <TextField placeholder='Search....' 
            fullWidth
            onChange={e=>{handleSearch(e)}} 
            size="small"
            />
            </Grid>
            <Grid item xs={12} md={4} container justifyContent={isMobile ? "flex-start" : "flex-end"}>
                 
            {componentPage=="MyRequests"? <Button size='small'
                 sx={{ marginLeft: isMobile ? 1 : 0,marginTop:isMobile ? 1 : 0.5 }}
                variant='contained' 
                color='primary'
                 className="button" 
                 onClick={handleTimeForm}
                 >
                  Apply Request
                </Button>:null}
                {componentPage!="MyRequests"? <Button size="small" onClick={handleClickOpen} sx={{ width:'80px',marginLeft:2,marginTop:1}}>
               <Iconify icon="mi:filter"/>Filters
               </Button>:null}
      </Grid>
                </Grid>
     
      <Dialog
        onClose={handleClickClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        PaperProps={{
          sx:{maxWidth:500}
        }}
      >
        
        <DialogTitle sx={{paddingBottom:0,paddingTop:2}}>Filters
        <CancelOutlinedIcon sx={{cursor:"pointer",float:'right'}} onClick={()=>setOpen(false)} />
        </DialogTitle>
        <DialogContent sx={{mt:0,paddingBottom:0,marginTop:2}}>
          
          <Grid container>
            <Grid container flexDirection="row">
            <Typography> Request Date </Typography>
            <Grid container flexDirection="row">
              <Grid item md={6} xs={12}>
             <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="From Date"
                      value={dates?.requestDateStart?dayjs(dates.requestDateStart):null}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          requestDateStart: newValue?formatDateToYYYYMMDD(newValue):"",
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                </Grid>
                <Grid item md={6} xs={12}>
             <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="To Date"
                      value={dates?.requestDateEnd? dayjs(dates.requestDateEnd):null}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          requestDateEnd: newValue?formatDateToYYYYMMDD(newValue):"",
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                </Grid>
            </Grid>
           </Grid>
          <Grid container flexDirection="row" sx={{marginTop:2}}>
            <Typography> Paid Date </Typography>
     
            <Grid container flexDirection="row">
              <Grid item md={6} xs={12}>
             <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="From Date"
                      value={dates?.PaidDateFrom?dates.PaidDateFrom:null}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          PaidDateFrom: newValue?formatDateToYYYYMMDD(newValue):"",
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                </Grid>
                <Grid item md={6} xs={12}>
             <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="To Date"
                      value={dates?.PaidDateTo?dates.PaidDateTo:null}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          PaidDateTo: newValue?formatDateToYYYYMMDD(newValue):"",
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                </Grid>
              </Grid>
          </Grid>
           
                <Grid container flexDirection="row" spacing={1}>
                <Grid item marginTop="10px" xs={12} md={6}>
                <FormControl fullWidth >
                <InputLabel fullWidth id="approverName">Approver Name</InputLabel>
                <Select
                fullWidth
                  labelId="demo-multiple-name-status_1"
                  id="demo-multiple-status_1"
                  multiple
                  value={dropdownapprover}
                  onChange={(e)=>handleChangeDropDown(e,'approverName')}
                  input={<OutlinedInput label="Approver Name" />}
                  MenuProps={MenuProps}
                >
            {approversList?.data?.map((item) => {
  return (
                <MenuItem value={item?.approver}>
                  {item.approver}
                </MenuItem>
  )
  })}
                </Select>
              </FormControl>
                   </Grid>
                <Grid item marginTop="10px" xs={12} md={6}>
                <FormControl fullWidth >
                <InputLabel fullWidth id="Status">status</InputLabel>
                <Select
                fullWidth
                  labelId="demo-multiple-name-status_1"
                  id="demo-multiple-status_1"
                  multiple
                  value={dropdownstatus}
                  onChange={(e)=>handleChangeDropDown(e,'status')}
                  input={<OutlinedInput label="Status" />}
                  MenuProps={MenuProps}
                >
                 
                 <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="approved">Approved</MenuItem>
                    <MenuItem value="rejected">Rejected</MenuItem>
                </Select>
              </FormControl>
                </Grid>
                </Grid>
                <Grid container flexDirection="row">
                  <Grid marginTop="10px" xs={12} md={12}>
                <FormControl fullWidth >
                <InputLabel fullWidth id="Status">Payment Status</InputLabel>
                <Select
                fullWidth
                  labelId="demo-multiple-name-status_1"
                  id="demo-multiple-status_1"
                  multiple
                  value={dropdownpaymentstatus}
                  onChange={(e)=>handleChangeDropDown(e,'paymentStatus')}
                  input={<OutlinedInput label="Payment Status" />}
                  MenuProps={MenuProps}
                >
                 
                    <MenuItem value="debited">Debited</MenuItem>
                    <MenuItem value="credited">Credited</MenuItem>
                </Select>
              </FormControl>
                   </Grid>
                </Grid>
               </Grid>
           
         </DialogContent>
         <div style={{marginBottom:16,marginTop:3}}>  <Button variant="contained" color='primary' sx={{float:'right',marginRight:2}} onClick={()=>{handleApply()}}>Apply</Button>
         <Button sx={{float:'right',right:15}} variant="outlined" onClick={()=>{handleCancel()}}>Cancel</Button></div>
   
    </Dialog>
    </>
    )
    
}
LoanSearchFilter.propTypes={
  filterSearch: PropTypes.any,
  filterData:PropTypes.any
}
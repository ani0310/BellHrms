import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
// utils
import { fData } from 'src/utils/format-number';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
// assets
import { countries } from 'src/assets/data';
// components
import Label from 'src/components/label';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
} from 'src/components/hook-form';
import axios from 'axios';

import {formatDateToYYYYMMDD,formatDate} from 'src/nextzen/global/GetDateFormat';
import { Autocomplete, TextField } from '@mui/material';
import instance from 'src/api/BaseURL';
import UserContext from 'src/nextzen/context/user/UserConext';
import ModalHeader from 'src/nextzen/global/modalheader/ModalHeader';
import { setCommentRange } from 'typescript';

export default function CreateSwapRequest({ currentUser , handleClose,getTableData }) {
  const [datesUsed, setDatesUsed] = useState({
    date_of_birth: dayjs(new Date()),
    joining_date: dayjs(new Date()),
    offer_date: dayjs(new Date()),
    startDate: dayjs(new Date()),
  });
  const router = useRouter();
  const {user} = useContext(UserContext)

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    employee_id: Yup.string(),
    Employe_Name: Yup.string(),
    Project_Name: Yup.string(),
    Activity_Name: Yup.string(),
    Monday: Yup.string(),
    Tuesday: Yup.string(),
    Wednesday: Yup.string(),
    Thursday: Yup.string(),
    Friday: Yup.string(),
    Saturday : Yup.string(),
    Sunday: Yup.string(),
    Total_hours: Yup.string(),
    Comment: Yup.string(),
   
  });

  const defaultValues = useMemo(
    () => ({
   
      employee_id: currentUser?.employee_id || '',
      Employe_Name: currentUser?.Employe_Name || '',
      Project_Name: currentUser?.Project_Name || '',
      Activity_Name: currentUser?.Activity_Name || '',
      Monday: currentUser?.Monday || '',
      Tuesday: currentUser?.Tuesday || '',
      Wednesday: currentUser?.Wednesday || '',
      Thursday: currentUser?.Thursday || '',
      Friday: currentUser?.Friday || '',
      Saturday: currentUser?.Saturday || '',
      Sunday: currentUser?.Sunday || '',
      Total_hours: currentUser?.Total_hours || '',
      Comment: currentUser?.Comment || '',
   
    }),
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const m2 = useForm();

  const {
    reset, 
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();
  useEffect(() => {
  
    getShiftGroupName()
  }, [])

  const [employeSwapDetails,setEmployeSwapDetails ] = useState([])
  const [currentEmployeSwapData,setCurrentEmployeSwapData ] = useState({})
  const [currentEmployeSwapData1,setCurrentEmployeSwapData1 ] = useState({})
  const [FromShiftGroup_Name1,setFromShiftGroup_Name1]= useState('')
  const [ToShiftGroup_Name,setToShiftGroup_Name]= useState('')
  const [FromShiftGroup_Name,setFromShiftGroup_Name]= useState('')
  const [ToShiftGroup_Name1,setToShiftGroup_Name1]= useState('')

  // states
  const [shiftGroupName,setShiftGroupName] = useState([])
  const [ShiftNameDetails,setShiftNameDetails] = useState({})
const [Comment,setComment]=useState('')

const[GroupError,setGroupError]=useState(false)

  const getShiftGroupName= async ()=>{
    try{
    const  data= {
      companyId:(user?.companyID)?user?.companyID : '',
      locationId:(user?.locationID)?user?.locationID : '',
      supervisorId:(user?.employeeID)?user?.employeeID : '',
      };
      const response = await instance.post('/getShiftGroupName',data);
      setShiftGroupName(response.data.data)
      console.log("🚀 ~ file: AddeployeShift.jsx:209 ~ getShiftgroupName ~ response.data.data:", response.data.data)
    }
    catch(error){
  console.error("Error", error);
  throw error;
    }
  }


  
  const onSubmit = handleSubmit(async (data) => {
    console.log('uyfgv');

    try {
    
  const data = {
    companyId:(user?.companyID)?user?.companyID : '',
    employeeId:(user?.employeeID)?user?.employeeID : '',
    toShiftGroupId:parseInt( ShiftNameDetails.employeeShiftGroupId),
    startDate:formatDateToYYYYMMDD( datesUsed.startDate),
    comment: Comment,

  }
      console.log(data, 'data111ugsghghh');
if(ShiftNameDetails.employeeShiftGroupId === undefined){
  setGroupError(true)
}
else{
      const response = await instance.post('/createSwapRequest', data).then(
        (successData) => {
          getTableData()
          handleClose()
          enqueueSnackbar(response.data.message,{variant:'success'})

          console.log('sucess', successData);
        },
        (error) => {
          enqueueSnackbar(error.message,{variant:'Error'})

          console.log('lllll', error);
        }
      );
    } } catch (error) {
      console.error(error);
    }
  });

  const handleChange =(event)=>{
    setComment(event.target.value)
  }

  return (
    <div style={{ paddingTop: '0px' }}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <ModalHeader heading="Employee Request Swap  "/>
      <Grid container spacing={3}>

<Grid xs={12} md={12}>

  <Card sx={{ p: 3 }}>
    <Box
      rowGap={1}
      columnGap={1}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
      }}
    >

      {/* <Autocomplete
  // multiple hhs
  disablePortal
  id="combo-box-demo"
  options={Options}
  // value={currentReportingData}
  getOptionLabel={(option) => option.name}
  onChange={(e,newvalue)=>{
   
   
    setFromShiftGroup_Name1(newvalue.id
      
    );
    
   
    // const obj={
    //   company_id:JSON.parse(localStorage.getItem('userDetails'))?.companyID,
    //   reporting_manager_id:newvalue?.employee_id
    // }

    // ApiHitDepartment(obj)
    // const timeStampCity = JSON.stringify(new Date().getTime());
    // const CilentTokenCity=cilentIdFormation(timeStampCity,{})
    // ApiHitCity(CilentTokenCity,timeStampCity,newvalue?.id,"")
 
  }}

  sx={{
    width: { xs: '100%', sm: '50%', md: '100%', lg: '100%' },
  }}
  renderInput={(params) => <TextField {...params} label="From Shift Group Name " />}
/> */}


                      <Autocomplete
  // multiple
  disablePortal
  id="combo-box-demo"
  options={shiftGroupName || []} 
  value={ShiftNameDetails.employeeShiftGroupId }
  getOptionLabel={(option) => `${option.shiftGroupName} (${option.startTime} - ${option.end_Time})`}
  onChange={(e,newvalue) => {
  
   
    setShiftNameDetails(newvalue
      
    );
    
   
   
 
  }}
 
  sx={{
    width: { xs: '100%', sm: '50%', md: '100%', lg: '100%' },
  }}
  renderInput={(params) => <TextField
  error={GroupError}helperText={(GroupError)? "Please Select To Shift Group Name " : ""}
   {...params} label="To Shift Group Name" />}
/>

      {/* <Autocomplete
  disablePortal
  id="combo-box-demo"
  options={employeSwapDetails || []}
  value={currentEmployeSwapData?.employee_shift_swap_id}
  getOptionLabel={(option) => option.employee_name}
  onChange={(e,newvalue)=>{
   
   
    setCurrentEmployeSwapData(newvalue
    )
   
 
  }}
  sx={{
    width: { xs: '100%', sm: '50%', md: '100%', lg: '100%' },
  }}
  renderInput={(params) => <TextField {...params} label="Select Employe" />}
/> */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker
            sx={{ width: '100%', paddingLeft: '3px' }}
            label="Start Date"
            value={datesUsed?.startDate}
            defaultValue={dayjs(new Date())}
            onChange={(newValue) => {
              setDatesUsed((prev) => ({
                ...prev,
                startDate: newValue,
              }));
            }}
          />
        </DemoContainer>
      </LocalizationProvider>       
      
         {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker
            sx={{ width: '100%', paddingLeft: '3px' }}
            label="End Date"
            value={datesUsed?.end_date}
            defaultValue={dayjs(new Date())}
            onChange={(newValue) => {
              setDatesUsed((prev) => ({
                ...prev,
                end_date: newValue,
              }));
            }}
          />
        </DemoContainer>
      </LocalizationProvider> */}

<RHFTextField required onChange={handleChange} name="comment" label="Comments " />



      {/* <br />
      <Stack>
        <Typography>
          Select second Employe To Swap...
        </Typography>
      </Stack>
      <br />
   

  <Autocomplete
  // multiple
  disablePortal
  id="combo-box-demo"
  options={Options}
  // value={currentReportingData}
  getOptionLabel={(option) => option.name}
  onChange={(e,newvalue)=>{
   
   
    setFromShiftGroup_Name(newvalue.id
      
    );
    
   
 
  }}
 
  sx={{
    width: { xs: '100%', sm: '50%', md: '100%', lg: '100%' },
  }}
  renderInput={(params) => <TextField {...params} label="From Shift GroupName" />}
/>
  <Autocomplete
  // multiple
  disablePortal
  id="combo-box-demo"
  options={Options}
  // value={currentReportingData}
  getOptionLabel={(option) => option.name}
  onChange={(e,newvalue)=>{
   
   
    setToShiftGroup_Name1(newvalue.id
      
    );
    
   
   
 
  }}

  sx={{
    width: { xs: '100%', sm: '50%', md: '100%', lg: '100%' },
  }}
  renderInput={(params) => <TextField {...params} label="To Shift GroupName" />}
/>
         <Autocomplete
  disablePortal
  id="combo-box-demo"
  options={employeSwapDetails || []}
  value={currentEmployeSwapData1?.employee_shift_swap_id}
  getOptionLabel={(option) => option.employee_name}
  onChange={(e,newvalue)=>{
   
   
    setCurrentEmployeSwapData1(newvalue
    )
  
 
  }}
  sx={{
    width: { xs: '100%', sm: '50%', md: '100%', lg: '100%' },
  }}
  renderInput={(params) => <TextField {...params} label="Select Employe" />}
/> */}
    </Box>


        <Stack alignItems="flex-end" sx={{ mt: 3, display:"flex", flexDirection:'row',justifyContent:"flex-end"}}>
                <Button  sx={{mr:"5px"}} variant="outlined" onClick={handleClose}>Cancel</Button>
                <LoadingButton type="submit"   sx={{backgroundColor:'#3B82F6'}} variant="contained" color="primary" loading={isSubmitting}>
                  {!currentUser ? 'Create User' : 'Request Shift Swap'}
                </LoadingButton>
              </Stack>
  </Card>
</Grid>
</Grid>
      </FormProvider>
    </div>
  );
}

CreateSwapRequest.propTypes = {
  currentUser: PropTypes.object,
  handleClose: PropTypes.func,
};

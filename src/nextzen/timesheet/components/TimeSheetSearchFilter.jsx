import { useCallback, useEffect, useMemo, useState ,React} from 'react';
import { styled } from '@mui/system';
import { format } from 'date-fns';
import LoadingButton from '@mui/lab/LoadingButton';

import Badge from '@mui/material/Badge';
import {Card,TextField,CardContent,  InputAdornment,Autocomplete,Grid,Button,Drawer,IconButton,Stack,DialogContent,
   DialogActions,Typography} from '@mui/material';
import { keyframes } from '@emotion/react';

import Iconify from 'src/components/iconify/iconify';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import dayjs from 'dayjs';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import Dialog from '@mui/material/Dialog';

import DialogTitle from '@mui/material/DialogTitle';

import { Today } from '@mui/icons-material';


import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
} from 'src/components/hook-form';
import { baseUrl } from 'src/nextzen/global/BaseUrl';




const TimeSheetSearchFilter = ({currentUser}) => {


   // dialog
    // const values = watch();
    const [projectDetails ,setProjectDetails] = useState([])
    const [activityData ,SetActivityData] = useState([])
    const [currentProjectData ,setCurrentProjectData] = useState({})
const [currentActivitytData ,setCurrentActivitytData] = useState({})
    const NewUserSchema = Yup.object().shape({
      employee_id: Yup.string(),
      monday: Yup.string(),
      tuesday: Yup.string(),
      wednseday: Yup.string(),
      thursday: Yup.string(),
      friday: Yup.string(),
      saturday: Yup.string(),
      sunday: Yup.string(),
      comments: Yup.string(),
      // start_date: Yup.string(),
      // end_date: Yup.string(),
      // due_date: Yup.string().required('First Name is Required'),
      // commentStatus: Yup.string(),
     
     
    });
  
    
  const defaultValues = useMemo(
    () => ({
   
        employee_id: currentUser?.employee_id || '',
        monday: currentUser?.monday || '',
        tuesday: currentUser?.tuesday || '',
        wednseday: currentUser?.wednseday || '',
        thursday: currentUser?.thursday || '',
        friday: currentUser?.friday || '',
        saturday: currentUser?.saturday || '',
        sunday: currentUser?.sunday || '',
        comments: currentUser?.comments || '',
  
   
    }),
    [currentUser]
  );


  const   methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset, 
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  

  useEffect(() => {
    console.log("useeffectttttt");
     getProjectName();
     getActivityName();
  //   const fetchData = async () => {
  //     try {
  //        await getProjectName();
  //        await getActivityName();
       
  //     } catch (error) {
  //        // Handle errors
  //     }
  //  };

  //  fetchData();
   }, []);

  const getProjectName = async()=>{
    try {
    
      const data = {
        manager_id: 'info7',
        // Other data properties as needed
      };
      const response = await axios.post(baseUrl+'/listmanagersproject', data).then(
        (response) => {
          console.log('sucesswwww', response);
          setProjectDetails(response?.data?.data)
        
        },
        (error) => {
          console.log('lllll', error);
       
        }
      );

 
      
    } catch (error) {
      // Handle any errors (e.g., network error, request failure, etc.)
      console.error('Error:', error);
      throw error; // Re-throw the error or handle it according to your needs
    }
  }
  
  const getActivityName = async ()=>{
    try {
    
      const data = {
        project_id: 4,
        // Other data properties as needed
      };
      const response = await axios.post(baseUrl+'/listactivityname', data).then(
        (response) => {
          console.log('sucess', response);
          SetActivityData(response?.data?.data)
        
        },
        (error) => {
          console.log('lllll', error);
       
        }
      );

  
  
      
      console.log('Response:', );
  
     
    } catch (error) {
      console.error('Error:', error);
      throw error; 
    }
  }
  console.log(projectDetails,activityData,"currentActivitytDatacurrentActivitytData")

  const onSubmit = handleSubmit(async (data) => {
    console.log("🚀 ~ file: SalaryAdvanceForm.jsx:93 ~ onSubmit ~ data:", data)
    console.log('uyfgv');

    try {
      data.company_id = 'COMP2';
      data.activity_id =String( currentActivitytData.activityId);;
      data.project_id =String( currentProjectData.projectId);
      data.date_of_activity = formatDateToYYYYMMDD(dayjs(new Date()));
      data.start_time = '2023-10-17 11:50:02.023';
      data.end_time = '2023-10-17 11:50:02.023';
      // const FinalDal=data+"company_id": "0001"+"company_name": "infbell",
      // data.due_date = formatDateToYYYYMMDD(datesUsed?.due_date);
      // data.end_date = formatDateToYYYYMMDD(datesUsed?.end_date);
      // data.start_date = formatDateToYYYYMMDD(datesUsed?.start_date);
      // data.selectedActivity = selectedActivity;
      // data.companyID = "COMP1";
      // data.employeeID = "info4";

      console.log(data, 'data111ugsghghh');

      const response = await instance.post('addmytimesheet', data).then(
        (successData) => {
          console.log('sucess', successData);
          handleClose()
        },
        (error) => {
          console.log('lllll', error);
        }
      );

    } catch (error) {
      console.error(error);
    }
  });

  // mui modal related
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => setOpen(false);
      const managerID =localStorage.getItem('reportingManagerID');
      const employeeID =localStorage.getItem('employeeID');
      const companyID =localStorage.getItem('companyID');

  // add dialog form data
  const [timesheetData, setTimesheetData] = useState({
    timesheetId: '',
    flag: null,
    companyId: companyID,
    employeeId: employeeID,
    employeeName: '',
    projectId: '1',
    activityId: '2',
    startTime: '2023-11-20 11:50:02.023',
    endTime: '2023-11-20 01:50:02.023',
    monday: {
      hours: '',
      task: '',
      comments: '',
    },
    tuesday: {
      hours: '',
      task: '',
      comments: "",
    },
    wednesday: {
      hours: '',
      task: '',
      comments: '',
    },
    thursday: {
      hours: '',
      task: '',
      comments: '',
    },
    friday: {
      hours: '',
      task: '',
      comments: '',
    },
    saturday: {
      hours: '',
      task: '',
      comments: '',
    },
  });
console.log(timesheetData,"timesheetData")
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTimesheetData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDayInputChange = (day, field) => (event) => {
    const { value } = event.target;
    setTimesheetData((prevData) => ({
      ...prevData,
      [day]: {
        ...prevData[day],
        [field]: value,
      },
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Do something with the form data, such as sending it to a server
    console.log('Form submitted:', timesheetData);
  };

  const onSubmitEdit2 = async(timesheetData, event) => {

   
    
    console.log(timesheetData,"editDataeditData222")
    try {
      event.preventDefault();
      // timesheetData.claim_type=timesheetData?.claim_type?.label

     console.log(timesheetData,"editDataeditData")
      
      const response = await axios.post(baseUrl+"/addmytimesheet", timesheetData).then(
        (successData) => {
          console.log('sucess', successData);
        },
        (error) => {
          console.log('lllll', error);
        }
      );

      
    } catch (error) {

      alert("api hit not done")
      console.error(error);
    }
  }
  return (
    <>
          <Grid container alignItems="center" paddingBottom="10px">
            <Grid md={8} xs={8} item>

            <TextField placeholder='Search....' 
            fullWidth
            // onChange={handleSeacrch}
            // onChange={(e) => handleSearch(e.target.value)}

            />
            </Grid>
            <Grid md={2} xs={2} sx={{alignSelf:"center",textAlign:"center"}}>
               <Button variant='contained'  sx={{borderRadius:"4px"}}  onClick={handleOpen }>Add Timesheet</Button>
              
               {/* onClick={buttonFunction} */}
            </Grid>

            <Grid md={2} xs={2} item>

        <Stack sx={{display:'flex',alignItems:'flex-end'}} >
        {/* <Badge badgeContent={""} color="error"  anchorOrigin={{
    vertical: 'up',
    horizontal: 'left',
  }} > */}
 
            <Button style={{width:"80px"}}  >
           <Iconify icon="mi:filter"/>
           Filters
      </Button>
      {/* </Badge > */}

      </Stack>
      </Grid>
         </Grid>

         <Dialog
fullWidth
maxWidth={false}
open={open}
onClose={handleClose}
PaperProps={{
  sx: { maxWidth: 720 },
}}

         >
      <FormProvider methods={methods} onSubmit={(event) => onSubmitEdit2(timesheetData, event)}>
      <DialogContent>
      <Box
                rowGap={1}
                columnGap={1}
                display="grid"
                gridTemplateColumns={{
                  // xs: 'repeat(1, 1fr)',
                  // sm: 'repeat(7, 1fr)',
                }}
              >

<Grid sx={{padding:'8px'}}>
              <Typography sx={{marginLeft:'8px'}}>
                ADD YOUR TIMELINE TO PROJECT IS HERE .....
              </Typography>
              <Typography sx={{marginLeft:'8px'}}>
                Time Sheet
              </Typography>
            </Grid>
            
               <Grid container spacing={1} >
                <Grid item xs={12} sm={6} fullWidth>
                < Autocomplete
                
            // disablePortal
            id="cobo-box-demo"
            options={projectDetails || []}
            value={currentProjectData.projectId}
            getOptionLabel={(option) => option.projectcdName}
            onChange={(e,newvalue)=>{
             
             
              setCurrentProjectData(newvalue
              )
              
           
            }}
          
            renderInput={(params) => <TextField {...params} label="Project Name" />}
          /></Grid>
          <Grid item  xs={12} sm={6} fullWidth>
                <Autocomplete
            disablePortal
            id="combo-box-dmo"
            options={activityData || []}
            value={currentActivitytData.activityId}
            getOptionLabel={(option) => option.activityName}
            onChange={(e,newvalue)=>{
             
             
              setCurrentActivitytData(newvalue
              )
             
           
           
            }}
         
            renderInput={(params) => <TextField {...params} label="Activity Name" />}
          />
          </Grid>
          </Grid>
          <Typography>Monday</Typography>
          <Grid container spacing={1}>
            
               <Grid item sm={4}>
                <TextField 
              
                label="Monday Hours" 
                fullWidth
                inputProps={{
                  pattern: '[0-9]', 
                  maxLength: 2, 
                }}
                value={timesheetData.monday.hours}
                onChange={handleDayInputChange('monday', 'hours')}
                />
                </Grid>
                <Grid item sm={4}>
                <TextField 
                 label="Monday Task" 
                 fullWidth
                value={timesheetData.monday.task}
                onChange={handleDayInputChange('monday', 'task')}
                />
                </Grid>
                <Grid item sm={4}>
                <TextField 
                 label="Monday Comments"
                 fullWidth
                value={timesheetData.monday.comments}
                onChange={handleDayInputChange('monday', 'comments')}
                 />
                </Grid>
               
                

                </Grid>
                <Typography>Tuesday</Typography>
          <Grid container spacing={1}>
            
               <Grid item sm={4}>
                <TextField 
                 label="Tuesday Hours"
                 fullWidth
                 
                 inputProps={{
                  pattern: '[0-9]', 
                  maxLength: 2, 
                }}
                value={timesheetData.tuesday.hours}
                onChange={handleDayInputChange('tuesday', 'hours')}
                 />
                </Grid>
                <Grid item sm={4}>
                <TextField  label="Tuesday Task" 
                fullWidth
                value={timesheetData.tuesday.task}
                onChange={handleDayInputChange('tuesday', 'task')}
                />
                </Grid>
                <Grid item sm={4}>
                <TextField  label="Tuesday Comments" 
                fullWidth
                value={timesheetData.tuesday.comments}
                onChange={handleDayInputChange('tuesday', 'comments')}
                />
                </Grid>
               
                

                </Grid>
                <Typography>Wednesday</Typography>
          <Grid container spacing={1}>
            
               <Grid item sm={4}>
                <TextField  label="Wednesday Hours" 
                fullWidth
                inputProps={{
                  pattern: '[0-9]', 
                  maxLength: 2, 
                }}
                value={timesheetData.wednesday.hours}
                onChange={handleDayInputChange('wednesday', 'hours')}
                />
                </Grid>
                <Grid item sm={4}>
                <TextField name="wednesdayTask" label="Wednesday Task" 
                fullWidth
                value={timesheetData.wednesday.task}
                onChange={handleDayInputChange('wednesday', 'task')}
                />
                </Grid>
                <Grid item sm={4}>
                <TextField label="Wednesday Comments"
                 fullWidth
                 value={timesheetData.wednesday.comments}
                 onChange={handleDayInputChange('wednesday', 'comments')}
                />
                </Grid>
               
                

                </Grid>
                <Typography>Thursday</Typography>
          <Grid container spacing={1}>
            
               <Grid item sm={4}>
                <TextField name="thursdayHours" label="Thursday Hours" 
                 fullWidth
                 inputProps={{
                  pattern: '[0-9]', 
                  maxLength: 2, 
                }}
                 value={timesheetData.thursday.hours}
                 onChange={handleDayInputChange('thursday', 'hours')}
                />
                </Grid>
                <Grid item sm={4}>
                <TextField  label="Thursday Task" 
                  fullWidth
                  value={timesheetData.thursday.task}
                  onChange={handleDayInputChange('thursday', 'task')}
                
                />
                </Grid>
                <Grid item sm={4}>
                <TextField label="Thursday Comments" 
                fullWidth
                value={timesheetData.thursday.comments}
                onChange={handleDayInputChange('thursday', 'comments')}
                />
                </Grid>
               
                

                </Grid>
                <Typography>Friday</Typography>
          <Grid container spacing={1}>
            
               <Grid item sm={4}>
                <TextField name="Friday" label="Friday" 
                fullWidth
                inputProps={{
                  pattern: '[0-9]', 
                  maxLength: 2, 
                }}
                value={timesheetData.friday.hours}
                onChange={handleDayInputChange('friday', 'hours')}
                />
                </Grid>
                <Grid item sm={4}>
                <TextField name="fridayTask" label="Friday Task" 
                fullWidth
                value={timesheetData.friday.task}
                onChange={handleDayInputChange('friday', 'task')}
                
                />
                </Grid>
                <Grid item sm={4}>
                <TextField  label="Friday Comments"
                fullWidth
                value={timesheetData.friday.comments}
                onChange={handleDayInputChange('friday', 'comments')}
                />
                </Grid>
               
                

                </Grid>
                
             
              </Box>
    
            
             <DialogActions>
              <Stack alignItems="flex-end" sx={{ mt: 3, display:"flex", flexDirection:'row',justifyContent:"flex-end"}}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {!currentUser ? 'Create User' : 'Add  Timeline'}
                </LoadingButton>
                <Button sx={{backgroundColor:"#d12317",ml:"5px"}}  onClick={handleClose}>Cancel</Button>
              </Stack>
             </DialogActions>
           
      
        </DialogContent>
      </FormProvider>
      </Dialog>
     

    



   
    </>
  )
}

export default TimeSheetSearchFilter
import react from 'react';
import * as Yup from 'yup';
import { useState,useEffect,useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog,Grid,Button,TextField,useMediaQuery,Chip,Stack,Card,DialogTitle,Typography,DialogContent,FormControl,InputLabel,MenuItem,Select,OutlinedInput, Autocomplete } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import axios from 'axios';
import formatDateToYYYYMMDD from 'src/nextzen/global/GetDateFormat';
import FormProvider,{RHFAutocomplete,RHFSelect,RHFTextField} from '../../../../src/components/hook-form'
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import instance from 'src/api/BaseURL';
import { LoadingButton } from '@mui/lab';
import ModalHeader from 'src/nextzen/global/modalheader/ModalHeader';
import {useSnackbar} from '../../../components/snackbar';
export default function AddProject({handleClose,title,rowData}){

    console.log(rowData,"rowdataa")
    const {enqueueSnackbar} = useSnackbar();
    const [locationList,setLocationList] = useState([])
    const [hasFetchedData, setHasFetchedData] = useState(false);
    const [reportingManager,setReportingManagerData]= useState([])
    const [selectedLocationID, setSelectedLocationID] = useState((rowData?.locationId)?rowData?.locationId:null); 
    const [selectedReportingManagerID, setSelectedReportingManagerID]=useState(); 
    const [selectedProjectManagerID, setselectedProjectManagerID]=useState(); 
    const [projectManager,setProjectManagers] = useState([])
    const [datesUsed, setDatesUsed] = useState({
        startDate: '',
        endDate: '',
        actualStartDate:'',
        actualEndDate:''
      });
      const NewUserSchema = Yup.object().shape({
        projectName: Yup.string(),
        startDate: Yup.string(),
        endDate: Yup.string(),
        actualStartDate:Yup.string(),
        actualEndDate:Yup.string(),
        projectDescription:Yup.string(),
        status: Yup.string(),
       
      });
      const defaultValues = useMemo(
        () => ({
            projectName:rowData?.projectName,
            startDate:(rowData?.startDate)?rowData?.startDate:'',
            endDate: (rowData?.endDate)?rowData?.endDate:'',
            status:'',
            actualStartDate:(rowData?.actualStartDate)?rowData?.actualStartDate:'',
            actualEndDate:(rowData?.actualEndDate)?rowData?.actualEndDate:'',
            projectDescription:(rowData?.projectDescription)?rowData?.projectDescription:'',
            locationId:"Bangalore"
        }),
        []
      );
      const methods = useForm({
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

      
const handleLocationSelection = (selectedOption) => {
  if (selectedOption) {
    setSelectedLocationID(selectedOption.locationID); 
  }
};

const handleSelectedReportingManager=(e)=>{
    setSelectedReportingManagerID(e.employeeId)
}
const handleSelectedProjectManager=(e)=>{
    setselectedProjectManagerID(e.employeeId)
}
const projectManagersData= {
  companyId:'COMP1',
  locationId:'',
  roleId:6
};

const reportingManagersData={
  companyId:'COMP1',
  locationId:'',
  roleId:7
}
const getReportingManagers = async (requestData) => {
  try {
    const response = await axios.post(baseUrl + '/reportingManagers', requestData);
    return response.data.list;
  } catch (error) {
    throw error;
  }
}
const fetchReportingManagers = async () => {
  try {
    reportingManagersData.locationId = parseInt(selectedLocationID) || null;
    const reportingManagersData1 = await getReportingManagers(reportingManagersData);
    setReportingManagerData(reportingManagersData1)
    projectManagersData.locationId = parseInt(selectedLocationID) || null;
    const reportingManagersData2 = await getReportingManagers(projectManagersData);
    setProjectManagers(reportingManagersData2)
  } 
  catch (error) {
    console.error(error);
  }
};

const getLocation=()=>{
    const data={
      "companyID":"COMP1"
    }
     const config={
      method:'POST',
      maxBodyLength:Infinity,
      url:baseUrl + '/locationOnboardingDepartment',
      data:data
     }
     axios.request(config).then((response)=>{
      setLocationList(response?.data?.data)
     })
     .catch((error)=>{
      console.log(error)
     })
}
const onSubmit = handleSubmit(async (data) => {
    try {
   
      data.endDate = datesUsed?.endDate;
      data.startDate = datesUsed?.startDate;
      data.actualStartDate=datesUsed?.actualStartDate;
      data.actualEndDate=datesUsed?.actualEndDate;
      data.projectManager=selectedProjectManagerID;
      data.reportingManager= selectedReportingManagerID;
      data.locationId = selectedLocationID,
      data.companyId = "COMP1";
      const response = await axios.post(baseUrl+'/addProject', data).then(
        (successData) => {
          enqueueSnackbar(successData.data.message,{variant:'success'})
          handleClose()
          reset()
        },
        (error) => {
          enqueueSnackbar(error.data.message,{variant:'error'})
            reset()
          console.log('erro', error);
        }
      );
    } catch (error) {
      console.error(error);
    }
});

console.log(selectedLocationID,"selectedlocationn")
if ((selectedLocationID !== null && !hasFetchedData) || (selectedLocationID === rowData?.locationId && !hasFetchedData)) {
    fetchReportingManagers();
    setHasFetchedData(true); // Update the state to mark that data has been fetched
  }
  

  useEffect(()=> {
    getLocation()
  },[])
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedReportingManager, setSelectedReportingManager] = useState(null);
  const [selectedProjectManager, setSelectedProjectManager] = useState(null);

  const updatedRowData = {
    ...rowData,
    locationName: "Banglore" // Insert the received locationName here
  };

  useEffect(() => {
    if (rowData && rowData.locationName && locationList) {
      const existingLocation = locationList.find(location => location.locationName === rowData.locationName);
      setSelectedLocation(existingLocation || null);
    }
    if(rowData && rowData?.reportingManagerName && reportingManager){
        const existingReportingmanager = reportingManager.find(manager => manager.firstName == rowData?.reportingManagerName);
        setSelectedReportingManager(existingReportingmanager || null);
    }
    if(rowData && rowData?.projectManagerName && projectManager){
        const existingprojectManager = projectManager.find(manager => manager.firstName == rowData?.projectManagerName);
        setSelectedProjectManager(existingprojectManager || null);
    }
  }, [locationList,rowData]);
  
  const onSubmit1 = handleSubmit(async (data) => {
    try {
   
    data.projectID=rowData?.projectID
      data.Createddate=rowData?.createdDate
      data.ActualStartDate = datesUsed?.actualStartDate,
      data.ActualEndDate=datesUsed?.actualEndDate,
      data.Startdate = datesUsed?.startDate,
      data.Enddate = datesUsed?.endDate,
      data.Status = rowData?.status,
      data.RoleId=1,
      data.ReportingManager = selectedReportingManagerID?selectedReportingManagerID:rowData?.reportingManager,
      data.ProjectManager = selectedProjectManagerID?selectedProjectManagerID:rowData?.projectManager

      const response = await axios.post('https://kz7mdxrb-3001.inc1.devtunnels.ms/erp/updateproject', data).then(
        (successData) => {
          enqueueSnackbar(successData.data.message,{variant:'success'})
          handleClose()
          reset()
        },
        (error) => {
          enqueueSnackbar(error.data.message,{variant:'error'})
            reset()
          console.log('erro', error);
        }
      );
    } catch (error) {
      console.error(error);
    }
});
    return (
        <>
          <FormProvider methods={methods} onSubmit={title=="Edit Project"?onSubmit1:onSubmit}>
          <ModalHeader heading={title}/>
          <Grid container spacing={2} sx={{marginTop:1}}>
            <Grid xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Grid container spacing={2}>
               <Grid item md={6} xs={12}>
                  <RHFTextField name="projectName" label="Project Name" fullWidth value={rowData?.projectName} disabled={title==="Edit Project"}/>
                </Grid>
                 <Grid item md={6} xs={12}>
                 <Autocomplete
                 disabled={title==="Edit Project"}
            value = {selectedLocation}
            name="locationId"
            label="Location"
            options={locationList}
            getOptionLabel={(option) => option.locationName}
            isOptionEqualtoValue={(option) => option.locationId}
            getOptionSelected={(option) => option.locationName === rowData?.locationName}
            onChange={(event, selectedOption) => handleLocationSelection(selectedOption)}
            renderInput={(params) => (
                <TextField {...params} label="Location" variant="outlined" />
                )}
            />  
                 </Grid>
              </Grid>
            
  <Grid container spacing={2} sx={{marginTop:1}}>
     <Grid item md={6} xs={12}>
        {console.log(selectedProjectManager,"projectmanagerrrr")}
     <Autocomplete
          
           value={selectedProjectManager}
            name="projectManager"
            label="Project Manager"
            options={projectManager}
            getOptionLabel={(option) => option.firstName}
            isOptionEqualtoValue={(option) => option.employeeId}
            getOptionSelected={(option) => option.firstName == rowData?.projectManagerName}
            onChange={(event, selectedOption) => handleSelectedProjectManager(selectedOption)}
            renderInput={(params) => (
                <TextField {...params} label="Project Manager" variant="outlined" />
                )}
            />    
     </Grid>
     <Grid item md={6} xs={12}>
     <Autocomplete
     value={selectedReportingManager}
            name="reportingManager"
            label="Reporting Manager"
            options={reportingManager}
            getOptionLabel={(option) => option.firstName}
            getOptionSelected={(option) => option.firstName == rowData?.reportingManagerName}
            isOptionEqualtoValue={(option) => option.employeeId}
            onChange={(event, selectedOption) => handleSelectedReportingManager(selectedOption)}
            renderInput={(params) => (
                <TextField {...params} label="Reporting Manager" variant="outlined" />
                )}
            />
     </Grid>
  </Grid>
  <Grid container sx={{mt:1}}>
              <Grid md={12} xs={12} item>
                      <RHFTextField name="projectDescription" label="Project Description"/>
                  </Grid>
              </Grid>
  <Grid container spacing={2} >
  <Grid item md={6} xs={12}>
      
  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker
                        sx={{ width: '100%', paddingLeft: '3px' }}
                        label="Start date"
                        // value={datesUsed?.startDate?dayjs(datesUsed?.startDate):null}
                        value={rowData?.startDate?dayjs(rowData?.startDate):(datesUsed?.startDate)?dayjs(datesUsed?.startDate):null}
                        defaultValue={dayjs(new Date())}
                        onChange={(newValue) => {
                          setDatesUsed((prev) => ({
                            ...prev,
                            startDate: newValue?formatDateToYYYYMMDD(newValue):"",
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
                        label="End date"
                        value={rowData?.endDate?dayjs(rowData?.endDate):(datesUsed?.endDate)?dayjs(datesUsed?.endDate):null}
                        defaultValue={dayjs(new Date())}
                        onChange={(newValue) => {
                          setDatesUsed((prev) => ({
                            ...prev,
                            endDate: newValue?formatDateToYYYYMMDD(newValue):"",
                          }));
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                             </Grid>
  </Grid>
  
  <Grid container spacing={2}>
  <Grid item md={6} xs={12}>
      
  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker
                        sx={{ width: '100%', paddingLeft: '3px' }}
                        label="Actual Start date"
                        value={rowData?.actualStartDate?dayjs(rowData?.actualStartDate):(datesUsed?.actualStartDate)?dayjs(datesUsed?.actualStartDate):null}
                        defaultValue={dayjs(new Date())}
                        onChange={(newValue) => {
                          setDatesUsed((prev) => ({
                            ...prev,
                            actualStartDate: newValue?formatDateToYYYYMMDD(newValue):"",
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
                        label="Actual End date"
                        value={rowData?.actualEndDate?dayjs(rowData?.actualEndDate):(datesUsed?.actualEndDate)?dayjs(datesUsed?.actualEndDate):null}
                        defaultValue={dayjs(new Date())}
                        onChange={(newValue) => {
                          setDatesUsed((prev) => ({
                            ...prev,
                            actualEndDate: newValue?formatDateToYYYYMMDD(newValue):"",
                          }));
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                             </Grid>
  </Grid>
  
                <Stack alignItems="flex-end" sx={{ mt: 3, display:"flex", flexDirection:'row',justifyContent:"flex-end"}}>
                
                  <Button variant="outlined" onClick={handleClose} sx={{marginRight:1}}>Cancel</Button>
                  <LoadingButton type="submit" variant="contained" color='primary' loading={isSubmitting}>
                  save Project
                  </LoadingButton>
                </Stack>
               </Card>
            </Grid>
          </Grid>
        </FormProvider>

</>
    )
}
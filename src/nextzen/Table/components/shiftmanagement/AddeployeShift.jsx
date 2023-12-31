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
  RHFSelect,
} from 'src/components/hook-form';
import axios from 'axios';

import {formatDateToYYYYMMDD,formatDate} from 'src/nextzen/global/GetDateFormat';
import { Autocomplete, Chip, TextField } from '@mui/material';
import instance from 'src/api/BaseURL';
import UserContext from 'src/nextzen/context/user/UserConext';
import ModalHeader from 'src/nextzen/global/modalheader/ModalHeader';

export default function AddEmployeShift({ currentUser, handleClose ,getTableData}) {
  const [datesUsed, setDatesUsed] = useState({
    date_of_birth: dayjs(new Date()),
    joining_date: dayjs(new Date()),
    offer_date: dayjs(new Date()),
  });
  const router = useRouter();
  const {user} = useContext(UserContext)
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    getShiftgroupName: Yup.string(),
 
  });

  const defaultValues = useMemo(
    () => ({
      getShiftgroupName: currentUser?.getShiftgroupName || '',

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
    getDepartment();
    getEmploye();
    // getShiftgroupName();
    getShiftName();
  }, []);
  const [isemployeLevel, setIsemployeLevel] = useState(false);

  const [employeSwapDetails, setEmployeSwapDetails] = useState([]);
  const [currentEmployeSwapData, setCurrentEmployeSwapData] = useState({});
  const [currentEmployeSwapData1, setCurrentEmployeSwapData1] = useState({});
  const [FromShiftGroup_Name1, setFromShiftGroup_Name1] = useState('');
  const [ToShiftGroup_Name, setToShiftGroup_Name] = useState('');
  const [FromShiftGroup_Name, setFromShiftGroup_Name] = useState('');
  const [ToShiftGroup_Name1, setToShiftGroup_Name1] = useState('');
  //validation
  const [shiftNameError, setShiftNameError] = useState(false);
  const [DepartmentError, setDepartmentError] = useState(false);
  const [DesignationError, setDesignationError] = useState(false);
  const [GradeError, setGradeError] = useState(false);
  const [Employerror, setEmployerror] = useState(false);
  const [departmentData, setDepartmentData] = useState([]);
  const [CurrentDepartmentData, setCurrentDepartmentData] = useState({});
  const [CurrentShiftGroupNameData, setCurrentShiftGroupNameData] = useState({});
  const [CurrentShiftNameData, setCurrentShiftNameData] = useState({});
  const [designationData, setDesignationData] = useState([]);
  const [CurrentDesignationData, setCurrentDesignationData] = useState({});
  const [gradeData, setgradeData] = useState([]);
  const [employeData, setEmployeData] = useState([]);
  const [ShiftGroupName, setShiftGroupName] = useState('');
  const [ShiftName, setShiftName] = useState([]);
  const [CurrentGradeData, setCurrentGradeData] = useState({});
  const [SwitchValue, SetSwitchValue] = useState('');
  const getDepartment = async () => {
    try {
      const data = {
        companyID: (user?.companyID)?user?.companyID : '',
        locationID: (user?.locationID)?user?.locationID : '',
      };
      const response = await instance.post('/getDepartment', data);
      setDepartmentData(response.data.data);
    } catch (error) {
      console.error('Error', error);
      throw error;
    }
  };

  const getDesignation = async (newvalue) => {
    try {
      const data = {
        companyID: (user?.companyID)?user?.companyID : '',
        departmentID: (newvalue != null)? newvalue?.departmentID : 0,
      };
      const response = await instance.post('/onboardingDesignation', data);
      setDesignationData(response.data.data);
    } catch (error) {
      console.error('Error', error);
      throw error;
    }
  };

  const getGrade = async (newvalue) => {
    try {
      const data = {
        designationID: (newvalue != null) ? newvalue?.designationID : 0,
      };
      const response = await instance.post('/onboardingDesignationGrade', data);
      setgradeData(response.data.data);
    } catch (error) {
      console.error('Error', error);
      throw error;
    }
  };
  const getEmploye = async (newvalue) => {
    try {
      const data = {
        companyiD: (user?.companyID)?user?.companyID : '',
      };
      const response = await instance.post('/getEmployeeIDDetails', data);
      setEmployeData(response.data.data);
    } catch (error) {
      console.error('Error', error);
      throw error;
    }
  };
  // const getShiftgroupName = async (newvalue) => {
  //   try {
  //     const data = {
  //       companyId: (user?.companyID)?user?.companyID : '',
  //     };
  //     const response = await instance.post('/getShiftGroupName', data);
  //     setShiftGroupName(response.data.data);
  //   } catch (error) {
  //     console.error('Error', error);
  //     throw error;
  //   }
  // };

  const getShiftName = async (newvalue) => {
    try {
      const data = {
        companyId: (user?.companyID)?user?.companyID : '',
        locationId: (user?.locationID)?user?.locationID : '',
      };
      const response = await instance.post('/getShiftConfig', data);
      setShiftName(response.data.data);
    } catch (error) {
      console.error('Error', error);
      throw error;
    }
  };

  const [currentEmployeData, setCurrentEmployeData] = useState([]);
  const handleSelectEmployeChange = (event, values) => {
    setCurrentEmployeData(values);
    //  setemployeeList ( currentEmployeData[0]?.employeeId);

    // setCommaSepaatedEmployeString(EmployeList.join(','))
  };

  const join = () => {
    const arr = [];
    for (let i = 0; i < currentEmployeData.length; i++) {
      arr.push(currentEmployeData[i].employeeID);
    }
    return arr;
  };

  const onSubmit = handleSubmit(async (data) => {
    console.log('uyfgv',data.shiftGroupName);

    try {
      const data = {
        shiftGroupName: ShiftGroupName,
        shiftConfigurationId:
          CurrentShiftNameData?.shiftConfigurationId !== undefined
            ? parseInt(CurrentShiftNameData?.shiftConfigurationId)
            : null,
        // ShiftTerm:"weekly"
        supervisorId: (user?.employeeID)?user?.employeeID : '',
        toggle: SwitchValue !== '' ? parseInt(SwitchValue) : 0,
        departmentId:
          CurrentDepartmentData?.departmentID !== undefined
            ? JSON.stringify(CurrentDepartmentData?.departmentID)
            : '',
        designationId:
          CurrentDesignationData?.designationID !== undefined
            ? JSON.stringify(CurrentDesignationData?.designationID)
            : '',
        DesignationGradeId:
          CurrentGradeData?.designationGradeID !== undefined
            ? JSON.stringify(CurrentGradeData.designationGradeID)
            : '',
        companyId: (user?.companyID)?user?.companyID : '',
        employeeId: join(),
        locationId: (user?.locationID)? JSON.stringify(user?.locationID ): '',
      };
      console.log(data, 'data111ugsghghh');
      if ( CurrentShiftNameData?.shiftConfigurationId === undefined ) {
        // Display an error or prevent submission
        setShiftNameError(true)
      }
      if ( !isemployeLevel &&  CurrentDepartmentData?.departmentID === undefined) {
        // Display an error or prevent submission
        setDepartmentError(true)
      }
      if ( !isemployeLevel &&  CurrentDesignationData?.designationID === undefined) {
        // Display an error or prevent submission
        setDesignationError(true)
      }
      if ( !isemployeLevel &&   CurrentGradeData?.designationGradeID === undefined) {
        // Display an error or prevent submission
        setGradeError(true)
      }
      if ( isemployeLevel &&   (data.employeeId.length === 0 ) ) {
        // Display an error or prevent submission
        setEmployerror(true)
      }

       else {
        const response = await instance.post('/addShiftDetails', data).then(
          (successData) => {

            getTableData()
            handleClose();
            enqueueSnackbar(response.data.message, { variant: 'success' });
            console.log('sucess', successData);
          },
          (error) => {
            enqueueSnackbar(error.message, { variant: 'Error' });

            console.log('lllll', error);
          }
        );
      }
    } catch (error) {
      console.error(error);
    }
  });
const handleShift = (event)=>{
setShiftGroupName(event.target.value)
}
  return (
    
    <div style={{ paddingTop: '0px' }}>
      {/* <ModalHeader heading="Apply Claim" /> */}
      <FormProvider methods={methods} onSubmit={onSubmit}>
      <ModalHeader heading="Add Employee Shift Here" />  
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
                {/* <RHFSelect name="shiftGroupName" label="Shift Group Name ">

<option value="full_day" >Full Day</option>

<option value="first_half" >First Half</option>

<option value="second_half" >Second Half</option>

</RHFSelect> */}

<RHFTextField
                  required
                  name="shiftGroupName"
                  label="Shift Group Name "
                  onChange={handleShift}
                />

                {/* <RHFSelect name="Select_Shift" label="Select Shift">

<option value="full_day" >Full Day</option>

<option value="first_half" >First Half</option>

<option value="second_half" >Second Half</option>

</RHFSelect> */}
                <Autocomplete
                  disablePortal
                  id="combo-box-dem33"
                  options={ShiftName || []}
                  value={CurrentShiftNameData?.shiftConfigurationId}
                  getOptionLabel={(option) => option.shiftName}
                  onChange={(e, newvalue) => {
                    setCurrentShiftNameData(newvalue);
                    // getDesignation(newvalue)
                    setShiftNameError(newvalue === null);
                  }}
                  sx={{
                    width: { xs: '100%', sm: '50%', md: '100%', lg: '100%' },
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={shiftNameError}
                      helperText={shiftNameError ? 'Please select a shift name.' : ''}
                      label="Select Shift  Name"
                    />
                  )}
                />

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Switch
                    checked={isemployeLevel}
                    // onChange={handleToggleChange}
                    onChange={() => {
                      setIsemployeLevel(!isemployeLevel);
                      const newSwitchValue = isemployeLevel ? 0 : 1;
                      SetSwitchValue(newSwitchValue);
                    }}
                  />
                  {!isemployeLevel ? (
                    <span>Select On Employee</span>
                  ) : (
                    <span>Select On Department</span>
                  )}
                </div>
                {/* <RHFSelect name="departmentId" label="Select Department">

<option value="full_day" >Full Day</option>

<option value="first_half" >First Half</option>

<option value="second_half" >Second Half</option>

</RHFSelect> */}
                {!isemployeLevel && (
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={departmentData || []}
                    value={CurrentDepartmentData?.departmentID}
                    getOptionLabel={(option) => option.departmentName}
                    onChange={(e, newvalue) => {
                      setCurrentDepartmentData(newvalue);
                      setDepartmentError(newvalue === null);
                      getDesignation(newvalue);
                    
                    }}
                    sx={{
                      width: { xs: '100%', sm: '50%', md: '100%', lg: '100%' },
                    }}
                    renderInput={(params) => <TextField 
                      error={DepartmentError}
                      helperText={(DepartmentError)? 'Please select a Depatment.' : ''}
                      {...params} label="Select Department" />}
                  />
                )}
                {/* <RHFSelect name="designationId" label="Select Designation">

<option value="full_day" >HR</option>

<option value="first_half" >Manager</option>

<option value="second_half" >Developer</option>

</RHFSelect> */}
                {!isemployeLevel && (
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo3"
                    options={designationData || []}
                    value={CurrentDesignationData?.designationID}
                    getOptionLabel={(option) => option.designationName}
                    onChange={(e, newvalue) => {
                      setCurrentDesignationData(newvalue);
                      setDesignationError(newvalue === null ? true : false);
                      getGrade(newvalue);
                    }}
                    sx={{
                      width: { xs: '100%', sm: '50%', md: '100%', lg: '100%' },
                    }}
                    renderInput={(params) => <TextField
                    error={DesignationError}
                    helperText={(DesignationError)? "please select Designation" : ""}
                       {...params} label="Select Designation" />}
                  />
                )}
                {!isemployeLevel && (
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={gradeData || []}
                    value={CurrentGradeData?.designationGradeID}
                    getOptionLabel={(option) => option.designationGradeName}
                    onChange={(e, newvalue) => {
                      setCurrentGradeData(newvalue);
                      setGradeError(newvalue === null ? true : false)
                    }}
                    sx={{
                      width: { xs: '100%', sm: '50%', md: '100%', lg: '100%' },
                    }}
                    renderInput={(params) => <TextField
                    error={GradeError}
                    helperText={(GradeError)? "please Select the Grade" : ""}
                       {...params} label="Select Grade" />}
                  />
                )}
                {isemployeLevel && (
                  <Autocomplete
                    multiple
                    disablePortal
                    id="hfh"
                    options={employeData || []}
                    value={currentEmployeData}
                    getOptionLabel={(option) => option.EmployeeName}
                    onChange={handleSelectEmployeChange}
                    sx={{
                      width: { xs: '100%', sm: '50%', md: '100%', lg: '100%' },
                    }}
                    renderInput={(params) => <TextField 
                      error={Employerror}
                      helperText={(Employerror)? "please select the employe" : ""}
                       {...params} label=" Select employee" />}
                  />
                )}
              </Box>

              <Stack
                alignItems="flex-end"
                sx={{ mt: 3, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}
              >
                <Button variant="outlined"  sx={{ mr: '5px' }} onClick={handleClose}>
                  Cancel
                </Button>
                <LoadingButton
                  type="submit"
                  sx={{backgroundColor:'#3B82F6'}}
                  variant="contained"
                  color="primary"
                  loading={isSubmitting}
                >
                  {!currentUser ? 'Create User' : 'Add Employee To Shift'}
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </div>
  );
}

AddEmployeShift.propTypes = {
  currentUser: PropTypes.object,
  handleClose: PropTypes.func,
};
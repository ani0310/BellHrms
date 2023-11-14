import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useMemo, useState ,forwardRef,useImperativeHandle} from 'react';
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
import SnackBar from 'src/nextzen/global/SnackBar';

import formatDateToYYYYMMDD from '../../../global/GetDateFormat';

import { baseUrl } from 'src/nextzen/global/BaseUrl';



const   GeneralInformation=forwardRef((props,ref)=> {

  const [isSameAsPermanent,setIsSameAsPermanent]=useState(false)

 
  const [openSnackBar,setopenSnackBar]=useState(false);
  const [severitySnackbar,setseveritySnackbar]=useState("");
  const [messageSnackbar,setmessageSnackbar]=useState('');


  const currentUser=props.currentUser;

  useImperativeHandle(ref,()=>({
    childFunctionGeneral(){
      onSubmit();




      
    }
  }))

  const handleCloseSnackBar=()=>{
    setopenSnackBar(false)
  }

 

  const [datesUsed, setDatesUsed] = useState({
    date_of_birth: dayjs(new Date()),
    joining_date: dayjs(new Date()),
    offer_date: dayjs(new Date()),
  });
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({

    // companyID: Yup.string(),
    // companyName: Yup.string(),
  
    firstName: Yup.string().required("First name is required"),
    middleName: Yup.string(),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().required("Email is required"),
    contactNumber: Yup.number().required("Contact Number is required"),
    emergencyContactNumber: Yup.number(),
    dateOfBirth: Yup.string(),
    fatherName: Yup.string(),
    motherName: Yup.string(),
    maritalStatus: Yup.string(),
    nationality: Yup.string(),
    religion: Yup.string(),
    bloodGroup: Yup.string(),
    offerDate: Yup.string(),
    joiningDate: Yup.string(),
    pAddressLine1: Yup.string(),
    pAddressLine2: Yup.string(),
    pCity: Yup.string(),
    pState: Yup.string(),
    pPincode: Yup.number(),
    rAddressLine1: Yup.string(),
    rAddressLine2: Yup.string(),
    rCity: Yup.string(),
    rState: Yup.string(),
    rPincode: Yup.number(),
   
    toggle: Yup.bool()
    // first_name: Yup.string().required('First Name is required'),

    // middle_name: Yup.string().required('Middle Name is required'),

    // name: Yup.string().required('Name is required'),
    // email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    // phoneNumber: Yup.string().required('Phone number is required'),
    // address: Yup.string().required('Address is required'),
    // country: Yup.string().required('Country is required'),
    // company: Yup.string().required('Company is required'),
    // state: Yup.string().required('State is required'),
    // city: Yup.string().required('City is required'),
    // role: Yup.string().required('Role is required'),
    // zipCode: Yup.string().required('Zip code is required'),
    // avatarUrl: Yup.mixed().nullable().required('Avatar is required'),
    // not required
    // status: Yup.string(),
    // isVerified: Yup.boolean(),
  });

  const defaultValues = useMemo(
    
    () => ({
   
    companyID: currentUser?.companyID ||'',
    companyName: currentUser?.companyName ||'',
    
    firstName: currentUser?.firstName ||'',
    middleName: currentUser?.middleName ||'',
    lastName: currentUser?.lastName ||'',
    email: currentUser?.email ||'',
    contactNumber: currentUser?.contactNumber ||undefined,
    emergencyContactNumber: currentUser?.emergencyContactNumber || undefined,
    dateOfBirth: currentUser?.dateOfBirth ||'',
    fatherName: currentUser?.fatherName ||'',
    motherName: currentUser?.motherName ||'',
    maritalStatus: currentUser?.maritalStatus ||'',
    nationality: currentUser?.nationality ||'',
    religion: currentUser?.religion ||'',
    bloodGroup: currentUser?.bloodGroup ||'',
    offerDate: currentUser?.offerDate ||'',
    joiningDate: currentUser?.joiningDate ||'',
    pAddressLine1: currentUser?.pAddressLine1 ||'',
    pAddressLine2: currentUser?.pAddressLine2 ||'',
    pCity: currentUser?.pCity ||'',
    pState: currentUser?.pState ||'',
    pPincode: currentUser?.pPincode || undefined,
    rAddressLine1: currentUser?.rAddressLine1 ||'',
    rAddressLine2: currentUser?.rAddressLine2 ||'',
    rCity: currentUser?.rCity ||'',
    rState: currentUser?.rState ||'',
    rPincode: currentUser?.rPincode || undefined,
    
    toggle: currentUser?.toggle || false,
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

  const ApiHitGeneralInformation=(dataGeneral)=>{
        const data1 = dataGeneral;
        let emp_id;
        const config = {
          method: 'POST',
          maxBodyLength: Infinity,
          url: `${baseUrl}onBoarding`,
          headers: { 
         'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk2Nzc5NjF9.0-PrJ-_SqDImEerYFE7KBm_SAjG7sjqgHUSy4PtMMiE',
             
            'Content-Type': 'text/plain'
          },
          data : data1
        };
        
        axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
         
          console.log(response.data.empID,'nithinnn')
          localStorage.setItem("employeeIdCreated",response.data?.empID)
          
          props.nextStep();
          props.handleCallSnackbar(response.data.message,"success")
          console.log(response.data.message,'response.data.message')
        })
        .catch((error) => {
          console.log(error);
          setopenSnackBar(true);
          setseveritySnackbar("warning");
          setmessageSnackbar("User Alredy Present")
        });

  }

  const onSubmit = handleSubmit(async (data) => {
    console.log(data,'general information');

    try {
      data.companyID = 'COMP1';
      data.companyName = 'infobell';

      // const FinalDal=data+"company_id": "0001"+"company_name": "infbell",
      data.offerDate = formatDateToYYYYMMDD(datesUsed?.offer_date);
      data.joiningDate = formatDateToYYYYMMDD(datesUsed?.joining_date);
      data.dateOfBirth = formatDateToYYYYMMDD(datesUsed?.date_of_birth);

      if(isSameAsPermanent){
        data.rAddressLine1=data.pAddressLine1;
        data.rAddressLine2=data.pAddressLine2
        data.rCity=data.pCity;
        data.rState=data.pState;
        data.rPincode=data.pPincode;
      }

     

      
       ApiHitGeneralInformation(data);
      // const response = await axios.post('http://192.168.152.94:3001/erp/onBoarding', data).then(
      //   (successData) => {
      //     console.log('sucess', successData);
      //     console.log(props)
      //     if(props){

      //       props.nextStep();
      //     }
      //   },
      //   (error) => {
      //     console.log('lllll', error);
      //   }
      // );

      

      // await new Promise((resolve) => setTimeout(resolve, 500));
      // reset();
      // enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!');
      // router.push(paths.dashboard.user.list);
      // console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('avatarUrl', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );
  return (
    <div style={{ paddingTop: '20px' }}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid xs={12} md={4}>
            <Card sx={{ pt: 10, pb: 5, px: 3 }}>
             

              <Box sx={{ mb: 5 }}>
                <RHFUploadAvatar
                  name="avatarUrl"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  helperText={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 3,
                        mx: 'auto',
                        display: 'block',
                        textAlign: 'center',
                        color: 'text.disabled',
                      }}
                    >
                      Allowed *.jpeg, *.jpg, *.png, *.gif
                      <br /> max size of {fData(3145728)}
                    </Typography>
                  }
                />
              </Box>

              {currentUser && (
                <FormControlLabel
                  labelPlacement="start"
                  control={
                    <Controller
                      name="toggle"
                      control={control}
                      render={({ field }) => (
                        <Switch
                          {...field}
                          checked={field.value ===true}
                          onChange={(event) =>
                            field.onChange(event.target.checked ? true : false)
                          }
                        />
                      )}
                    />
                  }
                  label={
                    <>
                      <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                        Credentials
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Create Credentials
                      </Typography>
                    </>
                  }
                  sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
                />
              )}

             
            </Card>
          </Grid>

          <Grid  xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                }}
              >

                
                
                <RHFTextField name="firstName" label="First Name* " />
                <RHFTextField name="middleName" label="Middle Name " />
                <RHFTextField name="lastName" label="Last Name* " />
                <RHFTextField name="email" label="Email Id* " />
                <RHFTextField name="contactNumber" label="Contact Number* " />
                <RHFTextField name="emergencyContactNumber" label="Emergency Contact Number " />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="Date Of Birth*"
                      value={datesUsed?.date_of_birth}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDatesUsed((prev) => ({
                          ...prev,
                          date_of_birth: newValue,
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <RHFTextField name="fatherName" label="Father Name " />
                <RHFTextField name="motherName" label="Mother Name " />
                <RHFTextField name="maritalStatus" label="Martial Status " />
                <RHFTextField name="nationality" label="Nationality " />
                <RHFTextField name="religion" label="Religion " />
                <RHFTextField name="bloodGroup" label="Blood Group " />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="Offer Date"
                      value={datesUsed?.date_of_birth}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDatesUsed((prev) => ({
                          ...prev,
                          offer_date: newValue,
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="Joining Date"
                      value={datesUsed?.date_of_birth}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        console.log(newValue,'newValuenewValuenewValue')
                        setDatesUsed((prev) => ({
                          ...prev,
                          joining_date: newValue,
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                
                <RHFTextField name="pAddressLine1" label="Permanent Address Line1 " />
                <RHFTextField name="pAddressLine2" label="Permanent Address Line2 " />
                <RHFTextField name="pCity" label="City " />
                <RHFTextField name="pState" label="State " />
                <RHFTextField name="pPincode" label="Pincode " />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Switch checked={isSameAsPermanent} onChange={()=>{setIsSameAsPermanent(!isSameAsPermanent)}} />
                  <span>Same As Permanent Address</span>
                </div>
                { !isSameAsPermanent && <>
                <RHFTextField name="rAddressLine1" label="Resendial Address Line1" />
                <RHFTextField name="rAddressLine2" label="Resendial Address Line2" />
                <RHFTextField name="rCity" label="Resendial City " />
                <RHFTextField name="rState" label="Resendial State " />
                <RHFTextField name="rPincode" label="Resendial Pincode" />
                </>
                }
           

                {/* <RHFTextField name="name" label="Full Name" />
                <RHFTextField name="email" label="Email Address" />
                <RHFTextField name="phoneNumber" label="Phone Number" />

                <RHFAutocomplete
                  name="country"
                  label="Country"
                  options={countries.map((country) => country.label)}
                  getOptionLabel={(option) => option}
                  isOptionEqualToValue={(option, value) => option === value}
                  renderOption={(props, option) => {
                    const { code, label, phone } = countries.filter(
                      (country) => country.label === option
                    )[0];

                    if (!label) {
                      return null;
                    }

                    return (
                      <li {...props} key={label}>
                        <Iconify
                          key={label}
                          icon={`circle-flags:${code.toLowerCase()}`}
                          width={28}
                          sx={{ mr: 1 }}
                        />
                        {label} ({code}) +{phone}
                      </li>
                    );
                  }}
                />

                <RHFTextField name="state" label="State/Region" />
                <RHFTextField name="city" label="City" />
                <RHFTextField name="address" label="Address" />
                <RHFTextField name="zipCode" label="Zip/Code" />
                <RHFTextField name="company" label="Company" />
                <RHFTextField name="role" label="Role" /> */}
              </Box>

             
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
      <SnackBar open={openSnackBar} severity={severitySnackbar} message={messageSnackbar} handleCloseSnackBar={handleCloseSnackBar}/>
    </div>
  );
})

GeneralInformation.propTypes = {
  currentUser: PropTypes.object,
  nextStep: PropTypes.any,
};

export default GeneralInformation;
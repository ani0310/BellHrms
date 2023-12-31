import PropTypes from 'prop-types';
import * as Yup from 'yup';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Iconify from 'src/components/iconify/iconify';
import { useCallback, useMemo, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// @mui
import dayjs from 'dayjs';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import axios from 'axios';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DatePicker, DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { formatDateToYYYYMMDD, formatDate } from 'src/nextzen/global/GetDateFormat';
import { Alert, Snackbar } from '@mui/material';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import ModalHeader from 'src/nextzen/global/modalheader/ModalHeader';

export default function LeaveTypeForm({ currentUser, getTableData }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset1();
  };
  const [openEdit, setOpenEdit] = useState(false);
  const handleCloseEdit = () => setOpenEdit(false);
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };
  const [gender, setGender] = useState(['Male','Female']);
  const [count, setCount] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const NewUserSchema1 = Yup.object().shape({
    totalNumberLeave: Yup.number().required('Total Number Of Leaves is Required'),
    leaveTypeName: Yup.string().required('Term Type is Required'),
    upperCapLimit: Yup.number().required('El Upper Cap Limit is Required'),
    leaveTakeRange: Yup.number().required('El Taken Range is Required'),
    // gender: Yup.string().required('Select Gender'),
  });

  const [formData, setFormData] = useState({});
  const [locationType, setLocationType] = useState([]);
  const [selectedDates, setSelectedDates] = useState(dayjs());

  const defaultValues1 = useMemo(
    () => ({
      totalNumberLeave: currentUser?.totalNumberLeave || null,
      leaveTypeName: currentUser?.leaveTypeName || null,
      upperCapLimit: currentUser?.upperCapLimit || null,
      leaveTakeRange: currentUser?.leaveTakeRange || null,
      // gender: currentUser?.gender || null,
    }),
    [currentUser]
  );

  const methods1 = useForm({
    resolver: yupResolver(NewUserSchema1),
    defaultValues: defaultValues1, // Use defaultValues instead of defaultValues1
  });

  const {
    setValue: setValue1,
    handleSubmit: handleSubmit1,
    formState: { isSubmitting: isSubmitting1 },
    reset: reset1,
  } = methods1;

  // useEffect(() => {
  //   const getLeavePeriod = async () => {
  //     try {
  //       const defaultPayload = {
  //         count: 5,
  //         page: 0,
  //         search: '',
  //         companyId: JSON.parse(localStorage.getItem('userDetails'))?.companyID,
  //         externalFilters: {
  //           leavePeriodType: '',
  //         },
  //         sort: {
  //           key: 1,
  //           orderBy: '',
  //         },
  //       };
  //       const response = await axios.post(baseUrl + '/getAllLeavePeriod', defaultPayload);

  //       if (response?.data?.code === 200) {
  //         // setSnackbarSeverity('success');
  //         // setSnackbarMessage(response?.data?.message);
  //         // setSnackbarOpen(true);
  //         handleClose();
  //         console.log('success', response);
  //       }

  //       if (response?.data?.code === 400) {
  //         // setSnackbarSeverity('error');
  //         // setSnackbarMessage(response?.data?.message);
  //         // setSnackbarOpen(true);
  //         handleClose();
  //         console.log('error', response);
  //       }
  //     } catch (error) {
  //       // setSnackbarSeverity('error');
  //       // setSnackbarMessage('Error While Adding Leave Type. Please try again.');
  //       // setSnackbarOpen(true);
  //       handleClose();
  //       console.log('error', error);
  //     }
  //   };

  //   // Call the async function immediately
  //   getLeavePeriod();
  // }, []); // Empty dependency array to trigger this effect only on mount

  //   const values = watch();

  const onSubmit1 = handleSubmit1(async (data) => {
    data.companyId = localStorage.getItem('companyID');
    // data.locationID = formData?.Location?.locationID;
    // data.leavePeriodID = console.log('submitted data111', data);
    data.gender = gender
    try {
      const response = await axios.post(baseUrl + '/addLeaveType1', data);
      if (response?.data?.code === 200) {
        setSnackbarSeverity('success');
        setSnackbarMessage(response?.data?.message);
        setSnackbarOpen(true);
        handleClose();
        getTableData();
        console.log('sucess', response);
      }
      if (response?.data?.code === 400) {
        setSnackbarSeverity('error');
        setSnackbarMessage(response?.data?.message);
        setSnackbarOpen(true);
        handleClose();
        console.log('sucess', response);
      }
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Error While Adding Leave Type. Please try again.');
      setSnackbarOpen(true);
      handleClose();
      console.log('error', error);
    }
  });
  const handleDateChanges = (date) => {
    setSelectedDates(date);
  };

  const handleAutocompleteChange = (name, selectedValue, selectedOption) => {
    console.log(name, selectedValue, selectedOption);
    setFormData({
      ...formData,
      [name]: selectedValue,
      locationID: selectedOption?.locationID,
      locationName: selectedOption?.locationName,
    });
  };
  const snackBarAlertHandleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
    setOpen(false);
  };
  const genders = [
    {
      type: 'Male',
    },
    {
      type: 'Female',
    },
  ];
  const defaultSelectedGenders = ['Male', 'Female'];
  const handleGenderChange = (event,value) =>{
    console.log(value,'valueeeeee');
    setGender(value)
  }
  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={snackBarAlertHandleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Alert
          onClose={snackBarAlertHandleClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Button
        onClick={handleOpen}
        variant="contained"
        startIcon={<Iconify icon="mingcute:add-line" />}
        sx={{ margin: '20px', color: 'white', backgroundColor: '#3B82F6' }}
      >
        Add Leave Type
      </Button>
      <Dialog
        fullWidth
        maxWidth={false}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { maxWidth: 720 },
        }}
      >
        <FormProvider methods={methods1} onSubmit={onSubmit1}>
          <ModalHeader heading="Add Leave Type" />
          <DialogContent>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              marginTop={2}
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="leaveTypeName" label="Leave Name" />
              <RHFTextField name="totalNumberLeave" label="Total Number Of Leaves" />

              <RHFTextField name="upperCapLimit" label="Upper Cap Limit" />

              <RHFTextField name="leaveTakeRange" label="Leave Take Range" />
              <Autocomplete
                multiple
                name="gender"
                label="Gender"
                options={genders.map((name) => name.type)}
                defaultValue={defaultSelectedGenders}
                onChange={(event,value) => {
                  handleGenderChange(event, value); // Handle state update
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Gender" variant="outlined" />
                )}
              />
            </Box>
          </DialogContent>

          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            {/* <LoadingButton
                type="submit"
                variant="contained"
                onClick={onSubmit1}
                loading={isSubmitting1}
              >
                Save
              </LoadingButton> */}
            <Button
              sx={{ backgroundColor: '#3B82F6' }}
              type="submit"
              variant="contained"
              onClick={onSubmit1}
            >
              Save
            </Button>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
}

LeaveTypeForm.propTypes = {
  currentUser: PropTypes.object,
};

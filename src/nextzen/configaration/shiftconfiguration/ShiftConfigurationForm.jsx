import PropTypes from 'prop-types';
import * as Yup from 'yup';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Iconify from 'src/components/iconify/iconify';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// @mui
import dayjs from 'dayjs';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import axios from 'axios';
import { MobileTimePicker } from '@mui/x-date-pickers';

export default function ShiftConfigurationForm({ currentUser }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset1();
  };
  const [startTime, setStartTime] = useState(dayjs("2022-04-17T15:30")); // State for Start Time
  const [endTime, setEndTime] = useState(dayjs("2022-04-17T15:30"));
  const NewUserSchema1 = Yup.object().shape({
    ShiftName: Yup.string().required('Shift Name is Required'),
    ShiftTerm: Yup.string().required('Shift Term is Required'),
    LocationId: Yup.number().required('Location Id is Required'),
  });

  const defaultValues1 = useMemo(
    () => ({
      ShiftName: currentUser?.ShiftName || null,
      ShiftTerm: currentUser?.ShiftTerm || null,
      LocationId: currentUser?.LocationId || null,
    }),
    [currentUser]
  );

  const methods1 = useForm({
    resolver: yupResolver(NewUserSchema1),
    defaultValues: defaultValues1, // Use defaultValues instead of defaultValues1
  });

  const {
    setValue:setValue1,
    handleSubmit: handleSubmit1,
    formState: { isSubmitting: isSubmitting1 },
    reset: reset1,
  } = methods1;
  const ShiftNames=[
    {type:'General'},
    {type:'Morging'},
    {type:'AfterNoon'},
    {type:'Night'},

  ]

  const onSubmit1 = handleSubmit1(async (data) => {
    data.companyId=localStorage.getItem('companyID')
    data.startTime = startTime.format('HH:mm:ss'); // Append Start Time
    data.endTime = endTime.format('HH:mm:ss'); // Append End Time
    console.log('submitted data111', data);

    try {
      const response = await axios.post('http://192.168.1.115:3000/erp/addShiftConfig', data);
      console.log('sucess',response);
    } catch (error) {
      console.log('error', error);
    }
  });


  return (
    <>
      <Button
        onClick={handleOpen}
        variant="contained"
        startIcon={<Iconify icon="mingcute:add-line" />}
        sx={{ margin: '20px' }}
      >
        Add ExpensiveConfig
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
          <DialogTitle>Add ExpensiveConfig</DialogTitle>
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
              <RHFAutocomplete  label="Shift Name" name="ShiftName" options={ShiftNames.map((ShiftName)=>ShiftName.type)}/>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileTimePicker
              label="Start Time"
              defaultValue={dayjs("2022-04-17T15:60")}
              onChange={(newValue) => setStartTime(newValue)}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileTimePicker
              label="End Time"
              defaultValue={dayjs("2022-04-17T15:30")}
              onChange={(newValue) => setEndTime(newValue)}
            />
          </LocalizationProvider>
          <RHFTextField  label="Shift Term" name="ShiftTerm" />

          <RHFTextField  label="Location Id" name="LocationId" />
            </Box>
          </DialogContent>

          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <LoadingButton
              type="submit"
              variant="contained"
              onClick={onSubmit1}
              loading={isSubmitting1}
            >
              Save
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
}

ShiftConfigurationForm.propTypes = {
  currentUser: PropTypes.object,
};
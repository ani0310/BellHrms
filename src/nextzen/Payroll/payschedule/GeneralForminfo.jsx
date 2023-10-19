import PropTypes from 'prop-types';
import * as Yup from 'yup';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
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

export default function GeneralForminfo({ currentUser }) {
  const [datesUsed, setDatesUsed] = useState({
    date_of_birth: dayjs(new Date()),
    joining_date: dayjs(new Date()),
    offer_date: dayjs(new Date()),
  });
  //   const [datesUsed, setDatesUsed] = useState({
  //     date_of_birth: dayjs(new Date()),
  //     joining_date: dayjs(new Date()),
  //     offer_date: dayjs(new Date()),
  //   });
  //   const router = useRouter();

  //   const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const NewUserSchema = Yup.object().shape({
    employee_type: Yup.string().required('Employee Type is Required'),
    payschedule_type: Yup.string().required('Payschedule Type is Required'),
    pay_type: Yup.string().required('Pay Type is Required'),
    basic_pay: Yup.number().required('Basic Pay is Required'),
    hra: Yup.number().required('HRA is Required'),
    da: Yup.number().required('DA is Required'),
    employee_pf: Yup.number().required('Employee PF is Required'),
    employer_pf: Yup.number().required('Employer PF is Required'),
    lta: Yup.number().required('LTA is Required'),
    esic: Yup.number().required('esic is Required'),
    tds: Yup.number().required('TDS is Required'),
  });

  const defaultValues = useMemo(
    () => ({
      employee_type: currentUser?.employee_type || '',
      payschedule_type: currentUser?.payschedule_type || '',
      pay_type: currentUser?.pay_type || '',
      basic_pay: currentUser?.basic_pay || null,
      hra: currentUser?.hra || null,
      da: currentUser?.da || null,
      employee_pf: currentUser?.employee_pf || null,
      employer_pf: currentUser?.employer_pf || null,
      lta:currentUser?.lta || null,
      esic:currentUser?.esic || null,
      tds:currentUser?.tds || null
    }),
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });
  const payscheduleTypes = [{ type: 'Permanent' }, { type: 'Temporary' }];
  //   const m2 = useForm();
  const payTypes = [{ type: 'Weekly' }, { type: 'Monthly' }];
  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  //   const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    console.log('uyfgv');

    try {
      const response = await axios.post('http://localhost:8081/onboarding', data).then(
        (successData) => {
          console.log('sucess', successData);
        },
        (error) => {
          console.log('lllll', error);
        }
      );

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
    <>
      <Button onClick={handleOpen} sx={{}}>Add PayRoll</Button>
      <Dialog
        fullWidth
        maxWidth={false}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { maxWidth: 720 },
        }}
      >
        <FormProvider methods={methods} onSubmit={onSubmit}>
          {/* methods={methods} onSubmit={onSubmit} */}
          <DialogTitle>Add PayRoll</DialogTitle>

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
              <RHFTextField name="employee_type" label="Employee Type " />
              <RHFAutocomplete
                name="payschedule_type"
                label="Pay Schedule Type"
                options={payscheduleTypes.map((payscheduleType) => payscheduleType.type)}
              />
              <RHFAutocomplete
                name="pay_type"
                label="Pay Type"
                options={payTypes.map((payType) => payType.type)}
              />
              <RHFTextField name="basic_pay" label="Basic Pay %" />
              <RHFTextField name="hra" label="HRA %" />
              <RHFTextField name="da" label="DA %" />
              <RHFTextField name="employee_pf" label="Employee PF %" />
              <RHFTextField name="employer_pf" label="Employer PF %" />
              <RHFTextField name="lta" label="LTA %"/>
              <RHFTextField name="esic" label="ESIC %"/>
              <RHFTextField name="Tds" label="TDS %" />
            </Box>
          </DialogContent>

          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>

            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Save
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
}
GeneralForminfo.propTypes = {
  currentUser: PropTypes.object,
};

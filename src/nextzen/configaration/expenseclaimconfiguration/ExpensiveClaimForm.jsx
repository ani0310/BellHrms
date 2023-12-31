// import PropTypes from 'prop-types';
// import * as Yup from 'yup';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import Dialog from '@mui/material/Dialog';
// import Button from '@mui/material/Button';
// import Iconify from 'src/components/iconify/iconify';
// import { useCallback, useMemo, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
// // @mui
// import dayjs from 'dayjs';
// import LoadingButton from '@mui/lab/LoadingButton';
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
// import Grid from '@mui/material/Unstable_Grid2';
// import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
// import axios from 'axios';
// import { baseUrl } from 'src/nextzen/global/BaseUrl';
// import { Alert, Snackbar } from '@mui/material';
// import ModalHeader from 'src/nextzen/global/modalheader/ModalHeader';

// export default function ExpenseClaimForm({ currentUser }) {
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarSeverity, setSnackbarSeverity] = useState('success');
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [expenseName,setExpenseName] = useState('');
//   const [open, setOpen] = useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => {
//     setOpen(false);
//     reset1();
//   };
//   const NewUserSchema1 = Yup.object().shape({
//     expense_name: Yup.string().required('Expense Name is Required'),
//   });

//   const defaultValues1 = useMemo(
//     () => ({
//       expense_name: currentUser?.expense_name || null,
//     }),
//     [currentUser]
//   );

//   const methods1 = useForm({
//     resolver: yupResolver(NewUserSchema1),
//     defaultValues: defaultValues1, 
//   });

//   const {
//     setValue: setValue1,
//     handleSubmit: handleSubmit1,
//     formState: { isSubmitting: isSubmitting1 },
//     reset: reset1,
//   } = methods1;


//   const onSubmit1 = handleSubmit1(async (data) => {
//     data.companyId = 'COMP2';
//     console.log('submitted data111', data);

//     try {
//       const response = await axios.post(baseUrl + '/', data);
//       if (response?.data?.code === 200) {
//         handleClose();
//         setSnackbarSeverity('success');
//         setSnackbarMessage('Shift Configuration Added Succuessfully!');
//         setSnackbarOpen(true);
//         console.log('sucess', response);
//       }
//     } catch (error) {
//       setOpen(false);
//       setSnackbarSeverity('error');
//       setSnackbarMessage('Error While Adding Shift Configuration. Please try again.');
//       setSnackbarOpen(true);
//       console.log('error', error);
//     }
//   });
//   const snackBarAlertHandleClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setSnackbarOpen(false);
//     setOpen(false);
//   };
//   const handleExpenseName=(value)=>{
//     setExpenseName(value)
    
//   }
//   let arr;
//     arr.push(expenseName)
//    console.log(arr,'kk')
//   return (
//     <>
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={4000}
//         onClose={snackBarAlertHandleClose}
//         anchorOrigin={{
//           vertical: 'top',
//           horizontal: 'right',
//         }}
//       >
//         <Alert
//           onClose={snackBarAlertHandleClose}
//           severity={snackbarSeverity}
//           sx={{ width: '100%' }}
//         >
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//       <Button
//         onClick={handleOpen}
//         variant="contained"
//         startIcon={<Iconify icon="mingcute:add-line" />}
//         sx={{ margin: '20px', color: 'white', backgroundColor: '#3B82F6' }}
//       >
//         Add Expensive
//       </Button>
//       <Dialog
//         fullWidth
//         maxWidth={false}
//         open={open}
//         onClose={handleClose}
//         PaperProps={{
//           sx: { maxWidth: 420 },
//         }}
//       >
//         <FormProvider methods={methods1} onSubmit={onSubmit1}>
//           <ModalHeader heading="Add Expense Configuration" />
//           <DialogContent>
//           <Box
//   rowGap={3}
//   columnGap={2}
//   display="grid"
//   marginTop={2}
//   gridTemplateColumns={{
//     xs: 'repeat(1, 1fr)',
//     sm: 'repeat(2, 1fr)',
//   }}
//   alignItems="center" // Align items vertically in the center
// >
//   <div style={{ gridColumn: '1 / -1', textAlign: 'center' }}> {/* Centering the field */}
//     <RHFTextField
//       name="expense_name" 
//       label="Expense Name" 
//       value={expenseName}
//       onChange={(e) => handleExpenseName(e.target.value)}
//       sx={{ width: '80%', margin: '0 auto' }} // Adjust width and center the text field
//     />
//   </div>
// </Box>

//           </DialogContent>

//           <DialogActions>
//             <Button variant="outlined" onClick={handleClose}>
//               Cancel
//             </Button>
//             {/* <LoadingButton
//               type="submit"
//               variant="contained"
//               onClick={onSubmit1}
//               loading={isSubmitting1}
//             >
//               Save
//             </LoadingButton> */}
//             <Button
//               sx={{ backgroundColor: '#3B82F6' }}
//               type="submit"
//               variant="contained"
//               onClick={onSubmit1}
//             >
//               Save
//             </Button>
//           </DialogActions>
//         </FormProvider>
//       </Dialog>
//     </>
//   );
// }

// ExpenseClaimForm.propTypes = {
//   currentUser: PropTypes.object,
// };

import * as React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Iconify from 'src/components/iconify/iconify';
import { useCallback, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import { BasicTable } from 'src/nextzen/Table/BasicTable';
import { Alert, Snackbar } from '@mui/material';
import axios from 'axios';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FormProvider from 'src/components/hook-form/form-provider';
import { RHFTextField } from 'src/components/hook-form';
import { LoadingButton } from '@mui/lab';
import ModalHeader from 'src/nextzen/global/modalheader/ModalHeader';

export default function CompoffConfigurationTable({currentUser}) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset1();
  };
  const handleClose2 = () => {
    setOpen(false);
    reset2();
  };
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => setOpenEdit(false);
  const [editData, setEditData] = useState();
  const [showEdit, setShowEdit] = useState(false);
    const TABLE_HEAD = [
      { id: 'compensantoryPolicies', label: 'Compensatory', type: 'text', minWidth:280 },
      { id: 'expiryDays', label: 'Expiry Days', type: 'text' , minWidth:280},
      { id: 'amount', label: 'Amount', type: 'text' , minWidth:280},
    ];
    const actions = [
      { name: 'Edit', icon: 'solar:pen-bold', path: 'jjj' ,endpoint:'/'},
      // { name: 'Delete', icon: 'solar:trash-bin-trash-bold', path: 'jjj' },
    ];
    // const bodyContent = [
    //   {
    //     employeeType: 'Permanent',
    //     payscheduleType: 'Weekly',
    //     payType: 'CTC',
    //     basicPay: '40',
    //     hra: '20',
    //     da: '8',
    //     employeePf: '6',
    //     employerPf: '6',
    //     tds: '20',
    //   },
    // ];
    const defaultPayload = 
    {
      "count": 5,
      "page": 0,
      "search": "",
      "companyId": "COMP1",
      "externalFilters": {
        "compensantoryPolicies": ""
      },
      "sort": {
        "key": 1,
        "orderBy": ""
      }
    };
    const onClickActions = (rowdata, event) => {
      if (event?.name === 'Edit') {
        setEditData(rowdata);
        handleOpenEdit();
        buttonFunction(rowdata, event);
      } else if (event?.name === 'Delete') {
        deleteFunction(rowdata, event);
      }
    };
    const buttonFunction = (rowdata) => {
      setShowEdit(true);
      setEditData(rowdata);
      console.log(rowdata, 'rowdataaaaaaaaaaaaaa');
    };
    const deleteFunction = async (rowdata, event) => {
      console.log('iam here ');
      try {
        console.log(rowdata, 'rowData:::::');
        const data = {
            companyID:"COMP1",
             compensantoryConfigurationID: rowdata.compensantoryConfigurationID,
        };
        const response = await axios.post( baseUrl+'/deleteCompensantoryConfiguration', data);
        if(response?.data?.code===200  ){
          setSnackbarSeverity('success');
           setSnackbarMessage(response?.data?.message);
           setSnackbarOpen(true);      
        console.log('sucess', response);
  
        }
        if(response?.data?.code===400  ){
          setSnackbarSeverity('success');
          setSnackbarMessage(response?.data?.message);
           setSnackbarOpen(true);
        
        console.log('sucess', response);
  
        }
      
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Error While Deleting Leave Type. Please try again.');
      setSnackbarOpen(true);
     console.log('error', error);
   }
    };
    const snackBarAlertHandleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
    setSnackbarOpen(false)
      setOpen(true);
    };
    const [selectedOption, setSelectedOption] = useState(null); // State to manage the selected option in Autocomplete
  const [isTextFieldVisible, setTextFieldVisible] = useState(false);
  const handleAutocompleteChange = (event, newValue) => {
    setSelectedOption(newValue);

    // Check if the selected option should show the text field
    if (newValue) {
      if (newValue.type === 'Leave') {
        setTextFieldVisible(true);
      } else if (newValue.type === 'Incashment') {
        setTextFieldVisible(false);
      }
    }
  };

    const getOptionLabel = (compensatory) => compensatory.type;

    const NewUserSchema1 = Yup.object().shape({
      expiryDays: Yup.number().required('Expiry Days is Required'),
    });
  
    const NewUserSchema2 = Yup.object().shape({
      amount: Yup.number().required('Amount is Required'),
    });
  
    const defaultValues1 = useMemo(
      () => ({
        expiryDays: currentUser?.expiryDays || null,
  
      }),
      [currentUser]
    );
  
    const defaultValues2 = useMemo(
      () => ({
        amount: currentUser?.amount || null,
  
      }),
      [currentUser]
    );
  
    const methods1 = useForm({
      resolver: yupResolver(NewUserSchema1),
      defaultValues: defaultValues1, // Use defaultValues instead of defaultValues1
    });
  
    const methods2 = useForm({
      resolver: yupResolver(NewUserSchema2),
      defaultValues: defaultValues2, // Use defaultValues instead of defaultValues2
    });
  
    const {
      setValue: setValue1,
      handleSubmit: handleSubmit1,
      formState: { isSubmitting: isSubmitting1 },
      reset: reset1,
    } = methods1;
  
    const {
      setValue: setValue2,
      handleSubmit: handleSubmit2,
      formState: { isSubmitting: isSubmitting2 },
      reset: reset2,
    } = methods2;
  
    const compensatorytypes1 = [{ type: 'Leave' }, { type: 'Incashment' }];
  
  
    const onSubmit1 = handleSubmit1(async (data) => {
      data.companyId = 'COMP1';
      data.compensantoryPolicies = selectedOption?.type;
  
      console.log('submitted data111', data);
  
      try {
        const response = await axios.post(
          baseUrl+'/addCompensantoryConfiguration',
          data
        );
        console.log('sucess', response);
      } catch (error) {
        console.log('error', error);
      }
    });
  
    const onSubmit2 = handleSubmit2(async (data) => {
      data.companyId = 'COMP1';
      data.compensantoryPolicies = selectedOption?.type;
      console.log('submitted data2222', data);
  
      try {
        const response = await axios.post(
          baseUrl+'/addCompensantoryConfiguration',
          data
        );
        console.log('sucess', response);
      } catch (error) {
        console.log('error', error);
      }
    });

    const [isLargeDevice, setIsLargeDevice] = React.useState(window.innerWidth > 530);
  
    React.useEffect(() => {
      const handleResize = () => {
        setIsLargeDevice(window.innerWidth > 530);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
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
    <Alert onClose={snackBarAlertHandleClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
      {snackbarMessage}
    </Alert>
  </Snackbar>
  <Dialog
        fullWidth
        maxWidth={false}
        open={openEdit}
        onClick={handleOpen}
        onClose={handleClose}
        PaperProps={{
          sx: { maxWidth: 420 },
        }}
      >
        {isTextFieldVisible ? (
          <FormProvider methods={methods1} onSubmit={onSubmit1}>
            <ModalHeader heading="Edit Comoff Config" />
            
            <DialogContent>
            <Autocomplete
              disablePortal
              name="compensatory"
              id="combo-box-demo"
              options={compensatorytypes1}
              getOptionLabel={getOptionLabel}
              value={selectedOption?.compensantoryPolicies} // Use selectedOption or an empty string
              onChange={handleAutocompleteChange}
              sx={{ width: 300, padding: '8px' }}
              renderInput={(params) => <TextField {...params} label="Compensatory" />}
            />
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
                <RHFTextField
                  name="expiryDays"
                  label="Expiry Days"
                  sx={{width:280,marginLeft:1.5}}
                  value={editData?.expiryDays}
                />
              </Box>
            </DialogContent>

            <DialogActions>
              <Button variant="outlined"onClick={handleCloseEdit}>
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
             sx={{backgroundColor:'#3B82F6'}}
            type="submit"
              variant="contained"
              onClick={onSubmit1}
              >
            Save
            </Button>
            </DialogActions>
          </FormProvider>
        ) : (
          <FormProvider methods={methods2} onSubmit={onSubmit2}>
           <ModalHeader heading="Edit Comoff Config" />
            
            <DialogContent>
            <Autocomplete
              disablePortal
              name="compensatory"
              id="combo-box-demo"
              options={compensatorytypes1}
              getOptionLabel={getOptionLabel}
              value={selectedOption?.compensantoryPolicies} // Use selectedOption or an empty string
              onChange={handleAutocompleteChange}
              sx={{ width: 300, padding: '8px' }}
              renderInput={(params) => <TextField {...params} label="Compensatory" />}
            />
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

                  <RHFTextField
                    name="amount"
                    label="Amount"
                    sx={{width:280,marginLeft:1.5}}
                    value={editData?.amount}
                  />
                
              </Box>
            </DialogContent>

            <DialogActions>
              <Button variant="outlined" onClick={handleCloseEdit}>
                Cancel
              </Button>
              {/* <LoadingButton
                type="submit"
                variant="contained"
                onClick={onSubmit2}
                loading={isSubmitting2}
              >
                Save
              </LoadingButton> */}
               <Button 
             sx={{backgroundColor:'#3B82F6'}}
            type="submit"
              variant="contained"
              onClick={onSubmit2}
              >
            Save
            </Button>
            </DialogActions>
          </FormProvider>
        )}
      </Dialog>
        <BasicTable
          headerData={TABLE_HEAD}
          endpoint="/getallCompensantoryConfiguration"
          defaultPayload={defaultPayload}
          rowActions={actions}
          filterName="CompoffFilterSearch"
          onClickActions={onClickActions}
        />
      </>
    );
  }
  CompoffConfigurationTable.propTypes = {
    currentUser: PropTypes.object,
  };
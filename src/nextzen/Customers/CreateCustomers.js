import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useContext, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';

import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

import instance from 'src/api/BaseURL';

import { Button, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { createCustomerAPI, updateCustomerAPI } from 'src/api/Accounts/Customers';
import SnackBarComponent from '../global/SnackBarComponent';
import ModalHeader from '../global/modalheader/ModalHeader';
import UserContext from '../context/user/UserConext';

export default function CreateCustomers({
  currentData,
  handleClose,
  getTableData,
  handleCountChange,
}) {
  const { user } = useContext(UserContext);
  const newUserSchema = Yup.object().shape({
    customer_name: Yup.string().required('Customer Name is Required'),
    customer_company_name: Yup.string().required('Customer Company Name is Required'),
    customer_email_id: Yup.string().required('Customer Email Id is Required'),
    customer_phone_no: Yup.number().required('Customer Phone is Required'),
    customer_address_line1: Yup.string().required('Customer Address line 1 is Required'),
    customer_address_line2: Yup.string(),
    city: Yup.string(),
    state: Yup.string(),
    state_code: Yup.number(),
    country: Yup.string(),
    pincode: Yup.number(),
    customer_gst_no: Yup.string().required('Customer GST Number is Required'),
    customer_pan_no: Yup.string().required('Customer PAN Number is Required'),
    customer_tan_no: Yup.string().required('Customer TAN Number is Required'),
    status: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      customer_id: currentData?.customerId || '',
      customer_name: currentData?.customerName || '',
      customer_company_name: currentData?.customerCompanyName || '',
      customer_email_id: currentData?.customerEmailId || '',
      customer_phone_no: currentData?.customerPhoneNo || '',
      customer_address_line1: currentData?.customerAddressesLine1 || '',
      customer_address_line2: currentData?.customerAddressesLine2 || '',
      city: currentData?.city || '',
      state: currentData?.state || '',
      state_code: currentData?.stateCode || '',
      country: currentData?.country || '',
      pincode: currentData?.pinCode || '',
      customer_gst_no: currentData?.customerGstNo || '',
      customer_pan_no: currentData?.customerPanNo || '',
      customer_tan_no: currentData?.customerTanNo || '',
      status: currentData?.status || '',
      company_id: currentData?.companyId || user?.companyID ? user?.companyID : '',
    }),
    [currentData]
  );

  const methods = useForm({
    resolver: yupResolver(newUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
    errors,
  } = methods;
  const values = watch();

  const statusOptions = ['Active', 'In Active'];
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snacbarMessage, setSnacbarMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(defaultValues.status || statusOptions[0]);

  const onSubmit = handleSubmit(async (data) => {
    data.status = selectedStatus;
    try {
      console.log('Create Cutomer Data', data);
      let response = '';
      if (currentData?.customerName) {
        response = await updateCustomerAPI(data);
      } else {
        response = await createCustomerAPI(data);
      }
      console.log('Create success', response);
      handleCallSnackbar(response.Message, 'success');
      reset();
      setTimeout(() => {
        handleClose(); // Close the dialog on success
      }, 1000);
      currentData?.customerName ? handleCountChange() : getTableData();
    } catch (error) {
      if (error.response) {
        handleCallSnackbar(error.response.data.Message, 'warning');
        console.log('request failed:', error.response.data.Message);
      } else {
        handleCallSnackbar(error.Message, 'warning');
        console.log('API request failed:', error.message);
      }
    }
  });
  const handleCallSnackbar = (message, severity) => {
    setOpenSnackbar(true);
    setSnacbarMessage(message);
    setSeverity(severity);
  };
  const HandleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  return (
    <div className="modal-container">
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <ModalHeader heading={currentData?.customerName ? 'Edit Customers' : 'Add New Customers'} />
        <SnackBarComponent
          open={openSnackbar}
          onHandleCloseSnackbar={HandleCloseSnackbar}
          snacbarMessage={snacbarMessage}
          severity={severity}
        />
        <DialogContent className="modal-content">
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            marginTop={2}
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(3, 1fr)',
            }}
          >
            <RHFTextField name="customer_name" label="Customer Name" />
            <RHFTextField name="customer_company_name" label="Customer Company Name" />
            <RHFTextField name="customer_email_id" label="Email ID" />
            <RHFTextField type="number" name="customer_phone_no" label="Phone Number" />
            <RHFTextField name="customer_address_line1" label="Customer Address Line 1" />
            <RHFTextField name="customer_address_line2" label="Customer Address Line 2" />
            <RHFTextField name="city" label="City" />
            <RHFTextField name="state" label="State" />
            <RHFTextField type="number" name="state_code" label="State Code" />
            <RHFTextField name="country" label="Country" />
            <RHFTextField type="number" name="pincode" label="Pincode" />
            <RHFTextField name="customer_gst_no" label="GST Number" />
            <RHFTextField name="customer_pan_no" label="PAN Number" />
            <RHFTextField name="customer_tan_no" label="Customer TAN Number" />
            <RHFAutocomplete
              name="status"
              id="status"
              options={statusOptions || []}
              value={selectedStatus}
              onChange={(event, newValue) => setSelectedStatus(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Select status Type" variant="outlined" />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained" color="primary" loading={isSubmitting}>
            {currentData?.customerName ? 'Update' : 'Save'}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </div>
  );
}

CreateCustomers.propTypes = {
  currentData: PropTypes.object,
  handleClose: PropTypes.any,
};

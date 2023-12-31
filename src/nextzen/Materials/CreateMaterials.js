import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';

import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

import instance from 'src/api/BaseURL';

import { Button, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';


export default function CreateMaterials({ currentData, handleClose }) {

  const NewUserSchema = Yup.object().shape({
    name: Yup.string(),
    status: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({

      VendorName: currentData?.VendorName || '',
      hsnID: currentData?.hsnID || '',
      MaterialName: currentData?.MaterialName || '',
      MaterialType: currentData?.MaterialType || '',
      status: currentData?.status || '',
    }),
    [currentData]

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
  const values = watch();


  const materialsOptions = ['Type 1', 'Type 2'];
  const [selectedMaterials, setSelectedMaterials] = useState(defaultValues.MaterialType || '');


  const onSubmit = handleSubmit(async (data) => {
    console.log('🚀 ~ file: AddTimeProject.jsx:93 ~ onSubmit ~ data:', data);
    console.log('uyfgv');

    data.MaterialType = selectedMaterials;

    try {
      console.log(data, 'data111ugsghghh');

      const response = await instance.post('addMaterials', data).then(
        (successData) => {
          console.log('sucess', successData);
        },
        (error) => {
          console.log('lllll', error);
        }
      );
    } catch (error) {
      console.error(error);
    }
  });
  return (
    <div style={{ paddingTop: '20px' }}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>ADD New Materials</DialogTitle>

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
            <RHFTextField name="VendorName" label="Vendor Name" />

            <RHFTextField name="hsnID" label="HSN ID" />

            <RHFTextField name="MaterialName" label="Material Name" />
            <RHFAutocomplete
              name="MaterialType"
              id="MaterialType"

              options={materialsOptions || []}
              value={selectedMaterials}
              onChange={(event, newValue) => setSelectedMaterials(newValue)}

              renderInput={(params) => (
                <TextField {...params} label="Select Material Type" variant="outlined" />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>

          <LoadingButton type="submit" color="primary" variant="contained" loading={isSubmitting}>
            Save
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </div>
  );
}

CreateMaterials.propTypes = {
  currentData: PropTypes.object,
  handleClose: PropTypes.any,
};

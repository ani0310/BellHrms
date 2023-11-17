import * as React from 'react';
import {TextField,MenuItem,Grid,Typography, DialogContent,Dialog,Button,Stack}from '@mui/material';
import { _userList } from 'src/_mock';
import { useState , useCallback,useMemo,forwardRef} from 'react';
import { BasicTable } from '../Table/BasicTable';
import SalaryAdvanceForm from './SalaryAdvaceForm';
import { baseUrl } from '../global/BaseUrl';
import axios from 'axios';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {useSnackbar} from '../../components/snackbar';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { useForm, Controller } from 'react-hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
export default function SalaryAdvace() {
    const {enqueueSnackbar} = useSnackbar()
      const TABLE_HEAD = [
        {
    
          id: "employeeID",
    
          label: "Employee Id",
          minWidth:"8pc",
    
          type: "text",
    
         
        },
    
        { id: "employeeName", label: "Employe Name", width: 180, type: "text" },
    
        { id: "requestDate", label: "request Date", width: 220, type: "text" },
    
        { id: "requestAmount", label: "Request Amount", width: 180, type: "text" },
    
        { id: "paidDate", label: "Paid Date", width: 100, type: "text" },
        { id: "PaidAmount", label: "paid Amount", width: 100, type: "text" },
        { id: "approverName", label: "Approver Name", width: 100, type: "text" },
        { id: "commentStatus", label: "User Comments", width: 100, type: "text" },
        { id: "hrComments", label: "Approver Comments", width: 100, type: "text" },
        { id: "paymentStatus", label: "Payment Status", width: 100, type: "text" },
        { id: "status", label: "Status", width: 100,type: "badge"},
        // { id: '', width: 88 },
    
      ];
    
     
    
      const actions = [
    
        { name: "Approve",id:'approved',type:'serviceCall',endpoint:"/approveSalaryAdvance",icon:"charm:circle-tick"},
        { name: "Reject",id:'rejected',type:'serviceCall',endpoint:"/approveSalaryAdvance",icon:"charm:circle-cross"},
    
        { name: "Edit",id:'edit',type:'editform',endpoint:"/updateSalaryAdvance",icon:"solar:pen-bold" },
    
        { name: "eerr", icon: "hh", path: "jjj" },
    
      ];
      const [showForm, setShowForm] = useState  (false);
      const [showApproveForm,setApproveForm]= useState(false);
      const [showRejectForm,setRejectForm]= useState(false);
      const [showEditForm,setShowEditForm]= useState(false);
      const [commentsValue,setCommentsValue]=useState("");
      const [rowData,setRowData] = useState();
      const handleClose = () => {
        setShowForm(false);
        setShowEditForm(false);
        setApproveForm(false);
        setRejectForm(false);
      };
      const handleTimeForm =()=>{
        setShowForm(true)
      } 
  const defaultPayload={
    "count": 5,
    "page": 0,
    "search": "",
    "companyID":localStorage?.getItem('companyID'),
    "externalFilters": {
  "requestDate": {
   
  "RequestDateStart": "",
   
  "RequestDateEnd": ""
   
  },
   
  "paidDate": {
   
  "PaidDateFrom": "",
   
  "PaidDateTo": ""
   
  },
      "status": "",
      "requestAmount":"",
      "paidAmount":""
    },
    "sort": {
      "key": 1,
      "orderBy": ""
    }
  }
  const onClickActions=(rowdata,event)=>{
   
    if(event?.name==="Approve")
    {
      setRowData(rowdata)
      setApproveForm(true)
    }
    else if(event?.name==="Reject"){
      setRowData(rowdata)
      setRejectForm(true)
    }
    else if (event?.name==="Edit"){
      setRowData(rowdata)
      setShowEditForm(true);
    }
  
  }

  const handleComments= (e)=>{
    setCommentsValue(e.target.value);
  }

  const NewUserSchema = Yup.object().shape({
    paymentStatus:Yup.string(),
    salaryAdvanceID:Yup.number(),
    paidAmount:Yup.number(),
    hrComments:Yup.string(),
    status:Yup.string(),
    employeeID:Yup.string()
  })
 
  const defaultValues = useMemo(

    () => ({ 
      
    paymentStatus:"",
    salaryAdvanceID:0,
    paidAmount:"",
    hrComments:"",
    status:"approved",
    employeeID:localStorage?.getItem('employeeID'),
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

  const values = watch();
  const apihit=(obj)=>{
    const config = {
      method: 'POST',
      maxBodyLength:Infinity,
      url: baseUrl + `/approveSalaryAdvance`,
      data: obj
    
    }

    axios.request(config).then((response) => {
      enqueueSnackbar(response.data.message,{variant:'success'})
      handleClose();
    })
      .catch((error) => {
        enqueueSnackbar(error.message,{variant:'Error'})
        handleClose();
      });
  }
  const onSubmit = handleSubmit(async (data)=>{
    data.salaryAdvanceID=rowData?.SalaryAdvanceID,
  
    console.log(data,'datadata');
    try{
      apihit(data)
    }
    catch (error){
      console.error(error)
    }
  });


  const handleEditSalary=()=>{
   var payload = {
      "salaryAdvanceID":rowData?.SalaryAdvanceID,
      "requestAmount":parseInt(amountValue)
  }
  const config = {
    method: 'POST',
    maxBodyLength:Infinity,
    // url:  `http://192.168.0.111:3002/erp/updateSalaryAdvance`,
    url: baseUrl + `/updateSalaryAdvance`,
    data: payload
  
  }
  axios.request(config).then((response) => {
    enqueueSnackbar(response.data.message,{variant:'success'})
    handleClose()
  })
    .catch((error) => {
      enqueueSnackbar(error.message,{variant:'Error'})
      handleClose()
    });
  
  }
   
  const handleSalaryReject=()=>{
    var payload =
    {
      "employeeID":localStorage?.getItem('employeeID'),
      "salaryAdvanceID":rowData?.SalaryAdvanceID,
      "paidAmount":rowData?.paidAmount,
      "hrComments":commentsValue,
      "status":"rejected",
      "paymentStatus":rowData?.paymentStatus
  }
  const config = {
    method: 'POST',
    maxBodyLength:Infinity,
    url: baseUrl + `/approveSalaryAdvance`,
    data: payload
  
  }
  axios.request(config).then((response) => {
    enqueueSnackbar(response.data.message,{variant:'success'})
  })
    .catch((error) => {
      enqueueSnackbar(error.message,{variant:'Error'})
    });
  
  }
const [amountValue,setAmountValue] = useState();
  const handleChange = useCallback((event) => {
    setAmountValue(event.target.value);
  }, []);
      
  return (
    <>
      {(showForm) && (
 <Dialog
 fullWidth
 maxWidth={false}
 open={showForm}
 onClose={handleClose}
 PaperProps={{
   sx: { maxWidth: 770 , overflow:'hidden'},
 }}
 className="custom-dialog"  
>
 <SalaryAdvanceForm handleClose={handleClose} currentUser={{}} close={{handleClose}}  />
      </Dialog>
    )}
      {(showEditForm) && (
 <Dialog
 fullWidth
 maxWidth={false}
 open={showEditForm}
 onClose={handleClose}
 PaperProps={{
   sx: { maxWidth: 500 , overflow:'hidden'},
 }}
 className="custom-dialog"  
>
  <DialogContent>
  <Grid container spacing={2}>
     <Grid xs={12} md={12}>
            <Grid sx={{padding:'8px'}}>
              <Typography sx={{marginLeft:'5px'}}>
                Edit Your Requested Amount 
              </Typography>
            </Grid>
      </Grid>
      <Grid  xs={12} md={12} sx={{marginLeft:5}}>
      <TextField
                
                fullWidth
                defaultValue={rowData?.requestAmount}
                value={amountValue}
                onChange={handleChange}
                label="Amount"
              />
      </Grid>
     </Grid>
  </DialogContent>
  <Stack alignItems="flex-end" sx={{ mb:2,display:"flex", flexDirection:'row',justifyContent:"flex-end"}}>
               <Button variant="contained" color="primary" onClick={handleEditSalary}>Apply</Button>
                <Button  sx={{ml:"5px"}} onClick={handleClose}>Cancel</Button>
              </Stack>
      </Dialog>
    )}

{(showApproveForm) && (
 <Dialog
 fullWidth
 maxWidth={false}
 open={showApproveForm}
 onClose={handleClose}
 PaperProps={{
   sx: { maxWidth: 500 , overflow:'hidden'},
 }}
 className="custom-dialog"  
>
<FormProvider methods={methods} onSubmit={onSubmit}>
    <Typography variant="subtitle1" sx={{marginTop:2,marginLeft:2}}>
        Approve Salary Request
    </Typography>
<DialogContent>
<Grid sx={{marginTop:2}}>
<RHFTextField name="paidAmount" label="Paid Amount"/>
</Grid>

<Grid sx={{marginTop:2}}>
<RHFSelect name="paymentStatus" label="Payment Status">
  <MenuItem value="credited">Credited</MenuItem>
  <MenuItem value="debited">Debited</MenuItem>
</RHFSelect>


</Grid>
<Grid sx={{marginTop:2}}>
  <RHFTextField name="hrComments" label="Comments"/>
</Grid>
<Grid>

  </Grid>
<Button variant="contained" color="primary" sx={{float:"right",right:5,marginTop:2,color:"white"}} type="submit">Approve Request</Button>
<Button sx={{float:"right",right:10,marginTop:2}} onClick={()=>setApproveForm(false)}>Cancel</Button>
</DialogContent>
</FormProvider>
      </Dialog>
    )}
    {(showRejectForm) && (
<Dialog
fullWidth
maxWidth={false}
open={showRejectForm}
onClose={handleClose}
PaperProps={{
  sx: { maxWidth: 500 , overflow:'hidden'},
}}
className="custom-dialog"  >
<Typography variant="subtitle1" sx={{marginTop:2,marginLeft:2}}>
        Reject Salary Request
    </Typography>
<TextField 
label="comments"
placeholder='comments'
onChange={(e)=>handleComments(e)}
sx={{margin:2}}
/>
<div style={{display:"flex",justifyContent:"right",marginBottom:2}}>
<Button variant="contained" color="primary" sx={{width:150,float:'right'}}  onClick={handleSalaryReject}>Reject Request</Button>
<Button  onClick={()=>setRejectForm(false)}>Cancel</Button>
</div>
</Dialog>
      )
    }
    <BasicTable
headerData={TABLE_HEAD}
defaultPayload={defaultPayload}
endpoint='/searchSalaryAdvance'
filterName='SalaryFilter'
rowActions={actions}
bodyData="data"
onClickActions={onClickActions}
/>  
    </>
  );
}

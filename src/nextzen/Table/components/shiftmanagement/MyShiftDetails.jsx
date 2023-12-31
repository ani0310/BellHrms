import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { _userList } from 'src/_mock';
import { useState } from 'react';
import { Container } from '@mui/system';
import { Dialog } from '@mui/material';
import { BasicTable } from '../../BasicTable'; 
import AssignShift from './AssignShift';
import ViewTeamMates from './ViewTeamMates';
import UserContext from 'src/nextzen/context/user/UserConext';

// import ReusableTabs from '../tabs/ReusableTabs';
// import './Time.css';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function MyShiftDetails() {
    const {user} = React.useContext(UserContext)
      const TABLE_HEAD = [

        
    
        { id: "shift_group", label: "Shift Group Name", width: 180, type: "text" },

        { id: "shift_name", label: "Shift Name", width: 180, type: "text" },
    
        // { id: "Shiftgroup_Name", label: "Shift Group Name", width: 220, type: "text" },
        // { id: "Date", label: "Date", width: 220, type: "text" },
    
        { id: "start_time", label: "Start Time", width: 180, type: "text" },
    
        { id: "end_time", label: "End Time", width: 100, type: "text" },
        // { id: "start_date", label: "Start Date", width: 100, type: "text" },
        // { id: "end_date ", label: "End Date", width: 100, type: "text" },
        { id: "", label: "View Team Mates", width: 100, type: "view" },
    
        // { id: '', width: 88 },
    
      ];
    
     
    const defaultPayload ={
      "company_id":(user?.companyID)?user?.companyID : '',
      "employee_id":(user?.employeeID)?user?.employeeID : '',
      "page":0,
      "count":5,
      "Search":"",
      "externalFilters":{
        "shift_name": "",
        "shift_group": "",
 
  },
      "sort": {
      "orderby": "",
      "key": 0
  } 
   
  }
      // const actions = [
    
      //   { name: "approve", icon: "hh", path: "jjj" },
    
      //   { name: "view", icon: "hh", path: "jjj" },
    
      //   { name: "eerr", icon: "hh", path: "jjj" },
    
      // ];
    
    
      const [showForm, setShowForm] = useState  (false);
      const handleClose = () => setShowForm(false);
      const handleTimeForm =()=>{
        setShowForm(true)
        console.log("🚀 ~ file: Time.jsx:36 ~ handleTimeForm ~ handleTimeForm:", showForm)
      }
      const [employeListDialog,SetEmployeListDialog]=useState(false)

      const [RowDate,setRowDate] = useState([])
      const closeEmployeList = ()=> SetEmployeListDialog(false)
      const SecondoryTable = async (rowdata,event) => {
        console.log("🚀 ~ file: ShiftRoast.jsx:131 ~ SecondoryTable ~ rowdata:",rowdata)
      //  setRoasterRowData(rowdata.EmpList)
        SetEmployeListDialog(true)
        setRowDate(rowdata)

      }

    
      const handleEditRowParent = async (rowdata,event) => {


        // alert("yes yes yes")
      }
  return (
    <>
     {employeListDialog && 
 <Dialog
 fullWidth
 maxWidth={false}
 open={employeListDialog}
 onClose={closeEmployeList}
 PaperProps={{
  sx:{maxWidth:770,overflow:"hidden"},
 }}
 className="custom-dialog"  
 >
<ViewTeamMates onClose={closeEmployeList} RowDate={RowDate} />
 </Dialog>

 }
      {showForm && (
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
 <AssignShift currentUser={{}} />
      </Dialog>
    )}

    <Container sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end",marginBottom:'10px ' }}>
  {/* <div>Content Here</div> */}
  {/* <Button className="button" onClick={handleTimeForm    }>Assign Shift</Button> */}
{/* <Button className="button">Filter</Button>
<Button className="button">Report</Button> */}
</Container>
    <BasicTable
defaultPayload={defaultPayload}
headerData={TABLE_HEAD}
endpoint='/Myshiftdetails'
bodyData='data'

// rowActions={actions}
filterName='MyShiftFilter'
SecondoryTable={SecondoryTable}
handleEditRowParent={handleEditRowParent}
/>  
    </>
  );
}

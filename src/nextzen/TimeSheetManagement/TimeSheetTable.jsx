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
import { BasicTable } from '../Table/BasicTable';
import TimeForm from './TimeForm';
import ReusableTabs from '../tabs/ReusableTabs';
import './Time.css';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function TimeSheetTable() {
     
      const TABLE_HEAD = [


        { id: "projectId", label: "Project Id", width: 180, type: "text" },
    
        { id: "projectName", label: "Project Name", width: 220, type: "text" },
    
        { id: "dateOfActivity", label: "date of Activity", width: 180, type: "text" },
    
        { id: "activityName", label: "activity Name", width: 100, type: "text" },
        { id: "workingTime", label: "Working Time", width: 100, type: "text" },
        { id: "totalWorkingTime", label: "Total Working Time", width: 100, type: "text" },
        { id: "status", label: "Status", width: 100, type: "badge" },
    
        // { id: '', width: 88 },
    
      ];
 
    
     
    const defaultPayload={
      "employee_id":"ibm2",

      "page":0,
  
      "count":30,
  
      "search":"",
  
      "externalFilters":{
  
               "project_name":"",
  
               "activity_name":"",
  
               "Status":"",
  
               "from_date":"",
  
               "to_date":""
  
      },
  
      "sort":{
  
          "key":1,
  
          "orderBy":"pa.activity_name"
  
      }
    }
      const actions = [
    
        // { name: "approve", icon: "hh", path: "jjj" },
    
        // { name: "view", icon: "hh", path: "jjj" },
    
        // { name: "eerr", icon: "hh", path: "jjj" },
    
      ];
    
   
      const [showForm, setShowForm] = useState  (false);
      const handleClose = () => setShowForm(false);
      const handleTimeForm =()=>{
        setShowForm(true)
        console.log("🚀 ~ file: Time.jsx:36 ~ handleTimeForm ~ handleTimeForm:", showForm)
      }
    
  return (
    <>
      {/* {showForm && (
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
 <TimeForm currentUser={{}} handleClose={handleClose}/>
      </Dialog>
    )} */}
   
    <Container sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end",marginBottom:'10px ' }}>
  {/* <div>Content Here</div> */}
  {/* <Button className="button" onClick={handleTimeForm}>Add Time Sheet</Button> */}
{/* <Button className="button" >Filter</Button>
<Button className="button" >Report</Button> */}
</Container>
 <BasicTable
 defaultPayload={defaultPayload}
 headerData={TABLE_HEAD}
 endpoint='/Mytimesheets'
 bodyData='data'
 filterName="TimeSearchFilter"
 />
    </>
  );
}

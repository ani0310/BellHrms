import React,{useEffect, useState} from 'react'
import {Card,CardContent,Typography,IconButton,Button,Grid,Stack} from '@mui/material'
import Iconify from 'src/components/iconify';
import { useTheme, alpha } from '@mui/material/styles';
import axios from 'axios';
import FilesGrid from '../files/FilesGrid';
import CreateEducation from '../employeeeducation/createeducation/CreateEducation';
import CreatePreviousWork from './createpreviouswork/CreatePreviousWork';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import EmployeeRecords from '../employeepreviouswork/employeepreviousworkdocuments/EmployeeRecords';
import { bgGradient } from 'src/theme/css';
import { useSnackbar } from 'src/components/snackbar';
import { formatDate } from 'src/nextzen/global/GetDateFormat';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const employeeData=[ {

  "previousCompanyName": "",
  "designation": "",
  "startDate": "",
  "presentlyWorking": "",
  "endDate": "",
    documents:[
      {
        fileType:'',
        fileName:'',
        fileContent:''
    },
  ]
   
  
 
}

]

const PreviousWork = ({employeeIDForApis}) => {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const docType=["Salary Slips","Seperation Letter"]
  const [employeeDataToEditOrCreate,setEmployeeDataToEditOrCreate]=useState([])
  const [endpoint,setEndpoint]=useState("");

  const [open,setOpen]=useState(false);
  const handleAddEducation = (data,endpoint) => {
    setEndpoint(endpoint)
    // if(data?.documents.length===0){
    //   data.documets=[
    //     {
    //       fileType:'',
    //       fileName:'',
    //       fileContent:''
    //   },
    // ]
    // }
    setEmployeeDataToEditOrCreate(prev=>(data));
  };
  
  useEffect(() => {
    console.log('aa',employeeDataToEditOrCreate.length)
    if(employeeDataToEditOrCreate?.length>0){
    setOpen(true);
   
  
    }
  }, [employeeDataToEditOrCreate]);
  const handleClose=()=>{setOpen(false);
    setEmployeeDataToEditOrCreate([])
  }
  

    const dataFiltered=[
        {
            type:'pdf',
            id:"1",
            name:'marks'
        },
        {
            type:'pdf',
            id:"2",
            name:'marks'

        }
    ]
    const [employeeWork,setEmployeeWork] =useState([])
    const [expanded, setExpanded] = useState(Array(employeeWork?.length).fill(false));
    const tabIndex=1;

    const handleExpanded=(index)=>{
        const newExpanded = [...expanded];
        newExpanded[index] = !newExpanded[index];
        setExpanded(newExpanded);
      }
     
  

   const ApiHit=()=>{
    const data = JSON.stringify({
      "companyId": JSON.parse(localStorage.getItem('userDetails'))?.companyID,
      "employeeId": employeeIDForApis
  });
     
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}/getExperience`,
      headers: { 
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk2Nzc5NjF9.0-PrJ-_SqDImEerYFE7KBm_SAjG7sjqgHUSy4PtMMiE', 
        'Content-Type': 'application/json'
      },
      data : data
    };
     
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      setEmployeeWork(response.data.data)
    })
    .catch((error) => {
      console.log(error);
      
    });
   }

   useEffect(()=>{

     ApiHit();
     
   },[])
 
   const color='primary'

   const ApiHitDelete=(data)=>{
   
    const obj={
      id:data.id
    }
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}/deleteExperience`,
      headers: { 
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk2Nzc5NjF9.0-PrJ-_SqDImEerYFE7KBm_SAjG7sjqgHUSy4PtMMiE', 
        'Content-Type': 'application/json'
      },
      data : obj
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      enqueueSnackbar(response?.data?.message, { variant: 'success' });
      ApiHit()
    })
    .catch((error) => {
      console.log(error);
      enqueueSnackbar(response?.data?.message, { variant: 'error' });
    });
    
   }
   
  return (
    <>
      <CreatePreviousWork callApi={ApiHit} employeeIDForApis={employeeIDForApis} open={open} onhandleClose={handleClose} employeeData={employeeDataToEditOrCreate} endpoint={endpoint}/>
        

        <Grid container margin='5px' >
        {(tabIndex === 1) &&
      <>
         
                {
                  employeeWork?.map((itm,index) => (
                    

                    <Grid
                    lg={5}
                    md={5}
                    xs={12}
                    sx={{
                      ...bgGradient({
                        direction: '135deg',
                        startColor: alpha(theme.palette[color].light, 0.2),
                        endColor: alpha(theme.palette[color].main, 0.2),
                      }),
                      p: 3,
                      borderRadius: 2,
                      color: `${color}.darker`,
                      backgroundColor: 'common.white',
                      padding: '10px',
                      margin: '10px',
                      boxShadow: '3',
                     
                    }}
                  >
                    <>
                    <Grid container alignItems="flex-end" justifyContent="flex-end" flexDirection="row">
                            <IconButton onClick={() => {
                              const item = itm;
                              handleAddEducation([item], "updateWorkDetails");
                            }}>
                              <Iconify icon="material-symbols:edit" />
                            </IconButton>
                            <IconButton onClick={() => {
                              
                             ApiHitDelete(itm);
                            }} sx={{ marginLeft: 1 }}>
                              <Iconify icon="material-symbols:delete" />
                            </IconButton>
                          </Grid>
                      <Grid container alignItems="center" justifyContent="center" flexDirection="column">
                        <Typography variant='h5'>
                          {itm?.previousCompanyName}
                         
                        </Typography>
                  
                        <Typography variant='h6'>@</Typography>
                  
                        <Typography variant='h6'> {itm?.designation}</Typography>
                  
                        <Typography component="span">
                          {formatDate(itm?.startDate)} - {formatDate(itm?.endDate)}
                          <Stack lg={12}></Stack>
                        </Typography>
                      </Grid>
                    </>
                  </Grid>
                     
                    )
                  )
               }
        
      </>}
     

        
      <Grid  
lg={5}
md={5}
xs={12}
      sx={{
        ...bgGradient({
          direction: '135deg',
          startColor: alpha(theme.palette[color].light, 0.1),
          endColor: alpha(theme.palette[color].main, 0.2
            ),
        }),
        p: 3,
        borderRadius: 2,
        color: `${color}.darker`,
        backgroundColor: 'common.white',
        padding: "10px",
        margin: '10px',
        boxShadow: 3,
       
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        cursor: 'pointer',
      }}
      onClick={()=>{handleAddEducation(employeeData,"addExperience")}}
    >
      <AddCircleIcon sx={{ fontSize: 60 }} />
     
    </Grid>
    </Grid>
      
    </>
  )
}



export default PreviousWork
/* eslint-disable react/jsx-no-useless-fragment */
import PropTypes from 'prop-types';
import React from 'react';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import Iconify from 'src/components/iconify/iconify';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import { Card,CardContent, Grid } from '@mui/material';


function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };


export default function Photos({ photos, setPhotos, batch }) {
    const userId = 5
    const [images,setImages] = React.useState([])
    const [viewImage, setViewImage] = React.useState(false);
    const [reload,setReload]=React.useState(false);
    const [value, setValue] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [trainingData,setTrainingData]=React.useState('');
    console.log('photoss')
    React.useEffect(() => {
    //   setShown(shown)
      setOpen(photos)
    }, [photos])
    React.useEffect(() => {
    //   setShown(shown)
    //    getTrainingBatch()
    
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload])
    React.useEffect(() => {
    //   setShown(shown)
    //    getTrainingBatch()
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleClickOpen = () => {
      setPhotos(true)
      setOpen(true);
    };
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const handleClose = () => {
      setPhotos(false)
      setOpen(false);
    };
    function getBase64(file, callback) {
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result));
      reader.readAsDataURL(file);
    }
    const convertImage = (e) => {
        const imageData = URL.createObjectURL(e.target.files[0]);
        getBase64(e.target.files[0], (base64Data) => {
          setImages([...images, base64Data]);
          setViewImage(true);
        });
      }
  const UploadImages = async(e) =>{
    if (images.length === 0) {
      alert("No photos to upload.")
      throw new Error('No photos to upload.');
    }
      if(images.length<=0){
        alert("No Image is Selected!")
      }else{
        const raw = JSON.stringify({
          "project_id":  batch?.data?.project_id,
          "tb_id":batch?.data?.id,
        //   "trainer_id": idvalue,
          "day": e,
          "photos": [images.toString().slice(22,)]
    
      })
      const requestOptions = {
          method: 'POST',
          body: raw,
          redirect: 'follow'
        };

  const payload = {

 

    "companyId": "COMP2",
  
    "employeeId": "ibm2",
  
    "financialYear": "2023-03-01",
  
    "nameOfLandlord": "Landlord Name",
  
    "addressOfLandlord": "123 Main St, City, Country",
  
    "data": [
  
                    {
  
        "month": "January",
  
        "cityType": "Urban",
  
        "rentAmount": 15.00,
  
        "submittedAmount": 1400.00
  
      },
  
            {
  
        "month": "March",
  
        "cityType": "Urban",
  
        "rentAmount": 1500.00,
  
        "submittedAmount": 1400.00
  
      },
  
      {
  
        "month": "December",
  
        "cityType": "Urban",
  
        "rentAmount": 1500.00,
  
        "submittedAmount": 1400.00
  
      },
  
              {
  
        "month": "May",
  
        "cityType": "Urban",
  
        "rentAmount": 1500.00,
  
        "submittedAmount": 1400.00
  
      }
  
    ],
  
    "panOfTheLandlord": true,
  
    "panNumber": ["ABCPN1234X", "DEFPN5678Y"],
  
    "declarationReceivedFFromLandlord": true,
  
    "fileName": ["rentdeclaration.pdf"],
  
    "fileContent":[images.toString().slice(22,)],

    "landlordFileName" : ["Sample.pdf"],
  
    "landlordFileContent" : ["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"] 
    
    }      
  const res =  axios.post("https://xql1qfwp-3001.inc1.devtunnels.ms/erp/rentDeclaration", payload)
  .then((response) => {
   
  setImages([])
  setReload(!reload);
  alert("Photo Uploaded Successfully..")
  })
  .catch((error) => {
    // console.log('error', error)
  });
  }
      }

      console.log([images.toString().slice(22,)] , "images stored in a state ")
//   Method to delete the images that is selected 

  const deleteImage = (index) => {
  images.splice(index, 1);
  setImages([...images]);
  };
 
    return (
      <div>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
        >
          <AppBar sx={{ position: 'relative', bgcolor: '#ff7424' }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} letiant="h6" component="div" style={{color:'white'}}>
              {(userId===5)?"Add Photos":"Photos"}
              </Typography>
              {/* <Button autoFocus color="inherit" onClick={handleClose}>
                save
              </Button> */}
            </Toolbar>
          </AppBar>
          <List>
           
            <>
          
                           
    <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs  value={value} onChange={handleChange} indicatorColor='warning' aria-label="basic tabs example">
            <Tab label="Day1"   sx={{
                    ':hover': {
                      bgcolor: '#ffd796', // theme.palette.primary.main
                      color: '#ed6c02',
                    },
                    color: 'black',
                  }} style={
                    value === 0
                      ? {
                          borderBottom: '3px solid #ed6c02',
                          color: '#ed6c02',
                        }
                      : null
                  }/>
            <Tab label="Day2"  sx={{
                    ':hover': {
                      bgcolor: '#ffd796', // theme.palette.primary.main
                      color: '#ed6c02',
                    },
                    color: 'black',
                  }} 
                   style={
                    value ===1
                      ? {
                          borderBottom: '3px solid #ed6c02',
                          color: '#ed6c02',
                        }
                      : null
                  }
                  />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
        {/* <Card id="delete-card-project" style={{marginTop:20}}> */}
  {(userId===5)?<>
  
  <div id="project-multidrawwer-div" style={{ display: 'flex' }}>
                  {viewImage
                    ?
                     images.map((i, index) => (
                          <div style={{ display: 'flex', margin: '1rem' }}>
                            <img id="img-delete-project-multidrawer" src={i} style={{ height: '50px', width: '70px' }} alt="hello" />
                            <Iconify id="icon-delete-image"
                              onClick={() => {
                                deleteImage(index);
                              }}
                              icon="typcn:delete"
                              sx={{ width: 16, height: 16, ml: 1, color: 'red' }}
                            />
                          </div>
                        ))
                    : null}
                </div>
                <br />
  <div id="project-input-tag-div" style={{ display: 'flex' ,marginTop:"10px" , marginBottom:"10px"}}>
                    <label id="input-tag-project-multi-drawer" htmlFor="inputTag" style={{ cursor: 'pointer', display: 'flex' }}>
                      <Iconify id="camera-icon" icon="mdi:camera" sx={{ width: 25, height: 25, ml: 2, color: '#ff7424' }} />
                      &nbsp;
                      <input
                        style={{ display: 'none' }}
                        accept="image/png, image/gif, image/jpeg"
                        id="inputTag"
                        type="file"
                        onChange={(e) => {
                          convertImage(e);
                        }}
                      />
                    </label>
                  
                    <br />
           
             <Button
             id="upload-btn"
             onClick={()=>UploadImages(1)}
             
             sx={{
               '&:hover': {
                 backgroundColor: '#ffd796',
               },
               color: '#ff7424',
               backgroundColor: '#ffd796',
               marginLeft: '10px',
             }}
           >
             Upload   
           </Button>
           </div></>:null}
  {/* </Card> */}
        <Card > <CardContent>  
          <Grid container spacing={2}>
    <Grid  xs={10} sm={6} style={{paddingRight:5}} >
      
      {(photos )?<img id="img-event-data" src={(trainingData?.photos[0].photo1)?(trainingData?.photos[0]?.photo1):batch?.photos[0].photo1} alt='' />:"No Photos"}</Grid>
      <Grid  xs={10} sm={6} style={{paddingRight:5}} >{(photos)?<img id="img-event-data" src={(trainingData?.photos[0].photo2)?(trainingData?.photos[0]?.photo2):batch?.photos[0].photo2} alt=''/>:null}</Grid></Grid></CardContent></Card> 
        </TabPanel>
        <TabPanel value={value} index={1}>
      
  {(userId===5)?<>
  <div id="project-multidrawwer-div" style={{ display: 'flex' }}>
                  {viewImage
                    ? images.map((i, index) => (
                          <div style={{ display: 'flex', margin: '1rem' }}>
                            <img id="img-delete-project-multidrawer" src={i} style={{ height: '50px', width: '70px' }} alt="hello" />
                            <Iconify id="icon-delete-image"
                              onClick={() => {
                                deleteImage(index);
                              }}
                              icon="typcn:delete"
                              sx={{ width: 16, height: 16, ml: 1, color: 'red' }}
                            />
                          </div>
                        ))
                    : null}
                </div>
                <br />
  <div id="project-input-tag-div" style={{ display: 'flex' ,marginTop:"10px" , marginBottom:"10px"}}>
                    <label id="input-tag-project-multi-drawer" htmlFor="inputTag" style={{ cursor: 'pointer', display: 'flex' }}>
                      <Iconify id="camera-icon" icon="mdi:camera" sx={{ width: 25, height: 25, ml: 2, color: '#ff7424' }} />
                      &nbsp;
                      <input
                        style={{ display: 'none' }}
                        accept="image/png, image/gif, image/jpeg"
                        id="inputTag"
                        type="file"
                        onChange={(e) => {
                          convertImage(e);
                        }}
                      />
                    </label>
                  
                    <br />
           
             <Button
             id="upload-btn"
             onClick={()=>UploadImages(2)}
             
             sx={{
               '&:hover': {
                 backgroundColor: '#ffd796',
               },
               color: '#ff7424',
               backgroundColor: '#ffd796',
               marginLeft: '10px',
             }}
           >
             Upload   
           </Button>
           </div></>:null}
   <Card><CardContent>
    <Grid container spacing={2} >
    <Grid  xs={10} sm={6} style={{paddingRight:5}} >
    {(photos)?<img id="img-event-data" src={(trainingData?.photos[1].photo1)?(trainingData?.photos[1]?.photo1):batch?.photos[1].photo1} alt=''/>:"No Photos"}</Grid>
    <Grid  xs={10} sm={6} style={{paddingLeft:5}} >
  {(photos)?<img id="img-event-data" src={(trainingData?.photos[1].photo2)?(trainingData?.photos[1]?.photo2):batch?.photos[1].photo2} alt='' />:null}
  </Grid></Grid> </CardContent></Card>
        </TabPanel>
      
      </Box>
    
            </>
          </List>
        </Dialog>
        hi hello 

        {/* image or foile converting to base 64 */}

        <div id="project-multidrawwer-div" style={{ display: 'flex' }}>
                  {viewImage
                    ?
                     images.map((i, index) => (
                          <div style={{ display: 'flex', margin: '1rem' }}>
                            <img id="img-delete-project-multidrawer" src={i} style={{ height: '50px', width: '70px' }} alt="hello" />
                            <Iconify id="icon-delete-image"
                              onClick={() => {
                                deleteImage(index);
                              }}
                              icon="typcn:delete"
                              sx={{ width: 16, height: 16, ml: 1, color: 'red' }}
                            />
                          </div>
                        ))
                    : null}
                </div>
                <br />
  <div id="project-input-tag-div" style={{ display: 'flex' ,marginTop:"10px" , marginBottom:"10px"}}>
                    <label id="input-tag-project-multi-drawer" htmlFor="inputTag" style={{ cursor: 'pointer', display: 'flex' }}>
                      <Iconify id="camera-icon" icon="mdi:camera" sx={{ width: 25, height: 25, ml: 2, color: '#ff7424' }} />
                      &nbsp;
                      <input
                        style={{ display: 'none' }}
                        // accept="image/png, image/gif, image/jpeg , pdf "
                        id="inputTag"
                        type="file"
                        onChange={(e) => {
                          convertImage(e);
                        }}
                      />
                    </label>
                  
                    <br />
           
             <Button
             id="upload-btn"
             onClick={()=>UploadImages(1)}
             
             sx={{
               '&:hover': {
                 backgroundColor: '#ffd796',
               },
               color: '#ff7424',
               backgroundColor: '#ffd796',
               marginLeft: '10px',
             }}
           >
             Upload   
           </Button>
           </div>
      </div>
    );
  }
  Photos.propTypes = {
    photos: PropTypes.array.isRequired,
    setPhotos: PropTypes.func.isRequired,
    batch: PropTypes.string.isRequired,
  };

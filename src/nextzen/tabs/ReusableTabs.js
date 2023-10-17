import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/system'; // Import styled from @mui/system

const CustomTab = styled(Tab)(({ theme }) => ({
 '&.MuiTab-root.Mui-selected': {
      backgroundColor: "#3B82F6",
      color: "white"
    },
    '&.MuiButtonBase-root':{
      marginRight:'0rem !important',
      borderRight: "1px solid #cccc",
      borderBottom:"1px solid #ccc",
      borderLeft: "1px solid #ccc",
      
    },
    '&.MuiTabs-flexContainer':{
      marginBottom:"0 !important", borderBottom:"3px solid #3b82f6 !important"
    },
  minwidth: "110px",
  display:"inline-flex",
  backgroundColor: '#DFEBFE',
  fontSize:"14px",
  borderColor:"#3B82F6",
  border: '1px solid transparent',
  fontColor:"#333333",
  whiteSpace:"nowrap",
  alignItems:"center",
  verticalAlign:"center",
  textDecoration:"none",
  justifyContent:"center",
  color: 'black',
  cursor: 'pointer',
  boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
  '&:hover': {
    backgroundColor: 'whitesmoke',
  },
  marginRight:"0.25rem",
  borderRadius: "0 !important",
    padding: "10px !important",
    margin: "0 0.25rem 0 0.25rem",
    overflow: "hidden",
    lineHeight: "unset",
    minHeight: "2rem",
    
  }));
  
  // const NewTabContainer = {
  //   marginBottom:"0 !important", borderBottom:"3px solid #3b82f6 !important"
  // }

function ReusableTabs({ tabLabels, tabContents, changeOfTab }) {
  const [value, setValue] = useState(0);
 
  const handleChange = (event, newValue) => {
    setValue(newValue);
    if(typeof changeOfTab === 'function'){
      changeOfTab(newValue)
    }
    // handleCreatePayrun()
  };

  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        TabIndicatorProps={{ style: { display: 'none' } }} 
      >
        {tabLabels?.map((label, index) => (
          <CustomTab
            label={label}
            key={index}
          />
        ))}
      </Tabs>
<<<<<<<<< Temporary merge branch 1
      </Box>
      {tabContents?.map((content, index) => (
        <div key={index} hidden={value !== index}>
=========
      {tabContents.map((content, index) => (
        <div style={{padding:"0.25rem"}} key={index} hidden={value !== index}>
>>>>>>>>> Temporary merge branch 2
          {value === index && content}
        </div>
      ))}
    </div>
  );
}

ReusableTabs.propTypes = {
  tabLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  tabContents: PropTypes.arrayOf(PropTypes.node).isRequired,
  changeOfTab: PropTypes.any
};
export default ReusableTabs;
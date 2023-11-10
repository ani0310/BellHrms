

import * as React from 'react';
import Box from '@mui/material/Box';
import { BasicTable } from '../../Table/BasicTable';

export default function ShiftConfigView() {
    const TABLE_HEAD = [
      { id: 'shiftName', label: 'Shift Name', type: 'text' },
      { id: 'startTime', label: 'Start Time', type: 'text' },
      { id: 'endTime', label: 'End Time', type: 'text' },
      { id: 'shiftTerm', label: 'Shift Term', type: 'text' },
      { id: 'locationId', label: 'Location Id', type: 'text' },
    ];
    const actions = [
      { name: 'View', icon: 'hh', path: 'jjj' },
      { name: 'Edit', icon: 'hh', path: 'jjj' ,endpoint:'/'},
    ];

    const defaultPayload = 
    {
      "companyId":"COMP2",
      "locationId":32,
      "search":"",
      "page": 1,
      "limit": 5,
      "externalFilter": {
          "shiftTerm": "",
          "shiftName": "",
          "startTime": "",
          "endTime":""
      },
      "sort": {
          "key": 0,
          "orderBy": "start_time"
      }
      
  };
     
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
      
        <BasicTable
          headerData={TABLE_HEAD}
          endpoint="getALLShiftConfig"
          defaultPayload={defaultPayload}
          rowActions={actions}
          filterName='ShiftConfigurationFilterSearch'
        />
      
    );
  }
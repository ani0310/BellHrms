import * as React from 'react';
import Box from '@mui/material/Box';
import { BasicTable } from 'src/nextzen/Table/BasicTable';

export default function LeavePeriod() {
    const TABLE_HEAD = [
      { id: 'slNo', label: 'SL NO', type: 'text' },
      { id: 'leavePeriodId', label: 'Leave Period ID', type: 'text' },
      { id: 'leavePeriodName', label: 'Leave Period Name', type: 'text' },
      { id: 'startDate', label: 'Start Date', type: 'text' },
      { id: 'endDate', label: 'End date', type: 'text' },
    ];
    const actions = [
      { name: 'View', icon: 'hh', path: 'jjj' },
      { name: 'Edit', icon: 'hh', path: 'jjj' ,endpoint:'/'},
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
      "page": 1,
      "search": "",
      "companyId": "COMP1",
      "externalFilters": {
        "payscheduleType": "weekly7",
        "employmentType": "",
        "basicPayPercentage":"",
        "hraPercentage":"",
        "daPercentage":"",
        "ltaPercentage":"",
        "employerPfPercentage":"",
        "employeePfPercentage":"",
        "esicPercentage":"",
        "tdsPercentage":"10"
      },
      "sort": {
        "key": 1,
        "orderBy": ""
      }
    };
     
     
    // const tabLabels = ['Tab 1', 'Tab 2', 'Tab 3'];
    // const tabContents = [
    //   <div>Tab 1 Content</div>,
    //   <div>Tab 2 Content</div>,
    //   <div>Tab 3 Content</div>,
    // ];
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
          endpoint=""
          defaultPayload={defaultPayload}
          rowActions={actions}
        />
      
    );
  }
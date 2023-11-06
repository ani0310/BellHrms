import { BasicTable} from 'src/nextzen/Table/BasicTable';



import { _userList } from 'src/_mock';

import { useTheme } from '@mui/material/styles';

import { useState } from 'react';

import {Typography,CardContent,Grid,Card,TextField,InputAdornment} from '@mui/material';

import Iconify from 'src/components/iconify/iconify';
import LeaveFilter from '../LeaveFilter';
 
export default function Approveleave(){
   const theme = useTheme();
    const defaultPayload={
        "count": 5,
        "page": 0,
        "search": "",
        "eid": "info1",
    "externalFilters":{
        "fFromDate": "",
        "fToDate": "",
        "fLeaveTypeName": "",
        "fStatus": ""
    },
    "sort": {
        "key":1,
        "orderBy":"al.apply_date"
    }
    }

      const [TABLE_HEAD,setTableHead] =useState( [
        {
              id: "employee_id",
              label: "Employee Id",
              minWidth:"8pc",
              type: "text"
            },
            { id: "employee", label: "Employee Name",minWidth:"10pc",type: "text"},
            { id: "apply_date", label: "Apply Date",minWidth:"8pc", type: "text" },
            {id : "net_leave_balance",label:"Leave Balance",minWidth:"7pc",type:"text"},
            { id: "leave_type", label: "Leave Type",minWidth:"8pc", type: "text" },
            { id: "from_date", label: "Start Date",minWidth:"7pc", type: "text" },
            {id: "to_date",label:"End Date",minWidth:"7pc",type:"text"},
            {id: "requested_duration",label:"Requested Duration",minWidth:"7pc",type:'text'},
            {id: 'status',label:'Status',minWidth:"8pc",type:'text'}
            // { id: '', width: 88 },

       ]);
    
    
      const actions = [
        { name: "Approve", id: 'approve', type: "serviceCall", endpoint: '/accept' },

        { name: "Reject", id: 'reject', type: "serviceCall", endpoint: '/reject' },
    
      ];

  
 return (
  <>
  <BasicTable 
  headerData={TABLE_HEAD} 
  endpoint="listLeave"  
  defaultPayload={defaultPayload} 
  rowActions={actions} 
  bodyData = 'appliedLeave'
  filterName="LeavelistFilter"/>
  </>
 )
}
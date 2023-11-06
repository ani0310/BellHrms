import { useEffect, useState, useCallback } from 'react';

import { Helmet } from 'react-helmet-async';

import axios from 'axios';

import { _userList } from '../../_mock';

import { BasicTable } from '../Table/BasicTable';

const FactoryTable = () => {
  const actions = [
    { name: 'Edit', icon: 'hh', id: 'edit' },
    { name: 'Delete', icon: 'hh', id: 'delete' },
  ];
  const [filterOptions, setFilterOptions] = useState({
    dates: [
      {
        display: 'Established Date',
        field_name: 'EstablishedDate',
      },
      {
        display: 'Operational Date',
        field_name: 'OperationalDate',
      },
    ],
    dropdowns: [
      {
        display: 'Status',
        options: ['active', 'inactive'],
        field_name: 'status',
      },
      
    ],
  });
  const [bodyContent, setBodyContent] = useState([]);
  const [body_for_employee, setBody] = useState({
    count: 5,
    page: 1,
  });
  const ApiHit = () => {
    const data1 = body_for_employee;
    const config = {
      method: 'POST',
      maxBodyLength: Infinity,
      url: 'http://192.168.0.222:3001/erp/employeeDetails',
      // headers: {
      //   'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwMjY5MTN9.D7F_-2424rGwBKfG9ZPkMJJI2vkwDBWfpcQYQfTMJUo'
      // },
      data: data1,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data.data));
        setBodyContent(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    ApiHit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const defaultPayload = {
    count: 5,
    page: 0,
    search: '',
    fcompanyID: 'COMP1',
    externalFilters: {
      fMaritalStatus: '',
      fBloodGroup: '',
      fPState: '',
      fPEmployementType: '',
      fPdepartmentName: '',
      fPDesignation: '',
      fPDesignationGrade: '',
      fWorkingLocation: '',
      fjoiningDate: {
        from: '',
        to: '',
      },
      fDOB: {
        from: '',
        to: '',
      },
      fofferDate: {
        from: '',
        to: '',
      },
    },
    sort: {
      key: 1,
      orderBy: 'employee_id',
    },
  };
  const [TABLE_HEAD, setTableHead] = useState([
    { id: 'SNo', label: 'S. No', type: 'text', minWidth: '180px' },
    { id: 'FactoryName', label: 'Factory Name', type: 'text', minWidth: '180px' },
    { id: 'Incharge EmailID', label: 'Incharge  Email ID', type: 'text', minWidth: '180px' },
    { id: 'PhoneNo', label: 'Phone No', type: 'text', minWidth: '180px' },
    { id: 'Address', label: 'Address', type: 'text', minWidth: '180px' },
    { id: 'EstablishedDate ', label: 'Established Date', type: 'text', minWidth: '180px' },
    { id: 'OperationalDate ', label: 'Operational Date', type: 'text', minWidth: '180px' },
    { id: 'CloseDate', label: 'Close Date', type: 'text', minWidth: '180px' },
    { id: 'Status', label: 'Status', type: 'text', minWidth: '180px' },
  ]);
  return (
    <>
      <Helmet>
        <title> Dashboard: Factory</title>
      </Helmet>
      <BasicTable
        headerData={TABLE_HEAD}
        endpoint="/factoryDetails"
        defaultPayload={defaultPayload}
        filterOptions={filterOptions}
        rowActions={actions}
        filterName="FactoryHead"
      />
    </>
  );
};
export default FactoryTable;

import * as React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { useState, useCallback, useEffect } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
import Popover from '@mui/material/Popover';
import DialogContent from '@mui/material/DialogContent';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
import Pagination from '@mui/material/Pagination';
// _mock
import { _roles, USER_STATUS_OPTIONS } from 'src/_mock';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// datarange 
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

// import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
// import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import Paper from '@mui/material/Paper';
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  // TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';
//
// import { DateRangePicker } from 'rsuite';
import axios from 'axios';
import UserTableRow from './components/UserTableRow';
import Style from "../styles/Style.module.css";


import SearchFilter from '../filterSearch/FilterSearch';
// import ClaimSearchFilter from '../claims/ClaimSearchFilter';





const defaultFilters = {
  name: '',
  role: [],
  status: 'all',
};


// ----------------------------------------------------------------------

const BasicTable = ({ endpoint, defaultPayload ,headerData, rowActions,bodyData,filterName}) => {
  const popover = usePopover();
  

  const [initialDefaultPayload, setInitialDefaultPayload] = useState(defaultPayload);
 console.log(initialDefaultPayload,"initialDefaultPayload====================")
//  console.log(actions,"actions==......")
//  console.log(onclickActions(),"onclickActions  function --->")
  const [newPage, setNewPage]=useState(initialDefaultPayload?.Page);
  console.log(initialDefaultPayload?.Page,"page value")
  const countValue = initialDefaultPayload?.Count;
  console.log(countValue,"initialDefaultPayload count value------")
const [filterHeaders, setFilterHeaders]=useState([])
  const pageSize = 1;
  const [page, setPage] = useState(1);

  const [totalRecordsCount, setTotalRecordsCount] = useState(0)
  // const defaultPayloaddata =defaultPayload;
  //   const endpointdata =endpoint;
  // const [TABLE_HEAD, setTABLE_HEAD] = useState();

   const TABLE_HEAD = headerData;
  // const[_userList, set_userList] = useState(bodydata);
  const [tableData, setTableData] = useState([]);

  // const [rowActions, setRowActions] = useState(actions);
  // console.log(endpointdata,"endpoint urlll")
  // console.log(defaultPayloaddata,"endpoint urlll")


  // const bodyData = 'appliedLeave';

  useEffect(() => {
    // onclickActions();
    getTableData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getTableData = (payload) => {

    // let initialDefaultPayloadCopy =initialDefaultPayload;
    // if(payload){
    //   initialDefaultPayloadCopy = payload;
    // }
    // let initialDefaultPayloadCopy =initialDefaultPayload;
    // if(payload){
    //   initialDefaultPayloadCopy = payload;
    // }
    // if(actionType === 'pageChange'){
    //   initialDefaultPayloadCopy.Page = data;
    // }
    const config = {
      method: 'POST',
      maxBodyLength: Infinity,
      // url: `http://localhost:4001${endpoint}`,
      // url: `https://27gq5020-3001.inc1.devtunnels.ms/erp${endpoint}`,
      // url:`http://192.168.0.236:3001/erp/searchStatutoryDetails`,
      url: `http://192.168.0.236:3001/erp/${endpoint}`,
      // erp/getStatutoryDetails
      headers: {
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk2Nzc5NjF9.0-PrJ-_SqDImEerYFE7KBm_SAjG7sjqgHUSy4PtMMiE'
      },
      data:  initialDefaultPayload

    };



    axios.request(config).then((response) => {
      // // console.log(response?.data?.bodyContent);
      // setTableData(response?.data?.[bodyData]|| []);
      setTableData(response?.data?.data|| []);
      
      setFilterHeaders(response?.data?.filterHeaders || []);
      setTotalRecordsCount(response?.data?.totalEntry || 0)
      console.log(response?.data?.data,"total no of records-->")

      // leave list api
      console.log("leave list api integration")
      console.log(response)

      // if(actionType === 'pageChange'){
      //   // let initialDefaultPayloadCopy = 
      //   setInitialDefaultPayload((prevData)=>({
      //     ...prevData, Page:data
      //   }))
      // }

    })

      .catch((error) => {

        console.log(error);

      });
  }


  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  // const currentPageRecords = tableData.slice(startIndex, endIndex);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const table = useTable();

  const settings = useSettingsContext();

  const router = useRouter();

  const confirm = useBoolean();


  const [filters, setFilters] = useState(defaultFilters);
  // const dataFiltered = tableData.slice(startIndex, endIndex);
  const dataFiltered = applyFilter({
    inputData: tableData,
    // console.log(inputData,"inputData checkingggggggggggg"),
    comparator: getComparator(table?.order, table?.orderBy),
    filters,
  });

  const denseHeight = table.dense ? 52 : 72;

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = (!dataFiltered?.length && canReset) || !dataFiltered?.length;

  const handleFilters = useCallback(
    (name, value) => {
      table?.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );

  const handleDeleteRow = (event) => {
    console.log(event)
  }



  const handleEditRow = (rowData,eventData) => {
    console.log(rowData, eventData)
    if (eventData?.type === "serviceCall"){
      console.log("servce call will called ")
    }
    else if (eventData?.type === "edit"){

      console.log("servce call will called for path navigation")
    }
    else{
      console.log("servce call will called for path navigation")
    }


    

  }

  const handleFilterStatus = useCallback(
    (event, newValue) => {
      handleFilters('status', newValue);
    },
    [handleFilters]
  );


  const onPageChangeHandeler = (event, data) =>{

    const payload = initialDefaultPayload;
    payload.page = data;
    setInitialDefaultPayload(payload)
    // getTableData(payload)

    
    
  }

  useEffect(()=>{
    getTableData(initialDefaultPayload);

     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[initialDefaultPayload])
  const onChangeRowsPerPageHandeler = (event) => {
    console.log(event)
    const payload = initialDefaultPayload;
    payload.count = event.target.value;
    payload.page = 0;
    setInitialDefaultPayload(payload)
   //  getTableData(payload)
  }

  // Search functionality
  const handleSearch = (searchTerm) => {
    const payload = initialDefaultPayload;
    setInitialDefaultPayload(prevPayload => ({
      ...prevPayload,
      search: searchTerm,
      // Filter_Headers:
     
    }));
   // getTableData(payload)
  }


  

  // daterange picker
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState(null);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDateChange = (newValue) => {
    console.log("newValue", newValue);
    setSelectedRange(newValue);
    // handleClose();
  };

  const isValidDate = (date) => date instanceof Date && !Number.isNaN(date);

  const displayValue = selectedRange && isValidDate(selectedRange[0]) && isValidDate(selectedRange[1])
    ? `${selectedRange[0].toLocaleDateString()} - ${selectedRange[1].toLocaleDateString()}`
    : '';

  

  const handleFIlterOptions=(data)=>{
   
    console.log(data,"filtered data")

    const payload = initialDefaultPayload;
    setInitialDefaultPayload(prevPayload => ({
      ...prevPayload,
      // Search: searchTerm,
      externalFilters:data
     
    }));
    // getTableData(payload)

   
    

  }

  const handleFilterSearch = (searchTerm) => {

 

    console.log(searchTerm,"searched dataaaaaaaaaaa")
  
   
  
   
  
      const payload = initialDefaultPayload;
  
      setInitialDefaultPayload(prevPayload => ({
  
        ...prevPayload,
  
        search: searchTerm,
  
        // Filter_Headers:
  
       
  
      }));
  
      getTableData(payload)
  
    }

 
  

  
  return (
    <>
      
     
      <Container className={Style.MuiContainerRoot} maxWidth={settings.themeStretch ? false : 'lg'}>
      {/* {filterName === "claimSearchFilter" && <ClaimSearchFilter  filterData={handleFIlterOptions} />} */}
      
       {filterName === "statuortySearchFilter" && <SearchFilter  filterSearch={handleFilterSearch} filterData={handleFIlterOptions} />}
      
    
        <Card>
       
          <TableContainer   sx={{ position: "relative", overflow: "unset", padding:'0px !important'  }}>
            <TableSelectedAction
              dense={table.dense}
              numSelected={table?.selected?.length}
              rowCount={tableData?.length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  tableData?.map((row) => row.id)
                )
              }
              action={
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={confirm.onTrue}>
                    <Iconify icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                </Tooltip>
              }
            />

            <Scrollbar>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }} >
                {TABLE_HEAD && <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData?.length}
                  numSelected={table?.selected?.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      tableData?.map((row) => row.id)
                    )
                  }
                  rowActions={rowActions || []}
                />}

              

                  <TableBody>
                 
                          
        
                    {console.log(tableData)}
                    {tableData && tableData.length > 0 && tableData
                     
                      .map((row) => (
                        <>
                        <UserTableRow
                          key={row.id}
                          row={row}
                          selected={table.selected.includes(row.id)}
                          onSelectRow={() => table.onSelectRow(row.id)}
                          onDeleteRow={() => handleDeleteRow(row.id)}
                          onEditRow={(event) => { handleEditRow(row, event) }}
                          headerContent={TABLE_HEAD}
                          rowActions={rowActions || []}
                        />
                       


                        </>
                      ))}
        


                    <TableNoData notFound={notFound} />
                  </TableBody>
              
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={totalRecordsCount}
            // count={countValue}
            
            page={initialDefaultPayload?.page}
            rowsPerPage={initialDefaultPayload?.count}
            // rowsPerPage={25}
            onPageChange={onPageChangeHandeler}
            onRowsPerPageChange={onChangeRowsPerPageHandeler}
          dense={table.dense}
          onChangeDense={table.onChangeDense}
          />
          {/* <Grid container spacing={1} height="60px" sx={{alignItems:"center",alignSelf:"center"}}>
            <Grid item xs={1.5} >
              <Typography className={Style.textlightcolor} sx={{textAlign:"center", fontSize:"14px"}}>{tableData.length } Records</Typography>
                   
            </Grid >
            <Grid xs={10.5} item container flex justifyContent="flex-end" style={{ marginLeft: 'auto' }} >
            <Pagination 
            count={Math.ceil(tableData.length / pageSize)} 
            // count={10}
            page={page}
            onChange={handleChange}
            shape="rounded"
            />

            </Grid>
           
            </Grid> */}
        </Card>
      </Container>

     
    </>
  );
};

function applyFilter({ inputData, comparator, filters }) {
  console.log(inputData, "inputData checkingggggggggggg")
  const { name, status, role } = filters;

  const stabilizedThis = inputData?.map((el, index) => [el, index]);

  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis?.map((el) => el[0]);

  if (name) {
    inputData = inputData?.filter(
      (user) => user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (status !== 'all') {
    inputData = inputData?.filter((user) => user?.status === status);
  }

  if (role.length) {
    inputData = inputData?.filter((user) => role?.includes(user.role));
  }

  return inputData;
}

BasicTable.propTypes = {
  endpoint: PropTypes.string,
};

BasicTable.propTypes = {
  defaultPayload: PropTypes.object,
};
BasicTable.propTypes = {
  headerData: PropTypes.any,
};

BasicTable.propTypes = {
  bodyData: PropTypes.func,
};
BasicTable.propTypes = {
   rowActions: PropTypes.func
};
BasicTable.propTypes = {
  filterName: PropTypes.any
};




export { BasicTable };
import { useEffect, useState, useCallback } from 'react';

import { Helmet } from 'react-helmet-async';

import axios from 'axios';

import { _userList } from '../../../_mock';

import { BasicTable } from '../../Table/BasicTable';
import { getPurchaseOrderAPI } from 'src/api/Accounts/PurchaseOrder';

const PurchaseOrderTable = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snacbarMessage, setSnacbarMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const handleCallSnackbar = (message, severity) => {
    setOpenSnackbar(true);
    setSnacbarMessage(message);
    setSeverity(severity);
  };
  const HandleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  const actions = [
    { name: 'Edit', icon: 'hh', id: 'edit', type: 'serviceCall', endpoint: '' },
    { name: 'Delete', icon: 'hh', id: 'delete', type: 'serviceCall', endpoint: '' },
  ];
  const [editShowForm, setEditShowForm] = useState(false);
  const [editModalData, setEditModalData] = useState({});
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const onClickActions = (rowdata, event) => {
    if (event?.name === 'Edit') {
      setEditShowForm(true);
      setEditModalData(rowdata);
    } else if (event?.name === 'Delete') {
      const deleteData = { asset_id: rowdata.assetId || 0, assetsName: rowdata.assetsName || '' };
      setDeleteData(deleteData);
      setConfirmDeleteOpen(true);
      handleDeleteConfirmed();
    }
  };
  const handleCancelDelete = () => {
    setDeleteData(null);
    setConfirmDeleteOpen(false);
  };
  const handleDeleteConfirmed = async () => {
    if (deleteData) {
      await handleDeleteApiCall(deleteData);
      setDeleteData(null);
      setConfirmDeleteOpen(false);
    }
  };
  const handleClose = () => {
    setEditShowForm(false);
  };
  const handleDeleteApiCall = async (deleteData) => {
    try {
      console.log(deleteData, 'deleteData');
      const response = await DeleteAssetsAPI(deleteData);
      console.log('Delete success', response);
      handleCallSnackbar(response.message, 'success');
    } catch (error) {
      handleCallSnackbar(error.message, 'warning');
      console.log('API request failed:', error.message);
    }
  };
  const [filterOptions, setFilterOptions] = useState({});
  const ApiHit = async () => {
    try {
      const response = await getPurchaseOrderAPI(defaultPayload);
      console.log('success', response);
      setBodyContent(response);
    } catch (error) {
      console.log('API request failed:', error.message);
    }
  };

  useEffect(() => {
    ApiHit();
  }, []);
  const defaultPayload = {
    count: 5,
    page: 0,
    search: '',
    roleid: 1,
    externalFilters: {
      poDate: {
        from: '',
        to: '',
      },
      fPODate: '',
      fItemName: '',
      fUnitOfMeasure: '',
      expectedDeliveryDate: {
        from: '',
        to: '',
      },
      fExpectedDeliveryDate: '',
      fPaymentTerm: '',
      fVendorName: '',
      fCompanyName: '',
    },
    sort: {
      key: 1,
      orderBy: 'po.purchase_order_id',
    },
  };
  const [TABLE_HEAD, setTableHead] = useState([
    { id: 'poNumber', label: 'PO Number', type: 'text', minWidth: '180px' },
    { id: 'poDate', label: 'PO Date', type: 'text', minWidth: '180px' },
    { id: 'itemName', label: 'Item Name', type: 'text', minWidth: '180px' },
    { id: 'quantity', label: 'Quantity', type: 'text', minWidth: '180px' },
    { id: 'unitOfMeasure', label: 'Unit  Of Measure', type: 'text', minWidth: '180px' },
    { id: 'rate', label: 'Rate', type: 'text', minWidth: '180px' },
    { id: 'discount', label: 'Discount', type: 'text', minWidth: '180px' },
    { id: 'gstAmount', label: 'GST Amount', type: 'text', minWidth: '180px' },
    { id: 'totalAmount', label: 'Total Amount', type: 'text', minWidth: '180px' },
    { id: 'advanceAmount', label: 'Advance Amount', type: 'text', minWidth: '180px' },
    {
      id: 'expectedDeliveryDate',
      label: 'Expected Delivery Date',
      type: 'text',
      minWidth: '180px',
    },
    { id: 'paymentTerm', label: 'Payment Term', type: 'text', minWidth: '180px' },
    { id: 'vendorName', label: 'Vendor Name', type: 'text', minWidth: '180px' },
    { id: 'vendorAddress', label: 'Vendor Address', type: 'text', minWidth: '180px' },
    { id: 'vendorPAN', label: 'Vendor PAN', type: 'text', minWidth: '180px' },
    { id: 'emailID', label: 'Email ID', type: 'text', minWidth: '180px' },
    { id: 'contactNo', label: 'Contact No', type: 'text', minWidth: '180px' },
    { id: 'vendorLocation', label: 'Vendor Location', type: 'text', minWidth: '180px' },
    { id: 'companyName', label: 'Company Name', type: 'text', minWidth: '180px' },
    {
      id: 'companyBillingAddress',
      label: 'Company Billing Address',
      type: 'text',
      minWidth: '180px',
    },
    { id: 'companyBillingGST', label: 'Company Billing GST', type: 'text', minWidth: '180px' },
    { id: 'companyBillingPAN', label: 'Company Billing PAN', type: 'text', minWidth: '180px' },
    {
      id: 'factoryShippingAddress',
      label: 'Factory Shipping Address',
      type: 'text',
      minWidth: '180px',
    },
    { id: 'comments', label: 'Comments', type: 'text', minWidth: '180px' },
    { id: 'grandTotal', label: 'Grand Total', type: 'text', minWidth: '180px' },
  ]);
  return (
    <>
      <Helmet>
        <title> Dashboard: PurchaseOrder</title>
      </Helmet>
      <BasicTable
        headerData={TABLE_HEAD}
        endpoint="/listPurchaseOrder"
        defaultPayload={defaultPayload}
        filterOptions={filterOptions}
        rowActions={actions}
        filterName="PurchaseOrderHead"
        handleEditRowParent={() => {}}
      />
    </>
  );
};
export default PurchaseOrderTable;

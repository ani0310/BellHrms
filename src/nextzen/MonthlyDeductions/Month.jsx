import { height } from '@mui/system';
import * as React from 'react';

import ReusableTabs from '../tabs/ReusableTabs';
import Deduction from './Deduction';
import Loans from './loans';
import SalaryAdvace from './SalaryAdvace';



export default function Month() {
      const tabLabels = ["Salary Advance" , "Loans " , "My Deductions"]
      const tabContents = [
        <div><SalaryAdvace/> </div>,
        <div> <Loans/> </div>,
        <div><Deduction/>  </div>
      ]
  return (
    <>
    <ReusableTabs tabLabels={tabLabels} tabContents={tabContents} />
    <hr style={ {height:'2px',margin:"20px",backgroundColor:"blac"}}/>
    </>
  );
}

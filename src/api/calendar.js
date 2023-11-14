import { useMemo, useState,useEffect } from 'react';
import useSWR, { mutate } from 'swr';

import axios from 'axios';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
// utils
import { fetcher, endpoints } from 'src/utils/axios';


// ----------------------------------------------------------------------

const ApplyLeave = baseUrl + '/applyLeave';
const URL = baseUrl+'/appliedLeaveList';

// const ApplyLeave =`https://qx41jxft-3001.inc1.devtunnels.ms/erp/applyLeave`;
// const URL =`https://qx41jxft-3001.inc1.devtunnels.ms/erp/appliedLeaveList`


const options = {
  companyId: localStorage.getItem('companyID'),
   employeeId:localStorage.getItem('employeeID')
  // companyId: "C1",
  //  employeeId:"E1"
}


export function useGetEvents() {

  const { data, isLoading, error, isValidating } = useSWR([URL,options] ,fetcher);

  const memoizedValue = useMemo(() => {
    const events = data?.map((event) => ({
      ...event,
    }));
console.log(events,"eventsssss")
    return {
      events: events || [],
      eventsLoading: isLoading,
      eventsError: error,
      eventsValidating: isValidating,
      eventsEmpty: !isLoading && !data?.length,
    };
  }, [data, error, isLoading, isValidating]);
  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function createEvent(eventData) {
  try {
    const response = await axios.post(ApplyLeave, eventData);
    // Check the response for errors and throw an error if needed.
    if (response.data.success === false) {
      throw new Error(response.data.message);
    }
    // If successful, return any necessary data.
    mutate([URL,options]); 
    return response.data;
  } 
  catch (error) {
    throw error; // Re-throw the error to propagate it up.
  }
  /**
   * Work in local
   */
  // mutate(
  //   URL,
  //   (currentData) => {
  //     const events = [...currentData.events, eventData];

  //     return {
  //       ...currentData,
  //       events,
  //     };
  //   },
  //   false
  // );

}

// ----------------------------------------------------------------------

export async function updateEvent(eventData) {
  /**
   * Work on server
   */
  // const data = { eventData };
  // await axios.put(endpoints.calendar, data);

  /**
   * Work in local
   */
  mutate(
    URL,
    (currentData) => {
      const events = currentData.events.map((event) =>
        event.id === eventData.id ? { ...event, ...eventData } : event
      );

      return {
        ...currentData,
        events,
      };
    },
    false
  );
}

// ----------------------------------------------------------------------

export async function deleteEvent(leaveId,employeeId) {
  console.log(leaveId,"deletee",employeeId)
  /**
   * Work on server
   */
  const data = { 
    employeeId:employeeId,
    LeaveId:JSON.stringify(parseInt(leaveId))
   };
   try{
 const response =  await axios.post(`http://192.168.1.199:3001/erp/deletLeaveRequest`, data);
 if (response.data.success === false) {
  throw new Error(response.data.message);
 }
  mutate([URL,options]); 
  return response.data;
  }

   catch(error){
    throw error;
   }
  /**
   * Work in local
   */
  // mutate(
  //   URL,
  //   (currentData) => {
  //     const events = currentData.events.filter((event) => event.id !== eventId);

  //     return {
  //       ...currentData,
  //       events,
  //     };
  //   },
  //   false
  // );
}

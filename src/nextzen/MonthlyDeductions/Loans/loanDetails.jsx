import { useEffect,useState } from "react"
import { useParams } from "src/routes/hooks";
import { baseUrl } from "src/nextzen/global/BaseUrl";
import axios from "axios";
export default function loanDetails(){
    const params = useParams();
  const { id } = params;

  console.log(id,"iddddd")
    useEffect(()=>{
        getLoanID()
    },[])
    const [loanDetails,setloanDetails] = useState()
    const [employeevalue,setEmployeeValue]=useState()
    const getLoanID=()=>{
        const loanPayload ={
          loanID:parseInt(id)
        }
        const config={
          method: 'POST',
          maxBodyLength: Infinity,
        //   url:baseUrl+`/getLoanDetails`,
          url: `https://xql1qfwp-3001.inc1.devtunnels.ms/erp/GetLoanId`,
          data: loanPayload,
        }
        axios
            .request(config)
            .then((response) => {
              console.log(response, 'responsedata', response.data);
              setEmployeeValue(response?.data?.data)
             
            })
            .catch((error) => {
              console.log(error);
            });
      
      }
    const handleLoanExpand=()=>{
        const loanPayload ={
          employeeID:"",
          loanID:id
        }
        const config={
          method: 'POST',
          maxBodyLength: Infinity,
          url:baseUrl+`/getLoanDetails`,
          // url: `https://xql1qfwp-3001.inc1.devtunnels.ms/erp/getLoanDetails`,
          data: loanPayload,
        }
        axios
            .request(config)
            .then((response) => {
              console.log(response, 'responsedata', response.data);
              setloanDetails(response?.data?.data)
             
            })
            .catch((error) => {
              console.log(error);
            });
      
      }

    return (
        <>
        <h1>LOAN DETAILs</h1>
        </>
    )
}
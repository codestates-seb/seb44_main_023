import React from 'react';
import { useNavigate } from "react-router-dom"; 
import { useGetIsLedgerNull } from '../../store/store.contentIsNull';
import LedgeSummaryEmpty from './LedgeSummaryEmpty';
import LedgeSummaryWithData from './LedgeSummaryWithData';
const LedgeSummary=()=>{
const navigate = useNavigate(); 
const isLegderNull = useGetIsLedgerNull();
console.log("LedgeSummary isLegderNull:",isLegderNull)


return (
  <>
      {isLegderNull ? (
        <LedgeSummaryEmpty />
      ) : (
        <LedgeSummaryWithData />
      )}
  </>
  
);
};
  export default LedgeSummary;

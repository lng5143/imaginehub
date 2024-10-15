import { useState, useEffect } from "react";
import { PAYMENT_UPDATES_STATUS } from "@/const/imagine-box-consts";

export const usePaymentUpdates = (orderId) => {
    const [status, setStatus] = useState(PAYMENT_UPDATES_STATUS.loading);
  
    useEffect(() => {
      const eventSource = new EventSource(`/api/events/payment-updates?orderId=${orderId}`);
  
      eventSource.onmessage = (event) => {
        console.log(event);
        const newStatus = JSON.parse(event.data);
        setStatus(newStatus);
      }
  
      return () => eventSource.close();
    }, []);
  
    return status;
  };
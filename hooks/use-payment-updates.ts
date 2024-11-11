import { useState, useEffect } from "react";
import { PAYMENT_UPDATES_STATUS } from "@/const/consts";

export const usePaymentUpdates = (orderId: string) => {
    const [status, setStatus] = useState(PAYMENT_UPDATES_STATUS.loading);
  
    useEffect(() => {
      const eventSource = new EventSource(`/api/events/payment-updates?orderId=${orderId}`);
  
      eventSource.onmessage = (event) => {
        const resData = JSON.parse(event.data);

        if (resData?.status) {
            setStatus(resData?.status);
        } else {
            setStatus(PAYMENT_UPDATES_STATUS.failed);
        }
      }
  
      return () => eventSource.close();
    }, []);
  
    return status;
  };
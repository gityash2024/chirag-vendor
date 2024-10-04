import { baseUrl } from "../environment/environment";
import instance from "./httpInterceptor";

export const sendOtp = (payload) => {
  const url = `${baseUrl}/vendors/send-otp`;
  return instance.post(url, payload, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
export const verifyOtp = (payload) => {
  const url = `${baseUrl}/vendors/verify-otp`;
  return instance.post(url, payload, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const registerVendor = (payload) => {

 const url = `${baseUrl}/vendors/register`;
 return instance.post(url, payload, {
  headers: {
    'Content-Type': 'application/json'
  }
});
}
export const getVendorByMobileNumber = (payload) => {
  const url = `${baseUrl}/vendors/get-vendor-by-mobile`;
  return instance.post(url, payload, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export const uploadTos3 = (formData) => {
  const url = `${baseUrl}/files/upload`;
  return instance.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};
export const generateAadhaarOtp=(payload)=>{
  const url = `${baseUrl}/auth/aadhaar/generate-otp`;
  return instance.post(url, payload, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export const submitAadhaarOtp=(payload)=>{
  const url = `${baseUrl}/auth/aadhaar/submit-otp`;
  return instance.post(url, payload, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
export const updateVendorprofile=(payload)=>{
  const url = `${baseUrl}/vendors`;
  return instance.put(url, payload, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}


export const getWalletBalance = () => {
  const url = `${baseUrl}/wallet/balance`;
  return instance.get(url, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const getTransactionHistory = () => {
  const url = `${baseUrl}/wallet/transactions`;
  return instance.get(url ,{
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const requestWithdrawal = (payload) => {
  const url = `${baseUrl}/wallet/request-withdrawal`;
  return instance.post(url, payload, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const createCashfreeOrder = (payload) => {
  const url = `${baseUrl}/wallet/create-cashfree-order`;
  return instance.post(url, payload, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const verifyCashfreePayment = (payload) => {
  const url = `${baseUrl}/wallet/verify-cashfree-payment`;
  return instance.post(url, payload, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

}


export const acceptBooking = (payload) => {
  const url = `${baseUrl}/bookings/:id/accept`;
  return instance.put(url, payload, {
    headers: {
      'Content-Type': 'application/json'
    }
  }); 
}
export const getAllBookingsList = () => {
  const url = `${baseUrl}/bookings`;
  return instance.get(url, {
    headers: {
      'Content-Type': 'application/json'
    }
  }); 
}

export const assignBookingToRunner = (payload) => {
  const url = `${baseUrl}/bookings/assign-runner`;
  return instance.post(url, payload, {
    headers: {
      'Content-Type': 'application/json'
    }
  }); 
}



export const getAllRunnersList = () => {
  const url = `${baseUrl}/runners/all`;
  return instance.get(url, {
    headers: {
      'Content-Type': 'application/json'
    }
  }); 
}
export const updateRunner = (payload) => {
  const url = `${baseUrl}/runners/update`;
  return instance.post(url,payload, {
    headers: {
      'Content-Type': 'application/json'
    }
  }); 
}
export const blockRunner = (payload) => {
  const url = `${baseUrl}/runners/block`;
  return instance.post(url,payload, {
    headers: {
      'Content-Type': 'application/json'
    }
  }); 
}
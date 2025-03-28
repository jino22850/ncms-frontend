import axios from 'axios';

const API_BASE_URL = 'https://ncms-backend-production.up.railway.app/slrc/cor';
//const API_BASE_URL = 'http://localhost:8070/slrc/cor';

/**
 * 
 * @param {string} categoryId
 * @returns {Promise<Object[]>} 
 */


//Fetch all correspondents
export const getAllCorrespondents = async () => {
    const token = localStorage.getItem('authToken'); 

    return axios.get(`${API_BASE_URL}/all`, {
      headers: {
        'Authorization': `Bearer ${token}`, 
      },
    });

  };
 

// Add a new correspondent
export const addCorrespondent = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/add`, formData);
    return response.data;
  } catch (error) {
    console.error('Error adding correspondent:', error);
    throw error;
  }
};

// Update an existing correspondent
export const updateCorrespondent = async (CorId, formData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/update/${CorId}`, formData);
    return response.data;
  } catch (error) {
    console.error('Error updating correspondent:', error);
    throw error;
  }
};

// Delete a correspondent
export const deleteCorrespondent = async (CorId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/delete/${CorId}`);
    return response.status === 200;
  } catch (error) {
    console.error('Error deleting correspondent:', error);
    throw error;
  }
};

// get correspondent count
export const getCorrespondentCount = async () => {
  try {
    const token = localStorage.getItem('authToken'); 
    const response = await axios.get(`${API_BASE_URL}/correspondents/count`, {
      headers: {
        'Authorization': `Bearer ${token}`, 
      },
    });

    return response.data; 
  } catch (error) {
    console.error("Error fetching correspondent count:", error);
    throw error; 
  }
};

export const getAllCategories = () => {
  const token = localStorage.getItem('authToken');
  return axios.get(`${API_BASE_URL}/category/all`, {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
};

export const addCategory = (category) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
      return Promise.reject(new Error('No token found. Please log in.'));
  }

  return axios.post(
      `${API_BASE_URL}/category/add`,
      JSON.stringify(category),
      {
          headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
      }
  );
};

export const updateCategory = (id, category) =>
  axios.put(`${API_BASE_URL}/category/update/${id}`, category);


export const deleteCategory = (id) => {
  const token = localStorage.getItem('authToken');

  return axios.delete(`${API_BASE_URL}/category/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


// SubCategory
export const createSubCategory = async (subCategory) => {
  return axios.post(`${API_BASE_URL}/SubCategory/create`, subCategory);
};

export const getAllSubCategories = async () => {
  return axios.get(`${API_BASE_URL}/subcategory/all`);
};

export const getSubCategoryById = async (id) => {
  return axios.get(`${API_BASE_URL}/subcategory/${id}`);
};

export const getSubCategoriesByCategory = async (categoryId) => {
  return axios.get(`${API_BASE_URL}/Subcategory/Category${categoryId}`);
};



export const updateSubCategory = async (id, updatedData) => {
  return axios.put(`${API_BASE_URL}/subcategory/${id}`, updatedData);
};

export const deleteSubCategory = async (id) => {
  return axios.delete(`${API_BASE_URL}/subcategory/${id}`);
};

//event
export const addEvent = async (event)=>{
  return axios.post(`${API_BASE_URL}/event/add`,event);
}

export const getAllEvents = async () =>{
  return axios.get(`${API_BASE_URL}/event/all`)
}

export const getEventById = async (id) => {
  return axios.get(`${API_BASE_URL}/event/${id}`);
};

export const updateEvent = async (id, updatedData) => {
  return axios.put(`${API_BASE_URL}/event/update/${id}`,updatedData);
}

export const deleteEvent = async(id) =>{
  return axios.delete(`${API_BASE_URL}/event/delete/${id}`);
}



export const getAllCoverages = async () => {
  const token = localStorage.getItem('authToken');
   return axios.get(`${API_BASE_URL}/coverage/all`, {
   headers: {
    'Authorization': `Bearer ${token}`, 
      },
    });
};
 
 

export const getCoverageByNumber = async (coverageNumber) => {
  return axios.get(`${API_BASE_URL}/coverage/${coverageNumber}`);
}


// Delete a coverage
export const deleteCoverage = (coverageNumber) => {

    const token = localStorage.getItem('authToken');
    return axios.delete(`${API_BASE_URL}/coverage/delete/${coverageNumber}`,{
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
  };

  // Add a new coverage
export const addCoverage = async (coverageData, token) => {
  try {
      const response = await axios.post(`${API_BASE_URL}/coverage/add`, coverageData, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      return response.data;
  } catch (error) {
      console.error('Error adding coverage:', error);
      throw error;
  }
};

// Update a coverage by coverage number
export const updateCoverage = async (coverageNumber, updatedData, token) => {
  try {
      const response = await axios.put(`${API_BASE_URL}/coverage/update/${coverageNumber}`, updatedData, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      return response.data;
  } catch (error) {
      console.error(`Error updating coverage with number ${coverageNumber}:`, error);
      throw error;
  }
};

// fetch filtered coverages
export const fetchFilteredCoverages = async ({ startDate, endDate, correspondent }) => {
  try {
    const token = localStorage.getItem('authToken'); 

    const response = await axios.get(`${API_BASE_URL}/coverages/filter`, {
      params: { startDate, endDate, correspondent },
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

    return Array.isArray(response.data.coverages) ? response.data.coverages : [];
  } catch (error) {
    throw new Error(error.response?.data?.message || 'An error occurred');
  }
};

// get coverages for the current month
export const getCoveragesCurrentMonth = async () => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.get(`${API_BASE_URL}/coverages/current-month`, {
      headers: {
        'Authorization': `Bearer ${token}`, 
      },
    });
    return response.data; 
  } catch (error) {
    console.error('Error fetching coverages for current month:', error);
    throw error; 
  }
};

export const getCoveragesByDistrictAndDates = async (district,startDate,endDate) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(
      `${API_BASE_URL}/coverages/district-wise-coverages`,
      {
        params: { district,startDate,endDate},
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching coverages:", error);
    return [];
  }
};

export const getAllCoverage = async (startDate, endDate, correspondentId = '') => {
  try {
    const token = localStorage.getItem("authToken");
      const response = await axios.get(`${API_BASE_URL}/coverage/payment/all`, {
          params: { startDate, endDate, correspondentId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
  } catch (error) {
      console.error('Error fetching coverage data:', error.response?.data || error.message);
      throw error;
  }
};



// Generate payments for all correspondents
export const generatePayments = async (month, year) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.post(`${API_BASE_URL}/payments/generate-all`, 
      { month, year },
      {
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      }
    );
    return response.data; 
  } catch (error) {
    console.error('Error generating payments:', error);
    throw error; 
  }
};

// Fetch all generated payments
export const getAllGeneratedPayments = async () => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.get(`${API_BASE_URL}/payments/generated/all`, {
      headers: {
        'Authorization': `Bearer ${token}`, 
      },
    });
    return response.data; 
  } catch (error) {
    throw new Error('Error fetching payments');
  }
};


export const approvePayment = async (paymentId) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.patch(`${API_BASE_URL}/payment/approve/${paymentId}`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`, 
      },
    });
    return response.data; 
  } catch (error) {
    console.error('Error approving payment:', error);
    throw error; 
  }
};


// Send email to correspondents with approved payments
export const sendApprovalEmails = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/payments/approved/email`);
    return response.data; 
  } catch (error) {
    console.error('Error sending emails for approved payments:', error);
    throw error; 
  }
};

// Get all approved payments
export const getAllApprovedPayments = async () => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.get(`${API_BASE_URL}/payments/approved/all`, {
      headers: {
        'Authorization': `Bearer ${token}`, 
      },
    });
    return response.data; 
  } catch (error) {
    console.error('Error fetching approved payments:', error);
    throw error; 
  }
};

// Get total approved payments for the previous month
export const getApprovedPaymentsPreviousMonth = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/payments/approved/previous-month`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching approved payments for the previous month:', error);
    throw error; 
  }
};

// Get total approved payments for the current month
export const getApprovedPaymentsCurrentMonth = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/payments/approved/current-month`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching approved payments for the current month:', error);
    throw error; 
  }
};

// Get total pending payments for the current month
export const getPendingPaymentsCurrentMonth = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/payments/pending/current-month`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching pending payments for the current month:', error);
    throw error; 
  }
};

// Get all approved payments based on filters
export const getApprovedPaymentsByFilters = async (filters) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/payments/approvedby/all`, { params: filters });
    return response.data; 
  } catch (error) {
    console.error('Error fetching approved payments by filters:', error);
    throw error; 
  }
};


export const getCoverageCountByCorrespondent = async ( startDate, endDate) => {
  try {
    const token = localStorage.getItem('authToken');
      const response = await axios.get(`${API_BASE_URL}/coverages/month-count-for-all`, {
          headers: {
              Authorization: `Bearer ${token}` 
          },
          params: { startDate, endDate } 
      });
      return response.data;
  } catch (error) {
      console.error("Error fetching coverage count:", error.response?.data || error.message);
      throw error;
  }
};

  

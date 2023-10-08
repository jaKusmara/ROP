import axios from 'axios';

export const fetchPeopleDataSearchBar = async (query, user) => {
  try {
    const response = await axios.get('http://localhost:5000/api/search', {
      headers:{
        'Authorization': `Bearer ${user.token}`
      },
      params: { query },
    });
    
    console.log(response.data)

    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

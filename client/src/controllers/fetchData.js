import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

export const fetchData = async(url) => {
    const {user} = useAuthContext()

    try {
        const response = await axios.post(
            `${url}`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );

          if(response.ok){
            return response
          }
    } catch (error) {
        return error
    }
}
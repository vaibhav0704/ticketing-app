import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    errors.forEach(error => {
      try {
        toast.error(error.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      } catch (e) {
        console.log(e);
      }
    })
  
  }, [errors])

  const doRequest = async () => {
    try {
      setErrors([]);
      const response = await axios[method](url, body);
      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (err) {
      setErrors(err.response.data.errors);
    }
  };

  return { doRequest, errors }
}
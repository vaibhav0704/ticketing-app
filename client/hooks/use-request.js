import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState([]);

  const toast = useToast();

  useEffect(() => {    
    errors.forEach(error => {
      toast({
        title: error.field,
        status: 'error',
        description: error.message,
        duration: 9000,
        isClosable: true,
        position: 'top-right'
      })
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
      console.log(err);
      setErrors(err.response.data.errors);
    }
  };

  return { doRequest, errors }
}
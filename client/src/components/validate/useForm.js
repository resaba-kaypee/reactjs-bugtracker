import { useState, useEffect, useContext } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthAdminContext from "../../context/authAdmin/authAdminContext";


const useForm = (callback, initialState = {}, validate) => {
  const alertContext = useContext(AlertContext);
  const authAdminContext = useContext(AuthAdminContext);
  const { setAlert } = alertContext;
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    if (authAdminContext.error) {
      setAlert("Admin/User already registered!", "danger");
      authAdminContext.clearErrors(); 
    }

    if (Object.keys(errors).length === 0 && isValidating) {
      callback();
      setValues(initialState)
      setAlert("Registered Successful!", "success")
    }
    // eslint-disable-next-line
  }, [errors, authAdminContext.error, setAlert]);

  const handleChange = event => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value
    });
    
  };

  const handleSubmit = event => {
    event.preventDefault();
    setErrors(validate(values));
    setIsValidating(true);
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors
  };
};

export default useForm;

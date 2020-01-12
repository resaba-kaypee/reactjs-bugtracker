import { useState, useEffect } from "react";

const useForm = (callback, initialState = {}, validate) => {
  const [values, setValues] = useState(initialState);

  const [errors, setErrors] = useState({});
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isValidating) {
      callback()
    } 
    // eslint-disable-next-line
  }, [errors]);

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
    setIsValidating(true)
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors
  };
};

export default useForm;

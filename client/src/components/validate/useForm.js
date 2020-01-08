import { useState, useEffect } from "react";

const useForm = (callback, validate) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

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
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    setErrors(validate(user));
    setIsValidating(true)
  };

  return {
    handleChange,
    handleSubmit,
    user,
    errors
  };
};

export default useForm;

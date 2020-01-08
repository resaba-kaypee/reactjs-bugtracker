export default function validate(values) {
  let errors = {}

    if(!values.name){
      errors.name = "Name is required."
    } else if (!/^[^\s][A-Za-z\s]{1,}[.]{0,1}[A-Za-z\s]{0,}$/i.test(values.name)){
      errors.name = "Name is invalid."
    } 

    if(!values.email){
      errors.email = "Email is required."
    } else if (!/^[a-zA-Z0-9]+@[^@\s]+\.[^@\s]+$/i.test(values.email)){
      errors.email = "Email is invalid."
    } 

    if(!values.password){
      errors.password = "Password is required"
    } else if(values.password.length < 6){
      errors.password = "Password needs to be more than 6 characters."
    }

    if(!values.password2 || values.password !== values.password2){
      errors.password2 = "Password did not match."
    }
  return errors;
}

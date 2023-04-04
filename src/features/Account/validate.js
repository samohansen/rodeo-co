export function loginValidate(values){
  const errors = {};

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = "Required";
  } else if(values.password.length < 8 || values.password.length > 30){
    errors.password = "Must have 8-30 characters";
  } else if(values.password.includes(" ")){
    errors.password = "Invalid Password";
  }

  return errors;
};

export function registerValidate(values){
  const errors = {};
  
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = "Required";
  } else if(values.password.length < 6 || values.password.length > 30) {
    errors.password = "Must have 6-30 characters";
  } else if(values.password.includes(" ")) {
    errors.password = "Invalid Password";
  }
  if (!values.cpassword) {
    errors.cpassword = "Required";
  } else if (values.password !== values.cpassword) {
    errors.cpassword = "Passwords do not match."
  } else if (values.cpassword.includes(" ")) {
    errors.cpassword = "Invalid Password"
  }

  if (!values.userType || values.userType === "") {
    errors.userType = "Required";
  }

  return errors;
};

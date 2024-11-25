export function validation(type, value) {
  const nameRegex = /^[A-Za-z\s]{3,}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const mobileRegex = /^(\+?\d{1,3}[-\s]?)?\d{10}$/;
  const dobRegex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  const passwordRegex = /^[a-zA-Z0-9]{7,}$/;

  if (value) {
    switch (type) {
      case "name":
        return !nameRegex.test(value)
          ? `${type} Should be atleast 3 characters with no special characters`
          : null;
      case "email":
        return !emailRegex.test(value) ? `${type} ID should be valid` : null;
      case "mobile":
        return !mobileRegex.test(value) ? `${type} number is invalid` : null;
      case "dob":
        return !dobRegex.test(value) ? `${type} DOB is Invalid` : null;
      case "gender":
        return ["male", "female"].includes(value)
          ? null
          : `${type} to be selected`;
      case "class":
        return [1, 2, 3, 4, 5, 6, 7, 8].includes(parseInt(value))
          ? null
          : `${type} cannot be empty`;
      case "subject":
        return ["English", "Hindi", "Maths", "Science", "EVS"].includes(value)
          ? null
          : `${type} cannot be empty`;
      case "password":
        return !passwordRegex.test(value)
          ? `${type} Should be atleast 7 characters and alphanumeric`
          : null;
    }
  } else {
    return `${type} cannot be empty`;
  }
}

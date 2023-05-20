export default function inputIsValid(formElement) {
  let inputs = [...formElement.getElementsByTagName("input")]; // live htmldocuments -> normal array
  inputs.reverse();
  let isValid = true;
  for (let input of inputs) {  // in != of
    isValid &= input.reportValidity(); 
  }
  return isValid;
}
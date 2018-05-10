const Validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validatePostInput(data) {
  let errors = {};
  data.text = !isEmpty(data.text) ? data.text : '';
  data.name = !isEmpty(data.name) ? data.name :'';
  
  //not pass the validator then set the errors.name
  if(!Validator.isLength(data.text,{min:2,max:300})){
      errors.text="Post must be between 10 and 300 characters "
  }
  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text filed is required';
  }

 
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

/**
 * It asks the browser for data validation by calling the element’s
 * checkValidity method.
 * @param {object} elem HTML element object
 * @returns {Array}
 * @see https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation
 */
export default function GetValidationMessages(elem) {
  const errors = [];
  // returns true if the element’s value is valid and false otherwise
  if (!elem.checkValidity()) {
    if (elem.validity.valueMissing) {
      errors.push('Value required');
    }
    if (elem.validity.tooShort) {
      errors.push('Value is too short');
    }
    if (elem.validity.rangeUnderflow) {
      errors.push('Value is too small');
    }
  }
  return errors;
}

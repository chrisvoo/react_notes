import validator from 'validator';

export default function ValidateData(data, rules) {
  const errors = {};
  Object.keys(data).forEach((field) => {
    if (Object.prototype.hasOwnProperty.call(rules, field)) {
      const fielderrors = [];
      const val = data[field];
      if (rules[field].true) {
        if (!val) {
          fielderrors.push('Must be checked');
        }
      } else {
        if (rules[field].required && validator.isEmpty(val)) {
          fielderrors.push('Value required');
        }

        if (!validator.isEmpty(data[field])) {
          // This method returns true if a value exceeds a minimum length.
          if (rules[field].minlength && !validator.isLength(val, rules[field].minlength)) {
            fielderrors.push(`Enter at least ${rules[field].minlength} characters`);
          }

          // This method returns true if a value contains only letters.
          if (rules[field].alpha && !validator.isAlpha(val)) {
            fielderrors.push('Enter only letters');
          }

          if (rules[field].email && !validator.isEmail(val)) {
            fielderrors.push('Enter a valid email address');
          }

          if (rules[field].equals && !validator.equals(val, data[rules[field].equals])) {
            fielderrors.push("Values don't match");
          }
        }
      }
      if (fielderrors.length > 0) {
        errors[field] = fielderrors;
      }
    }
  });
  return errors;
}

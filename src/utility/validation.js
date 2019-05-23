const validate = (val, rules, connectedValue) => {
    let isValid = true;
    for (let rule in rules) {
        switch (rule) {
            // You want 2 gates in the and statement because if there was a rule checked before this that set isValid to false, then the second gate would overwrite isValid.  You want the auth to pass ALL validation checks, so nothing should change it to false in a successful login
            case "isEmail":
                isValid = isValid && emailValidator(val);
                break;
            case "minLength":
                isValid = isValid && minLengthValidator(val, rules[rule]);
                break;
            case "equalTo":
                isValid = isValid && equalToValidator(val, connectedValue[rule]);
                break;
            case "notEmpty":
                isValid = isValid && notEmptyValidator(val);
                break;
            default:
                isValid = true;
        }
    }

    return isValid;
};

const emailValidator = val => {
    // . test() will return true or false
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
        val
    );
};

const minLengthValidator = (val, minLength) => {
    return val.length >= minLength;
};

const equalToValidator = (val, checkValue) => {
    return val === checkValue;
};

// for SharePlace.js validation
const notEmptyValidator = val => {
    // .trim() removes any extra whitespace at the beginning or end
    return val.trim() !== "";
};

export default validate;

let errors = {};

export const validate = (qid, value, properties, cb) => {
    errors = {};
    errors[qid] = []

    if (properties?.['required'] === 'Yes') {
        required(qid, value);
    }

    if (properties?.['isValidEmail'] === 'Yes') {
        isValidEmail(qid, value);
    }

    if (properties?.['minLength']) {
        minLength(qid, value, properties?.['minLength']);
    }

    if (properties?.['maxLength']) {
        maxLength(qid, value, properties?.['maxLength']);
    }

    for (const [qid, value] of Object.entries(errors)) {
        if (_.isEmpty(value)) {
            delete errors[qid];
        }
    }

    cb(errors);
}

/**
 *
 * @param qid
 * @param value
 */
const required = (qid, value) => {
    // errors[qid] = [];

    // Is Object
    if (_.isObject(value)) {
        const values = {...value};
        for (const value of Object.values(values)) {
            if (_.isEmpty(value)) {
                errors[qid] = [
                    ...errors[qid],
                    "The fields are required."
                ];
                break
            }
        }
        return false;
    }

    value = value.toString();
    value = value.trim();

    if (_.isEmpty(value)) {
        errors[qid] = [
            ...errors[qid],
            "This field is required."
        ]
    }
}

/**
 *
 * @param qid
 * @param value
 */
const isValidEmail = (qid, value) => {
    //errors[qid] = [];

    value = value.toString();
    value = value.trim();

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) === false) {
        errors[qid] = [
            ...errors[qid],
            "Invalid email address."
        ]
    }
}

/**
 *
 * @param qid
 * @param value
 * @param minLength
 */
const minLength = (qid, value, minLength) => {
    // errors[qid] = [];

    value = value.toString()
    value = value.trim();

    const valueLength = value.length;

    if (valueLength < minLength) {
        errors[qid] = [
            ...errors[qid],
            "Minimum length should be " + minLength
        ]
    }
}

/**
 *
 * @param qid
 * @param value
 * @param maxLength
 */
const maxLength = (qid, value, maxLength) => {
    // errors[qid] = [];

    value = value.toString()
    value = value.trim();

    const valueLength = value.length;

    if (valueLength > maxLength) {
        errors[qid] = [
            ...errors[qid],
            "Maximum length should be " + maxLength
        ]
    }
}

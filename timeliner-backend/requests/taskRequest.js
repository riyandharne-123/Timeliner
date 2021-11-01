const validation = require('../helpers/validate');

const validate = (req, res, next, validationRule) => {
    validation(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(500)
                .send({
                    success: false,
                    message: err,
                });
        } else {
            next();
        }
    });
}

const task = (req, res, next) => {
    const validationRule = {
        "name": "required|string|min:5",
        "description": "required|string|min:15",
        "date": "required|string",
        "time": "required|string"
    }
    validate(req, res, next, validationRule)
}

module.exports = { 
    task
}
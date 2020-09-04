class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

const handleError = (err, res) => {
    console.error(err);

    if (typeof err === 'ErrorHandler') {
        const { statusCode, message } = err;
        res.status(statusCode).json({
            status: "error",
            statusCode,
            message
        });
    } else {
        res.status(500).json({
            status: "error",
            statusCode: 500,
            message: `${err}`
        });
    }
};

module.exports = {
    ErrorHandler,
    handleError
}

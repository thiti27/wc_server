exports.getError = err => {
    var error = {}

    if (err.code) {
        switch (err.code) {
            default:
                error['errCode'] = err.code;
                error['errMessage'] = err.sqlMessage;
        }
    } else {
        error['errCode'] = 'Unknown';
        error['errMessage'] = `${err}`;
    }
    return error;
};
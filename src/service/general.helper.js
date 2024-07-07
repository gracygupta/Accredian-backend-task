const Res =  (res, status, message, data) => { // Success Web Response

    let res_obj = {

        "status": status,

        "message": message,

        "data": data

    }

    return res.status(status).json(res_obj)

};

module.exports = Res
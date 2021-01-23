module.exports = {
    response: (res, msg, data = null) => {
        if (
            typeof msg !== 'string' &&
            (msg.getCode() === 400 ||
                msg.getCode() === 401 ||
                msg.getCode() === 404 ||
                msg.getCode() === 500)
        ) {
            return res.status(msg.getCode()).json({
                isSuccess: false,
                message: msg.message,
                data,
            });
        }

        return res.status(200).json({
            isSuccess: true,
            message: msg,
            data,
        });
    },
    badRequest: (res, message, data) => {
        return res.status(400).json({ isSuccess: false, message, data })
    }
}


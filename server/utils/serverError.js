

class ServerError extends Error {
	constructor(message, error) {
		super();
		this.message = message;
		this.error = error;
		console.error(this.message, { status: this.getCode(), error: this.error });
	}

	getCode() {
		if (this instanceof BadRequest) return 400;
		if (this instanceof Unauthorized) return 401;
		if (this instanceof NotFound) return 404;
		return 500;
	}
}

class BadRequest extends ServerError {}
class Unauthorized extends ServerError {}
class NotFound extends ServerError {}

module.exports = {
	ServerError,
	Unauthorized,
	BadRequest,
	NotFound,
};

export class ApiError extends Error {
    constructor (status, code, errors = []) {
        super(code)
        this.status = status
        this.errors = errors
    }

    static badRequest (errors = []) {
        return new ApiError(400, 'BAD_REQUEST', errors)
    }

    static unAuth () {
        return new ApiError(403, 'NOT_AUTH')
    }

    static noPermission () {
        return new ApiError(403, 'NOT_HAVE_PERMISSION')
    }

    static noProvideApiKey () {
        return new ApiError.badRequest()
    }
}

export function ErrorMiddleware (err, req, res, next) {
    if (err instanceof ApiError) {
        try {
            return res.status(err.status).json({
                code: err.message,
                errors: err.errors.map(item => item.errors.map(item => item.message))
            })
        } catch (e) {
            return res.status(err.status).json({
                code: err.message,
                errors: err.errors
            })
        }
    }
}
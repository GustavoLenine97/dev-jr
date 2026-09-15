export function errorHandler(err, req, res, next) {
    console.error(err)

    const status = err.status || 500
    
    return res.status(status).json({
        status,
        message: status === 500 
            ? 'Erro interno do servidor'
            : err.message
    })
}
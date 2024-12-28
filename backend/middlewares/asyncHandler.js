const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500; // Utilise le statut défini ou 500 par défaut
    res.status(statusCode).json({
      message: error.message,
      stack: process.env.NODE_ENV === 'production' ? null : error.stack,
    });
  });
};

export default asyncHandler;

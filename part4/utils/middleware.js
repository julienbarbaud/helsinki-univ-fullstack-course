const errorHandler = (error, request, response, next) => {
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  if (error.name === 'CastError') {
    return response.status(400).json({ error: error.message });
  }
  return next(error);
};

const unknownEndpoint = (request, response) => response.status(404).json({ error: 'specified endpoint does not exist' });

module.exports = { unknownEndpoint, errorHandler };

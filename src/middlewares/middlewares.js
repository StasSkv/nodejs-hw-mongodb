import pino from 'pino-http';

export const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
});

export const notFound = (req, res, next) => {
  res.status(404).json({
    message: 'Not found',
  });
};

export const errorHandler = (err, req, res, next) => {
  res.status(500).json({
    message: 'Something went wrong',
    error: err.message,
  });
};

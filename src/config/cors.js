import cors from 'cors';
import settings from './settings.js';

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (Postman, mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);

    if (settings.cors.allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    callback(new Error(`CORS: origin '${origin}' is not allowed`));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Length'],
  credentials: true,
  optionsSuccessStatus: 200, // IE11 compatibility
};

export default cors(corsOptions);

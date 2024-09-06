export const CORS_OPTIONS = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true, // Permitir el envío de cookies
  optionsSuccessStatus: 200, // Para algunos navegadores legacy
};

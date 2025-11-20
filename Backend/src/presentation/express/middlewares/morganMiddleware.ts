import morgan, { StreamOptions } from "morgan";

const stream: StreamOptions = {
  write: (message) => console.log(message.trim()),
};

const morganFormat =
  process.env.NODE_ENV === "production"
    ? "combined"
    : "dev"; 

export const morganMiddleware = morgan(morganFormat, { stream });

import { AuthPayload } from "../../../app/types/AuthPayload";

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export {};

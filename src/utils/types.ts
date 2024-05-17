import { Session } from "next-auth";

export interface mySession extends Session {
  id: string | null;
  isAdmin: boolean | null;
}

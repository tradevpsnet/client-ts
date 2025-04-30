import { Client } from "../../client";
import { ILoginParams } from "../../types/auth/login";
import { Login } from "./login/login";

export class Auth {
  constructor( readonly client: Client) {}

  async login(params: ILoginParams) {
    return new Login(this).execute(params);
  }
}
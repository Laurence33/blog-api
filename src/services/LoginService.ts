import { Login } from "../models/login.model";

export async function createNewLogin(body: any) {
  return await Login.create({
    username: body.username,
    passwordDigest: body.passwordDigest,
  });
}

export async function findLoginByUsername(username: string) {
  return Login.findOne({
    username: username,
  });
}

export async function getLoginById(id: string) {
  return Login.findById(id);
}

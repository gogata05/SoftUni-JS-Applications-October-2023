import * as api from "./api.js";
const host = "http://localhost:3030";
api.settings.host = host;
export const login = api.login;
export const register = api.register;
export const logout = api.logout;
// Application-specific request
export async function getAllItems() {
  return await api.get(host + "/data/fruits?sortBy=_createdOn%20desc");
}
export async function getItemById(id) {
  return await api.get(host + `/data/fruits/${id}`);
}
export async function addItem(item) {
  return await api.post(host + "/data/fruits", item);
}
export async function editItemById(id, item) {
  return await api.put(host + `/data/fruits/${id}`, item);
}
export async function deleteItemById(id) {
  return await api.del(host + `/data/fruits/${id}`);
}
export async function search(item) {
  return await api.get(host + `/data/fruits?where=name%20LIKE%20%22${item}%22`);
}


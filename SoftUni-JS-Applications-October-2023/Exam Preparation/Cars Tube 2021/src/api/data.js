import * as api from "./api.js";
const host = "http://localhost:3030";
api.settings.host = host;
export const login = api.login;
export const register = api.register;
export const logout = api.logout;

//main
//Replace cars url: Ctrl+H
////check description URLs if different
export async function getAllItems() {
  return await api.get(host + `/data/cars?sortBy=_createdOn%20desc`);//!
}
export async function getItemById(id) {
  return await api.get(host + `/data/cars/${id}`);
}
export async function addItem(item) {
  return await api.post(host + `/data/cars`, item);
}
export async function editItemById(id, item) {
  return await api.put(host + `/data/cars/${id}`, item);
}
export async function deleteItemById(id) {
  return await api.del(host + `/data/cars/${id}`);
}

////Search: remove if bonus not search!
export async function search(item) {
  return await api.get(host + `/data/cars?where=year%3D${item}`);//!
}

//profile: remove if not needed
export async function getAllMyItems() {
  let user = JSON.parse(sessionStorage.getItem('user'));
  let userId = user && user._id;
  if (user) {
      let data = await api.get(host +`/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)//!
      return data
  }
}
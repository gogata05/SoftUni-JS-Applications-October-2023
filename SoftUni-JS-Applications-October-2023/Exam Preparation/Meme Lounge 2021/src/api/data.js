import * as api from "./api.js";
const host = "http://localhost:3030";
api.settings.host = host;
export const login = api.login;
export const register = api.register;
export const logout = api.logout;

//main
//Replace memes url: Ctrl+H
////check description URLs if different
export async function getAllItems() {
  return await api.get(host + `/data/memes?sortBy=_createdOn%20desc`);//!
}
export async function getItemById(id) {
  return await api.get(host + `/data/memes/${id}`);
}
export async function addItem(item) {
  return await api.post(host + `/data/memes`, item);
}
export async function editItemById(id, item) {
  return await api.put(host + `/data/memes/${id}`, item);
}
export async function deleteItemById(id) {
  return await api.del(host + `/data/memes/${id}`);
}

//Profile: remove if bonus not profile!
////check description URLs if different
export async function getAllMyItems() {
  let user = JSON.parse(sessionStorage.getItem('user'));
  let userId = user && user._id;
  if (user) {
      let data = await api.get(host +`/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)//!
      return data
  }
}


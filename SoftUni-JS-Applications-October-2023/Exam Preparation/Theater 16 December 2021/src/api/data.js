import * as api from "./api.js";
const host = "http://localhost:3030";
api.settings.host = host;
export const login = api.login;
export const register = api.register;
export const logout = api.logout;

//main
//Replace theaters url: Ctrl+H
////check description URLs if different
// export async function getAllItems() {
//   return await api.get(host + `/data/theaters?sortBy=_createdOn%20desc&distinct=title`);//!
// }
export async function getItemById(id) {
  return await api.get(host + `/data/theaters/${id}`);
}
export async function addItem(item) {
  return await api.post(host + `/data/theaters`, item);
}
export async function editItemById(id, item) {
  return await api.put(host + `/data/theaters/${id}`, item);
}
export async function deleteItemById(id) {
  return await api.del(host + `/data/theaters/${id}`);
}

////Like: remove if bonus not likes!
//Replace fact url: Ctrl+H
////check description URLs if different
export async function like(itemId) {
  return await api.post(host + `/data/likes`, itemId);
}
export async function getTotalLikes(itemId) {
  return await api.get(
    host +
      `/data/likes?where=theaterId%3D%22${itemId}%22&distinct=_ownerId&count`//!
  );
}
export async function didUserLiked(itemId, userId) {
  return await api.get(
    host +
      `/data/likes?where=theaterId%3D%22${itemId}%22%20and%20_ownerId%3D%22${userId}%22&count`//!
  );
}

//Profile: remove if bonus not profile!
////check description URLs if different
export async function getAllMyItems() {
  let user = JSON.parse(sessionStorage.getItem('user'));
  let userId = user && user._id;
  if (user) {
      let data = await api.get(host +`/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)//!
      return data
  }
}

//complicated home view://remove if home is without if else ? : //not often used
////check description URLs if different
export async function getHome() {
  return await api.get(host + `/data/theaters?sortBy=_createdOn%20desc&distinct=title`);//!
}

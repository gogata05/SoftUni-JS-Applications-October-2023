import * as api from "./api.js";
const host = "http://localhost:3030";
api.settings.host = host;
export const login = api.login;
export const register = api.register;
export const logout = api.logout;

//main
//Replace offers url: Ctrl+H
////check description URLs if different
export async function getAllItems() {
  return await api.get(host + `/data/offers?sortBy=_createdOn%20desc`);//!
}
export async function getItemById(id) {
  return await api.get(host + `/data/offers/${id}`);
}
export async function addItem(item) {
  return await api.post(host + `/data/offers`, item);
}
export async function editItemById(id, item) {
  return await api.put(host + `/data/offers/${id}`, item);
}
export async function deleteItemById(id) {
  return await api.del(host + `/data/offers/${id}`);
}

////Like: remove if bonus not likes!
//Replace factId url: Ctrl+H
////check description URLs if different
export async function like(itemId) {
  return await api.post(host + `/data/applications`, itemId);
}
export async function getTotalLikes(itemId) {
  return await api.get(
    host +
      `/data/applications?where=offerId%3D%22${itemId}%22&distinct=_ownerId&count`//!
  );
}
export async function didUserLiked(itemId, userId) {
  return await api.get(
    host +
      `/data/applications?where=offerId%3D%22${itemId}%22%20and%20_ownerId%3D%22${userId}%22&count`//!
  );
}

//complicated home view://remove if home is without if else ? : //not often used
////check description URLs if different
export async function getHome() {
  return await api.get(host + `/data/games?sortBy=_createdOn%20desc&distinct=category`);//!
}

import * as api from "./api.js";
const host = "http://localhost:3030";
api.settings.host = host;
export const login = api.login;
export const register = api.register;
export const logout = api.logout;

//main
//Replace names url: Ctrl+H
////check description URLs if different
export async function getAllItems() {
  return await api.get(host + `/data/names?sortBy=_createdOn%20desc`);//!
}
export async function getItemById(id) {
  return await api.get(host + `/data/names/${id}`);
}
export async function addItem(item) {
  return await api.post(host + `/data/names`, item);
}
export async function editItemById(id, item) {
  return await api.put(host + `/data/names/${id}`, item);
}
export async function deleteItemById(id) {
  return await api.del(host + `/data/names/${id}`);
}

////Search: remove if bonus not search!
export async function search(item) {
  return await api.get(host + `/data/names?where=name%20LIKE%20%22${item}%22`);//!
}

////Like: remove if bonus not likes!
//Replace factId url: Ctrl+H
////check description URLs if different
export async function like(itemId) {
  return await api.post(host + `/data/likes`, itemId);//!
}
export async function getTotalLikes(itemId) {
  return await api.get(
    host +
      `/data/likes?where=factId%3D%22${itemId}%22&distinct=_ownerId&count`//!
  );
}
export async function didUserLiked(itemId, userId) {
  return await api.get(
    host +
      `/data/likes?where=factId%3D%22${itemId}%22%20and%20_ownerId%3D%22${userId}%22&count`//!
  );
}

//Comment: remove if bonus not comments
////check description URLs if different
export async function getComments(itemId) {
  return await api.get(host + `/data/comments?where=gameId%3D%22${itemId}%22`);//!
}
export async function makeComment(itemId, comment) {
  return await api.post(host + "/data/comments",{ gameId: itemId, comment });//!
}

//Profile: remove if bonus not profile!
////check description URLs if different
export async function getAllMyItems() {
  let user = JSON.parse(sessionStorage.getItem('user'));
  let userId = user && user._id;
  if (user) {
      let data = await api.get(host +`/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)//!
      return data
  }
}

//complicated home view://remove if home is without if else ? : //not often used
////check description URLs if different
export async function getHome() {
  return await api.get(host + `/data/games?sortBy=_createdOn%20desc&distinct=category`);//!
}

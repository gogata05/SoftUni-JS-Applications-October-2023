import * as api from "./api.js";
const host = "http://localhost:3030";
api.settings.host = host;
export const login = api.login;
export const register = api.register;
export const logout = api.logout;


//Replace album url: Ctrl+H
export async function getAllItems() {
  return await api.get(host + `/data/albums?sortBy=_createdOn%20desc`);//sometimes different
}
export async function getItemById(id) {
  return await api.get(host + `/data/albums/${id}`);
}
export async function addItem(item) {
  return await api.post(host + `/data/albums`, item);
}
export async function editItemById(id, item) {
  return await api.put(host + `/data/albums/${id}`, item);
}
export async function deleteItemById(id) {
  return await api.del(host + `/data/albums/${id}`);
}

//likes
//Replace fact url: Ctrl+H
export async function like(itemId) {
  return await api.post(host + `/data/likes`, itemId);//replace
}
export async function getTotalLikes(albumId) {
  return await api.get(
    host +
      `/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`
  );
}
export async function didUserLiked(albumId, userId) {
  return await api.get(
    host +
      `/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`
  );
}



//complicated home view/not often used
export async function getHome() {
  return await api.get(host + `/data/games?sortBy=_createdOn%20desc&distinct=category`);//when home is with if else ? ://sometimes different
}

//comments
export async function getComments(gameId) {
  return await api.get(host + `/data/comments?where=gameId%3D%22${gameId}%22`);//sometimes different
}
export async function makeComment(gameId, comment) {
  return await api.post(host + "/data/comments",{ gameId, comment });//sometimes different
}


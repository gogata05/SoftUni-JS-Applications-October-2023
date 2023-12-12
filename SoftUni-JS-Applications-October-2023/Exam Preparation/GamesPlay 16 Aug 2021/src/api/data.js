import * as api from "./api.js";
const host = "http://localhost:3030";
api.settings.host = host;
export const login = api.login;
export const register = api.register;
export const logout = api.logout;


//Replace games url: Ctrl+H
export async function getAllItems() {
  return await api.get(host + "/data/games?sortBy=_createdOn%20desc");//sometimes different
}
export async function addItem(item) {
  return await api.post(host + "/data/games", item);
}

export async function getItemById(id) {
  return await api.get(host + `/data/games/${id}`);
}
export async function editItemById(id, item) {
  return await api.put(host + `/data/games/${id}`, item);
}
export async function deleteItemById(id) {
  return await api.del(host + `/data/games/${id}`);
}

export async function getHome() {
  return await api.get(host + `/data/games?sortBy=_createdOn%20desc&distinct=category`);//when home is with if else ? :
}

//comments
export async function getComments(gameId) {
  return await api.get(host + `/data/comments?where=gameId%3D%22${gameId}%22`);
}
export async function makeComment(gameId, comment) {
  return await api.post(host + "/data/comments",{ gameId, comment });//?
}


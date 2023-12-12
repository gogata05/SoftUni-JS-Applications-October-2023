import * as api from "./api.js";
const host = "http://localhost:3030";
api.settings.host = host;
export const login = api.login;
export const register = api.register;
export const logout = api.logout;


//Replace books url: Ctrl+H
export async function getAllItems() {
  return await api.get(host + `/data/books?sortBy=_createdOn%20desc`);//sometimes different
}
export async function getItemById(id) {
  return await api.get(host + `/data/books/${id}`);
}
export async function addItem(item) {
  return await api.post(host + `/data/books`, item);

}

export async function editItemById(id, item) {
  return await api.put(host + `/data/books/${id}`, item);
}
export async function deleteItemById(id) {
  return await api.del(host + `/data/books/${id}`);
}


//likes
//Replace book url: Ctrl+H
export async function like(itemId) {
  return await api.post(host + `/data/likes`, itemId);//replace
}
export async function getTotalLikes(itemId) {
  return await api.get(
    host +
    `/data/likes?where=bookId%3D%22${itemId}%22&distinct=_ownerId&count`//sometimes different
    );
  }
  export async function didUserLiked(itemId, userId) {
    return await api.get(
      host +
      `/data/likes?where=bookId%3D%22${itemId}%22%20and%20_ownerId%3D%22${userId}%22&count`//sometimes different
      );
    }
  
export async function getAllMyItems() {
  let user = JSON.parse(sessionStorage.getItem('user'));
  let userId = user && user._id;
  if (user) {
      let data = await api.get(host +`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)//!
      return data
  }
}

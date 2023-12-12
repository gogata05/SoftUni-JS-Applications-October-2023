import * as api from "./api.js";
const host = "http://localhost:3030";
api.settings.host = host;
export const login = api.login;
export const register = api.register;
export const logout = api.logout;

//Replace names url: ctrl+H
export async function getAllItems() {
  return await api.get(host + "/data/motorcycles?sortBy=_createdOn%20desc");
}
export async function getItemById(id) {
  return await api.get(host + `/data/motorcycles/${id}`);
}
export async function addItem(item) {
  return await api.post(host + "/data/motorcycles", item);
}
export async function editItemById(id, item) {
  return await api.put(host + `/data/motorcycles/${id}`, item);
}
export async function deleteItemById(id) {
  return await api.del(host + `/data/motorcycles/${id}`);
}
export async function search(query) {
  return await api.get(host + `/data/motorcycles?where=model%20LIKE%20%22${query}%22`);
}//only if bonus is search

//likes
//Replace fact url: Ctrl+H
// export async function like(itemId) {
//   return await api.post(host + `/data/likes`, itemId);
// }
// export async function getTotalLikes(itemId) {
//   return await api.get(
//     host +
//       `/data/likes?where=factId%3D%22${itemId}%22&distinct=_ownerId&count`
//   );
// }
// export async function didUserLiked(itemId, userId) {
//   return await api.get(
//     host +
//       `/data/likes?where=factId%3D%22${itemId}%22%20and%20_ownerId%3D%22${userId}%22&count`
//   );
// }



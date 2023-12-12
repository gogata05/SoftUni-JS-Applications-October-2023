import * as api from "./api.js";

const host = "http://localhost:3030";
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

// Application-specific request
// get all listings
export async function getAllItems() {
  return await api.get(host + "/data/facts?sortBy=_createdOn%20desc");
}

// get listing by id
export async function getItemById(id) {
  return await api.get(host + `/data/facts/${id}`);
}

// create listing
export async function addItem(item) {
  return await api.post(host + "/data/facts", item);
}

// edit listing by id
export async function editItemById(id, item) {
  return await api.put(host + `/data/facts/${id}`, item);
}

// delete listing by id
export async function deleteItemById(id) {
  return await api.del(host + `/data/facts/${id}`);
}

export async function like(itemId) {
  return await api.post(host + `/data/likes`, itemId);
}

export async function getTotalLikes(itemId) {
  return await api.get(
    host +
      `/data/likes?where=factId%3D%22${itemId}%22&distinct=_ownerId&count`
  );
}

export async function didUserLiked(itemId, userId) {
  return await api.get(
    host +
      `/data/likes?where=factId%3D%22${itemId}%22%20and%20_ownerId%3D%22${userId}%22&count`
  );
}

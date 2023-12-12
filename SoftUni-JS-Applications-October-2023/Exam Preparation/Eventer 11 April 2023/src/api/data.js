import * as api from "./api.js";

const host = "http://localhost:3030";
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllItems() {
  return await api.get(host + "/data/events?sortBy=_createdOn%20desc");
}

export async function getItemById(id) {
  return await api.get(host + `/data/events/${id}`);
}

export async function addItem(item) {
  return await api.post(host + "/data/events", item);
}

export async function editItemById(id, item) {
  return await api.put(host + `/data/events/${id}`, item);
}

export async function deleteItemById(id) {
  return await api.del(host + `/data/events/${id}`);
}
//likes
export async function go(itemId) {
  return await api.post(host + `/data/going`, itemId);
}

export async function getTotalGoes(itemId) {
  return await api.get(
    host +
      `/data/going?where=eventId%3D%22${itemId}%22&distinct=_ownerId&count`
  );
}

export async function didUserGo(itemId, userId) {
  return await api.get(
    host +
      `/data/going?where=eventId%3D%22${itemId}%22%20and%20_ownerId%3D%22${userId}%22&count`
  );
}

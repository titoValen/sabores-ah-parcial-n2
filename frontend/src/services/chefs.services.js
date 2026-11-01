import { request } from "./api.services";

export function getChefs() {
  return request("/chefs");
}

export function getChefById(chefId) {
  return request(`/chefs/${chefId}`);
}

export function getChefDishes(chefId) {
  return request(`/chefs/${chefId}/dishes`);
}

export function createChef(chef) {
  return request("/chefs", "POST", chef);
}

export function updateChef(chefId, chef) {
  return request(`/chefs/${chefId}`, "PUT", chef);
}

export function deleteChef(chefId) {
  return request(`/chefs/${chefId}`, "DELETE");
}

import { request } from "./api.services";

export function getDishes(filters = {}) {
  const searchParams = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== "") searchParams.set(key, value);
  });

  const query = searchParams.toString();
  return request(`/dishes${query ? `?${query}` : ""}`);
}

export function getDishById(dishId) {
  return request(`/dishes/${dishId}`);
}

export function createDish(dish) {
  return request("/dishes", "POST", dish);
}

export function updateDish(dishId, dish) {
  return request(`/dishes/${dishId}`, "PUT", dish);
}

export function deleteDish(dishId) {
  return request(`/dishes/${dishId}`, "DELETE");
}

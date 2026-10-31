export async function getDishes() {
  const response = await fetch("/api/dishes");

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "No se pudieron cargar los platos");
  }

  return response.json();
}

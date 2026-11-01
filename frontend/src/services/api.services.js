export async function request(path, method = "GET", body) {
  const response = await fetch(`/api${path}`, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(result?.message || "No se pudo completar la solicitud");
  }

  return result;
}

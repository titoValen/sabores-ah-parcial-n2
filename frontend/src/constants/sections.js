export const sections = [
  { id: "entradas", name: "Entradas" },
  { id: "mains", name: "Platos principales" },
  { id: "pastas", name: "Pastas" },
  { id: "postres", name: "Postres" },
  { id: "bebidas", name: "Bebidas" },
];

export function getSectionById(sectionId) {
  return sections.find((section) => section.id === sectionId);
}

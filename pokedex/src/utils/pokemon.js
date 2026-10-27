// Cores associadas a cada tipo de Pokémon
export const TYPE_COLORS = {
  Typeless: "#9aa0a6",
  Normal: "#a8a77a",
  Fire: "#ee8130",
  Water: "#6390f0",
  Grass: "#7ac74c",
  Electric: "#f7d02c",
  Ice: "#96d9d6",
  Fighting: "#c22e28",
  Poison: "#a33ea1",
  Ground: "#e2bf65",
  Flying: "#a98ff3",
  Psychic: "#f95587",
  Bug: "#a6b91a",
  Rock: "#b6a136",
  Ghost: "#735797",
  Dark: "#705746",
  Dragon: "#6f35fc",
  Steel: "#b7b7ce",
};

export const STAT_LABELS = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  specialAttack: "Sp. Atk",
  specialDefense: "Sp. Def",
  speed: "Speed",
};

export const STAT_KEYS = Object.keys(STAT_LABELS);

export const SORT_OPTIONS = [
  { value: "id", label: "ID" },
  { value: "name", label: "Nome" },
  ...STAT_KEYS.map((k) => ({ value: k, label: STAT_LABELS[k] })),
];

export const MAX_STAT = 255;

export function typeColor(name) {
  return TYPE_COLORS[name] ?? "#9aa0a6";
}

export function totalStats(pokemon) {
  return STAT_KEYS.reduce((sum, k) => sum + pokemon.stats[k], 0);
}

export function formatId(id) {
  return `#${String(id).padStart(3, "0")}`;
}

export function imageUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export function normalize(text) {
  return String(text).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
}

export function filterAndSort(
  pokemon,
  { query, type, sortBy, sortDir, onlyFavorites, favorites },
) {
  const q = normalize(query).replace(/^#/, "");

  const filtered = pokemon.filter((p) => {
    if (type !== "all" && !p.types.some((t) => t.name === type)) return false;
    if (onlyFavorites && !favorites.includes(p.id)) return false;
    if (!q) return true;
    return (
      normalize(p.name).includes(q) ||
      String(p.id).includes(q) ||
      formatId(p.id).slice(1).includes(q)
    );
  });

  const dir = sortDir === "desc" ? -1 : 1;
  return [...filtered].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name) * dir;
    if (sortBy === "id") return (a.id - b.id) * dir;
    return (a.stats[sortBy] - b.stats[sortBy]) * dir || a.id - b.id;
  });
}

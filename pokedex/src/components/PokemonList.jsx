import PokemonCard from "./PokemonCard";
import "../css/PokemonList.css";

export default function PokemonList({
  pokemon,
  favorites,
  compareIds,
  onSelect,
  onToggleFavorite,
  onToggleCompare,
  onClear,
}) {
  if (pokemon.length === 0) {
    return (
      <div className="empty">
        <img src="/pokeball.svg" alt="" width="72" height="72" />
        <h2>Nenhum Pokémon encontrado</h2>
        <p>Tente outro nome, ID ou tipo - ou limpe os filtros.</p>
        <button className="btn btn-primary" onClick={onClear}>
          Limpar filtros
        </button>
      </div>
    );
  }

  return (
    <div className="grid">
      {pokemon.map((p) => (
        <PokemonCard
          key={p.id}
          pokemon={p}
          isFavorite={favorites.includes(p.id)}
          isCompared={compareIds.includes(p.id)}
          onSelect={onSelect}
          onToggleFavorite={onToggleFavorite}
          onToggleCompare={onToggleCompare}
        />
      ))}
    </div>
  );
}

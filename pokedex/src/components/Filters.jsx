import TypeBadge from "./TypeBadge";
import { SORT_OPTIONS } from "../utils/pokemon";
import "../css/Filters.css";
import { ArrowDown, ArrowUp, Dice2, Dices, Star } from "lucide-react";

export default function Filters({
  types,
  selectedType,
  onSelectType,
  sortBy,
  onSortBy,
  sortDir,
  onToggleDir,
  onlyFavorites,
  onToggleFavorites,
  onRandom,
  resultCount,
  total,
}) {
  return (
    <section className="filters">
      <div
        className="filters_types"
        role="group"
        aria-label="Filtrar por tipo"
      >
        <button
          className={`chip ${selectedType === "all" ? "chip-active" : ""}`}
          onClick={() => onSelectType("all")}
        >
          Todos
        </button>
        {types.map((t) => (
          <TypeBadge
            key={t.id}
            name={t.name}
            active={selectedType === "all" || selectedType === t.name}
            onClick={() =>
              onSelectType(selectedType === t.name ? "all" : t.name)
            }
          />
        ))}
      </div>

      <div className="filters_row">
        <label className="select">
          <span>Ordenar por</span>
          <select value={sortBy} onChange={(e) => onSortBy(e.target.value)}>
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>

        <button className="btn" onClick={onToggleDir} title="Inverter ordem">
          {sortDir === "asc" ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
        </button>

        <button
          className={`btn ${onlyFavorites ? "btn-active" : ""}`}
          onClick={onToggleFavorites}
        >
          <Star size={20} /> Favoritos
        </button>

        <button className="btn btn-primary" onClick={onRandom}>
          <Dices size={20} /> Aleatório
        </button>

        <span className="filters_count">
          {resultCount} de {total}
        </span>
      </div>
    </section>
  );
}

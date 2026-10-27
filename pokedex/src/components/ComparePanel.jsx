import PokemonImage from "./PokemonImage";
import StatBar from "./StatBar";
import TypeBadge from "./TypeBadge";
import { STAT_KEYS, formatId, totalStats, typeColor } from "../utils/pokemon";
import "../css/ComparePanel.css";
import { Swords } from "lucide-react";

function Side({ pokemon, other, onRemove }) {
  const color = typeColor(pokemon.types[0].name);
  return (
    <div className="compare_side">
      <button
        className="compare_remove"
        onClick={() => onRemove(pokemon.id)}
        aria-label="Remover da comparação"
      >
        ✕
      </button>
      <PokemonImage id={pokemon.id} name={pokemon.name} />
      <small>{formatId(pokemon.id)}</small>
      <h3>{pokemon.name}</h3>
      <div className="compare_types">
        {pokemon.types.map((t) => (
          <TypeBadge key={t.id} name={t.name} small />
        ))}
      </div>
      <div className="compare_stats">
        {STAT_KEYS.map((k) => (
          <StatBar
            key={k}
            statKey={k}
            value={pokemon.stats[k]}
            color={color}
            compareValue={other?.stats[k]}
          />
        ))}
        <div className="modal_total">
          <span>Total</span>
          <strong
            className={
              other && totalStats(pokemon) > totalStats(other)
                ? "stat_value-better"
                : ""
            }
          >
            {totalStats(pokemon)}
          </strong>
        </div>
      </div>
    </div>
  );
}

export default function ComparePanel({ selected, onRemove, onGoToPokedex }) {
  if (selected.length < 2) {
    return (
      <div className="empty">
        <span className="empty_emoji"><Swords size={64} /></span>
        <h2>Escolha dois Pokémon para comparar</h2>
        <p className="center">
          Use o botão <Swords size={16} /> nos cards. Selecionados: {selected.length}/2
          {selected.length === 1 && (
            <>
              {" "}
              - <strong>{selected[0].name}</strong>
            </>
          )}
        </p>
        <button className="btn btn-primary" onClick={onGoToPokedex}>
          Ir para a Pokédex
        </button>
      </div>
    );
  }

  const [a, b] = selected;
  return (
    <section className="compare">
      <Side pokemon={a} other={b} onRemove={onRemove} />
      <div className="compare_vs">VS</div>
      <Side pokemon={b} other={a} onRemove={onRemove} />
    </section>
  );
}

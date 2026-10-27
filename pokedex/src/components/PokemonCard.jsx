import TypeBadge from './TypeBadge'
import PokemonImage from './PokemonImage'
import StatBar from './StatBar'
import { STAT_KEYS, formatId, typeColor } from '../utils/pokemon'
import '../css/PokemonCard.css'
import { Star, Swords } from 'lucide-react'

function PokemonCard({ pokemon, isFavorite, isCompared, onSelect, onToggleFavorite, onToggleCompare }) {
  const main = typeColor(pokemon.types[0]?.name)
  const second = typeColor((pokemon.types[1] ?? pokemon.types[0])?.name)

  return (
    <article
      className="card"
      style={{ '--c1': main, '--c2': second }}
      onClick={() => onSelect(pokemon)}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(pokemon)}
    >
      <div className="card_actions" onClick={(e) => e.stopPropagation()}>
        <button
          className={`icon-btn ${isFavorite ? 'icon-btn-on' : ''}`}
          onClick={() => onToggleFavorite(pokemon.id)}
          aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          title="Favorito"
        >
          <Star color={isFavorite ? 'black' : ''} />
        </button>
        <button
          className={`icon-btn ${isCompared ? 'icon-btn-on' : ''}`}
          onClick={() => onToggleCompare(pokemon.id)}
          aria-label="Comparar"
          title="Comparar"
        >
          <Swords color={isCompared ? 'black' : ''} />
        </button>
      </div>

      <span className="card_id">{formatId(pokemon.id)}</span>
      <PokemonImage id={pokemon.id} name={pokemon.name} className="card_img" />
      <h3 className="card_name">{pokemon.name}</h3>

      <div className="card_types">
        {pokemon.types.map((t) => (
          <TypeBadge key={t.id} name={t.name} small />
        ))}
      </div>

      <div className="card_stats">
        {STAT_KEYS.map((k) => (
          <StatBar key={k} statKey={k} value={pokemon.stats[k]} color="rgba(255,255,255,.9)" />
        ))}
      </div>
    </article>
  )
}

export default PokemonCard

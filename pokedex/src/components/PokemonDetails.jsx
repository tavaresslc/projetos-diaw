import { useEffect } from 'react'
import TypeBadge from './TypeBadge'
import PokemonImage from './PokemonImage'
import StatBar from './StatBar'
import { STAT_KEYS, formatId, totalStats, typeColor } from '../utils/pokemon'
import '../css/PokemonDetails.css'
import { Star, Swords, User } from 'lucide-react'

function PokemonDetails({ pokemon, trainers, isFavorite, onClose, onToggleFavorite, onToggleCompare, isCompared }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const c1 = typeColor(pokemon.types[0].name)
  const c2 = typeColor((pokemon.types[1] ?? pokemon.types[0]).name)
  const owners = trainers.filter((t) => t.pokemonIds.includes(pokemon.id))

  return (
    <div className="modal" onClick={onClose} role="dialog" aria-modal="true" aria-label={`Detalhes de ${pokemon.name}`}>
      <div className="modal_box" onClick={(e) => e.stopPropagation()}>
        <button className="modal_close" onClick={onClose} aria-label="Fechar">
          ✕
        </button>

        <div className="modal_hero" style={{ '--c1': c1, '--c2': c2 }}>
          <span className="modal_id">{formatId(pokemon.id)}</span>
          <PokemonImage id={pokemon.id} name={pokemon.name} className="modal_img" />
        </div>

        <div className="modal_body">
          <h2>{pokemon.name}</h2>
          <div className="modal_types">
            {pokemon.types.map((t) => (
              <TypeBadge key={t.id} name={t.name} />
            ))}
          </div>

          <div className="modal_stats">
            {STAT_KEYS.map((k) => (
              <StatBar key={k} statKey={k} value={pokemon.stats[k]} color={c1} />
            ))}
            <div className="modal_total">
              <span>Total</span>
              <strong>{totalStats(pokemon)}</strong>
            </div>
          </div>

          <div className="modal_owners">
            <h3>Treinadores</h3>
            {owners.length === 0 ? (
              <p className="muted">Nenhum treinador nos dados possui este Pokémon.</p>
            ) : (
              <ul>
                {owners.map((t) => (
                  <li className='center' key={t.id}><User size={16} />{t.name}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="modal_actions">
            <button className="btn" onClick={() => onToggleFavorite(pokemon.id)}>
              <Star size={20} color={isFavorite ? 'yellow' : ''} /> {isFavorite ? 'Favorito' : 'Favoritar'}
            </button>
            <button className={`btn ${isCompared ? 'btn-active' : ''}`} onClick={() => onToggleCompare(pokemon.id)}>
              <Swords size={20} color={isCompared ? 'black' : ''} /> {isCompared ? 'Na comparação' : 'Comparar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonDetails

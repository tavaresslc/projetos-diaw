import { useState } from 'react'
import PokemonImage from './PokemonImage'
import { formatId } from '../utils/pokemon'
import '../css/TrainersPanel.css'
import { CircleStar, PawPrint, User } from 'lucide-react'

function TrainersPanel({ trainers, pokemon, onSelectPokemon }) {
  const [selectedId, setSelectedId] = useState(trainers[0]?.id)
  const trainer = trainers.find((t) => t.id === selectedId)
  const team = trainer ? trainer.pokemonIds.map((id) => pokemon.find((p) => p.id === id)).filter(Boolean) : []

  return (
    <section className="trainers">
      <ul className="trainers_list">
        {trainers.map((t) => (
          <li key={t.id}>
            <button
              className={`trainer-item ${t.id === selectedId ? 'trainer-item-active' : ''}`}
              onClick={() => setSelectedId(t.id)}
            >
              <span className="trainer-item_name center"><User size={20} /> {t.name}</span>
              <span className="trainer-item_badges center"><CircleStar size={20} /> {t.badges}</span>
            </button>
          </li>
        ))}
      </ul>

      {trainer && (
        <div className="trainers_detail">
          <h2>{trainer.name}</h2>
          <p className="muted">
            <span className='center'><CircleStar size={20} /> {trainer.badges} insígnia{trainer.badges === 1 ? '' : 's'}</span> <span className='center'><PawPrint size={20} /> {team.length} Pokémon</span>
          </p>

          <div className="badges-row" aria-label={`${trainer.badges} insígnias`}>
            {Array.from({ length: 8 }, (_, i) => (
              <span key={i} className={`badge-dot ${i < Math.min(trainer.badges, 8) ? 'badge-dot-on' : ''}`} />
            ))}
            {trainer.badges > 8 && <span className="muted">+{trainer.badges - 8}</span>}
          </div>

          <div className="team">
            {team.map((p) => (
              <button key={p.id} className="team_member" onClick={() => onSelectPokemon(p)}>
                <PokemonImage id={p.id} name={p.name} />
                <span>{p.name}</span>
                <small>{formatId(p.id)}</small>
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

export default TrainersPanel

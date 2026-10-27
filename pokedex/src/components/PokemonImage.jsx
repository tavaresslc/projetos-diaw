import { useState, useEffect } from 'react'
import { imageUrl } from '../utils/pokemon'

// Mostra a imagem oficial; se falhar (offline), exibe uma Pokébola como alternativa.
function PokemonImage({ id, name, className = '' }) {
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    setFailed(false)
  }, [id])

  return (
    <img
      className={className}
      src={failed ? '/pokeball.svg' : imageUrl(id)}
      alt={name}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}

export default PokemonImage

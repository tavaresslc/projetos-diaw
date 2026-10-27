import { Search } from 'lucide-react'
import '../css/SearchBar.css'

function SearchBar({ value, onChange }) {
  return (
    <div className="search">
      <span className="search_icon" aria-hidden="true"><Search size={20} /></span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Pesquisar Pokémon... (nome ou ID)"
        aria-label="Pesquisar Pokémon por nome ou ID"
      />
      {value && (
        <button className="search_clear" onClick={() => onChange('')} aria-label="Limpar pesquisa">
          ✕
        </button>
      )}
    </div>
  )
}

export default SearchBar

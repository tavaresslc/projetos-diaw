import { useEffect, useMemo, useState } from 'react'
import data from './data/pokedex-data.json'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import Filters from './components/Filters'
import PokemonList from './components/PokemonList'
import PokemonDetails from './components/PokemonDetails'
import TrainersPanel from './components/TrainersPanel'
import ComparePanel from './components/ComparePanel'
import { filterAndSort } from './utils/pokemon'
import './css/App.css'

const { pokemon, trainers, types } = data

// Tipos que realmente aparecem em algum Pokémon (exclui "Typeless", por exemplo)
const usedTypeNames = new Set(pokemon.flatMap((p) => p.types.map((t) => t.name)))
const availableTypes = types.filter((t) => usedTypeNames.has(t.name))

function loadStored(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function App() {
  const [view, setView] = useState('pokedex')
  const [query, setQuery] = useState('')
  const [type, setType] = useState('all')
  const [sortBy, setSortBy] = useState('id')
  const [sortDir, setSortDir] = useState('asc')
  const [onlyFavorites, setOnlyFavorites] = useState(false)
  const [selected, setSelected] = useState(null)
  const [favorites, setFavorites] = useState(() => loadStored('pokedex:favorites', []))
  const [compareIds, setCompareIds] = useState([])
  const [theme, setTheme] = useState(() => loadStored('pokedex:theme', 'light'))

  // Persistência e aplicação do tema / favoritos
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('pokedex:theme', JSON.stringify(theme))
  }, [theme])

  useEffect(() => {
    localStorage.setItem('pokedex:favorites', JSON.stringify(favorites))
  }, [favorites])

  // Estado derivado: lista exibida
  const visible = useMemo(
    () => filterAndSort(pokemon, { query, type, sortBy, sortDir, onlyFavorites, favorites }),
    [query, type, sortBy, sortDir, onlyFavorites, favorites],
  )

  const comparedPokemon = compareIds.map((id) => pokemon.find((p) => p.id === id)).filter(Boolean)

  function toggleFavorite(id) {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]))
  }

  function toggleCompare(id) {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((c) => c !== id)
      // mantém no máximo 2: o mais antigo sai
      return prev.length >= 2 ? [prev[1], id] : [...prev, id]
    })
  }

  function clearFilters() {
    setQuery('')
    setType('all')
    setOnlyFavorites(false)
  }

  function pickRandom() {
    setSelected(pokemon[Math.floor(Math.random() * pokemon.length)])
  }

  return (
    <div className="app">
      <Header
        view={view}
        onChangeView={setView}
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
        favoritesCount={favorites.length}
        compareCount={compareIds.length}
      />

      <main className="app_main">
        {view === 'pokedex' && (
          <>
            <SearchBar value={query} onChange={setQuery} />
            <Filters
              types={availableTypes}
              selectedType={type}
              onSelectType={setType}
              sortBy={sortBy}
              onSortBy={setSortBy}
              sortDir={sortDir}
              onToggleDir={() => setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))}
              onlyFavorites={onlyFavorites}
              onToggleFavorites={() => setOnlyFavorites((v) => !v)}
              onRandom={pickRandom}
              resultCount={visible.length}
              total={pokemon.length}
            />
            <PokemonList
              pokemon={visible}
              favorites={favorites}
              compareIds={compareIds}
              onSelect={setSelected}
              onToggleFavorite={toggleFavorite}
              onToggleCompare={toggleCompare}
              onClear={clearFilters}
            />
          </>
        )}

        {view === 'trainers' && (
          <TrainersPanel trainers={trainers} pokemon={pokemon} onSelectPokemon={setSelected} />
        )}

        {view === 'compare' && (
          <ComparePanel
            selected={comparedPokemon}
            onRemove={toggleCompare}
            onGoToPokedex={() => setView('pokedex')}
          />
        )}
      </main>

      {selected && (
        <PokemonDetails
          pokemon={selected}
          trainers={trainers}
          isFavorite={favorites.includes(selected.id)}
          isCompared={compareIds.includes(selected.id)}
          onClose={() => setSelected(null)}
          onToggleFavorite={toggleFavorite}
          onToggleCompare={toggleCompare}
        />
      )}

      <footer className="footer">
        Dados: pokedex-data.json - Imagens: PokéAPI sprites (github.com/PokeAPI/sprites)
      </footer>
    </div>
  )
}

export default App

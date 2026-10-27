import { Moon, Sun } from "lucide-react";
import "../css/Header.css";

export default function Header({
  view,
  onChangeView,
  theme,
  onToggleTheme,
  favoritesCount,
  compareCount,
}) {
  const tabs = [
    { id: "pokedex", label: "Pokédex" },
    { id: "trainers", label: "Treinadores" },
    { id: "compare", label: `Comparar (${compareCount}/2)` },
  ];

  return (
    <header className="header">
      <div className="header_brand">
        <span className="header_ball" aria-hidden="true" />
        <div>
          <h1>Pokédex</h1>
          <p>
            {favoritesCount} favorito
            {favoritesCount === 1 ? "" : "s"}
          </p>
        </div>
      </div>

      <nav className="header_nav" aria-label="Seções">
        {tabs.map((t) => (
          <button
            key={t.id}
            className={`tab ${view === t.id ? "tab-active" : ""}`}
            onClick={() => onChangeView(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <button
        className="theme-toggle"
        onClick={onToggleTheme}
        aria-label="Alternar tema claro/escuro"
        title="Alternar tema"
      >
        {theme === "dark" ? <Sun /> : <Moon />}
      </button>
    </header>
  );
}

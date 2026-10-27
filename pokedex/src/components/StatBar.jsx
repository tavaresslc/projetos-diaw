import { MAX_STAT, STAT_LABELS } from '../utils/pokemon'
import '../css/StatBar.css'

function StatBar({ statKey, value, color, compareValue }) {
  const pct = Math.min(100, (value / MAX_STAT) * 100)
  const better = compareValue !== undefined && value > compareValue

  return (
    <div className="stat">
      <span className="stat_label">{STAT_LABELS[statKey]}</span>
      <span className={`stat_value ${better ? 'stat_value-better' : ''}`}>{value}</span>
      <div className="stat_track">
        <div className="stat_fill" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  )
}

export default StatBar

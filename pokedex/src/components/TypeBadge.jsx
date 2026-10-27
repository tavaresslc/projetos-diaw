import { typeColor } from "../utils/pokemon";
import "../css/TypeBadge.css";

export default function TypeBadge({
  name,
  active = true,
  onClick,
  small = false,
}) {
  const color = typeColor(name);
  const Tag = onClick ? "button" : "span";
  return (
    <Tag
      className={`type-badge ${small ? "type-badge-small" : ""} ${onClick ? "type-badge-button" : ""}`}
      style={{
        "--type-color": color,
        opacity: active ? 1 : 0.55,
      }}
      onClick={onClick}
    >
      {name}
    </Tag>
  );
}

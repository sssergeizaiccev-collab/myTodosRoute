export const Search = ({ value, onChange }) => {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Поиск..."
    />
  );
};

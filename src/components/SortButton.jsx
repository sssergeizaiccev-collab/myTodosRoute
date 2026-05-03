export const SortButton = ({ isSorted, onToggle }) => {
  return (
    <button onClick={onToggle}>
      {isSorted ? "Сортировка ВКЛ" : "Сортировка ВЫКЛ"}
    </button>
  );
};

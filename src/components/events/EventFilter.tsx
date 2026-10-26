interface EventFilterProps {
  searchText: string;
  category: string;
  categories: string[];
  totalCount: number;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

function EventFilter({
  searchText,
  category,
  categories,
  totalCount,
  onSearchChange,
  onCategoryChange,
}: EventFilterProps) {
  return (
    <div className="filter-area">
      <div className="filter-group">
        <label htmlFor="search">Etkinlik ara</label>
        <input
          id="search"
          type="text"
          value={searchText}
          placeholder="Örn. atölye, kariyer"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="filter-group">
        <label htmlFor="cat">Kategori</label>
        <select
          id="cat"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="">Tümü</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <p className="filter-count">{totalCount} etkinlik listeleniyor.</p>
    </div>
  );
}

export default EventFilter;
import MultiSelect from '../components/MultiSelect';

type Props = {
  search: string;
  setSearch: (search: string) => void;
  handleShowOnlyCaughtChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  setSelectedTypes: (selected: string[] | []) => void;
};

function FilterOptions(props: Props) {
  return (
    <>
      <div className="flex flex-col ">
        <label htmlFor="search" className="text-lg font-medium text-gray-700">
          Filters
        </label>
        <input
          placeholder="Search"
          value={props.search}
          onChange={(e) => props.setSearch(e.target.value)}
          className="border-b border-gray-500 py-2 pr-8 pl-4  focus:outline-none focus:border-blue-500"
        />
      </div>
      <MultiSelect
        onChange={(selected: string[] | []) => props.setSelectedTypes(selected)}
      />
      <div>
        <input
          type="checkbox"
          onChange={(e) => props.handleShowOnlyCaughtChange(e)}
        />
        <span>Show only caught Pokemon</span>
      </div>
    </>
  );
}

export default FilterOptions;

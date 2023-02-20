import MultiSelect from '../components/MultiSelect';
import {
  setSearch,
  setSelectedTypes,
  setShowOnlyCaught,
} from '../features/filters/filtersSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';

function FilterOptions(props: any) {
  const dispatch = useAppDispatch();

  const search = useAppSelector((state) => state.filters.search);
  const showOnlyCaught = useAppSelector(
    (state) => state.filters.showOnlyCaught
  );

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setSearch(event.target.value));
  }

  function handleShowOnlyCaughtChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    dispatch(setShowOnlyCaught(event.target.checked));
  }

  function handleSelectedTypesChange(selected: string[] | []) {
    dispatch(setSelectedTypes(selected));
  }

  return (
    <>
      <div className="flex flex-col ">
        <label htmlFor="search" className="text-lg font-medium text-gray-700">
          Filters
        </label>
        <input
          placeholder="Search"
          value={search}
          onChange={(e) => handleSearchChange(e)}
          className="border-b border-gray-500 py-2 pr-8 pl-4  focus:outline-none focus:border-blue-500"
        />
      </div>
      <MultiSelect
        onChange={(selected: string[] | []) =>
          handleSelectedTypesChange(selected)
        }
      />
      <div>
        <input
          type="checkbox"
          checked={showOnlyCaught}
          onChange={(e) => handleShowOnlyCaughtChange(e)}
        />
        <label>Show only caught Pokemon</label>
      </div>
    </>
  );
}

export default FilterOptions;

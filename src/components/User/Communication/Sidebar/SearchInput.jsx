import { FaSearch } from "react-icons/fa";

function SearchInput() {
  return (
    <div className="p-4 bg-blue-300 text-white flex justify-between items-center">
      <form className="flex">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 rounded-full bg-white text-black"
        />
        <button
          type="button"
          className="p-2 bg-blue-500 rounded-full ml-2 text-white flex items-center justify-center"
        >
          <FaSearch className="text-xl cursor-pointer" />
        </button>
      </form>
    </div>
  );
}

export default SearchInput;

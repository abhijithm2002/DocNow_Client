import Conversations from "./Conversations";
import SearchInput from "./SearchInput";

function Sidebar() {
  return (
    <div className="w-1/4 bg-white border-r h-full overflow-y-auto">
      <div className="p-4 bg-blue-300 h-[50px] text-white flex justify-between items-center">
        <h2>Chats</h2>
        <button className="text-white">New</button>
      </div>
      {/* <SearchInput /> */}
      <div className="divider px-3"></div>
      <Conversations />
    </div>
  );
}

export default Sidebar;


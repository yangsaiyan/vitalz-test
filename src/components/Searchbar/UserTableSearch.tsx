import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useUserStore } from "../../zustand/userStore";
import { KeySelect } from "../Select/KeySelect";
import { type GetUserList } from "../../@api/type";
import { KEY_SELECT_KEYS } from "../../constant";

export function UserTableSearch() {
  const { handleSearchUserList, userList } = useUserStore();

  const [search, setSearch] = useState("");
  const [key, setKey] = useState("ID");

  function handleSearch() {
    handleSearchUserList(search, key as keyof GetUserList.User);
  }

  return (
    <div className="w-full mt-4 flex justify-center">
      <div className="xl:mx-10 w-full max-w-[650px] flex flex-row gap-2">
        <KeySelect
          value={key}
          onChange={setKey}
          keys={
            userList?.data[0] ? Object.keys(userList.data[0]) : KEY_SELECT_KEYS
          }
        />
        <div className="w-full flex flex-row gap-2">
          <Input
            className="text-white !border-[rgba(255,255,255,0.3)]"
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            className="bg-white border-1 !border-[rgba(255,255,255,0.3)]"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}

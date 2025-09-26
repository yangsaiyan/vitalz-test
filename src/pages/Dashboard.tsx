import { useEffect } from "react";
// import { useGlobalStore } from "../zustand/globalStore";
import { useUserStore } from "../zustand/userStore";
import { UserTable } from "../components/Table/UserTable";
import debounce from "lodash/debounce";
import { UserTableSearch } from "../components/Searchbar/UserTableSearch";
import { KEY_SELECT_KEYS } from "../constant";

export default function Dashboard() {
  //   const { isLoading, setIsLoading } = useGlobalStore();
  const { getUserList, searchUserList } = useUserStore();

  //to prevent trigger twice in dev mode
  const debouncedGetUserList = debounce(() => {
    getUserList();
  }, 1000);

  useEffect(() => {
    debouncedGetUserList();
  }, []);
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-fit h-fit flex flex-col justify-center items-center">
        <UserTableSearch />
        <UserTable user={searchUserList} keys={KEY_SELECT_KEYS} />
      </div>
    </div>
  );
}

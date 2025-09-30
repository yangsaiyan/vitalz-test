import { useEffect } from "react";
// import { useGlobalStore } from "../zustand/globalStore";
import { useUserStore } from "../zustand/userStore";
import { UserTable } from "../components/Table/UserTable";
import debounce from "lodash/debounce";
import { UserTableSearch } from "../components/Searchbar/UserTableSearch";
import { KEY_SELECT_KEYS } from "../constant";
import { useMediaQuery } from "react-responsive";
import UserCardList from "../components/List/UserCardList";

export default function Dashboard() {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 1200px)" });
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
      <div className="w-full h-fit flex flex-col justify-center items-center">
        <UserTableSearch />
        {isSmallScreen ? (
          <UserCardList user={searchUserList} keys={KEY_SELECT_KEYS} />
        ) : (
          <UserTable user={searchUserList} keys={KEY_SELECT_KEYS} />
        )}
      </div>
    </div>
  );
}

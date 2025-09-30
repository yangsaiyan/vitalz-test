import UserCard from "../Card/UserCard";
import { type GetUserList } from "../../@api/type";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { useGlobalStore } from "../../zustand/globalStore";

interface UserCardListProps {
  user: GetUserList.Res;
  keys: string[];
}

export default function UserCardList(props: UserCardListProps) {
  const { user, keys } = props;

  const { isLoading } = useGlobalStore();
  const pageSize = 3;
  const totalPage = Math.ceil(user.data.length / pageSize);
  const [userList, setUserList] = useState<GetUserList.User[]>(
    user.data.slice(0, pageSize)
  );
  const [page, setPage] = useState(0);

  function handlePrev() {
    if (page > 0) {
      setPage(page - 1);
    }
  }

  function handleNext() {
    if (page < totalPage - 1) {
      setPage(page + 1);
    }
  }

  useEffect(() => {
    setUserList(user.data.slice(0, pageSize));
    setPage(0);
  }, [user]);

  useEffect(() => {
    setUserList(user.data.slice(page * pageSize, (page + 1) * pageSize));
  }, [page]);

  return (
    <div className="mt-4 w-full h-[636px] max-w-[800px] flex flex-col justify-start items-center gap-4 overflow-y-auto">
      <div className="w-full h-[552px] flex flex-col gap-4 overflow-y-auto">
        {isLoading ? (
          <div className="w-full h-full flex flex-col gap-4">
            <Skeleton className="w-full h-[184px]" />
            <Skeleton className="w-full h-[184px]" />
            <Skeleton className="w-full h-[184px]" />
          </div>
        ) : userList.length > 0 ? (
          userList.map((user) => (
            <UserCard key={user.ID} user={user} keys={keys} />
          ))
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-white">No data</p>
          </div>
        )}
      </div>
      <div className="flex justify-end items-center gap-4">
        <Button disabled={page === 0} onClick={handlePrev}>
          Prev
        </Button>
        <Button disabled={page === totalPage - 1} onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
}

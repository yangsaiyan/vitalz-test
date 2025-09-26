import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import type { GetUserList } from "../../@api/type";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

interface UserTableProps {
  user: GetUserList.Res;
  keys: string[];
}

export function UserTable(props: UserTableProps) {
  const { user, keys } = props;

  const pageSize = 8;
  const totalPage = Math.ceil(user.data.length / pageSize);
  const [userList, setUserList] = useState<GetUserList.User[]>([]);
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
    <Table className="mx-10 my-4 w-[1100px] h-[540px] text-white bg-[#3d3d3d]">
      <TableHeader>
        <TableRow>
          {keys.map((key: string) => (
            <TableHead key={key}>
              <p className="text-white">{key}</p>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {userList.length > 0 ? (
          userList.map((item: GetUserList.User) => (
            <TableRow key={item?.ID}>
              <TableCell>
                <div className="w-[300px]">
                  <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
                    {item?.ID}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <div className="w-[200px]">
                  <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
                    {item.LoginEmail}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <div className="w-[150px]">
                  <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
                    {item.UserName}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <div className="w-[100px]">
                  <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
                    {item.DeviceCompany}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <div className="w-[200px]">
                  <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
                    {item.DeviceUserID}
                  </p>
                </div>
              </TableCell>
              <TableCell className="w-[100px] h-full flex justify-end items-center">
                <Button>View</Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="w-full h-full text-center">
              <p className="text-white">No data</p>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>{`Total ${
            user.data?.length || 0
          } users`}</TableCell>
          {userList.length > 0 && (
            <>
              <TableCell
                colSpan={1}
                className="flex justify-end items-center gap-4 text-center"
              >
                <Button disabled={page === 0} onClick={handlePrev}>
                  Prev
                </Button>
                <Button disabled={page === totalPage - 1} onClick={handleNext}>
                  Next
                </Button>
              </TableCell>
              <TableCell colSpan={1}>
                <div>
                  <p className="w-[110px]">{`Page ${
                    page + 1
                  } of ${totalPage}`}</p>
                </div>
              </TableCell>
            </>
          )}
        </TableRow>
      </TableFooter>
    </Table>
  );
}

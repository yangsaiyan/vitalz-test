import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { GetUserList } from "../../@api/type";
import { useNavigate } from "react-router";
import ViewUserButton from "../Dropdown/ViewUserButton";

interface UserCardProps {
  user: GetUserList.User;
  keys: string[];
}

export default function UserCard(props: UserCardProps) {
  const { user, keys } = props;
  const navigate = useNavigate();

  function handleView(user: GetUserList.User, dataType: string) {
    const email = encodeURIComponent(user.LoginEmail);
    const deviceId = encodeURIComponent(user.DeviceUserID);
    const type = encodeURIComponent(dataType);
    navigate(`/view/${email}/${deviceId}/${type}`);
  }

  return (
    <Card className="w-full h-fit py-2 px-4">
      <CardHeader className="sm:w-fit !w-full flex flex-row justify-between items-center">
        <CardTitle className="w-[250px] overflow-hidden text-ellipsis whitespace-nowrap">
          {user.UserName}
        </CardTitle>
        <ViewUserButton handleView={handleView} user={user} />
      </CardHeader>
      <CardContent className="sm:w-fit">
        {keys.map((key) => (
          <p
            className="sm:w-[250px] overflow-hidden text-ellipsis whitespace-nowrap"
            key={key}
          >
            {key}: {user[key as keyof GetUserList.User]}
          </p>
        ))}
      </CardContent>
    </Card>
  );
}

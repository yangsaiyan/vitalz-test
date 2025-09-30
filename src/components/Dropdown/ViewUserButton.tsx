import { GET_KEY } from "../../@api/method_constant";
import type { GetUserList } from "../../@api/type";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface ViewUserButtonProps {
  handleView: (item: GetUserList.User, dataType: string) => void;
  user: GetUserList.User;
}

export default function ViewUserButton(props: ViewUserButtonProps) {
  const { handleView, user } = props;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="text-white" variant="outline">
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-fit bg-[#666666] text-white font-bold"
        align="start"
      >
        <DropdownMenuItem
          onClick={() => handleView(user, GET_KEY.GET_USER_SLEEP_DATA)}
        >
          Sleep Data
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleView(user, GET_KEY.GET_USER_SCORE)}
        >
          Score
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleView(user, GET_KEY.GET_USER_STATIC)}
        >
          Statics
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { ChevronLeftIcon } from "lucide-react";

export default function Return() {
  const navigate = useNavigate();

  return (
    <Button
      className="w-[100px] text-white !bg-transparent"
      variant="outline"
      onClick={() => navigate(-1)}
    >
      <ChevronLeftIcon /> Return
    </Button>
  );
}

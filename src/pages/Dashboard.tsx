import { useEffect } from "react";
// import { useGlobalStore } from "../zustand/globalStore";
import { useUserStore } from "../zustand/userStore";


export default function Dashboard() {
//   const { isLoading, setIsLoading } = useGlobalStore();
  const { getUserList } = useUserStore();
  useEffect(() => {
    getUserList();
  }, []);
  return <div>Dashboard</div>;
}
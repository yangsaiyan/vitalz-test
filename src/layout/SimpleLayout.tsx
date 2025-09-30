import { useLocation } from "react-router";
import Return from "../components/Navbar/Return";

export default function SimpleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = useLocation();

  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      {pathname.pathname.includes("/view") && (
        <div className="w-full h-fit flex justify-start items-center">
          <Return />
        </div>
      )}
      {children}
    </div>
  );
}

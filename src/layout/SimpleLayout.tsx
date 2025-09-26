export default function SimpleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-full w-full">{children}</div>;
}

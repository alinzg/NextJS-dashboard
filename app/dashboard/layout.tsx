import SideNav from "../ui/sidenav";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex gap-2 bg-white">
      <aside className="w-1/6 bg-gray-50">
        <SideNav />
      </aside>
      <main className="grow flex justify-center min-h-dvh">{children}</main>
    </div>
  );
}

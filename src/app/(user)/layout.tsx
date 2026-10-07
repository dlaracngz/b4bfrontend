import Sidebar from "@/components/Sidebar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar role="user" />

      <main className="ml-[220px] min-h-screen bg-white p-8">{children}</main>
    </div>
  );
}

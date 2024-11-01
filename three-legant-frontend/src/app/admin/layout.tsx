import { SidebarProvider } from "@/components/ui/sidebar";
import AdminDashboardSidebar from "@/components/sidebar/AdminDashboardSidebar";
import Container from "@/components/layout/Container";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container className="p-4 py-4 sm:px-0">
      <SidebarProvider>
        <div className="relative flex w-full">
          <AdminDashboardSidebar>
            <main className="">{children}</main>
          </AdminDashboardSidebar>
        </div>
      </SidebarProvider>
    </Container>
  );
}

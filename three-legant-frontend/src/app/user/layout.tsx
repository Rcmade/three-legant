import Container from "@/components/layout/Container";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Container className="p-4 py-4 sm:px-0">{children}</Container>;
}

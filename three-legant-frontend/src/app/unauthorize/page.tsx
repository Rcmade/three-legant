import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="max-w-md space-y-6 p-8 text-center">
        <div className="flex justify-center">
          <AlertCircle className="h-24 w-24 text-destructive" />
        </div>
        <h1 className="text-4xl font-bold tracking-tighter">
          Unauthorized Access
        </h1>
        <p className="text-xl text-muted-foreground">
          Sorry, you don&apos;t have permission to access this page.
        </p>
        <Button asChild size="lg">
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
}

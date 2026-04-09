import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import AdminNav from "@/components/AdminNav";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The login route has its own return below; everything else requires auth.
  return (
    <div className="min-h-screen bg-cream">
      <AuthShell>{children}</AuthShell>
    </div>
  );
}

async function AuthShell({ children }: { children: React.ReactNode }) {
  // NOTE: Next 14 App Router does not let us easily detect the current pathname
  // inside a server layout, so we special-case the login page by letting it render
  // its own full-screen layout via a conditional null nav. The login page itself
  // uses a plain structure with no AdminNav.
  const user = await getCurrentUser();
  if (!user) {
    // Let the /admin/login route render directly without the nav shell.
    // Any other admin route will be caught by middleware and redirected.
    return <>{children}</>;
  }
  return (
    <div className="flex min-h-screen">
      <AdminNav email={user.email} />
      <main className="flex-1 overflow-x-hidden bg-cream">
        <div className="mx-auto max-w-5xl px-10 py-10">{children}</div>
      </main>
    </div>
  );
}

import { Link } from "@tanstack/react-router";

export default function LinkHeader({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      style={{ padding: "0 12px" }}
      activeProps={{
        style: { fontWeight: "bold", borderBottom: "2px solid black" },
      }}
    >
      {children}
    </Link>
  );
}

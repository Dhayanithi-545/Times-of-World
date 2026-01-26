// Landing page layout - no html/body tags as they're in root layout
export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
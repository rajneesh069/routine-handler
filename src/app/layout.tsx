// app/layout.tsx
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#73e6ff" }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

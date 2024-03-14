import StoreProvider from "./StoreProviders";
import { Chakra } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#73e6ff", padding: 3 }}>
        <StoreProvider>
          <Chakra>{children}</Chakra>
        </StoreProvider>
      </body>
    </html>
  );
}

export const metadata = {
  title: "Daily Reminder",
  description : "This app reminds you of tasks/todos as per the time set by the user."
};

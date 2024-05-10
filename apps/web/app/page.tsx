import ClientOnly from "./components/ClientOnly"
import LoginPage from "./login/page";

export default function LandingPage() {
  return (
    <ClientOnly>
      <LoginPage />
    </ClientOnly>
  );
}
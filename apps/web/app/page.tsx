import ClientOnly from "./components/ClientOnly"
import AuthPage from "./login/page";

export default function LandingPage() {
  return (
    <ClientOnly>
      <AuthPage />
    </ClientOnly>
  );
}

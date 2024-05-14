import ClientOnly from "./components/ClientOnly"
import AuthPage from "./login/page";
import Header from './components/Header';

export default function LandingPage() {
  return (
    <ClientOnly>
      <Header/>
      <AuthPage />
    </ClientOnly>
  );
}

import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import Footer from "./components/Footer/Footer";

import NavbarComponent from "@/components/navbar/Navbar";

function App() {
  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      <NavbarComponent />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

      <Toaster
        position="top-right"
        richColors
        closeButton
      />
    </div>
  );
}

export default App;
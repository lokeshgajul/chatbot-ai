import "./App.css";
import Auth from "./components/Auth/Auth";
import { AuthProvider } from "./Context/AuthContext";
import { ThemeProvder } from "./Context/ThemeContext";

function App() {
  return (
    <>
      <AuthProvider>
        <ThemeProvder>
          <Auth />
        </ThemeProvder>
      </AuthProvider>
    </>
  );
}

export default App;

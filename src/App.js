import { authService, db } from "./firebase";
import { collection, getDoc } from "firebase/firestore";
import Router from "./routes/Router";
import { useEffect, useState } from "react";

function App() {
  const [initial, setInitial] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInitial(true);
    });
  }, []);
  return <>{initial && <Router isLoggedIn={isLoggedIn} />}</>;
}

export default App;

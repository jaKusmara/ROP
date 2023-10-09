import { useEffect, useState } from "react";
import { useAuthContext } from '../hooks/useAuthContext';

import NavBar from "../components/NavBar";

function Home() {
  const { user } = useAuthContext()

  const [shouldReload, setShouldReload] = useState(false);

  useEffect(() => {

    user ? setShouldReload(true) : setShouldReload(false);

    if (shouldReload) {
      window.location.reload();
    }

    setShouldReload(false)
  }, [shouldReload, user]);

  return (
    <div>
      <NavBar />
      <p>HOME</p>
    </div>
  );
}

export default Home;

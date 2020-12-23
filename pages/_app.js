import Main from "../components/Main";
import "../styles/globals.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { AuthProvider } from "../utils/auth/AuthProvider";
import { AdminLayout } from "../components/AdminLayout";

library.add(fas);

function App({ Component, pageProps, router }) {
  const adminMode = router.pathname.includes("/admin");
  return (
    <AuthProvider>
      {adminMode ? (
        <AdminLayout>
          <Component {...pageProps} key={router.route} />
        </AdminLayout>
      ) : (
        <Main>
          <Component {...pageProps} key={router.route} />
        </Main>
      )}
    </AuthProvider>
  );
}

export default App;

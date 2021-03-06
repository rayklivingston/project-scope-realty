import { Provider } from "next-auth/client";

import "../public/css/main.css";
import "../public/css/bootstrap.min.css";
import "../public/css/style.css";
import "../public/css/jqvmap.css";

export default function App({ Component, pageProps }) {
  return (
    <Provider
      options={{
        clientMaxAge: 0,
        keepAlive: 0,
      }}
      session={pageProps.session}
    >
      <Component {...pageProps} />
    </Provider>
  );
}

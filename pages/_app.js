// pages/_app.js
import "../src/app/styles/globals.css"; // Correct path based on your structure

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;


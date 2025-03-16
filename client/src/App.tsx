import { SnackbarProvider } from "notistack";
import "./index.css";
import SnackbarInitializer from "./components/SnackbarInit";
import AppRoutes from './routes';

const App = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <SnackbarInitializer />
      <AppRoutes/>
    </SnackbarProvider>
  );
};

export default App;

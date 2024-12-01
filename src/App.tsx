import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from "./theme";
import Router from './router';

function App() {
  return  (
    <BrowserRouter>
            <ThemeProvider>
                <Router/>
            </ThemeProvider>
  </BrowserRouter>
  )
}

export default App;

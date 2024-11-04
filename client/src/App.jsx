import Routing from './routes/Routing'; // Importing the Routing component
import 'material-icons/iconfont/material-icons.css';

function App() {
  return (
    <>
      {/* Wrap the Routing component with BrowserRouter for routing functionality */}
        <Routing /> {/* Render the Routing component which defines app routes */}
    </>
  );
}

export default App;

import Viewer from "./Components/Viewer/Viewer.jsx";
import Sidebar from "./Components/Sidebar/Sidebar-container.jsx";
import Placeholder from "./Components/Placeholder/Placeholder.jsx";
import "./App.css";

function App(props) {
  return (
    <div className="App">
      <div>
        {props.loading ? <Placeholder /> : <Viewer />}
        <Sidebar />
      </div>
    </div>
  );
}

export default App;

import './App.css';
import Mynav from "./components/nav";
import 'bootstrap/dist/css/bootstrap.min.css';
import Mybody from "./components/body";


function App() {
    return (
        <div className="App">
            <Mynav/>
            <Mybody/>
        </div>
    );
}

export default App;

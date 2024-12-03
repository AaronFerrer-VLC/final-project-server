import "./App.css"

import 'bootstrap/dist/css/bootstrap.min.css'
import AppRoutes from "./routes/AppRoutes"
import Navigation from "./components/Navigation/Navigation"

const App = () => {
    return (
        <div className="App">
            <Navigation />
            <AppRoutes />
        </div>
    )
}

export default App

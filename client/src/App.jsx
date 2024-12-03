import "./App.css"

import 'bootstrap/dist/css/bootstrap.min.css'
import AppRoutes from "./routes/AppRoutes"
import Navigation from "./components/Navigation/Navigation"
import Footer from "./components/Footer/Footer"

const App = () => {
    return (
        <div className="App">
            <Navigation />
            <AppRoutes />
            <Footer />
        </div>
    )
}

export default App

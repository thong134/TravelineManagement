import { HashRouter, Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth/Auth'
import Home from './pages/Home/Home'
import MainLayout from './layout/MainLayout'
import Client from './pages/Client/Client'
import Location from './pages/Location/Location'
import VehicleRegistration from './pages/VehicleRegistration/VehicleRegistration'
import RentalVehicle from './pages/RentalVehicle/RentalVehicle'
import Hotel from './pages/Hotel/Hotel'
import Restaurant from './pages/Restaurant/Restaurant'
import Shipment from './pages/Shipment/Shipment'
import Partner from './pages/Partner/Partner'
import Report from './pages/Report/Report'

function App() {
    const ipcHandle = () => window.electron.ipcRenderer.send('ping')

    return (
        <>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Auth />} />
                    <Route path="/dashboard" element={<MainLayout />}>
                        <Route index element={<Home />} />
                        <Route path="client" element={<Client />} />
                        <Route path="location" element={<Location />} />
                        <Route path="vehicle-registration" element={<VehicleRegistration />} />
                        <Route path="rental-vehicle" element={<RentalVehicle />} />
                        <Route path="hotel" element={<Hotel />} />
                        <Route path="restaurant" element={<Restaurant />} />
                        <Route path="shipment" element={<Shipment />} />
                        <Route path="partner" element={<Partner />} />
                        <Route path="report" element={<Report />} />
                    </Route>
                </Routes>
            </HashRouter>
        </>
    )
}

export default App

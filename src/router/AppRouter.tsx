import { Routes, Route, Navigate } from 'react-router-dom'
import { HotelLandingPage } from '../pages/HotelLandingPage'
import { HotelListPage } from '../pages/HotelListPage'

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HotelListPage />} />
      <Route path="/:hotelSlug" element={<HotelLandingPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

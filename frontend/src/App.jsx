import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import Home from './pages/Home.jsx'
import Characters from './pages/Characters.jsx'
import CharacterDetail from './pages/CharacterDetail.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="characters" element={<Characters />} />
        <Route path="characters/:slug" element={<CharacterDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

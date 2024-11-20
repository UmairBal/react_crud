import './App.css'
import ContentSection from './components/content_section/contacts'
import Navbar from './components/headerSection/Navbar'

function App() {
  return (
    <div className="" style={{ background: '#ecf0f1' }}>
      <Navbar title="Contact Diary App" />
      <ContentSection />
    </div>
  )
}

export default App

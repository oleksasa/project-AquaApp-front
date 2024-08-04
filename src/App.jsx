import { Route, Routes } from 'react-router-dom';
import './App.css';
import SharedLayout from './components/SharedLayout/SharedLayout';
import CustomModal from './components/Modal/Modal';
import WaterForm from './components/WaterForm/WaterForm';
import WaterModal from './components/WaterModal/WaterModal';
import { useState } from 'react';

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div>
      <button onClick={handleOpenModal}>Open Modal</button>
      <CustomModal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
        <WaterModal props='add' />
      </CustomModal>
    </div>
  );
};

function App() {
  return (
    <SharedLayout>
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
    </SharedLayout>
  );
}

export default App;

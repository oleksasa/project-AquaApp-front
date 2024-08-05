import { Route, Routes } from 'react-router-dom';
import './App.css';
import SharedLayout from './components/SharedLayout/SharedLayout';
import BaseModal from './components/BaseModal/BaseModal';
import WaterForm from './components/WaterForm/WaterForm';
import WaterModal from './components/WaterModal/WaterModal';
import { useState } from 'react';
import LogOutModal from './components/LogOutModal/LogOutModal';
import DeleteWaterModal from './components/DeleteWaterModal/DeleteWaterModal';

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div>
      <button onClick={handleOpenModal}>Open Modal</button>
      <BaseModal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
        <DeleteWaterModal />
      </BaseModal>
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

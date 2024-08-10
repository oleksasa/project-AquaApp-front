import UserSettingsForm from '../UserSettingsForm/UserSettingsForm';
import css from './UserSettingsModal.module.css';

export default function UserSettingsModal({ onRequestClose }) {
  return (
    <div className={css.modal}>
      <h1 className={css.title}>Setting</h1>
      <UserSettingsForm onRequestClose={onRequestClose} />
    </div>
  );
}

//ПРИКЛАД ВИКОРИСТАННЯ

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const handleOpenModal = () => setIsModalOpen(true);
//   const handleCloseModal = () => setIsModalOpen(false);

//     <div className="">
//       <button onClick={handleOpenModal}>OPEN</button>
//       <MainModal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
//         <UserSettingsModal onRequestClose={handleCloseModal} />
//       </MainModal>
//     </div>

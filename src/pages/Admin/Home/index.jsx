import { Link } from 'react-router-dom';
import Modal from '../../../components/Modal';

const Home = () => {
    // const [isModalOpen, setIsModalOpen] = useState(false);

    // const handleOpenModal = () => {
    //     setIsModalOpen(true);
    // };

    // const handleCloseModal = () => {
    //     setIsModalOpen(false);
    // };

    return (
        <>
            <h1 className="text-4xl font-bold mb-6">Hello World!</h1>
            <div className='flex flex-col'>
                <Link to="/login" className='text-blue-600 hover:text-blue-800'>Login</Link>
                <Link to="users" className='text-blue-600 hover:text-blue-800'>Users</Link>
                <Link to="tasks" className='text-blue-600 hover:text-blue-800'>Tasks</Link>
                <Link to="projects" className='text-blue-600 hover:text-blue-800'>Projects</Link>
            </div>

            <Modal title="Modal Prueba" buttonName="Abrir Modal">
                <p>Este es un modal vacío. Aquí puedes agregar un formulario o contenido dinámico.</p>
            </Modal>

            {/* <Button label='Modal' onClick={handleOpenModal} />

            <Modal open={isModalOpen} close={handleCloseModal} title="Add Task">
                <p>Este es un modal vacío. Aquí puedes agregar un formulario o contenido dinámico.</p>
            </Modal> */}
        </>
    );
}

export default Home;
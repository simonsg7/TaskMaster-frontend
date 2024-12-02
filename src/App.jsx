import Router from './routes/router';
import 'primereact/resources/themes/saga-blue/theme.css'; // Puedes elegir otro tema
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const App = () => {
    return (
        <div>
            <Router />
        </div>
    );
}

export default App
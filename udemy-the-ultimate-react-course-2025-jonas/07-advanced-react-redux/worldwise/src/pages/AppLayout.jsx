import Map from '../components/Map';
import Sidebar from '../components/Sidebar';
import {app} from './AppLayout.module.css';

export default function AppLayout() {

    return (
        <div className={app}>
            <Sidebar />
            <Map />
        </div>
    )
}
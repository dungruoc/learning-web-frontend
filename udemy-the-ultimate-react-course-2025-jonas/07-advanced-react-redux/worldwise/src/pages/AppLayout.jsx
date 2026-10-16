import {app} from './AppLayout.module.css';

import Map from '../components/Map';
import Sidebar from '../components/Sidebar';
import User from '../components/User';

export default function AppLayout() {
    return (
        <div className={app}>
            <Sidebar />
            <Map />
            <User />
        </div>
    )
}
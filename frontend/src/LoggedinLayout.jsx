import { Outlet } from 'react-router-dom'
import { Header, Sidebar, Chats } from './components/index.js'
import { useSelector } from 'react-redux'
import { useEffect } from 'react';


const LoggedInLayout = () => {

    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (!userData || !userData.email) {
            // Redirect to login or show a message
        }
    }, [userData]);

    if (!userData || !userData.email) {
        return <div>Please log in</div>;
    }


    return (
        <div className="flex h-screen overflow-hidden bg-[#111111] text-gray-200">
            {/* Sidebar on left */}
            <Sidebar />

            {/* Chat Display on right */}
            <Chats />
        </div>
    )
}

export default LoggedInLayout;

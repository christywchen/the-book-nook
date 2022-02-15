import Chatroom from "./Chatroom/Chatroom";
import Sidebar from "./Sidebar/Sidebar";
import DetailsBar from "./DetailsBar/DetailsBar";

function Dashboard() {
    return (
        <>
            <div>
                <Sidebar />
            </div>
            <div>
                <Chatroom />
            </div>
            <div>
                <DetailsBar />
            </div>
        </>
    )
}

export default Dashboard;

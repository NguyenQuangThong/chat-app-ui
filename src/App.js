import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Join from "./Join";
import Login from "./Login";
import ChatRoom from "./ChatRoom";
import Profile from "./Profile";
import AddFriend from "./AddFriend";
import FriendRequestManager from "./FriendRequestManager";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Login}></Route>
        <Route path="/chatroom" Component={ChatRoom}></Route>
        <Route path="/join" Component={Join}></Route>
        <Route path="/profile" Component={Profile}></Route>
        <Route path="/add" Component={AddFriend}></Route>
        <Route path="/friend-request" Component={FriendRequestManager}></Route>
      </Routes>
    </Router>
  );
}
export default App;

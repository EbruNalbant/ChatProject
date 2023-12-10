import { useState } from "react";
import AuthPage from "./pages/AuthPage";
import "./style.scss";
import Chat from "./pages/Chat";
import { signOut } from "firebase/auth";
import { auth } from "./firebase/config";

function App() {
  // kullanıcının yetkili olup/olmadığına dair state'in tutulması
  const [isAuth, setIsAuth] = useState(localStorage.getItem("token"));
  // kullanıcının girdiği odanın state'i
  const [room, setRoom] = useState(null);

  // form gönderildiğinde odayı belirler
  const handleSubmit = (e) => {
    e.preventDefault();
    setRoom(e.target[0].value);
  };

  return (
    <div className="container">
      {/* yetkisi yoksa AutPage */}
      {!isAuth ? (
        <AuthPage setIsAuth={setIsAuth} />
      ) : // yetkisi varsa & oda seçilmişse Chat sayfası
      room ? (
        <Chat room={room} setRoom={setRoom} />
      ) : (
        // yetkisi varsa & oda seçilmemişse oda seçme
        <div>
          <form onSubmit={handleSubmit} className="room-page">
            <h1>Chat Room</h1>
            <p>Which room will you enter?</p>
            <input type="text" placeholder="e.g. art, politics" />
            <button type="submit">Enter the Room</button>
            <button
              onClick={() => {
                signOut(auth).then(() => {
                  // lokel'den token'ı kaldırma
                  localStorage.removeItem("token");
                  // yetki state'ini false çekme
                  setIsAuth(false);
                });
              }}
              id="logout"
              type="button"
            >
              Log Out
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;

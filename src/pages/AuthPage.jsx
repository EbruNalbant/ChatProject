import { auth, provider } from "./../firebase/config";
import { signInWithPopup } from "firebase/auth";

const AuthPage = ({ setIsAuth }) => {
  // giriş yapma fonksiyyonu
  const handleClick = () => {
    signInWithPopup(auth, provider)
      // oturumunun açık olduğunu bildiren token'i lokal'de saklama
      .then((res) => localStorage.setItem("token", res.user.refreshToken));
    //   yetkiyi true'ya çekme
    setIsAuth(true);
  };
  return (
    <div className="container">
      <div className="auth">
        <h1>Chat Room</h1>
        <p>Log in to continue.</p>
        <button onClick={handleClick}>
          <img src="/g-logo.png" />
          <span>Log in with Google</span>
        </button>
      </div>
    </div>
  );
};

export default AuthPage;

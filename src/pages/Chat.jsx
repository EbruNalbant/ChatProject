import { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import Message from "../components/Message";

const Chat = ({ room, setRoom }) => {
  // güncelleyeceğimiz koleksiyonun referansını alma
  const messagesCol = collection(db, "messages");
  const [messages, setMessages] = useState([]);
  // mesajı veritabanına ekleme
  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target[0].value;
    await addDoc(messagesCol, {
      text,
      room,
      user: {
        name: auth.currentUser.displayName,
        photo: auth.currentUser.photoURL,
        uid: auth.currentUser.uid,
      },
      // server'ın zamanı oluşturmasını sağlar
      createdAt: serverTimestamp(),
    });
    e.target[0].value = "";
  };

  useEffect(() => {
    // filtreleme ayarlarını tanımlama
    const queryOptions = query(
      messagesCol,
      where("room", "==", room),
      orderBy("createdAt", "asc")
    );
    onSnapshot(queryOptions, (snapshot) => {
      let tempMessages = [];
      /* dökümanları dönüp, içerisindeki data methodu
       ile verilere erişip yeni dizeye aktarma */
      snapshot.docs.forEach((doc) =>
        tempMessages.push({ id: doc.id, ...doc.data() })
      );
      // state'i güncelleme
      setMessages(tempMessages);
    });
  }, []);

  return (
    <div className="chat">
      <header>
        <p className="user">User: {auth?.currentUser?.displayName} </p>
        <p>Room: {room} </p>
        <button onClick={() => setRoom(null)}>Diffrent Room</button>
      </header>

      <main>
        {messages?.map((msg) => (
          <Message key={msg.id} msg={msg} />
        ))}
      </main>

      <form onSubmit={handleSubmit}>
        <input required type="text" placeholder="write your message" />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Chat;

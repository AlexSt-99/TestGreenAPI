import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Message from './Message';
import { FaPaperPlane, FaUserPlus, FaTimes } from 'react-icons/fa';
import './styles.css';

const Chat = ({ idInstance, apiTokenInstance }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [recipient, setRecipient] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [contacts, setContacts] = useState([
    { name: 'Контакт 1', phone: '79773829197' },
    { name: 'Контакт 2', phone: '79123456789' },
  ]);

  const sendMessage = async () => {
    const apiUrl = `https://7105.api.greenapi.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;
    const payload = {
      chatId: `${recipient}@c.us`,
      message: newMessage,
    };
  
    try {
      const response = await axios.post(apiUrl, payload);
      console.log('Message sent successfully:', response.data);
  
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages([...messages, { text: newMessage, sender: 'me', time }]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  
  const receiveMessages = async () => {
    const apiUrl = `https://7105.api.greenapi.com/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`;
  
    try {
      const response = await axios.get(apiUrl);
  
      if (response.data?.body?.messageData?.textMessageData?.textMessage) {
        const message = response.data.body.messageData.textMessageData.textMessage;
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: message, sender: 'recipient', time },
        ]);
  
        // Удаляем уведомление после обработки
        const receiptId = response.data.receiptId;
        if (receiptId) {
          await axios.delete(
            `https://7105.api.greenapi.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`
          );
        }
      } else {
        console.log('No new messages');
      }
    } catch (error) {
      console.error('Error receiving message:', error);
    }
  };
  
  useEffect(() => {
    const interval = setInterval(receiveMessages, 5000); // Проверяем каждые 5 секунд
    return () => clearInterval(interval);
  }, []);

  const handleCreateChat = () => {
    if (phoneNumber) {
      setRecipient(phoneNumber);
      setIsModalOpen(false);
    }
  };

  const handleAddContact = () => {
    if (phoneNumber) {
      setContacts([...contacts, { name: `Контакт ${contacts.length + 1}`, phone: phoneNumber }]);
      setPhoneNumber('');
    }
  };

  const handleSelectContact = (phone) => {
    setRecipient(phone);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const interval = setInterval(receiveMessages, 5000);
    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div className="phone-container">
      <div className="chat-header">
        WhatsApp
        <FaUserPlus
          className="contacts-icon"
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <Message key={index} text={msg.text} sender={msg.sender} time={msg.time} />
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>
          <FaPaperPlane />
        </button>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <FaTimes
              className="close-modal"
              onClick={() => setIsModalOpen(false)}
            />
            <h3>Контакты</h3>
            <div className="contact-list">
              {contacts.map((contact, index) => (
                <div
                  key={index}
                  className="contact-item"
                  onClick={() => handleSelectContact(contact.phone)}
                >
                  {contact.name} - {contact.phone}
                </div>
              ))}
            </div>
            <input
              type="text"
              placeholder="Введите номер телефона"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button onClick={handleAddContact}>Добавить контакт</button>
            <button onClick={handleCreateChat}>Создать чат</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
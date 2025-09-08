import { useRef } from "react";

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
    const inputRef = useRef(); 

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const userMessage = inputRef.current.value.trim();
        if (!userMessage) return;
        inputRef.current.value = "";

        // Nouvel historique mis à jour avec le message utilisateur
        const updatedChatHistory = [...chatHistory, { role: "user", text: userMessage }];

        setChatHistory(updatedChatHistory);

        // Delay 600 ms avant "Thinking ..." puis appel API avec le nouvel historique
        setTimeout(() => {
            setChatHistory(history => [...history, { role: "model", text: "Thinking ..." }]);
            generateBotResponse(updatedChatHistory);
        }, 600);
    };


    return (
        <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
        <input ref={inputRef} type="text" placeholder="Message ... " className="message-input" required />
        <button className="material-symbols-rounded">arrow_upward</button>
        </form>
    );
};

export default ChatForm;


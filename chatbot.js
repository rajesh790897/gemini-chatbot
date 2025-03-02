async function sendMessage() {
    const userInputField = document.getElementById("userinputfield");
    const chatlog = document.getElementById("chatlog");

    const userMessage = userInputField.value.trim();

    if (userMessage === "") return;

    const userMessageElement = document.createElement("div");
    userMessageElement.classList.add("message", "user");
    userMessageElement.textContent = `You: ${userMessage}`;
    chatlog.appendChild(userMessageElement);

    userInputField.value = "";

    try {
        const response = await fetch("http://localhost:3000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: userMessage }),
        });

        const data = await response.json();

        const botMessageElement = document.createElement("div");
        botMessageElement.classList.add("message", "bot");
        botMessageElement.textContent = `Bot: ${data.response}`;
        chatlog.appendChild(botMessageElement);
    } catch (error) {
        console.error("Error:", error);
        const botMessageElement = document.createElement("div");
        botMessageElement.classList.add("message", "bot");
        botMessageElement.textContent = "Bot: Sorry, something went wrong.";
        chatlog.appendChild(botMessageElement);
    }

    chatlog.scrollTop = chatlog.scrollHeight;
}

document.getElementById("userinputfield").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});
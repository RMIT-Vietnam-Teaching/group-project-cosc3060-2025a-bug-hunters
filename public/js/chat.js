const socket = io();

document.querySelector(".fa-paper-plane").addEventListener("click", () => {
  const input = document.querySelector(".input-message");
  const message = input.value.trim();
  if (message) {
    socket.emit("sendMessage", { content: message });
    input.value = "";
  }
});

socket.on("receiveMessage", (msg) => {
  const container = document.querySelector(".messages-container");
  const div = document.createElement("div");
  div.className = "message received";
  div.innerHTML = `<div class="avatar"><i class="fas fa-user"></i></div><div class="message-content">${msg.content}</div>`;
  container.appendChild(div);
});

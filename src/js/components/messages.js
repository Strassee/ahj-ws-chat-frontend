import moment from "moment";

export class Messages {
  constructor(userNameOwner, messages) {
    this.messages = messages;
    this.userNameOwner = userNameOwner;
    this.parent = document.querySelector(".chat-td-chat");
    this.init();
  }

  static get markup() {
    return `
      <div class="chat-head">
        <div class="chat-user"></div>
        <div class="chat-time"></div>
      </div>
      <div class="chat-message-content"></div>
      <div class="line"></div>
    `;
  }

  init() {
    this.messages.forEach((message) => {
      this.createMessage(message);
    });
  }

  createMessage(message) {
    this.message = document.createElement("div");
    this.message.classList.add("chat-message");
    this.message.innerHTML = Messages.markup;
    this.messageHead = this.message.querySelector(".chat-head");
    this.messageUser = this.message.querySelector(".chat-user");
    this.messageTime = this.message.querySelector(".chat-time");
    this.messageContent = this.message.querySelector(".chat-message-content");
    let userName = message.userName;
    if (this.userNameOwner === message.userName) {
      userName = "You (" + message.userName + ")";
      this.message.classList.add("chat-message-owner");
      this.messageHead.classList.add("chat-user-owner");
    }
    this.messageUser.textContent = userName;
    this.messageTime.textContent = moment(message.created).format(
      "HH:mm DD.MM.YYYY",
    );
    this.messageContent.textContent = message.messageContent;
    this.parent.append(this.message);
    this.message.scrollIntoView();
  }
}

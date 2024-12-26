import { Messages } from "./messages";
import { Users } from "./users";

export class Chat {
  constructor(user) {
    this.userId = user.id;
    this.userName = user.userName;
    this.ws = new WebSocket("ws://localhost:7070/ws");
    this.sendMessage = this.sendMessage.bind(this);
    this.ready = this.ready.bind(this);
    this.cancel = this.cancel.bind(this);
    this.init();
  }

  static get markchat() {
    return `
      <table class="chat-table">
        <tr class="chat-tr">
          <td class="chat-td">
            <div class="chat-td-chat"></div>
            <textarea name="chat-td-typing" description" id="chat-td-typing" class="chat-td-typing" rows="3" maxlength="400" placeholder="Enter message here..."></textarea>
          </td>
          <td class="users-td">
            <div class="users-td-title">Users</div>
            <div class="users-td-list"></div>
          </td>
        </tr>
      </table>
    `;
  }

  init() {
    this.chat = document.querySelector(".chat");
    this.chat.innerHTML = Chat.markchat;
    this.chatSend = this.chat.querySelector(".chat-td-typing");
    this.chatSend.addEventListener("keyup", this.sendMessage);

    this.ws.addEventListener("open", (e) => {
      console.log(e);
      this.ready();

      console.log("ws open");
    });

    this.ws.addEventListener("close", (e) => {
      console.log(e);

      console.log("ws close");
    });

    this.ws.addEventListener("error", (e) => {
      console.log(e);

      console.log("ws error");
    });

    this.ws.addEventListener("message", (e) => {
      const data = JSON.parse(e.data);
      if (data.messages !== undefined)
        new Messages(this.userName, data.messages);
      if (data.users !== undefined)
        new Users(this.userId, data.users, data.type);

      console.log("ws message");
    });

    window.addEventListener("unload", () => {
      if (this.ws.readyState === WebSocket.OPEN) {
        this.cancel();
      }
      if (
        this.ws.readyState === WebSocket.CLOSING ||
        this.ws.readyState === WebSocket.CLOSED
      ) {
        console.log(
          "WebSocket уже находится в процессе закрытия или уже закрыт.",
        );
      } else {
        this.ws.close(1000, "Соединение WebSocket закрыто.");
      }
    });
  }

  ready() {
    const message = {
      type: "newUser",
      userId: this.userId,
      userName: this.userName,
    };
    this.ws.send(JSON.stringify(message));
  }

  cancel() {
    const message = {
      type: "delUser",
      userId: this.userId,
      userName: this.userName,
    };

    this.ws.send(JSON.stringify(message));
  }

  sendMessage(e) {
    if (e.code === "Enter") {
      const message = {
        type: "message",
        userId: this.userId,
        userName: this.userName,
        message: this.chatSend.value.replace(/\r?\n|\r/g, ""),
      };
      this.ws.send(JSON.stringify(message));
      this.chatSend.value = "";
    }
  }
}

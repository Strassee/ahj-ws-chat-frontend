import { Request } from "./request";
import { Chat } from "./chat";

export class Modal {
  constructor(parent, title) {
    this.parent = parent;
    this.host = "http://localhost:7070/";
    this.request = new Request(this.host);
    this.title = title;
    this.onSubmit = this.onSubmit.bind(this);
    this.init();
  }

  static get modalNickname() {
    return `
      <div class="modal-content">
        <div class="modal-title"></div>
        <form class="modal-form">
          <input type="hidden" name="id" id="id" class="modal-id" value="">
          <input type="text" name="nickname" id="nickname" class="modal-nickname" maxlength="15" placeholder="Enter nickname...">
          <div class="modal-buttons">
            <input type="submit" class="modal-btn-ok" value="Continue">
          </div>
          <div class="modal-message"></div>
        </form>
      </div>
    `;
  }

  init() {
    this.modal = document.createElement("div");
    this.modal.classList.add("modal");
    this.modal.innerHTML = Modal.modalNickname;
    this.modalform = this.modal.querySelector(".modal-form");
    this.modaltitle = this.modal.querySelector(".modal-title");
    this.modaltitle.textContent = this.title;
    this.modalid = this.modal.querySelector(".modal-id");
    this.modalname = this.modal.querySelector(".modal-nickname");
    this.modalmessage = this.modal.querySelector(".modal-message");
    this.modalform.addEventListener("submit", this.onSubmit);
    this.parent.append(this.modal);
  }

  onCancel() {
    this.modal.remove();
  }

  onSubmit(e) {
    e.preventDefault();
    const callback = async (response) => {
      const result = await response.json();
      if (response.status >= 200 && response.status < 300) {
        this.onCancel();
        new Chat(result);
      } else {
        this.modalmessage.textContent =
          "User already exist, please choose another nickname";
      }
    };
    const body = new FormData(this.modalform);
    if (this.checkValidity()) {
      this.request.sendRequest("POST", callback, body);
    } else {
      this.modalmessage.textContent = "Please, enter nickname correctly";
    }
  }

  showModal() {
    this.modal.style.display = "block";
  }

  checkValidity() {
    return this.modalname.value.length > 0 ? true : false;
  }
}

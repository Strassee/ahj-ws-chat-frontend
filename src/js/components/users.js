import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export class Users {
  constructor(idOwner, users, type) {
    this.users = users;
    this.type = type;
    this.idOwner = idOwner;
    this.parent = document.querySelector(".users-td-list");
    this.init();
  }

  static get markup() {
    return `
      <div class="user-img"></div>
      <div class="user-content"></div>
    `;
  }

  init() {
    if (this.type === "delUser") {
      // this.parent.textContent = '';
      this.delUser(this.users);
      return;
    }
    if (
      this.users[0].id === this.idOwner &&
      this.parent.querySelector(".user") !== null
    )
      return;
    library.add(faUser);
    this.users.forEach((user) => {
      this.createUser(user);
    });
  }

  createUser(user) {
    const userIcon = icon({ prefix: "fas", iconName: "user" });
    this.user = document.createElement("div");
    this.user.dataset.id = user.id;
    this.user.classList.add("user");
    this.user.innerHTML = Users.markup;
    this.userImg = this.user.querySelector(".user-img");
    this.userContent = this.user.querySelector(".user-content");
    let userName = user.name;
    if (this.idOwner === user.id) {
      userName = "You (" + user.name + ")";
      this.user.classList.add("user-owner");
    }
    Array.from(userIcon.node).map((n) => this.userImg.append(n));
    this.userContent.textContent = userName;
    this.parent.append(this.user);
    this.user.scrollIntoView();
  }

  delUser(userId) {
    const users = Array.from(this.parent.querySelectorAll(".user"));
    users.find((user) => user.dataset.id === userId).remove();
  }
}

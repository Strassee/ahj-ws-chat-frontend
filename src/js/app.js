import { Modal } from "./components/modal";

const parentEl = document.querySelector(".chat");
const modal = new Modal(parentEl, "Choose nickname");
modal.showModal();

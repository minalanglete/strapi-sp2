export default function message(messageType, message, targetContainer) {
  const container = document.querySelector(targetContainer);

  container.innerHTML = `<div class="message ${messageType}">${message}</div>`;
}

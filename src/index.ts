import * as signalR from "@microsoft/signalr";
import "./css/main.css";

const divMessages: HTMLDivElement = document.querySelector("#divMessages");
const tbMessage: HTMLInputElement = document.querySelector("#tbMessage");
const btnSend: HTMLButtonElement = document.querySelector("#btnSend");
const username = new Date().getTime();

const connection = new signalR.HubConnectionBuilder().withUrl("/hub").build();
/*
A classe HubConnectionBuilder cria um novo construtor para configurar a conexão do servidor.
A função withUrl configura a URL do hub.
*/

/*A função on possibilita escutar a mensagem e passar parâmetros a ela
Neste caso, o nome do autor e o conteúdo da messagem*/

connection.on("messageReceived", (username: string, message: string) => {
  /*cada mensagem tem um nome específico,
   as com o nome messageReceive podem executar a lógica responsável por exibir uma nova mensagem na zona de mensagens*/

  const m = document.createElement("div");

  m.innerHTML = `<div class="message-author">${username}</div><div>${message}</div>`;

  divMessages.appendChild(m);
  divMessages.scrollTop = divMessages.scrollHeight;

  /*
  Quando o cliente recebe a mensagem, um novo elemento div é criado com o nome do autor e o conteúdo da mensagem em seu atributo innerHTML. 
  Ele é adicionado ao elemento principal div que exibe as mensagens.
  */
});

connection.start().catch((err) => document.write(err));

tbMessage.addEventListener("keyup", (e: KeyboardEvent) => {
  if (e.key == "Enter") {
    send();
  }
});
/*
keyup: é acionado quando o usuário digita tbMessage na caixa de texto 
e chama a função send quando o usuário pressiona a tecla Enter
*/

btnSend.addEventListener("click", send);
/*
click: é acionado quando o usuário seleciona o botão Enviar
e a função de chamadas send é chamada
*/

function send() {
  connection
    .send("newMessage", username, tbMessage.value)
    .then(() => (tbMessage.value = ""));
}
/*
Enviar uma mensagem por meio da conexão WebSockets exige uma chamada para o método send. 
O primeiro parâmetro do método é o nome da mensagem. 
Os dados da mensagem residem nos outros parâmetros. 
Neste exemplo, uma mensagem identificada como newMessage é enviada ao servidor. 
A mensagem é composta do nome de usuário e da entrada em uma caixa de texto. 
Se o envio for bem-sucedido, o valor da caixa de texto será limpo.
*/

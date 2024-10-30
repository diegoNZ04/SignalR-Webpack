"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var signalR = require("@microsoft/signalr");
require("./css/main.css");
var divMessages = document.querySelector("#divMessages");
var tbMessage = document.querySelector("#tbMessage");
var btnSend = document.querySelector("#btnSend");
var username = new Date().getTime();
var connection = new signalR.HubConnectionBuilder().withUrl("/hub").build();
/*
A classe HubConnectionBuilder cria um novo construtor para configurar a conexão do servidor.
A função withUrl configura a URL do hub.
*/
/*A função on possibilita escutar a mensagem e passar parâmetros a ela
Neste caso, o nome do autor e o conteúdo da messagem*/
connection.on("messageReceived", function (username, message) {
    /*cada mensagem tem um nome específico,
     as com o nome messageReceive podem executar a lógica responsável por exibir uma nova mensagem na zona de mensagens*/
    var m = document.createElement("div");
    m.innerHTML = "<div class=\"message-author\">".concat(username, "</div><div>").concat(message, "</div>");
    divMessages.appendChild(m);
    divMessages.scrollTop = divMessages.scrollHeight;
    /*
    Quando o cliente recebe a mensagem, um novo elemento div é criado com o nome do autor e o conteúdo da mensagem em seu atributo innerHTML.
    Ele é adicionado ao elemento principal div que exibe as mensagens.
    */
});
connection.start().catch(function (err) { return document.write(err); });
tbMessage.addEventListener("keyup", function (e) {
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
        .then(function () { return (tbMessage.value = ""); });
}
/*
Enviar uma mensagem por meio da conexão WebSockets exige uma chamada para o método send.
O primeiro parâmetro do método é o nome da mensagem.
Os dados da mensagem residem nos outros parâmetros.
Neste exemplo, uma mensagem identificada como newMessage é enviada ao servidor.
A mensagem é composta do nome de usuário e da entrada em uma caixa de texto.
Se o envio for bem-sucedido, o valor da caixa de texto será limpo.
*/

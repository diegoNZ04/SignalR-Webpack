using Microsoft.AspNetCore.SignalR;

namespace SignalRWebpack.Hubs;

public class ChatHub : Hub
{
    public async Task NewMessage(long username, string message) =>
        await Clients.All.SendAsync("messageReceived", username, message);
}

/*
    - O cliente envia uma mensagem identificada como newMessage
    - O metodo NewMessage espera os dados enviados pelo cliente
    - Uma chamada é feita para SendAsync em Clients.All
    - As mensagens recebidas são enviadas a todos os clientes conectados ao hub
*/ 

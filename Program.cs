using SignalRWebpack.Hubs;

var builder = WebApplication.CreateBuilder(args);

//SignalR
builder.Services.AddSignalR();

var app = builder.Build();

// Fornecer e localizar o arquivo index.html
app.UseDefaultFiles();
app.UseStaticFiles();

// Hub Route
app.MapHub<ChatHub>("/hub");

app.Run();

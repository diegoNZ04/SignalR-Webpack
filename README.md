# README

O repositório tem como intuito o estudo sobre ASP.NET Core SignalR, abaixo tem um guia de como o aplicativo foi criado com base na documentação do ASP.NET Core
Mais informações serão adicionadas conforme os estudos forem progredindo. Os arquivos possuem comentários sobre detalhes do projeto.
Recomando se atentar a todos os arquivos, se for possível.

## SignalRWebPack

- Criar um aplicativo SignalR ASP.NET Core
- Configurar o servidor SignalR
- Configurar um pipeline de build usando o Webpack
- Configurar o cliente TypeScript do SignalR
- Habilitar a comunicação entre o cliente e o servidor

## Pré-Requisitos

- Node.Js com npm

## Criar o aplicativo Web

CLI do .NET:
`dotnet new web -o SignalRWebpack code -r SignalRWebpack`

- Adicionar pacote Microsoft.TypeScript.MSBuild:

CLI do .NET:
`dotnet add package Microsoft.TypeScript.MSBuild`

## Configurar o Servidor

1. Em Program.cs, chame AddSignalR;
2. Novamente, em Program.cs, chame UseDefaultFiles e UseStaticFiles;
3. Crie um novo diretório chamado de Hubs na raiz do projeto, SignalRWebpack/, para a classe de hub SignalR;
4. Crie um arquivo Hubs/ChatHub.cs;
5. Adicione a instrução using ao início do Program.cs para resolver a referência a ChatHub;
6. No Program.cs, mapeie a rota /hub para o hub ChatHub. Substitua o código que exibe Hello World.

## Configurar o cliente

1. Execute o seguinte comando na raiz do projeto para criar um arquivo `package.json`:

Console: `npm init -y`

2. Adicione a propriedade realçada ao arquivo `package.json` e salve as alterações de arquivo:

JSON:

`{
  "name": "SignalRWebpack",
  "version": "1.0.0",
  "private": true,
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}`

Definir a propriedade `private` como `true` evita avisos de instalação de pacote na próxima etapa.

3. Instalar os pacotes de npm exigidos. Execute o seguinte comando na raiz do projeto:

Console: `npm i -D -E clean-webpack-plugin css-loader html-webpack-plugin mini-css-extract-plugin ts-loader typescript webpack webpack-cli`

A opção `-E` desabilita o comportamento padrão do npm de escrever os operadores de intervalo de versão semântica para `package.json`.

4. Substitua a propriedade scripts do arquivo package.json pelo código a seguir:

JSON:

`"scripts": {
  "build": "webpack --mode=development --watch",
  "release": "webpack --mode=production",
  "publish": "npm run release && dotnet publish -c Release"
},`

Os seguintes scripts são definidos:

- `build`: Agrupa os recursos do lado do cliente no modo de desenvolvimento e busca alterações no arquivo. O observador de arquivos faz com que o lote se regenere toda vez que um arquivo de projeto é alterado. A opção `mode` desabilita otimizações de produção, como tree shaking e minificação. use `build` somente no desenvolvimento;
- `release`: Agrupa recursos do lado do cliente no modo de produção;
- `publish`: Executa o script `release` para agrupar recursos do lado do cliente no modo de produção. Chama o comando publicar da CLI do .NET para publicar o aplicativo.

5. Crie um arquivo chamado `webpack.config.js` na raiz do projeto com o código do repositório.

O arquivo configura o processo de compilação Webpack:

- A propriedade output substitui o valor padrão do dist. Em vez disso, o lote é emitido no diretório wwwroot.
- A matriz resolve.extensions inclui .js para importar o JavaScript do cliente SignalR.

6. Crie um novo diretório chamado de `src` na raiz do projeto, `SignalRWebpack/`, para a código do cliente.

7. Copie o diretório `src` e seu conteúdo do projeto de exemplo na raiz do projeto. O diretório `src` contém os seguintes arquivos:

- `index.html`, que define a marcação de texto clichê da home page;
- `css/main.css`, que fornece estilo CSS para a home page;
- `tsconfig.json`, que configura o compilador TypeScript para produzir um JavaScript compatível com o ECMAScript5;
- `index.ts`, recupera referências a elementos DOM e anexa dois manipuladores de eventos: `keyup` e `click`.

8. Execute o comando a seguir na raiz do projeto:

Console: `npm i @microsoft/signalr @types/node`

O comando anterior instala:

- O cliente TypeScript do SignalR, que permite ao cliente enviar mensagens para o servidor;
- As definições de tip TypeScript para NodeJS, que permite a verificação em tempo de compilação de tipos de NodeJS.

## Testar o Aplicativo

1. Execute o Webpack no modo de `release` executando o comando a seguir na raiz do projeto:

Console: `npm run release`

Este comando gera o fornecimento dos ativos do lado do cliente ao executar o aplicativo. Os ativos são colocados na pasta `wwwroot`.

O Webpack concluiu as seguintes tarefas:

- Limpou o conteúdo do diretório `wwwroot`;
- Converteu o TypeScript para JavaScript, um processo conhecido como _transpilação_;
- Reduziu o tamanho do arquivo JavaScript gerado, um processo conhecido como _minificação_;
- Copiou os arquivos JavaScript, CSS e HTML processado do src para o diretório `wwwroot`.
- Injetou os seguintes elementos no arquivo `wwwroot/index.html`:

  - Uma marca `<link>`, fazendo referência ao arquivo `wwwroot/main.<hash>.css`. Essa marca é colocada imediatamente antes do fim da marca `</head>`;
  - Uma marca `<script>`, fazendo referência ao arquivo `wwwroot/main.<hash>.js` minimizado. Essa marca é colocada imediatamente após a marca `/title` de fechamento.

2. Crie e execute o aplicativo executando o seguinte comando na raiz do projeto:

CLI do .NET: `dotnet run`

O servidor Web inicia o aplicativo e o disponibiliza no localhost.

3. Abra um navegador para `https://localhost:<port>`. O arquivo `wwwroot/index.html` é fornecido. Copie a URL da barra de endereços.

4. Abra outra instância do navegador (qualquer navegador). Cole a URL na barra de endereços.

5. Escolha qualquer navegador, digite algo na caixa de texto Mensagem e selecione o botão Enviar. O nome de usuário exclusivo e a mensagem são exibidas em ambas as páginas instantaneamente.

## Resultado

<img src="imgs\websocketsresult.png">

## Referências

Este repositório foi criado com base na documentação disponibilizada pela Microsoft referente ao ASP.NET Core SignalR

link: https://learn.microsoft.com/pt-br/aspnet/core/tutorials/signalr-typescript-webpack?view=aspnetcore-8.0&tabs=visual-studio

# Microfrontends Demo

Este projeto estudo sobre microfrontends, onde diferentes partes de uma aplicação são desenvolvidas e implantadas de forma independente.

## Estrutura do Projeto

- **Root App**: O aplicativo principal que integra os microfrontends.
- **Angular App**: Um microfrontend construído com Angular.
- **Vue App**: Um microfrontend construído com Vue.js.

## Funcionalidades

- **Comunicação entre Microfrontends**: O aplicativo principal se comunica com os microfrontends usando a API `postMessage`, permitindo que eles troquem informações, como configurações de tema.
- **Configuração Dinâmica**: O tema e outras configurações podem ser atualizados em tempo real, refletindo as mudanças em todos os microfrontends.

Essa API permite que diferentes janelas ou iframes se comuniquem de forma segura, enviando mensagens entre si.

### Enviando Mensagens para aplicativo [pai] para o [filho]

```javascript
// Cria instância da Class AppConfig
const appConfig = new AppConfig();

// Enviar a "config" para o filho aplicação Angular, quando esta é carregada.
document.getElementById('angularApp').onload = function() {
    const angularApp = document.getElementById('angularApp');
    angularApp.contentWindow.postMessage({
        type: 'config',
        data: appConfig.getConfig()
    }, '*');
};
```

### Recebendo Mensagens dos aplicativos [filho] no [pai]
```javascript
// Escuta as mensagens dos iframes(filhos) Angular, Vue
window.addEventListener('message', (event) => {
    if (event.data.type === 'dipararUpdateTheme') {
        // Atualiza a configuração do tema no aplicativo pai
        appConfig.updateTheme(event.data.newTheme); // Atualiza o tema no objeto de configuração

        // Envia a nova configuração de volta para o Angular, depois que o root recebeu a alteração.
        const angularApp = document.getElementById('angularApp');
        angularApp.contentWindow.postMessage({
            type: 'config',
            data: appConfig.getConfig() // Envia a configuração atualizada
        }, '*');
    }
});
```

### Recebendo Mensagens do aplicativo [pai] no [filho]
```javascript
ngOnInit() {
    // Escuta a "config" do pai
    window.addEventListener('message', (event) => {
      if (event.data.type === 'config') {
        this.config = event.data.data;
        console.log('Received configuration in Angular:', this.config);
      }
    });
  }
```

### Enviando Mensagens do [filho] para aplicativo [pai]
```javascript
updateTheme(newTheme: string) {
    console.log("acionando updateTheme() no Angular");
    // Atualiza a configuração localmente
    this.config.theme = newTheme; // Atualiza o tema na configuração

    // Envia a nova configuração para o pai
    window.parent.postMessage({
      type: 'dipararUpdateTheme', // identificador que dispara a função
      newTheme: newTheme, // envia dados passado pelos parametros
      updatedConfig: this.config // envia a configuração atualizada
    }, '*');
}
```

## Como Executar o Projeto

Para executar o projeto, você pode seguir os passos abaixo:

1. **Iniciar o Aplicativo Principal**:
   ```bash
   npm install

   npm run start
   ```

2. **Iniciar o Microfrontend Angular**:
   ```bash
   npm install

   npm run start
   ```

3. **Iniciar o Microfrontend Vue**:
   ```bash
   npm install

   npm run start
   ```

## Estrutura de Diretórios
```
microfrontends-demo/
├── root-app/ # Aplicativo principal
├── angular-app/ # Microfrontend Angular
└── vue-app/ # Microfrontend Vue
````
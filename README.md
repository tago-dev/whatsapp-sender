# WhatsApp Sender Automático

Este projeto utiliza Puppeteer para automatizar o envio de mensagens do WhatsApp Web para uma lista predefinida de contatos ou grupos.

## Funcionalidades

*   Envia uma mensagem de texto padrão para múltiplos contatos/grupos.
*   Envia mensagens adicionais formatadas (com quebra de linha).
*   Utiliza uma sessão persistente do WhatsApp Web para evitar logins repetidos (escaneie o QR Code apenas na primeira vez).
*   Inclui pausas configuráveis entre o envio para cada contato.
*   Tratamento básico de erros para contatos não encontrados ou falhas no envio.

## Pré-requisitos

*   [Node.js](https://nodejs.org/) (versão LTS recomendada)
*   [npm](https://www.npmjs.com/) (geralmente vem com o Node.js) ou [Yarn](https://yarnpkg.com/)

## Instalação

1.  Clone este repositório:
    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd whatsapp-sender
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
    ou
    ```bash
    yarn install
    ```

## Configuração

Antes de executar, edite o arquivo `index.js`:

1.  **`contatos`**: Atualize a lista `contatos` com os nomes exatos dos contatos ou grupos como aparecem no seu WhatsApp.
    ```javascript
    const contatos = [
        'Nome Exato do Contato 1',
        'Nome Exato do Grupo 2',
        // Adicione mais contatos/grupos aqui
    ];
    ```
2.  **`mensagem`**: Defina a mensagem principal a ser enviada.
    ```javascript
    const mensagem = 'Sua mensagem principal aqui.';
    ```
3.  **`MENSAGENS_ADICIONAIS`**: Adicione linhas extras à sua mensagem (opcional). Cada item da lista será uma nova linha.
    ```javascript
    const MENSAGENS_ADICIONAIS = [
        "*Linha adicional em negrito*",
        "Outra linha com um link: https://exemplo.com",
    ];
    ```
4.  **`tempoPausaEntreContatos`**: Ajuste o tempo (em milissegundos) de espera entre o envio para cada contato (padrão: 5000ms = 5 segundos).
    ```javascript
    const tempoPausaEntreContatos = 5000; // 5 segundos
    ```

## Uso

1.  Execute o script a partir do terminal, na pasta do projeto:
    ```bash
    node index.js
    ```
2.  **Primeira Execução:** Uma janela do Chromium será aberta, exibindo o WhatsApp Web. Escaneie o QR Code com o aplicativo WhatsApp do seu celular para fazer login.
3.  **Execuções Subsequentes:** O script tentará reutilizar a sessão salva na pasta `whatsapp_session/`. Se a sessão expirar, pode ser necessário escanear o QR Code novamente.
4.  O script tentará encontrar cada contato/grupo na lista, abrir a conversa e enviar a mensagem configurada.
5.  Acompanhe o progresso e eventuais erros no console do terminal.

## Importante

*   **Risco de Bloqueio:** A automação de interações no WhatsApp viola os Termos de Serviço e pode levar ao bloqueio temporário ou permanente da sua conta. Use por sua conta e risco e evite enviar spam.
*   **Seletores:** Os seletores de elementos HTML do WhatsApp Web (`seletorBuscaConversa`, `seletorContato`, `seletorCaixaMsg`) podem mudar com atualizações da plataforma, o que pode quebrar o script. Pode ser necessário atualizá-los em `index.js`.
*   **Estabilidade:** Uma conexão de internet estável é necessária para o correto funcionamento.
*   **Finalidade:** Este script é fornecido para fins educacionais e de automação pessoal. Não o utilize para atividades maliciosas ou envio de spam.

## Licença

Este projeto está licenciado sob a Licença ISC. Veja o arquivo `LICENSE` (se existir) ou `package.json` para mais detalhes.
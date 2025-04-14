const puppeteer = require('puppeteer');

const contatos = [
    'Numero 1',
    'Numero 2',
];

const mensagem = 'Olá! Esta é uma mensagem de teste automatizada para múltiplos contatos. 🤖';
const MENSAGENS_ADICIONAIS = [
    "*Clique no link abaixo*",
    "https://chat.whatsapp.com/LINK-TESTEiopujSSsahDSAD",
];
const tempoPausaEntreContatos = 5000;

(async () => {
    let browser = null;

    try {
        console.log('1. Iniciando o navegador...');
        browser = await puppeteer.launch({
            headless: false,
            userDataDir: './whatsapp_session',
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-extensions',
                '--window-size=1200,800'
            ]
        });

        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

        console.log('2. Abrindo o WhatsApp Web...');
        await page.goto('https://web.whatsapp.com/');

        console.log('3. Aguardando login (escaneie o QR Code se necessário)...');
        const seletorLogin = '#side';
        await page.waitForSelector(seletorLogin, { timeout: 0 });
        console.log('   Login detectado!');
        console.log('   Pausa de 3s após login...');
        await new Promise(resolve => setTimeout(resolve, 3000));

        // --- INÍCIO DO LOOP PARA CADA CONTATO ---
        for (const contato of contatos) {
            console.log(`\n--- Processando contato: ${contato} ---`);
            try {
                console.log(`4. Procurando pelo contato/grupo: "${contato}"...`);

                const seletorBuscaConversa = 'div[contenteditable="true"][data-tab="3"]'; // Ou '[data-testid="chat-list-search"]'
                await page.waitForSelector(seletorBuscaConversa, { timeout: 10000 });


                await page.click(seletorBuscaConversa, { clickCount: 3 });
                await page.type(seletorBuscaConversa, contato);
                console.log(`   Digitou "${contato}" na busca.`);
                console.log('   Pausa de 2s para resultados da busca...');
                await new Promise(resolve => setTimeout(resolve, 2000));

                const seletorContato = `span[title*="${contato}"]`;

                console.log(`   Aguardando pelo seletor do contato: ${seletorContato}`);
                await page.waitForSelector(seletorContato, { timeout: 15000 });
                console.log('   Contato encontrado!');
                await page.click(seletorContato);
                console.log('   Clicou no contato/grupo.');

                console.log('5. Aguardando a caixa de mensagem carregar...');
                const seletorCaixaMsg = 'div[contenteditable="true"][data-tab="10"]'; // Ou '[data-testid="conversation-compose-box-input"]'
                await page.waitForSelector(seletorCaixaMsg, { timeout: 10000 });
                console.log('   Caixa de mensagem carregada.');
                console.log('   Pausa de 1s antes de digitar...');
                await new Promise(resolve => setTimeout(resolve, 1000));

                console.log('6. Digitando e enviando a mensagem...');
                await page.focus(seletorCaixaMsg);
                await page.type(seletorCaixaMsg, mensagem);

                for (const msgAdicional of MENSAGENS_ADICIONAIS) {
                    await page.keyboard.down('Shift');
                    await page.keyboard.press('Enter');
                    await page.keyboard.up('Shift');
                    await page.type(seletorCaixaMsg, msgAdicional);
                    await new Promise(resolve => setTimeout(resolve, 200));
                }

                await page.keyboard.press('Enter');
                console.log('   Mensagem enviada!');
                console.log(`   Pausa de ${tempoPausaEntreContatos / 1000}s antes do próximo contato...`);
                await new Promise(resolve => setTimeout(resolve, tempoPausaEntreContatos));

            } catch (error) {
                console.error(`### ERRO ao processar o contato "${contato}" ###`);
                console.error(error.message);
                console.log(`--- Tentando o próximo contato ---`);
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }
        // --- FIM DO LOOP ---

        console.log('\nTodos os contatos foram processados.');

    } catch (error) {
        console.error('### ERRO GERAL DURANTE A EXECUÇÃO ###');
        console.error(error);
    } finally {
        if (browser) {
            console.log('7. Fechando o navegador...');
            await browser.close();
            // console.log('   (Navegador permanecerá aberto. Feche manualmente ou descomente `await browser.close();`)');
        }
    }
})();
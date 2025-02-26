# Cypress Orange HRM Tests

Este repositório contém testes automatizados para a plataforma OrangeHRM, utilizando o framework de testes Cypress.

## Tecnologias Utilizadas

- [Cypress](https://www.cypress.io/) - Framework de testes end-to-end
- [Chance.js](https://chancejs.com/) - Biblioteca para gerar dados aleatórios (opcional)

## Estrutura do Projeto

```
/cypress
  /e2e
    loguin.spec.cy.js    # Testes relacionados ao login e atualização de informações do usuário
/cypress/support
  commands.js            # Comandos customizados do Cypress
README.md                # Documentação do projeto
package.json             # Dependências do projeto
```

## Como Configurar o Projeto

### 1. Clonar o Repositório

```sh
git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio
```

### 2. Instalar as Dependências

```sh
npm install
```

### 3. Executar os Testes

Para rodar os testes em modo interativo:

```sh
npx cypress open
```

Para rodar os testes em modo headless (sem interface):

```sh
npx cypress run
```

## Casos de Teste Implementados

### 1. **User Info Update - Success**

- Realiza login com credenciais válidas
- Acessa a página "My Info"
- Atualiza nome, sobrenome, apelido e nacionalidade do usuário
- Salva as alterações e valida a mensagem de sucesso

### 2. **Login Fail - Invalid Credentials**

- Tenta fazer login com credenciais inválidas
- Valida a exibição da mensagem de erro

## Configurações Adicionais

- O URL base dos testes pode ser alterado no próprio arquivo de testes, na constante `loginUrl`.
- O tempo de espera foi configurado para garantir que os elementos estejam carregados antes da interação.

## Contribuição

Pull requests são bem-vindos. Para grandes mudanças, abra uma issue primeiro para discutir o que deseja modificar.



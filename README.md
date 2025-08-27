# challenge-cypress-educabot

### Prerrequisitos 

Antes de comenzar, asegúrate de tener instalado:

- Node.js (versión 16 o superior)
- npm (generalmente viene incluido con Node.js)

### Instalación

Sigue estos pasos para configurar el proyecto:

1. **Clonar proyecto**
```
git clone https://github.com/tu-usuario/tu-proyecto-cypress.git
```
```
cd challenge-cypress-educabot
```
2. **Instalar dependencias**
```
npm install
```
3. **Instala Cypress** (si no se instala automaticamente)
```
npm install cypress --save-dev
```

## Ejecución de pruebas
### Abrir el test runner de Cypress
Para abrir la interfaz gráfica de Cypress:
```
npx cypress open
```
### Ejecutar pruebas en modo headless
Para ejecutar todas las pruebas en modo headless (sin interfaz gráfica):
```
npx cypress run
```
### Ejecutar un archivo específico
Para ejecutar un archivo de pruebas específico:
```
npx cypress run --spec "cypress/e2e/mi-prueba.cy.js"
```
# MUCC SCO. Proyecto. BACKEND

Servidor NodeJS encargado de responder a las solicitudes http.

Este contiene la programación del backend (API) y para el frontend hace uso de los archivos compilados de Angular ubicados en la carpeta client.

## Comandos

### Inicialización

```
npm install
```

### Revisión de errores (Lint)

```
npm run lint
```

### Test

```
npm run test
```

### Poner en funcionamiento

#### Desarrollo

```
npm run dev
```

#### Producción

```
npm run start
```

## Dependencias del proyecto

Utilidades del servidor API (backend):

* [morgan](https://www.npmjs.com/package/morgan)
  * HTTP request logger middleware for node.js
* [helmet](https://www.npmjs.com/package/helmet)
  * Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
* [dotenv](https://www.npmjs.com/package/dotenv)
  * Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`
* [monk](https://www.npmjs.com/package/monk)
  * Realizar las consultas a la base de datos de MongoDB
* [app-module-path](https://www.npmjs.com/package/app-module-path)
  * Poner la raiz del proyecto en el path del require. Especificado en el fichero `server.js`
* [axios](https://github.com/axios/axios)
  * Realizar peticiones HTTP
* [Nano ID](https://github.com/ai/nanoid)
  * Generador de ID

Utilidades para la puesta en funcionamiento de la aplicación:

* [nodemon](https://www.npmjs.com/package/nodemon)
  * nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
* [eslint](https://www.npmjs.com/package/eslint)
  * ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
* [mocha](https://www.npmjs.com/package/mocha)
  * ☕️ Simple, flexible, fun JavaScript test framework for Node.js & The Browser ☕️
* [supertest](https://www.npmjs.com/package/supertest)
  * HTTP assertions made easy via superagent.

## Modificaciones importantes

### Lint

En el fichero de configuración del lint `.eslintrc.js` se ha incluido

1. Para que considere el path añadido en **app-module-path** y para que si detecta algún error de ese tipo lo marque como _warning_

```
...
settings: {
  'import/resolver': {
    node: {
      moduleDirectory: [
        'node_modules',
        '../../app'
      ]
    }
  }
},
...
rules: {
  ...
  'import/no-unresolved': 1, 
  ...
}
```
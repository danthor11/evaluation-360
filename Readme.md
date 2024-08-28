intrucciones:

clonar repositorio.
entrar en las carpeta server y ejecutar npm install.
entrar en las carpeta client y ejecutar npm install.

ejecutar los siguientes comandos en terminales distintas en la carpeta raiz:
para el cliente _npm run web_
para el servidor _npm run api_

Variables de entorno para el servidor:

- SERVER_PORT : puerto donde se ejecutara el servidor
- DATABASE_URI : uri de base de datos, debe incluir el username y password. debe ser de mongodb
- SECRET_KEY : palabra secreta para firmar un payload

Variables de entorno cliente:

- VITE_SERVER_API_URL:url del servidor junto con el puerto

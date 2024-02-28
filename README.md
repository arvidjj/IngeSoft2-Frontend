# Proyecto PowerFit

## Instrucciones

### Para vincular git con su cuenta de GitHub
1. git config --global user.email "you@example.com"
2. git config --global user.name "Your Name"

### Para clonar el proyecto
1. En el cmd ir a la carpeta donde se quiera clonar
2. Luego escribir git clone https://github.com/VictorCasco-PY/IngeSoft2-Frontend.git

### Despues de clonar
1. Abrir el proyecto en VSCode
2. En la terminal escribir los comandos **npm i** y para ejecutar **npm run dev**

### Observaciones
- Lo ideal seria crear una carpeta con el nombre de cada pantalla, ejemplo: Clientes, en el que va a ir todo lo referente a clientes, formularios, listas, detalles, etc
- Vamos a usar **axios** para las peticiones al API(en la carpeta utils cree un archivo llamado **api.js** la idea es usar eso en vez de axios.get, pero vamos a usar eso cuando tengamos la autenticacion y todo eso)
- Bootstrap ya esta instalado y listo para usar

### Ramas en git
1. Para crear una rama nueva: **git checkout -b nombre-de-la-rama**
2. Para ver todas las ramas: **git branch**
3. Para cambiar de rama:**git checkout nombre-de-la-rama**
4. Asegurarse siempre de trabajar en su rama correspondiente
5. Para guardar los cambios: **git add .**
6. Para hacer commit: **git commit -m "lo que hicieron"**
7. Para subir los cambios **git push** (puede pedir mas cosas a veces)
8. Para hacer merge de los cambios con el main: **git merge main**(desde la rama de cada uno)

### Links de utilidad
- [Documentacion de react-router-dom] (https://reactrouter.com/en/main/start/tutorial)
- [Documentacion de la libreria de notificaciones] (https://react-hot-toast.com/)

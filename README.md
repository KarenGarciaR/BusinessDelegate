# BusinessDelegate
-----Descripción general del proyecto-----

Este proyecto es un ejemplo del patrón de diseño Business Delegate, implementado en Node.js.

*Objetivo:
Separar la capa de presentación (UI o cliente) de la capa de negocio (servicios), ocultando la complejidad de los servicios y centralizando el acceso mediante un intermediario llamado Business Delegate.

*Beneficios:
La UI no necesita conocer los detalles de los servicios.
Facilita cambios futuros en los servicios sin afectar la presentación.
Permite agregar lógica adicional (caching, validaciones, logging) en un solo lugar.

 -----Estructura de carpetas------

 
BusinessDelegate/
│
├─ services/
│   ├─ UserService.js      # Servicio de usuarios
│   └─ ProductService.js   # Servicio de productos
│
├─ business/
│   └─ BusinessDelegate.js # Intermediario (Business Delegate)
│
└─ app.js                  # Simula la UI / cliente


-----Explicación de dónde y cómo se utiliza el Business Delegate-----

1. Capa de servicios (services/)

UserService.js: Contiene la lógica para obtener información de usuarios.
ProductService.js: Contiene la lógica para obtener información de productos.

// Ejemplo de UserService.js
class UserService {
    getUser(id) {
        const users = {
            1: { name: "Karen", role: "Estudiante" },
            2: { name: "Juan", role: "Profesor" }
        };
        return users[id] || null;
    }
}
module.exports = UserService;
2. Business Delegate (business/BusinessDelegate.js)

Aquí es donde ocurre la magia:
const UserService = require('../services/UserService');
const ProductService = require('../services/ProductService');

class BusinessDelegate {
    constructor() {
        this.userService = new UserService();
        this.productService = new ProductService();
    }

    // Método que delega la petición al servicio de usuarios
    getUserInfo(id) {
        return this.userService.getUser(id);
    }

    // Método que delega la petición al servicio de productos
    getProductInfo(id) {
        return this.productService.getProduct(id);
    }
}

module.exports = BusinessDelegate;

**Explicación:**

La UI nunca llama directamente a UserService o ProductService.
Todo pasa por BusinessDelegate, que actúa como intermediario.
Si más adelante cambian los servicios, solo se modifica aquí, sin tocar la UI.

3. Capa cliente / UI (app.js)
   
const BusinessDelegate = require('./business/BusinessDelegate');
const delegate = new BusinessDelegate();

console.log("Información de usuario:");
console.log(delegate.getUserInfo(1));

console.log("\nInformación de producto:");
console.log(delegate.getProductInfo(1));

**Explicación**

app.js actúa como cliente/UI.
Solo conoce y utiliza BusinessDelegate.
Nonecesita importar los servicios directamente.
Esto reduce el acoplamiento y mantiene el código limpio y organizado.

---> La UI pide información, el Business Delegate decide qué servicio usar y devuelve el resultado.

-----Diagrama UML del proyecto-----


+-------------------+
|      Client/UI    |   <- app.js
+-------------------+
        |
        v
+-------------------+
|  BusinessDelegate  |  <- business/BusinessDelegate.js
+-------------------+
| +getUserInfo(id)  |
| +getProductInfo(id)|
+-------------------+
        |
        v
+-------------------+       +-------------------+
|    UserService    |       |   ProductService  |
+-------------------+       +-------------------+
| +getUser(id)      |       | +getProduct(id)   |
+-------------------+       +-------------------+


------Comentarios y nombres claros----

Clases y métodos tienen nombres significativos (getUserInfo, getProductInfo).
Cada método incluye documentación implícita explicando su función.
Se pueden agregar comentarios adicionales para cada clase y método si tu maestro lo requiere.

-----Instrucciones de instalación y ejecución------

1.Instala Node.js desde nodejs.org
2.Abre VS Code y abre la carpeta del proyecto.
3.Inicializa Node (solo la primera vez):

**npm init -y**

4.Asegúrate de que los archivos y carpetas tengan la estructura correcta.
5.Ejecuta la aplicación:

**node app.js**

Salida esperada:

Información de usuario:
{ name: 'Karen', role: 'Estudiante' }

Información de producto:
{ name: 'Laptop', price: 15000 }

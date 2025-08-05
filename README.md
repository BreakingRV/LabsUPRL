# Estado del Laboratorio

Aplicación web para controlar el estado de un laboratorio (DISPONIBLE/EN USO), con inicio de sesión y historial de cambios. Solo usuarios autorizados manualmente en Firebase pueden cambiar el estado. Desplegada en GitHub Pages con Firebase.

## Configuración

1. **Configurar Firebase**:
   - Crea un proyecto en [Firebase Console](https://console.firebase.google.com).
   - Habilita **Authentication** (Correo/contraseña) y **Realtime Database**.
   - Actualiza `firebaseConfig` en `index.html` con tus credenciales.
   - Configura las reglas de la base de datos:
     ```json
     {
       "rules": {
         "laboratorio": {
           ".read": "auth != null",
           ".write": "auth != null && data.child('users').child(auth.uid).child('isAuthorized').val() === true"
         },
         "users": {
           "$uid": {
             ".read": "auth != null && auth.uid == $uid",
             ".write": "auth != null && auth.uid == $uid"
           }
         }
       }
     }
     ```

2. **Añadir usuarios autorizados**:
   - En Firebase Console > **Authentication**, añade usuarios manualmente (correo y contraseña).
   - En **Realtime Database**, agrega el campo `isAuthorized: true` para usuarios permitidos:
     ```json
     users/UID_DEL_USUARIO
       {
         "firstName": "Nombre",
         "lastName": "Apellido",
         "email": "correo@ejemplo.com",
         "isAuthorized": true,
         "createdAt": "2025-08-04T22:00:00Z"
       }
     ```

3. **Desplegar en GitHub Pages**:
   - Sube el proyecto a un repositorio en GitHub.
   - En **Settings > Pages**, selecciona la rama `main` y la carpeta `/ (root)`.
   - Accede al sitio en `https://tu-usuario.github.io/lab-status-app`.

4. **Dominio personalizado (opcional)**:
   - Usa un dominio gratuito por un año con Hostinger o GitHub Student Developer Pack.
   - Configura el dominio en **Settings > Pages > Custom domain**.

## Depuración
- Abre la consola del navegador (F12 > Console) para ver logs.
- Si los botones no funcionan, verifica:
  - Credenciales de Firebase en `firebaseConfig`.
  - Conexión a internet (errores como `auth/network-request-failed`).
  - Reglas de Firebase.
  - Si el usuario tiene `isAuthorized: true` en la base de datos.

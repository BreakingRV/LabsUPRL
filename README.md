# Estado del Laboratorio

Aplicación web para controlar el estado de un laboratorio (DISPONIBLE/EN USO), con registro, inicio de sesión, y historial de cambios. Desplegada en GitHub Pages con Firebase.

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
           ".write": "auth != null"
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

2. **Desplegar en GitHub Pages**:
   - Sube el proyecto a un repositorio en GitHub.
   - En **Settings > Pages**, selecciona la rama `main` y la carpeta `/ (root)`.
   - Accede al sitio en `https://tu-usuario.github.io/lab-status-app`.

3. **Dominio personalizado (opcional)**:
   - Usa un dominio gratuito por un año con Hostinger o GitHub Student Developer Pack.
   - Configura el dominio en **Settings > Pages > Custom domain**.

## Depuración
- Abre la consola del navegador (F12 > Console) para ver logs.
- Si los botones no funcionan, verifica:
  - Credenciales de Firebase en `firebaseConfig`.
  - Conexión a internet (errores como `auth/network-request-failed`).
  - Reglas de Firebase.

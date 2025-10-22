# Configuración de Spotify Developer para el Portfolio

## Pasos para conectar tu cuenta real de Spotify:

### 1. Configurar Redirect URI en Spotify Developer Dashboard

1. Ve a [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Encuentra tu aplicación "PortfolioJones"
3. Haz clic en "Edit Settings"
4. En la sección "Redirect URIs", agrega:
   - Para desarrollo local: `http://localhost:3001/callback/spotify`
   - Para producción: `https://tu-dominio.com/callback/spotify`
5. Guarda los cambios

### 2. Usar el componente

El componente de Spotify ya está integrado en tu hero section. Funciona de la siguiente manera:

- **Sin autenticación**: Muestra datos simulados de canciones populares
- **Con autenticación**: Muestra lo que realmente estás escuchando en Spotify en tiempo real

### 3. Conectar tu cuenta

1. Haz clic en el botón "Connect Spotify" en tu portfolio
2. Se abrirá una ventana popup de Spotify
3. Autoriza la aplicación
4. ¡Listo! Ahora verás tu música real

### 4. Funcionalidades

✅ **Detección automática** de lo que estás escuchando  
✅ **Renovación automática** de tokens  
✅ **Fallback elegante** a datos simulados  
✅ **Indicador visual** de reproducción/pausa  
✅ **Barra de progreso** animada  
✅ **Enlace directo** a Spotify  

### 5. Variables de entorno

Las credenciales están configuradas en `.env.local`:

```env
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=f50bb374b8cd47a0977810495c03c09b
SPOTIFY_CLIENT_SECRET=d86c5920ce774a11b347a9d4668d8891
```

### 6. Scopes requeridos

La aplicación solicita los siguientes permisos:
- `user-read-currently-playing`: Para leer la canción actual
- `user-read-playback-state`: Para obtener el estado de reproducción

¡Tu portfolio ahora muestra en tiempo real lo que estás escuchando en Spotify! 🎵
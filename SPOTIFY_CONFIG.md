# 🎵 Configuración de Spotify para GitHub Pages

Para que Spotify funcione en tu portfolio, necesitas configurar correctamente la Redirect URI en tu Dashboard de Spotify.

## ✅ URI que debes agregar en Spotify Dashboard:

```
https://jorgeajonesp.github.io/Portafolio/callback/spotify/
```

## 📋 Pasos para configurar:

1. **Ve a tu Dashboard de Spotify:**
   https://developer.spotify.com/dashboard/f50bb374b8cd47a0977810495c03c09b

2. **Click en "Edit Settings"**

3. **En la sección "Redirect URIs":**
   - Agregar: `https://jorgeajonesp.github.io/Portafolio/callback/spotify/`
   - ⚠️ **IMPORTANTE:** Incluir la barra final `/`

4. **Click en "Save"**

## 🚫 NO usar localhost:

- ❌ `http://localhost:3000/callback/spotify`
- ❌ Cualquier URL con `localhost`
- ✅ Solo la URL de GitHub Pages

## 🔧 Desarrollo local:

Para desarrollo local, usa la misma URL de GitHub Pages. El código está configurado para funcionar directamente con la URL de producción.

## 📝 Notas:

- El Client ID ya está configurado: `f50bb374b8cd47a0977810495c03c09b`
- El Client Secret está en las variables de entorno
- PKCE está implementado para mayor seguridad
- No se requiere servidor backend
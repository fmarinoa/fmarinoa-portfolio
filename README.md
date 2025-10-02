# Testing Configuration

Este proyecto está optimizado para **testing exclusivo** con Playwright.

## 🚀 Scripts de Testing Disponibles

```bash
# Ejecutar todos los tests
pnpm test
```

## ⚙️ Configuración de Variables de Entorno

### Variables Requeridas para Testing:

- `TEST_URL_BASE`: URL base donde ejecutar los tests
- `NODE_ENV`: Debe ser "test"
- `CONTENT_BASE_URL`: URL base para contenido (si aplica)

### Para desarrollo local:

```bash
cp .env.test .env.local
# Editar .env.local con tus configuraciones locales
```

## 🔧 Configuración de Playwright

El proyecto está configurado para:

- ✅ Testing exclusivo (sin webServer)
- ✅ Múltiples browsers (Chrome Desktop y Mobile)
- ✅ Reports en HTML y JUnit
- ✅ Captura de screenshots/videos en fallos
- ✅ Reintentos automáticos en CI
- ✅ Paralelización optimizada

## 🎯 Flujo de CI

1. **Deploy Preview**: Se despliega la aplicación
2. **Testing**: Se ejecutan tests contra la URL de preview
3. **Reports**: Se generan y publican reportes de tests

## 📁 Estructura de Archivos de Testing

```
tests/                  # Tests de Playwright
test-results/          # Resultados de tests (generado)
playwright-report/     # Reportes HTML (generado)
playwright.config.ts   # Configuración de Playwright
.env.test             # Variables de entorno para testing
```

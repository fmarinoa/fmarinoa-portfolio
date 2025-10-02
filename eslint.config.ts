import neostandard from 'neostandard'

export default [
  ...neostandard({
    ts: true, // Habilitar soporte para TypeScript
    noStyle: true, // Deshabilitar reglas de estilo para usar Prettier
  }),
  // Configuración personalizada para el proyecto
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      // Relajar reglas problemáticas para testing
      'no-unused-expressions': 'off',
      'no-sequences': 'warn',
      'promise/param-names': 'off',
      // Permitir console.log en tests
      'no-console': 'warn',
      // Permitir any en tests cuando sea necesario
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  // Configuración específica para archivos de test
  {
    files: ['tests/**/*.ts', '**/*.test.ts', '**/*.spec.ts'],
    rules: {
      // Reglas más relajadas para tests
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'off',
    },
  },
  // Ignores ampliados
  {
    ignores: [
      'dist/**/*',
      '.astro/**/*',
      'node_modules/**/*',
      '.vercel/**/*',
      'playwright-report/**/*',
      'test-results/**/*',
      'coverage/**/*',
      '.next/**/*',
      '.nuxt/**/*',
      'build/**/*',
      'out/**/*',
      '*.config.js',
      'pnpm-lock.yaml',
      'package-lock.json',
      'yarn.lock',
    ],
  },
]

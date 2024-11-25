import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { ESLint } from 'eslint';

import tsConfig from '@typescript-eslint/eslint-plugin/dist/configs/recommended.json';

export default ESLint.config({
    ignores: ['dist'],
    overrides: [
        {
            files: ['**/*.{ts,tsx}'],
            extends: [js.configs.recommended, ...tsConfig],
            languageOptions: {
                ecmaVersion: 2020,
                globals: {
                    ...globals.browser,
                    ...globals.node,
                },
            },
            plugins: {
                'react-hooks': reactHooks,
                'react-refresh': reactRefresh,
            },
            rules: {
                'no-console': 'warn',
                eqeqeq: ['error', 'always'],
                semi: ['error', 'always'],
                'react/prop-types': 'off',
                'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],
                'import/prefer-default-export': 'off',
                quotes: ['error', 'single'],
                'react-hooks/exhaustive-deps': 'off',
            },
        },
    ],
});

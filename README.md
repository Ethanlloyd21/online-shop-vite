# online-shop-vite
React using Vite

For Vite get started documentation please visit https://vitejs.dev/guide/

## Setting up React-Typescript on Vite:

1. Install Vite
```javascript
# npm 6.x
npm create vite@latest my-react-app --template react-ts

# npm 7+, extra double-dash is needed:
npm create vite@latest my-react-app -- --template react-ts

# yarn
yarn create vite my-react-app --template react-ts

# pnpm
pnpm create vite my-react-app --template react-ts
```

2. cd to your project root folder and install the dependencies by running npm install (if you are using npm) and start your app by running npm run dev
```javascript
npm install
npm run dev
```

3. Modify the index.html by adding the following script before the closing body tag </body>
```html
<script>
    window.global = window;
    window.process = {
      env: { DEBUG: undefined },
    }
    var exports = {};
</script>
```

4. Update the vite.config.ts and add a resolve alias inside the defineConfig({}) as seen below.
```javascript
export default defineConfig({
  plugins: [react()],
  resolve: {
      alias: [
      {
        find: './runtimeConfig',
        replacement: './runtimeConfig.browser',
      },
    ]
  }
})

```

5. Update the tsconfig.json file and add skipLibCheck: true under compilerOptions.
```javascript
      "compilerOptions": {
    "skipLibCheck": true,
  }
...
```


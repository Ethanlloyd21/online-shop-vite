# online-shop-vite
React using Vite

For Vite get started documentation please visit https://vitejs.dev/guide/

## Setting up React-Typescript + Vite for Amplify:

1. Install Vite
```bash
# npm 6.x
npm create vite@latest my-react-app --template react-ts

# npm 7+, extra double-dash is needed:
npm create vite@latest my-react-app -- --template react-ts

# yarn
yarn create vite my-react-app --template react-ts

# pnpm
pnpm create vite my-react-app --template react-ts
```

2. cd to your project root folder and install the dependencies by running `npm install` (if you are using npm) and start your app by running `npm run dev`
```bash
npm install
npm run dev
```

3. Modify the `index.html` by adding the following script before the closing body tag `</body>`
```html
<script>
    window.global = window;
    window.process = {
      env: { DEBUG: undefined },
    }
    var exports = {};
</script>
```

4. Update the `vite.config.ts` and add a resolve alias inside the `defineConfig({})` as seen below.
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

5. Update the `tsconfig.json` file and add `skipLibCheck: true` under `compilerOptions`.
```bash
    "compilerOptions": {
        "skipLibCheck": true,
    }
...
```
## IMPORTANT!!! 

When initializing your backend on Amplify `amplify init` (You can follow the steps here: https://docs.amplify.aws/start/getting-started/setup/q/integration/react/) make sure you select `No` when asked `Initialize the project with the above configuration?`
```bash
? Enter a name for the project reactamplified
The following configuration will be applied:

?Project information
| Name:  reactamplified
| Environment: dev
| Default editor: Visual Studio Code
| App type: javascript
| Javascript framework: react
| Source Directory Path: src
| Distribution Directory Path: build
| Build Command: npm run-script build
| Start Command: npm run-script start

? Initialize the project with the above configuration? No

```
Amplify will ask you to prompt your response manually. Once you get to the `Build Command` question type
```bash
npm run build
```
and for the `Start Command` type
```bash
npm run dev
```
This is very important because 
```bash
| Build Command: npm run-script build
| Start Command: npm run-script start
```
will only work for `create-react-app`. Since we are using `Vite`, we need to modify the start and build command for Amplify to mirror our package.json. 
```bash
"scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
```

For information on how to set up Amplify please visit https://docs.amplify.aws/start/q/integration/react/


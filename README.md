


Transpile single `.ts` to `.js`
```bash
tsc hello_world/index.ts
```

Create `tsconfig.json`
```bash
tsc --init
tsc
node dist/index.js
```


## Setting up debugger in VSCode

Click `Run & Debug` in the left pane

Click `Create launch.json`

Add:
- "preLaunchTask": "tsc: build - tsconfig.json"

```json
// .vscode/launch.json
{
    "version": "0.2.0",
    "configurations": [

        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "program": "${workspaceFolder}/hello_world/dist/index.js",
            "preLaunchTask": "tsc: build - tsconfig.json",
            "outFiles": [
                "${workspaceFolder}/**/*.js"
            ]
        }
    ]
}
```

Module formats:
- AMD
- UMD
- CommonJS
- ES2015 / ES6

Shortcuts:
- F10: step-over
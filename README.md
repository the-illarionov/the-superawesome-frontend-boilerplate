# The SuperAwesome Frontend Boilerplate

## Requirements

the only software requirements: [docker](https://www.docker.com/), [taskfile](https://taskfile.dev/), [mkcert](https://github.com/FiloSottile/mkcert), [XState for VS Code](https://marketplace.visualstudio.com/items?itemName=statelyai.stately-vscode) (optional)

nothing else is needed, evertything is containerized (you don't even need nodejs installed!)

## Stack

Vue 3, Vite, Xstate for state management, Vitest for Unit tests, Playwright for E2e tests, Node Express for API

Additional features:

-   TypeScript
-   UnoCSS for CSS ([default preset is used](https://github.com/unocss/unocss/tree/main/packages/preset-uno), [Material Design Icons Preinstalled](https://pictogrammers.com/library/mdi/))
-   github/netlify CI/CD pipeline
-   Live monitoring for all of your tests on "/\_\_tests/" (#todo: image)
-   SSG powered by [Vite SSG](https://github.com/antfu/vite-ssg)

## How to start

If you launch this repo for the first time:

```shell
cd _dev
task env # creates .env from .env.example
task init # will build all of the required docker images
task up
```

For subsequent launches:

```shell
cd _dev
task up
```

That's all!

## Attention

To avoid permission collisions, all your node_modules are belong to docker root user. So you should use "task frontend:yarn -- add some-cool-library --dev" to install dependencies (it will create a container, mount 'frontend' directory and run 'yarn add' inside it).
Everything is containerized, so you don't even need nodejs to be installed locally.

# The SuperAwesome Frontend Boilerplate

## Requirements

the only software requirements: [docker](https://www.docker.com/), [taskfile](https://taskfile.dev/), [mkcert](https://github.com/FiloSottile/mkcert)
no node, no db, nothing else is needed, evertything is containerized

## Stack

Vue 3, Vite, Xstate for state management, Vitest for Unit tests, Playwright for E2e tests, Node Express for API

Additional features:

-   TypeScript
-   UnoCSS for CSS
-   github/netlify CI/CD pipeline
-   Live monitoring for all of your tests (#todo: image)
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

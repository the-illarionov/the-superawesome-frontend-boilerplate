# Backend

The whole purpose of `backend` is to not be tightly bound to the backend team by having your mock API.

Let's say you need a new API, but the backend team is working on it right now. You can configure `nginx` so that requests to `/api/new-api` go to your mock `backend` instead of the real one.

Additional feature: I use `chokidar-cli` to emulate HMR with a running server. `vite-node` has built-in HMR, but it can't deal with running processes like a server.

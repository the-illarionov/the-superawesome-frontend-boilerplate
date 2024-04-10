# Tests

XState has an awesome package [@xstate/test](https://stately.ai/docs/xstate-test), which allows you to make your machine test providers.

You can add `meta.test` to your existing machines and it will work like a charm. You can then treat it like "unit testing" your machines.

However, I prefer a different approach, when you create a separate machine for e2e-testing, which describes all of the possible user interactions with flows, like [MachineUserFlow](./MachineUserFlow.ts).

The event-based nature of state machines just fits perfectly with how users interact with the applications.

## ATTENTION

Right now, `@xstate/test` is not fully supported by XState version 5, so I'm not actually using it in the test file. But you can look at [MachineUserFlow](./MachineUserFlow.ts) and get an idea of how this is done.

As soon as the XState team releases a compatible version I will update this repo.

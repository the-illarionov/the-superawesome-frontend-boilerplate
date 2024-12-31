# Tests

XState has an awesome package [@xstate/test](https://stately.ai/docs/xstate-test), which allows you to make your machine test providers.

You can create test models from your existing machines and treat it like "unit-testing" of your machines.

However, I prefer a different approach, when you create a separate machine for e2e-testing, which describes all of the possible user interactions with flows, like [MachineUserFlow](./MachineUserFlow.ts).

![](./MachineUserFlow.png)

![](./code.png)

The event-based nature of state machines just fits perfectly with how users interact with the applications.

Be aware that `@xstate/test` is still in beta stage, so docs may be outdated or not correct. Refer to [test examples](https://github.com/statelyai/xstate/tree/main/packages/xstate-test/test) to see actual tests.

# Machines

Machines can be global singletons ([like this](./MachineApp/)) or local, spawned when a component mounts ([like this](../components/FormLogin/machines/)).

Machines can also be spawned by other machines, but I don't have an example of that in this repo.

1. Name machines with capital letter, running services - same name but with lowercase.
    ```javascript
    const MachineIndex = setup({
        // ...
    })

    const machineIndex = useMachine(MachineIndex)
    ```

2. Machine for component always has the name `MachineIndex` and is located in the `machines` subfolder.
    ```
    components/
        SomeComponent/
            machines/
                MachineIndex.ts
            SomeComponent.vue
    ```

3. Check if the machine is in some state by tags, not by state name.

    Bad:
    ```javascript
    if(machineIndex.value.context.value.value === 'Some name') {
    ```
    Good:
    ```javascript
    if(machineIndex.value.context.value.hasTag('some-tag') {
    ```

4. When designing machine in visual editor, form some general rules and stick to them.

    For example:

    _All of the states are being drawn from left to right horizontally. Vertical states means another options_.

    You can have your own rules, but once you formed them stick to them.

5. Also create the rules about naming actions, events and states.

    For example:

    Events: passive verbs in past `Button was clicked`

    Actions: imperative verbs in present `fetchSessionInfo`

    States: adjectives or verbs in present `Fetching session info`

    You can make your own rules, but be consistent once you've formed them.

5. Keep your actions as small as possible. They must do only one thing. And do your best to keep them pure.

    It can lead to overhead with 5-6 actions for 1 transition, but it's ok. It makes people without context (even non-techs if you name them right) easily understand what is going on.

    Also, it makes it very easy for you to reuse action in another machine.

    Bad:
    ```javascript
    actions:
        assignContext() { ...
    ```
    Good:
    ```javascript
    actions:
        assignOneContextProperty() { ...
        assignAnotherContextProperty() { ...
        assignMoreContextProperty() { ...
    ```

6. Try to declare actions in `setup` in an order of their logical appearance.

7. Xstate for VSCode can be buggy sometimes and break synchronization between editor and code. Don't forget about that.

    You can use this code as a starter template for the machine:
    ```javascript
    import { setup } from 'xstate';

    export const MachineIndex = setup({
        types: {} as {

    },
    }).createMachine({
        /** @xstate-layout N4IgpgJg5mDOIC5gF8A0IB2B7CdGgDkBDAWzAE0sBXAJwFkiBjACwEsMx8QAHLWVgC6ssGLgA9EAWgBs09AE8pAZgCcydciA */
        id: 'MachineIndex',
    });
    ```

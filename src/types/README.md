# Typescript

1. Avoid using `enums`, prefer [const assertions](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#readonly-and-const).
    ```javascript
    const tabs = [
        {
            name: 'Tab name',
            value: 'tab-value',
        },
        {
            name: 'Another tab',
            value: 'another-tab-value',
        },
    ] as const;

    export type TabValue = (typeof tabs)[number]['value'] // 'tab-value' | 'another-tab-value'
    ```

2. Types are always local and sit in the `types.ts` file.
    ```
    components/
        SomeComponent/
            SomeComponent.vue
            types.ts
    ```

3. Make types global only when you are sure they need to be shared (another component needs that type).

    Keep them small as possible too. Lots of small files are better than one huge.
    ```
    src/
        components
        pages
        types/
            TypePatientStatus.ts
            TypePatientOptions.ts
    ```

4. Group type files by content, not by domain.

    Bad:
    ```
    types/
        TypePageLogin.ts
    ```

    Good:
    ```
    types/
        TypeTabs.ts
        TypeOptions.ts
    ```

5. Group types inside file by categories.
    ```javascript
    // UI
    type Options = {
    ...

    // Fetch responses
    type FetchResponseLogin = {
    ...
    ```

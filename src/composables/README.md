# Composables

1. Keep composables as small as possible. Avoid big composables which export lots of stuff. It can lead to lots of composables but it's ok. Name them by meaning, not by location.

    Bad:
    ```
    SomeComponent/
        composables/
            useSomeComponent.ts
        SomeComponent.vue
    ```
    Good:
    ```
    SomeComponent/
        composables/
            useTabs.ts
            useSortOptions.ts
            useFilters.ts
        SomeComponent.vue
    ```

2. Avoid fat `<script setup>`, instead divide logic into composables, not in reusability, but in organizing purpose (but remember that fat `<template>` is ok).

3. Don't pass arguments in order, instead take only 1 argument as an object and destructurize it (this rule applies to every function, not only composables).

    Bad: `function useSomething(some, arguments, for, composable)`

    Good: `function useSomething({ some, arguments, for, composable })`

4. Always give specific names to what composable returns.

    Bad:
    ```javascript
    function useTabsOptions() {
        // ...
        return { options }
    ```

    Good:
    ```javascript
    function useTabsOptions() {
        // ...
        return { tabsOptions }
    ```

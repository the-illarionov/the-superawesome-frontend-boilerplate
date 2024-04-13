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

4. If composable takes a property of an object (especially if they are multiple), fight with temptation to pass the whole object as an argument.

    Always work only with primitive values, composable shouldn't know about the form of the object.

    First of all, it makes your code much more readable. And more importantly it makes writing unit tests so much easier.

    Bad:
    ```javascript
    function useSomething({ bigObject }) {
        // using bigObject.property
        // using bigObject.anotherProperty
    }

    useSomething({ bigObject })
    ```
    Good:
    ```javascript
    function useSomething({ property, anotherProperty }) {
        // using property
        // using anotherProperty
    }

    useSomething({
        property: bigObject.property,
        anotherProperty: bigObject.anotherProperty
    })
    ```

5. Always give specific names to what composable returns.

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

# Components

See an example of complex component structure [here](./ComplexComponentExample/).

1. Naming goes from general to specific, from left to right.

    Bad: `PatientProfilePage`, `DropdownMessagesPatient`

    Good: `PageProfilePatient`, `PatientMessagesDropdown`

2. Each component sits in its folder, even the smallest one. The name of the folder is the name of the component and inside you have a `.vue` file, which duplicates the name. Not `index.vue`, not anything else.

    ```
    components/
        SomeComponent/
            SomeComponent.vue
    ```

3. If you are absolutely sure that your component must have subcomponents, place them in the `components` subfolder and you can omit the naming rule for them as long as they are "private" components.

    But think twice before creating subcomponents. Fat `<template>` is not bad, it allows you to keep things simple.

    You shouldn't have more than 1 level of nesting components. If you find yourself in a situation you need to dive deeper, it's a red flag you are doing something wrong.
    ```
    components/
        SomeComponent/
            SomeComponent.vue
            components/
                SubComponentNamedWithoutDuplicatingParentNameBecauseItIsTreatedAsPrivateComponent.vue
    ```

4. If your component requires assets, create an `assets` subfolder. Place all of the assets at one level without creating nested subfolders.
    ```
    components/
        SomeComponent/
            SomeComponent.vue
            assets/
                some-image.png
                another-asset-that-lays-on-same-level.mp4
    ```

5. If your component needs composable, create a `composables` subfolder. You can name composables as you want (just remember about the self-explanation name).
    ```
    components/
        SomeComponent/
            SomeComponent.vue
            composables/
                useOptionsForSorting.ts
    ```

6. Always create a folder, even if you are sure that there will be only one asset or one composable.

7. Import all of your "private" stuff in a relative way. It will help you easily divide global and local composables usage.

    Bad:
    ```javascript
    import { useOptionForSotring } from '@/components/SomeComponent/composables/useOptionsForSorting'
    ```
    Good:
    ```javascript
    import { useOptionForSorting } from './composables/useOptionsForSorting'
    ```

8. Never call something directly in `<template>`, always create your wrapper. It will serve as some kind of your internal API.

    Bad:
    ```javascript
    <SomeComponent @some-event="someExternalDependency.has.SomeMethod('foo')">
    ```

    Good:
    ```javascript
    <SomeComponent @some-event="yourFunctionInScriptSetupWhichCallsSomeExternalDependency">
    ```

9. If you work on a shared component and listen to user events, name functions like `onInput`, `onChange` (try to stick to native events naming). But in the parent component name listener by meaning in the present simple imperative mood.
    ```javascript
    <SomeComponent @change="updateFilter">
    ```

10. When you want to customize some shared component, try not using props.

    Instead, try utilizing [attribute inheritance](https://vuejs.org/guide/components/attrs).

    If it doesn't fit, use the power of [named scoped slots](https://vuejs.org/guide/components/slots.html#fancy-list-example) to give the consumers of your component freedom to customize.

    And only if nothing works, use props.

11. Don't hold any logic inside components, only emit events to the consumer even if you think it'd overhead right now.

# Frontend

I tried lots of different approaches to my projects and finally came to this structure.

It's not perfect, but it allows to grow the codebase with minimal cost.

## General rules

1. Treat every component and page as a standalone project, [domain](https://vueschool.io/articles/vuejs-tutorials/domain-driven-design-with-nuxt-layers/). Try to make them as independent as possible without any external dependencies.

    Store everything related to component inside it's folder (assets, composables, subcomponents etc.).

    Create abstractions only when you need them, don't overengineer ahead of time. Create subcomponents only when you are absolutely sure it's necessary.

    Ask yourself: _"Can this component be used in another project as-is? Does it really need to be split into multiple components? Does it really need that dependency?"_.

    [It's a Locality of Behaviour Principle](https://htmx.org/essays/locality-of-behaviour/).

2. Don't hesitate to violate DRY if you feel that it will greatly improve the readability and simplicity of the code.

    For example, 3 of your components use small function, but it requires lots of dependencies. It's better to duplicate it and not make it external.

    But of course, it depends.

3. Don't be shy to use `SomeVeryLongAndAwkwardLookingNames`. Instead, prioritize self-explanation of your function or component.

    Ask yourself: _"If somebody without context will read this name, will he clearly understand what it does?"_.

    Another bonus is that it will let you easily search files by name.

4. Don't pass objects as arguments or props, fight with temptation to do it.

    Always pass primitive values, composables and components shouldn't know about the form of the object.

    First of all, it makes your code much more readable. And more importantly it makes writing unit tests sooooo much easier.

    Bad:
    ```javascript
    function useSomething({ bigObject }) {
      // using bigObject.property
      // using bigObject.anotherProperty
    }

    useSomething({ bigObject })
    ```
    ```javascript
    <ChildComponent :parent="parent" />
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
    ```javascript
    <ChildComponent
        :parent-property="parent.property"
        :another-property="parent.another" />
    ```

5. Always use [vueuse](https://vueuse.org/). Moreover, check [releases](https://github.com/vueuse/vueuse/releases) from time to time, because they add new stuff pretty often.

## List of all guides

- [How to manage assets?](./src/assets/)

- [How to manage components?](./src/components/)

- [How does an example of complex component look?](./src/components/ComplexComponentExample/)

- [How to manage composables?](./src/composables/)

- [How to manage types?](./src/types/)

- [How to manage XState machines?](./src/machines/)

- [How does an example of XState machine look?](./src/components/FormLogin/machines/)

- [How to use XState for e2e testing?](./e2e/)

- [How to manage layouts?](./src/layouts/)

- [How to manage pages?](./src/pages/)

/*
	Basically, machines are tied to pages, but i prefer to make them separate, so you can easily use same machine between multiple contexts. 
	Also, you can create 1 main AppMachine, which will rule the rest.
*/

import { createMachine, interpret } from 'xstate'

import { shallowRef, reactive } from 'vue'
import { routerInstance } from '@/main'

import { api } from '@/services/api'

// #TODO: manage with types globally
type ValidationError = {
  message: string
}

const context : {
	token: string
  errors: Array<ValidationError>
	restore: Function
} = reactive({
  token: "",
  errors: [],

  restore() {
    context.token = ""
    context.errors = []
  }
})

const AuthMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEECuAXAFgWQIYGNMBLAOzADoBVE3DTME9I-XdSAYgDEB7AJwFsABAHdcsQbFQAjfkXRsIAbQAMAXUSgADt1hyi3EhpAAPRAEYAHADYANCACeiAJxPyAdgCsAXy920WPEJSCgA1XAAbIghWUih2MMjopgNBADNcInDIFXUkEG1dZMM80wQAFjKrcg8LDycAZk9lZpbbB0QAJicO6p8-OkDiMnIEqJiSOJ4BETFBADcIsYUcowK9AyNSqzdlcjKPerMOjztHBCcLXt8QfxwCIYoACVmFxJiUsF5ePlguPiFROJJDI5Ms1KsdOtiqBSpY2mcrGZdmYnG4KocLJYsX0bgN7sFyABlBgQWKCXhgACOqDg6HiiyS+hIaQyWSU4LyayKm2cykubicVgsTRazTMp063Su-QC+OGxJIpIm5KpNNgdOJvDmn0EtCwDCYLDBuS0kO5JXMZit5GaHg8bis9o6FmUFwl50uZRcFw8yjKFkxZnqFhxt0GBNuBuYrA4lFgOvC3CgMAggm4GBWnLNTJ5CG2ZXIFjKjQqfI8zrcFndAFp6vV3E5lB1EVYyspEfVlJ4fNcSNwIHAjGG5WAIYUcxaENWveQGvUPFZnRVEV0q+0p0czOQuk3fR02-VHfPQ3igsNqHr6Ixowox1Dc9Wt3OF0vKkdUU53RdqqLi-OzIitQnrKZ6hAy4xQHe5owogbZuF+lzeNcw6geQzziK8SxMoInzfLw8BZuOGyTq2iFmC+JzroiHjkNsHQOvRRauq6wF3KhCpKlAKrUrSUETjBCAWFK+yHMcX6uN2yGng85CRteRqQHxxECUGxZ7KiZheo2zodOK67flpPp+gGVplGYPZeEAA */
  id: "AuthMachine",

  states: {
    Unauthenticated: {
      on: {
        "Form was submitted": "Validating"
      }
    },

    Validating: {
      entry: ["clearValidationErrors", "validate" ],
      tags: ["loading"],

      on: {
        "Validation failed": "Has validation errors",
        "Form was validated": "Sending request"
      }
    },

    "Has validation errors": {
      on: {
        "Form was submitted": "Validating"
      },
      tags: ["validation-failed"],

      entry: "setValidationErrors"
    },

    "Sending request": {
      entry: "sendRequest",

      on: {
        "Validation failed": "Has validation errors",
        "Server authenticated": "Authenticated"
      },

      tags: ["loading"]
    },

    Authenticated: {
      entry: "onAuthentication",

      on: {
        "User logged out": {
          target: "Unauthenticated",
          actions: "redirectAfterLogout"
        }
      },

      exit: "clearToken"
    }
  },

  initial: "Unauthenticated",

  schema: {
    context: {} as {},
    events: {} as 
      { type: "Form was submitted", data: Api.Auth.Login } |
      { type: "Form was validated", data: Api.Auth.Login } |
      { type: "Validation failed", data: Array<ValidationError> } |
      { type: "Server authenticated", data: { token: string } } |
      { type: "User logged out" }
  },

  context: {},
  predictableActionArguments: true,
  preserveActionOrder: true,
  tsTypes: {} as import("./AuthMachine.typegen").Typegen0
}, {
  actions: {
    validate(_, event) {
      // Client-side validation
      if(event.data.username === "" || event.data.password === "") {
        send({ 
          type: "Validation failed", 
          data: [ 
            { message: "Username and password must not be empty!" }
          ]
        })
        return
      }

      // Validation succeeded
      send({ 
        type: "Form was validated",
        data: event.data
      })
    },

    setValidationErrors(_, event) {
      context.errors = event.data
    },
    clearValidationErrors() {
      context.errors = []
    },

    async sendRequest(_, event) {
      const { data, statusCode } = await api.auth.login({
        username: event.data.username,
        password: event.data.password
      })

      if(statusCode.value === 403) {
        send({ 
          type: "Validation failed", 
          data: data.value.validationErrors
        })
        return
      }

      send({
        type: "Server authenticated",
        data: {
          token: data.value.token
        }
      })
    },

    onAuthentication(_, event) {
      context.token = event.data.token
      routerInstance.push({ name: "DashboardPage" })
    },
    clearToken() {
      context.token = ""
    },
    redirectAfterLogout() {
      routerInstance.replace({ name: "IndexPage"})
    }
  }
})

const state = shallowRef(AuthMachine.initialState)

const service = interpret(AuthMachine).onTransition((newState) => {
  state.value = newState
}).start()

const send = service.send

const authMachine = {
  state,
  context,
  send
}

export { authMachine }
import { test, expect, type Page } from '@playwright/test'

import { createMachine } from 'xstate'
import { createModel } from '@xstate/test'

const UserFlowMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QFVZgE4DEA2B7A7gLICGAxgBYCWAdmAHQCS1EYAHgAQAKxMAxAOK447AC652AQQCuI8lx5gA2gAYAuolAAHXLEojKuahpCtEAZjrKAjAFYAbACYbAGhABPRAA4A7HW82AXyDXalwWeCQQVAwcAhIKGjBjbV19Q2NTBABaK08zVw8EZWCotCw8IjIqWkZmNnkYZJ09AyNIzJyzF3cvOzpAgNdo8riqxLppWQakyJSW9PbEBysATktbR27Czz6BoKA */
  id: 'UserFlowMachine',

  states: {
    "Index Page": {
      on: {
        "Goes to Auth Page": "Auth Page"
      },
      meta: {
        test: async({ page} : TestArguments) => {
          await page.goto("/")
        }
      }
    },

    "Auth Page": {
      meta: {
        test: async({ page} : TestArguments) => {
          await expect(page.url()).toContain("/auth")
        }
      }
    }
  },

  initial: "Index Page",

  context: {},
  predictableActionArguments: true,
  preserveActionOrder: true,
})

const UserFlowModel = createModel(UserFlowMachine).withEvents({
  'Goes to Auth Page' : {
    // @ts-ignore
    exec: async({ page } : TestArguments) => {
      await page.getByTestId('router-link-auth-page').click()
    }
  }
})

const testPlans = UserFlowModel.getShortestPathPlans()

testPlans.forEach((plan) => {
  test.describe(plan.description + " !", () => {
    plan.paths.forEach((path) => {
      test(path.description + " @ ", async ({ page }) => {
        await path.test({ page })
      })
    })
  })
})

test("Should have full coverage", () => {
  return UserFlowModel.testCoverage({
    //filter(stateNode) {
    //	return !!stateNode.meta
    //},
  })
})

type TestArguments = {
  page: Page
}
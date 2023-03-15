/*
  It's one approach for e2e testing: you create separate machine from user perspective (i call it "frontend" machine), without any technical implementation details (which i call "backend" machines).
  It lets you make separation of concerns. Also, this machine can be your cross-team communication tool between managers, designers etc.
  But, of course, you can stick to the traditional approach with pure e2e tests. Or you can even create e2e tests for each of "backend" machines, not only "frontend" one.
*/

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
import { expect, test } from '@playwright/test'

import { createTestModel } from '@xstate/test'
import { setup } from 'xstate'

const MachineUserFlow = setup({
  types: {} as {
    events: |
      {
        type: 'User successfully fetched post'
      } |
      {
        type: 'User unsuccessfully fetched post'
      }
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QFkCGBjAFgSwHZgFVYwAnAMQBsB7AdwDojSACAN21mwBdYmSqrOAYkYkmsAK7p0cWADNxFCgE8mssJyyQmAByqxOAbQAMAXUShdHTtiq5zIAB6IATAGZnAGhBLEADgBsdACsAL4hXmhYeITE5NT0IqzsXDx8AsKxTOK4ElIy8ooqahqYWpaGpvaWXDZ2SI4uzgCcwV4+CACMvs7BYeEguFQQcPaROPgilLRVejW29k4IRm2IALRGdE1bTQFuAOy+rh1uRh1hERjjMaRTCZlsVqn8nDNWtQuIACy+KwgBvf0xtFJvE6AAFPScJjsVTqTQQV5zOqgRb+ZxBX7-UKAy7A2K3cGQ2ElPBQJikPiiGGwTC0ZEgarWeb1VHOHpBJquPYY7yILrsvohIA */
  id: 'MachineUserFlow',

  states: {
    'User visits root': {
      on: {
        'User successfully fetched post': 'Post is fetched',
        'User unsuccessfully fetched post': 'Post fetching error is shown',
      },
    },

    'Post is fetched': {

    },
    'Post fetching error is shown': {

    },
  },

  initial: 'User visits root',
})

const modelUserFlow = createTestModel(MachineUserFlow)

const testPaths = modelUserFlow.getShortestPaths()

testPaths.forEach((path) => {
  test(path.description, async ({ page }) => {
    await path.test({
      states: {
        'User visits root': async () => {
          await page.goto('/')
          await expect(page.getByTestId('input')).toBeVisible()
        },
        'Post is fetched': async () => {
          await expect(page.getByTestId('post')).toBeVisible()
        },
        'Post fetching error is shown': async () => {
          await expect(page.getByTestId('error-message').first()).toBeVisible()
        },
      },
      events: {
        'User successfully fetched post': async () => {
          await page.getByTestId('input').fill('1')
          await page.getByTestId('submit').click()
        },
        'User unsuccessfully fetched post': async () => {
          await page.getByTestId('input').fill('12345')
          await page.getByTestId('submit').click()
        },
      },
    })
  })
})

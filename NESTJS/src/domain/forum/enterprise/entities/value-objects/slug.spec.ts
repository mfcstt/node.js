import { expect, test } from 'vitest'
import { Slug } from './slug.js'

test('it should be able to create a slug from a string', () => {
  const slug = Slug.createFromText('How to create a slug?')

  expect(slug.text).toBe('how-to-create-a-slug')
})

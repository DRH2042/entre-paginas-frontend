import test from 'node:test'
import assert from 'node:assert/strict'
import { getSearchResults, readSearchCache, writeSearchCache, SEARCH_CACHE_KEY, SEARCH_CACHE_MAX_AGE } from '../src/utils/searchCache.js'

// In-memory browser storage and fetch doubles; no live API requests.
test('search persistence validates data and safely falls back to GET requests', async () => {
  const originalStorage = Object.getOwnPropertyDescriptor(globalThis, 'localStorage')
  const originalFetch = globalThis.fetch
  const storage = new Map([['entre-paginas-language', 'en']])
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, writable: true, value: { getItem: (key) => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value) } })
  const books = [{ key: '/works/OL123W', title: 'A book', author_name: ['An author'], first_publish_year: 2000 }]
  let requests = 0
  globalThis.fetch = async (url, options) => {
    requests += 1
    assert.equal(new URL(url).searchParams.get('q'), 'query')
    assert.equal(options.method, undefined) // Fetch defaults to GET.
    return { ok: true, json: async () => ({ docs: books }) }
  }
  try {
    const signal = new AbortController().signal
    assert.deepEqual(await getSearchResults('query', signal), books)
    assert.equal(requests, 1)
    assert.deepEqual(await getSearchResults('query', signal), books)
    assert.equal(requests, 1, 'matching valid cache avoids the API')
    assert.equal(readSearchCache('different query'), null)
    assert.equal(storage.get('entre-paginas-language'), 'en')
    await getSearchResults('query', signal, true)
    assert.equal(requests, 2, 'retry bypasses the cache')

    for (const value of ['{broken', 'null', JSON.stringify({version: 1, query: 'query', savedAt: Date.now(), books: [{key: '/works/OL1W', author_name: 'invalid'}]})]) {
      storage.set(SEARCH_CACHE_KEY, value)
      const before = requests
      assert.deepEqual(await getSearchResults('query', signal), books)
      assert.equal(requests, before + 1)
    }
    const validEntry = JSON.parse(storage.get(SEARCH_CACHE_KEY))
    for (const patch of [{savedAt: Date.now() - SEARCH_CACHE_MAX_AGE - 1}, {savedAt: Date.now() + 60000}, {version: 2}]) {
      storage.set(SEARCH_CACHE_KEY, JSON.stringify({...validEntry, ...patch}))
      assert.equal(readSearchCache('query'), null)
    }
    writeSearchCache('empty', [])
    assert.deepEqual(readSearchCache('empty'), [])
    globalThis.localStorage = { getItem: () => { throw new Error('blocked') }, setItem: () => { throw new Error('quota') } }
    assert.deepEqual(await getSearchResults('query', signal), books)
    globalThis.fetch = async () => ({ok: false, status: 503})
    await assert.rejects(getSearchResults('query', signal), /503/)
  } finally {
    if (originalStorage === undefined) delete globalThis.localStorage
    else Object.defineProperty(globalThis, 'localStorage', originalStorage)
    globalThis.fetch = originalFetch
  }
})

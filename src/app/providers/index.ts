import compose from 'compose-function'
import withAuth from './withAuth'
import withStore from './withStore'

export const withProviders = compose(withStore, withAuth)

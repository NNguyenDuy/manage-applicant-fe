import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
})

const authLink = setContext((_, { headers }) => {
  let token = (window.localStorage.getItem('auth') as string) || ''
  return {
    headers: {
      ...headers,
      Authorization: token || '',
    },
  }
})

const removeTypenameLink = new ApolloLink((operation, forward) => {
  if (operation.variables) {
    const omitTypename = (key: string, value: any) =>
      key === '__typename' ? undefined : value
    operation.variables = JSON.parse(
      JSON.stringify(operation.variables),
      omitTypename
    )
  }
  return forward(operation)
})

const client = new ApolloClient({
  link: ApolloLink.from([removeTypenameLink, authLink, httpLink]),
  cache: new InMemoryCache(),
})

export default client

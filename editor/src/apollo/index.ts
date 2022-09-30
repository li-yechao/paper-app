// Copyright 2022 LiYechao
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {
  ApolloClient,
  ApolloLink,
  FetchResult,
  InMemoryCache,
  Observable,
  Operation,
} from '@apollo/client'
import { BatchHttpLink } from '@apollo/client/link/batch-http'
import { ErrorLink } from '@apollo/client/link/error'
import { GraphQLError } from 'graphql'
import { GRAPHQL_URI } from '../constants'
import Storage from '../Storage'
import auth from './auth'
import { relayStylePagination } from '@apollo/client/utilities'

export function createClient() {
  const refreshTokenLink = new RefreshAccessTokenLink({
    needRefreshToken: error => {
      const refreshToken = Storage.token?.refreshToken
      if (!refreshToken) {
        return false
      }
      return error?.[0]?.extensions?.['code'] === 'UNAUTHENTICATED'
    },
    refreshToken: async () => {
      const refreshToken = Storage.token?.refreshToken
      if (typeof refreshToken !== 'string') {
        throw new Error('Invalid refresh token')
      }
      Storage.token = await auth({ type: 'refreshToken', input: { refreshToken } })
    },
    processOperation: operation => {
      const { token } = Storage
      if (!token) {
        throw new Error('Invalid token')
      }
      operation.setContext(({ headers = {} }) => ({
        headers: {
          ...headers,
          authorization: `Bearer ${token.accessToken}`,
        },
      }))
    },
  })

  const authLink = new ApolloLink((operation, forward) => {
    const { token } = Storage

    if (token?.accessToken) {
      operation.setContext(({ headers = {} }) => ({
        headers: {
          ...headers,
          authorization: `Bearer ${token.accessToken}`,
        },
      }))
    }

    return forward(operation)
  })

  const httpLink = new BatchHttpLink({
    uri: GRAPHQL_URI,
    batchMax: 5,
    batchInterval: 100,
  })

  const link = authLink.concat(refreshTokenLink).concat(httpLink)

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache({
      typePolicies: {
        User: {
          fields: {
            objects: relayStylePagination(),
          },
        },
      },
    }),
  })
  return client
}

export interface RefreshAccessTokenLinkOptions {
  needRefreshToken: (error: readonly GraphQLError[] | undefined) => boolean
  refreshToken: () => Promise<void> | void
  processOperation: (operation: Operation) => void
}

class RefreshAccessTokenLink extends ErrorLink {
  private options: RefreshAccessTokenLinkOptions
  private isRefreshing = false
  private pendings: ((_: void) => void)[] = []

  constructor(options: RefreshAccessTokenLinkOptions) {
    super(e => this.handleError(e))
    this.options = options
  }

  private handleError: ErrorLink.ErrorHandler = ({ graphQLErrors, operation, forward }) => {
    if (this.options.needRefreshToken(graphQLErrors)) {
      return new Observable<FetchResult>(observer => {
        ;(async () => {
          try {
            if (!this.isRefreshing) {
              this.isRefreshing = true
              await this.options.refreshToken()
            } else {
              const promise = new Promise(resolve => this.pendings.push(resolve))
              await promise
            }

            this.options.processOperation(operation)
            forward(operation).subscribe(observer)
          } catch (error) {
            observer.error(error)
          } finally {
            const pendings = this.pendings
            this.pendings = []
            pendings.forEach(i => i())
            this.isRefreshing = false
          }
        })()
      })
    }

    return
  }
}

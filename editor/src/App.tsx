import { ApolloProvider } from '@apollo/client'
import { useMemo } from 'react'
import { IntlProvider } from 'react-intl'
import { createClient } from './apollo'
import ObjectEditor from './ObjectEditor'

export interface AppProps {
  userId: string
  objectId: string
  onStateChange?: (e: { changed: boolean; updatedAt: string; title: string }) => void
  onSizeChange?: (e: { width: number; height: number }) => void
}

export default function App({ userId, objectId, onStateChange, onSizeChange }: AppProps) {
  const apolloClient = useMemo(() => createClient(), [])

  return (
    <ApolloProvider client={apolloClient}>
      <IntlProvider locale={navigator.language}>
        <ObjectEditor
          userId={userId}
          objectId={objectId}
          onStateChange={onStateChange}
          onSizeChange={onSizeChange}
        />
      </IntlProvider>
    </ApolloProvider>
  )
}

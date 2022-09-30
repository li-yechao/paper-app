import { ApolloProvider } from '@apollo/client'
import { useMemo } from 'react'
import { IntlProvider } from 'react-intl'
import { createClient } from './apollo'
import ObjectEditor, { ObjectEditorProps } from './ObjectEditor'

export interface AppProps extends ObjectEditorProps {}

export default function App(props: AppProps) {
  const apolloClient = useMemo(() => createClient(), [])

  return (
    <ApolloProvider client={apolloClient}>
      <IntlProvider locale={navigator.language}>
        <ObjectEditor {...props} />
      </IntlProvider>
    </ApolloProvider>
  )
}

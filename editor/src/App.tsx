import { ApolloProvider } from '@apollo/client'
import { css, Global } from '@emotion/react'
import { useCallback, useMemo } from 'react'
import { IntlProvider } from 'react-intl'
import { useSearchParam } from 'react-use'
import { createClient } from './apollo'
import ObjectEditor, { ObjectEditorProps } from './ObjectEditor'

export default function App() {
  const apolloClient = useMemo(() => createClient(), [])
  const userId = useSearchParam('userId')
  const objectId = useSearchParam('objectId')

  if (!userId || !objectId) {
    throw new Error(`Missing required search param userId or objectId`)
  }

  const onStateChagne = useCallback<NonNullable<ObjectEditorProps['onStateChange']>>(e => {
    window.parent.postMessage({
      userId,
      objectId,
      type: 'stateChange',
      data: e,
    })
  }, [])

  return (
    <ApolloProvider client={apolloClient}>
      <IntlProvider locale={navigator.language}>
        <Global
          styles={css`
            body {
              position: fixed;
              overflow: hidden;
              overscroll-behavior: contain;
              height: 100%;
              width: 100%;
              margin: 0;
            }
          `}
        />

        <ObjectEditor userId={userId} objectId={objectId} onStateChange={onStateChagne} />
      </IntlProvider>
    </ApolloProvider>
  )
}

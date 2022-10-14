import { ApolloProvider } from '@apollo/client'
import { css, Global } from '@emotion/react'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { IntlProvider } from 'react-intl'
import { useSearchParam } from 'react-use'
import { createClient } from './apollo'
import ObjectEditor, { ObjectEditorProps, ObjectEditorRef } from './ObjectEditor'

export default function App() {
  const apolloClient = useMemo(() => createClient(), [])
  const userId = useSearchParam('userId')
  const objectId = useSearchParam('objectId')

  if (!userId || !objectId) {
    throw new Error(`Missing required search param userId or objectId`)
  }

  const editorRef = useRef<ObjectEditorRef>(null)

  const postMessage = useCallback(({ type, data }: { type: string; data: any }) => {
    window.parent.postMessage({ userId, objectId, type, data })
  }, [])

  const onStateChagne = useCallback<NonNullable<ObjectEditorProps['onStateChange']>>(data => {
    postMessage({ type: 'stateChange', data })
  }, [])

  const invokeMethodCallback = useCallback(
    ({ callId, result, error }: { callId: string; result?: any; error?: any }) => {
      postMessage({ type: 'invokeMethodResult', data: { callId, result, error } })
    },
    []
  )

  const invokeMethod = useCallback(
    async ({ callId, method }: { callId: string; method: string; arg: any }) => {
      switch (method) {
        case 'save': {
          try {
            await editorRef.current?.save()
            invokeMethodCallback({ callId })
          } catch (error) {
            invokeMethodCallback({ callId, error })
          }
          break
        }
      }
    },
    []
  )

  useEffect(() => {
    window.addEventListener('message', e => {
      if (e.data?.userId !== userId || e.data?.objectId !== objectId) {
        return
      }

      switch (e.data?.type) {
        case 'invokeMethod': {
          invokeMethod(e.data.data)
          break
        }
      }
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

        <ObjectEditor
          ref={editorRef}
          userId={userId}
          objectId={objectId}
          onStateChange={onStateChagne}
        />
      </IntlProvider>
    </ApolloProvider>
  )
}

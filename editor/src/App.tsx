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

import { ApolloProvider } from '@apollo/client'
import { css, Global } from '@emotion/react'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { IntlProvider } from 'react-intl'
import { useSearchParam } from 'react-use'
import { createClient } from './apollo'
import ObjectEditor, { ObjectEditorRef } from './ObjectEditor'

export default function App() {
  const apolloClient = useMemo(() => createClient(), [])
  const userId = useSearchParam('userId')
  const objectId = useSearchParam('objectId')

  if (!userId || !objectId) {
    throw new Error(`Missing required search param userId or objectId`)
  }

  const editorRef = useRef<ObjectEditorRef>(null)

  const methods = useMemo(
    () => ({
      save: () => editorRef.current?.save(),
    }),
    []
  )

  const { postMessage } = useMessageChannel({ userId, objectId, methods })

  const onStateChagne = useCallback((data: any) => {
    postMessage({ type: 'stateChange', data })
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

function useMessageChannel({
  userId,
  objectId,
  methods,
}: {
  userId: string
  objectId: string
  methods: { [method: string]: (arg: any) => Promise<any> | undefined }
}) {
  const postMessage = useCallback(
    ({ type, data }: { type: string; data: any }) => {
      window.parent.postMessage({ userId, objectId, type, data })
    },
    [userId, objectId]
  )

  useEffect(() => {
    window.addEventListener('message', async ({ data }) => {
      if (data?.userId !== userId || data?.objectId !== objectId) {
        return
      }
      switch (data.type) {
        case 'invokeMethod': {
          const { callId, method, arg } = data.data || {}
          let result, error
          const m = methods[method]
          if (!m) {
            error = { message: `No such function ${method}` }
          } else {
            try {
              result = await m(arg)
            } catch (e) {
              error = e
            }
          }
          postMessage({ type: 'invokeMethodResult', data: { callId, result, error } })
          break
        }
      }
    })
  }, [userId, objectId, methods])

  return { postMessage }
}

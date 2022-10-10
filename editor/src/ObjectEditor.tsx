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

import equal from 'fast-deep-equal/es6'
import { $getRoot, EditorState } from 'lexical'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { toString } from 'uint8arrays'
import { useCreateObject, useObject, useObjectUriQuery, useUpdateObject } from './apollo/object'
import { useViewer } from './apollo/viewer'
import LexicalEditor from './LexicalEditor'
import { ImageNode } from './nodes/ImageNode'
import useOnSave from './utils/useOnSave'

const AUTO_SAVE_TIMEOUT = 3e3

export interface ObjectEditorProps {
  userId: string
  objectId: string
  onStateChange?: (e: StateChangeEvent) => void
}

export type StateChangeEvent =
  | { type: 'changed'; changed: boolean }
  | { type: 'saved'; updatedAt: string; title: string }
  | { type: 'loaded' }

export default function ObjectEditor({ userId, objectId, onStateChange }: ObjectEditorProps) {
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [objectId])

  const object = useObject({ variables: { userId, objectId }, fetchPolicy: 'cache-and-network' })

  useEffect(() => {
    if (object.data) {
      onStateChange?.({ type: 'loaded' })
    }
  }, [object.data])

  if (object.error) {
    throw object.error
  } else if (object.data) {
    return <_ObjectEditor object={object.data.user.object} onStateChange={onStateChange} />
  } else if (object.loading) {
    return null
  }
  return null
}

const _ObjectEditor = ({
  object,
  onStateChange,
}: Pick<ObjectEditorProps, 'onStateChange'> & {
  object: {
    id: string
    userId: string
    data?: string
    meta?: { title?: string }
    updatedAt: string
  }
}) => {
  const user = useViewer().data?.viewer
  const [updateObject] = useUpdateObject()
  const [state, setState] = useState<EditorState>()
  const [savedState, setSavedState] = useState<EditorState>()

  const onChange = useCallback((state: EditorState) => {
    setSavedState(v => v ?? state)
    setState(state)
  }, [])

  useEffect(() => {
    setState(undefined)
    setSavedState(undefined)
  }, [object.id])

  const save = useCallback(
    (state: EditorState) => {
      clearTimeout(autoSaveTimeout.current)

      let title = ''
      const data = JSON.stringify(state)

      state.read(() => {
        const root = $getRoot()
        for (const child of root.getChildren()) {
          title = child.getTextContent()
          if (title) {
            return
          }
        }
      })

      updateObject({
        variables: {
          objectId: object.id,
          input: {
            meta: { title },
            data,
          },
        },
      })
        .then(() => {
          setSavedState(state)
        })
        .catch(error => {
          throw error
        })
    },
    [object.id]
  )

  const changed = useMemo(
    () => !equal(state?._nodeMap, savedState?._nodeMap),
    [state?._nodeMap, savedState?._nodeMap]
  )

  const autoSaveTimeout = useRef<number>()

  useEffect(() => {
    onStateChange?.({ type: 'changed', changed })
  }, [changed])

  useEffect(() => {
    onStateChange?.({ type: 'saved', updatedAt: object.updatedAt, title: object.meta?.title || '' })
  }, [object.updatedAt])

  useEffect(() => {
    if (autoSaveTimeout.current) {
      clearTimeout(autoSaveTimeout.current)
    }
    if (changed && state) {
      autoSaveTimeout.current = window.setTimeout(() => {
        save(state)
      }, AUTO_SAVE_TIMEOUT)
    }
  }, [state, changed])

  useOnSave(() => {
    if (state) {
      save(state)
    }
  }, [state])

  const [createObject] = useCreateObject()
  const [queryObjectUri] = useObjectUriQuery()

  const imageProviderValue = useMemo(
    () => ({
      upload: async (file: File) => {
        const data = toString(new Uint8Array(await file.arrayBuffer()), 'base64')
        const res = await createObject({
          variables: {
            parentId: object.id,
            input: {
              meta: { type: 'image' },
              data,
              encoding: 'BASE64',
            },
          },
        })
        if (res.errors || !res.data) {
          throw new Error(res.errors?.[0]?.message || 'upload file failed')
        }
        return res.data.createObject.id
      },
      source: async (src?: string | null) => {
        if (!src) {
          return null
        }

        const res = await queryObjectUri({
          variables: { userId: object.userId, objectId: src },
        })
        if (!res.data || res.error) {
          throw res.error || new Error('query object cid failed')
        }
        const uri = res.data.user.object.uri
        if (!uri) {
          throw new Error('object cid not found')
        }
        return uri
      },
      thumbnail: { maxSize: 1024 },
    }),
    [createObject, queryObjectUri]
  )

  return (
    <ImageNode.Provider value={imageProviderValue}>
      <LexicalEditor
        key={object.id}
        defaultValue={object.data}
        readOnly={user?.id !== object.userId}
        onChange={onChange}
      />
    </ImageNode.Provider>
  )
}

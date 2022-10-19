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

import styled from '@emotion/styled'
import { CodeHighlightNode } from '@lexical/code'
import { AutoLinkNode, LinkNode } from '@lexical/link'
import { $createListItemNode, $createListNode, ListItemNode, ListNode } from '@lexical/list'
import { CHECK_LIST, CODE as CODE_, TRANSFORMERS } from '@lexical/markdown'
import { AutoLinkPlugin } from '@lexical/react/LexicalAutoLinkPlugin'
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { TablePlugin } from '@lexical/react/LexicalTablePlugin'
import { $createHeadingNode, $createQuoteNode, HeadingNode, QuoteNode } from '@lexical/rich-text'
import {
  $createTableNodeWithDimensions,
  TableCellNode,
  TableNode,
  TableRowNode,
} from '@lexical/table'
import { $createParagraphNode, CLICK_COMMAND, EditorState, LexicalNode } from 'lexical'
import {
  ChangeEventHandler,
  ComponentProps,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import BlockQuote from './icons/BlockQuote'
import BulletList from './icons/BulletList'
import Code from './icons/Code'
import Heading1 from './icons/Heading1'
import Heading2 from './icons/Heading2'
import Heading3 from './icons/Heading3'
import Image from './icons/Image'
import Math from './icons/Math'
import OrderedList from './icons/OrderedList'
import Table from './icons/Table'
import TodoList from './icons/TodoList'
import CodeNode, { $createCodeNode, CODE } from './nodes/CodeNode'
import { $createEquationNode, $isEquationNode, EquationNode } from './nodes/EquationNode'
import { $createImageNode, ImageNode } from './nodes/ImageNode'
import BlockMenuPlugin, { BlockMenuCommand, replaceWithNode } from './plugins/BlockMenuPlugin'
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin'
import FloatingToolbarPlugin, {
  ToggleBlockButton,
  ToggleFormatButton,
  ToggleLinkButton,
} from './plugins/FloatingToolbarPlugin'
import ImagePlugin from './plugins/ImagePlugin'
import TableActionMenuPlugin from './plugins/TableActionMenuPlugin'
import TrailingParagraphPlugin from './plugins/TrailingParagraphPlugin'
import theme from './themes/theme'

export interface LexicalEditorProps {
  className?: string
  defaultValue?: string
  readOnly?: boolean
  onChange?: (editorState: EditorState) => void
}

export default function LexicalEditor(props: LexicalEditorProps) {
  const imageInput = useRef<HTMLInputElement>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const container = useRef<HTMLDivElement>(null)

  const onImageInputChange = useRef<ChangeEventHandler<HTMLInputElement>>()

  const handleImageInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>(e => {
    onImageInputChange.current?.(e)
  }, [])

  const initialConfig = useMemo<ComponentProps<typeof LexicalComposer>['initialConfig']>(
    () => ({
      namespace: 'editor',
      editable: !props.readOnly,
      nodes: [
        HeadingNode,
        QuoteNode,
        ListNode,
        ListItemNode,
        LinkNode,
        AutoLinkNode,
        CodeNode,
        CodeHighlightNode,
        TableNode,
        TableRowNode,
        TableCellNode,
        ImageNode,
        EquationNode,
      ],
      theme,
      onError: e => {
        throw e
      },
      editorState: props.defaultValue,
    }),
    []
  )

  const autoLinkMatchers = useMemo(() => {
    const URL_MATCHER =
      /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/

    const EMAIL_MATCHER =
      /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/

    return [
      (text: string) => {
        const match = URL_MATCHER.exec(text)
        return match?.[0]
          ? {
              index: match.index,
              length: match[0].length,
              text: match[0],
              url: match[0],
            }
          : null
      },
      (text: string) => {
        const match = EMAIL_MATCHER.exec(text)
        return match?.[0]
          ? {
              index: match.index,
              length: match[0].length,
              text: match[0],
              url: `mailto:${match[0]}`,
            }
          : null
      },
    ]
  }, [])

  const blockMenuCommands = useMemo<BlockMenuCommand[]>(() => {
    return [
      {
        icon: <Heading1 />,
        title: 'Heading1',
        action: editor => replaceWithNode(editor, () => $createHeadingNode('h1')),
      },
      {
        icon: <Heading2 />,
        title: 'Heading2',
        action: editor => replaceWithNode(editor, () => $createHeadingNode('h2')),
      },
      {
        icon: <Heading3 />,
        title: 'Heading3',
        action: editor => replaceWithNode(editor, () => $createHeadingNode('h3')),
      },
      {
        icon: <BlockQuote />,
        title: 'Quote',
        action: editor => replaceWithNode(editor, () => $createQuoteNode()),
      },
      {
        icon: <Code />,
        title: 'Code',
        action: editor => replaceWithNode(editor, () => $createCodeNode()),
      },
      {
        icon: <OrderedList />,
        title: 'Ordered List',
        action: editor =>
          replaceWithNode(editor, () => $createListNode('number').append($createListItemNode())),
      },
      {
        icon: <BulletList />,
        title: 'Bullet List',
        action: editor =>
          replaceWithNode(editor, () => $createListNode('bullet').append($createListItemNode())),
      },
      {
        icon: <TodoList />,
        title: 'Todo List',
        action: editor =>
          replaceWithNode(editor, () => $createListNode('check').append($createListItemNode())),
      },
      {
        icon: <Image />,
        title: 'Image ',
        action: editor => {
          onImageInputChange.current = e => {
            const { files } = e.target
            if (files?.length) {
              replaceWithNode(editor, () =>
                $createParagraphNode().append(
                  ...Array.from(files).map(file => $createImageNode({ file }))
                )
              )
            }
          }
          imageInput.current?.click()
        },
      },
      {
        icon: <Table />,
        title: 'Table',
        action: editor => replaceWithNode(editor, () => $createTableNodeWithDimensions(3, 3, true)),
      },
      {
        icon: <Math />,
        title: 'Equation',
        action: editor =>
          replaceWithNode(editor, () =>
            $createParagraphNode().append($createEquationNode('', true))
          ),
      },
      {
        icon: <Math />,
        title: 'Equation Block',
        action: editor =>
          replaceWithNode(editor, () =>
            $createParagraphNode().append($createEquationNode('', false))
          ),
      },
    ]
  }, [])

  const transformers = useMemo<
    ComponentProps<typeof MarkdownShortcutPlugin>['transformers']
  >(() => {
    const exportEquation = (node: LexicalNode) => {
      if (!$isEquationNode(node)) {
        return null
      }
      const inline = node.getInline()
      const equation = node.getEquation()
      if (inline) {
        return `$${equation}$`
      } else {
        return `$$${equation}$$`
      }
    }

    return [
      CHECK_LIST,
      ...TRANSFORMERS.filter(i => i !== CODE_),
      CODE,
      {
        dependencies: [EquationNode],
        export: exportEquation,
        importRegExp: /\$(\S+)\$/,
        regExp: /\$(.+)\$$/,
        replace: (textNode, match) => {
          textNode.replace($createEquationNode(match[1], true))
        },
        trigger: '$',
        type: 'text-match',
      },
      {
        dependencies: [EquationNode],
        export: exportEquation,
        regExp: /^\$\$\s/,
        replace: parentNode => {
          parentNode.replace($createParagraphNode().append($createEquationNode('', false)))
        },
        type: 'element',
      },
    ]
  }, [])

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <_ImageInput
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageInputChange}
        ref={imageInput}
      />

      <_Scroller ref={scroller}>
        <_EditorContainer className={props.className} ref={container}>
          <RichTextPlugin
            contentEditable={<ContentEditable className="lexical-editor" testid="lexical-editor" />}
            placeholder={<Placeholder>Input something...</Placeholder>}
          />
          {props.onChange && <OnChangePlugin onChange={props.onChange} />}
          <AutoLinkPlugin matchers={autoLinkMatchers} />
          <LinkPlugin />
          <CodeHighlightPlugin />
          <MarkdownShortcutPlugin transformers={transformers} />
          <ListPlugin />
          <CheckListPlugin />
          <HistoryPlugin />

          <EditablePlugin scroller={scroller} container={container} editable={!props.readOnly} />
          <TrailingParagraphPlugin />
          <BlockMenuPlugin commands={blockMenuCommands} />
          <ImagePlugin />
          <TablePlugin />
          <TableActionMenuPlugin />
          <FloatingToolbarPlugin>
            <ToggleFormatButton type="bold" />
            <ToggleFormatButton type="italic" />
            <ToggleFormatButton type="underline" />
            <ToggleFormatButton type="strikethrough" />
            <ToggleFormatButton type="code" />
            <ToggleLinkButton />
            <ToggleBlockButton type="h1" />
            <ToggleBlockButton type="h2" />
            <ToggleBlockButton type="h3" />
            <ToggleBlockButton type="quote" />
            <ToggleBlockButton type="ol" />
            <ToggleBlockButton type="ul" />

            <FloatingToolbarPlugin.Extras>
              <ToggleLinkButton.Extra />
            </FloatingToolbarPlugin.Extras>
          </FloatingToolbarPlugin>
        </_EditorContainer>
      </_Scroller>
    </LexicalComposer>
  )
}

const OnChangePlugin = ({ onChange }: { onChange: (state: EditorState) => void }) => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState)
    })
  }, [editor])

  return null
}

const EditablePlugin = (props: {
  scroller: RefObject<HTMLDivElement>
  container: RefObject<HTMLDivElement>
  editable?: boolean
}) => {
  const [editor] = useLexicalComposerContext()
  const input = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const isMobile = 'ontouchstart' in window

    editor.setEditable(false)

    if (!props.editable) {
      return
    }

    const scroller = props.scroller.current
    const container = props.container.current
    const dom = editor.getRootElement()

    if (!scroller || !container || !dom) {
      return
    }

    if (isMobile) {
      dom.style.pointerEvents = 'pan-x pan-y'
    }

    let editorHasFocus = false

    const onFocus = () => {
      editorHasFocus = true
      editor.setEditable(true)
      if (isMobile) {
        dom.style.pointerEvents = 'all'
      }
    }

    const onBlur = () => {
      editorHasFocus = false
      if (isMobile) {
        editor.setEditable(false)
        dom.style.pointerEvents = 'pan-x pan-y'
      }
    }

    const onClick = (e: MouseEvent) => {
      if (editorHasFocus) {
        return
      }

      if (isMobile) {
        input.current?.focus({ preventScroll: true })
      }

      editor.setEditable(true)
      const range = getMouseEventCaretRange(e)!
      const selection = window.getSelection()
      selection?.removeAllRanges()
      selection?.addRange(range)
      editor.dispatchCommand(CLICK_COMMAND, e)

      setTimeout(() => {
        if (editor.getEditorState().isEmpty()) {
          dom.focus()
        } else {
          editor.focus()
        }
        if (isMobile) {
          const rect =
            range.startOffset === 0 && range.endOffset === 0
              ? (range.startContainer as Element)?.getBoundingClientRect()
              : range.getBoundingClientRect()
          if (!rect) {
            return
          }

          const div = document.createElement('div')
          div.style.width = rect.width + 'px'
          div.style.height = rect.height + 'px'
          div.style.position = 'absolute'
          div.style.left = rect.x + scroller.scrollLeft + 'px'
          div.style.top = rect.y + scroller.scrollTop + 'px'
          container.appendChild(div)

          setTimeout(() => {
            div.scrollIntoView({ block: 'nearest', behavior: 'smooth' })

            setTimeout(() => {
              div.remove()
            }, 1000)
          }, 500)
        }
      })
    }

    dom.addEventListener('focus', onFocus)
    dom.addEventListener('blur', onBlur)
    scroller.addEventListener('click', onClick)

    return () => {
      dom.removeEventListener('focus', onFocus)
      dom.removeEventListener('blur', onBlur)
      scroller.removeEventListener('click', onClick)
    }
  }, [editor, props.editable])

  return <_FakeInput ref={input} />
}

const _Scroller = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;
`

const _EditorContainer = styled.div`
  --background-color: #ffffff;
  --app-bar-color: #f2f2f7;
  --color: #000000;

  @media (prefers-color-scheme: dark) {
    --background-color: #000000;
    --app-bar-color: #1c1c1e;
    --color: #ffffff;
  }

  position: relative;
  background-color: var(--background-color);
  color: var(--color);
  font-family: -apple-system, system-ui, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif,
    BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial;
  font-size: 15px;
  line-height: 1.6;
  margin: 16px;
  /* Make sure container height fills parent for a bouncing effect
  when the content height is not enough */
  min-height: calc(100% - 34px);

  > .lexical-editor {
    outline: none;
  }
`

const _ImageInput = styled.input`
  position: fixed;
  left: -1000px;
  top: 0;
`

const Placeholder = styled.div`
  font-size: 14px;
  color: #999;
  overflow: hidden;
  position: absolute;
  text-overflow: ellipsis;
  left: 0;
  top: 0;
  user-select: none;
  white-space: nowrap;
  display: inline-block;
  pointer-events: none;
`

const _FakeInput = styled.input`
  transform: translate(-9999px, -9999px);
`

function getMouseEventCaretRange(e: MouseEvent) {
  const { clientX: x, clientY: y } = e

  if (typeof (e as any).rangeParent != 'undefined') {
    const range = document.createRange()
    range.setStart((e as any).rangeParent, (e as any).rangeOffset)
    range.collapse(true)
    return range
  }

  // Try the standards-based way next
  else if ((document as any).caretPositionFromPoint) {
    var pos = (document as any).caretPositionFromPoint(x, y)
    const range = document.createRange()
    range.setStart(pos.offsetNode, pos.offset)
    range.collapse(true)
    return range
  }

  // Next, the WebKit way
  else {
    return document.caretRangeFromPoint(x, y)
  }
}

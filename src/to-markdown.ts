/**
 * Author        : Ahmong
 * Date          : 2022-05-01 19:23
 * LastEditTime  : 2022-05-06 18:10
 * LastEditors   : Ahmong
 * ---
 * Description   : Ouput markdown string from mdast.
 * ---
 * FilePath      : /mk-plugins/mdast-util-wiki-link/src/to-markdown.ts
**/
import safe from 'mdast-util-to-markdown/lib/util/safe'

function toMarkdown (opts: {aliasDivider?: string} = {}): any {
  const aliasDivider = opts['aliasDivider'] || ':'

  const unsafe = [
    {
      character: '[',
      inConstruct: ['phrasing', 'label', 'reference']
    },
    {
      character: ']',
      inConstruct: ['label', 'reference']
    }
  ]

  function handler (node, _, context) {
    const exit = context.enter('wikiLink')

    const nodeTarget = safe(context, node.target, { before: '[', after: ']' })
    const nodeAlias = safe(context, node.alias, { before: '[', after: ']' })

    let value
    if (nodeAlias !== nodeTarget) {
      value = `[[${nodeTarget}${aliasDivider}${nodeAlias}]]`
    } else {
      value = `[[${nodeTarget}]]`
    }

    exit()

    return value
  }

  return {
    unsafe: unsafe,
    handlers: {
      wikiLink: handler
    }
  }
}

export { toMarkdown }

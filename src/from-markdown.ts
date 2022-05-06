/**
 * Author        : Ahmong
 * Date          : 2022-05-01 19:23
 * LastEditTime  : 2022-05-06 18:12
 * LastEditors   : Ahmong
 * ---
 * Description   : Read markdown string into mdast.
 * ---
 * FilePath      : /mk-plugins/mdast-util-wiki-link/src/from-markdown.ts
**/
function fromMarkdown () {
  /*
  const permalinks = opts.permalinks || []
  const defaultPageResolver = (name) => [name.replace(/ /g, '_').toLowerCase()]
  const pageResolver = opts.pageResolver || defaultPageResolver
  const newClassName = opts.newClassName || 'new'
  const wikiLinkClassName = opts.wikiLinkClassName || 'internal'
  const defaultHrefTemplate = (permalink) => `#/page/${permalink}`
  const hrefTemplate = opts.hrefTemplate || defaultHrefTemplate
  */

  function enterWikiLink (this: any, token: any) {
    this.enter(
      {
        type: 'wikiLink',
        alias: null,
        target: '',
        children: [],
      },
      token
    )
  }

  function top (stack: any) {
    return stack[stack.length - 1]
  }

  function exitWikiLinkAlias (this: any, token: any) {
    const alias = this.sliceSerialize(token)
    const current = top(this.stack)
    current.alias = alias
  }

  function exitWikiLinkTarget (this: any, token: any) {
    const target = this.sliceSerialize(token)
    const current = top(this.stack)
    current.target = target
  }

  function exitWikiLink (this: any, token: any) {
    const wikiLink = this.exit(token)

    let displayName = wikiLink.target
    if (wikiLink.alias) {
      displayName = wikiLink.alias
    }

    wikiLink.children = [{
      type: 'text',
      value: displayName
    }]
  }

  return {
    enter: {
      wikiLink: enterWikiLink
    },
    exit: {
      wikiLinkTarget: exitWikiLinkTarget,
      wikiLinkAlias: exitWikiLinkAlias,
      wikiLink: exitWikiLink
    }
  }
}

export { fromMarkdown }

// Type for a single CMS content block
export interface CmsBlock {
  type: string
  data: Record<string, any>
}

// Find a block by type from a content array
export function findBlock<T = Record<string, any>>(
  blocks: CmsBlock[],
  type: string
): T | null {
  const block = blocks.find(b => b.type === type)
  return block ? (block.data as T) : null
}

// Find all blocks of a type
export function findBlocks<T = Record<string, any>>(
  blocks: CmsBlock[],
  type: string
): T[] {
  return blocks.filter(b => b.type === type).map(b => b.data as T)
}

// icon_features items come as { [uuid]: {icon,title,description,link} }
// Convert to array
export function iconFeaturesToArray(items: Record<string, any> | any[] | null | undefined): {icon:string,title:string,description:string,link?:any}[] {
  if (!items) return []
  if (Array.isArray(items)) return items
  return Object.values(items)
}

// Resolve a CTA link href
export function ctaHref(cta: {type?:string, url?:string, anchor?:string, page_id?:string} | null | undefined): string {
  if (!cta) return '#'
  if (cta.type === 'anchor') return cta.anchor || '#'
  return cta.url || '#'
}

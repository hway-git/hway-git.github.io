import { fromUrl, parseDomain, ParseResultType } from 'parse-domain'

const noRouterExtensions = ['.css', '.csv', '.gif', '.ico', '.jpg', '.js', '.json', '.opml', '.png', '.svg', '.txt', '.xml']

export function getDomain(url: string) {
    const domain = fromUrl(url)
    if (typeof domain === 'symbol')
        return url
    else
        return domain
}
export function getMainDomain(url: string, useIcann?: boolean) {
    const hostname = getDomain(url)
    const parseResult = parseDomain(hostname)
    if (parseResult.type === ParseResultType.Listed) {
        const { domain, topLevelDomains } = useIcann ? parseResult.icann : parseResult
        return `${domain}.${topLevelDomains.join('.')}`
    }
    else {
        return hostname
    }
}

export function getGhUsername(url?: string) {
    if (!url)
        return ''
    const regex = /github\.com\/([a-zA-Z0-9-]+)(?:\/[^/]+)?(\/?)$/
    return url.match(regex)?.[1] ?? ''
}

export function isExtLink(url?: string) {
    if (!url)
        return false

    return url.includes(':')
        || noRouterExtensions.some(ext => url.endsWith(ext))
}

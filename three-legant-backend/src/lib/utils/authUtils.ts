import type { AuthConfig as AuthConfigCore } from '@auth/core'
import { Auth } from '@auth/core'
import type { AdapterUser } from '@auth/core/adapters'
import type { JWT } from '@auth/core/jwt'
import type { Session } from '@auth/core/types'
import type { Context } from 'hono'
import { env, getRuntimeKey } from 'hono/adapter'
import { setEnvDefaults as coreSetEnvDefaults } from '@auth/core'


export type AuthEnv = {
    AUTH_URL?: string
    AUTH_SECRET: string
    AUTH_REDIRECT_PROXY_URL?: string
    [key: string]: string | undefined
}

export type AuthUser = {
    session: Session
    token?: JWT
    user?: AdapterUser
}

export interface AuthConfig extends Omit<AuthConfigCore, 'raw'> { }


export function setEnvDefaults(env: AuthEnv, config: AuthConfig) {
    config.secret ??= env.AUTH_SECRET
    coreSetEnvDefaults(env, config)
}

async function cloneRequest(input: URL | string, request: Request, headers?: Headers) {
    if (getRuntimeKey() === 'bun') {
        return new Request(input, {
            method: request.method,
            headers: headers ?? new Headers(request.headers),
            body:
                request.method === 'GET' || request.method === 'HEAD' ? undefined : await request.blob(),
            referrer: 'referrer' in request ? (request.referrer as string) : undefined,
            // deno-lint-ignore no-explicit-any
            referrerPolicy: request.referrerPolicy as any,
            mode: request.mode,
            credentials: request.credentials,
            // @ts-ignore: TS2353
            cache: request.cache,
            redirect: request.redirect,
            integrity: request.integrity,
            keepalive: request.keepalive,
            signal: request.signal,
        })
    }
    return new Request(input, request)
}

export async function reqWithEnvUrl(req: Request, authUrl?: string) {
    if (authUrl) {
        const reqUrlObj = new URL(req.url)
        const authUrlObj = new URL(authUrl)
        const props = ['hostname', 'protocol', 'port', 'password', 'username'] as const
        props.forEach((prop) => (reqUrlObj[prop] = authUrlObj[prop]))
        return cloneRequest(reqUrlObj.href, req)
    } else {
        const url = new URL(req.url)
        const headers = new Headers(req.headers)
        const proto = headers.get('x-forwarded-proto')
        const host = headers.get('x-forwarded-host') ?? headers.get('host')
        if (proto != null) url.protocol = proto.endsWith(':') ? proto : proto + ':'
        if (host != null) {
            url.host = host
            const portMatch = host.match(/:(\d+)$/)
            if (portMatch) url.port = portMatch[1]
            else url.port = ''
            headers.delete('x-forwarded-host')
            headers.delete('Host')
            headers.set('Host', host)
        }
        return cloneRequest(url.href, req, headers)
    }
}

export async function getAuthUser(c: Context): Promise<AuthUser | null> {
    const config = c.get('authConfig')
    const ctxEnv = env(c) as AuthEnv
    setEnvDefaults(ctxEnv, config)
    const authReq = await reqWithEnvUrl(c.req.raw, ctxEnv.AUTH_URL)
    const origin = new URL(authReq.url).origin
    const request = new Request(`${origin}${config.basePath}/session`, {
        headers: { cookie: (c.req.header('authorization') || c.req.header('cookie')) ?? '' },
    })

    let authUser: AuthUser = {} as AuthUser

    const response = (await Auth(request, {
        ...config,
        callbacks: {
            ...config.callbacks,
            async session(...args) {
                authUser = args[0]
                const session = (await config.callbacks?.session?.(...args)) ?? args[0].session
                const user = args[0].user ?? args[0].token
                return { user, ...session } satisfies Session
            },
        },
    })) as Response

    const session = (await response.json()) as Session | null

    return session && session.user ? authUser : null
}

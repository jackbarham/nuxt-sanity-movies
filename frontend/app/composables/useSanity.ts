import { createClient } from '@sanity/client'

// Simple groq template literal tag (just returns the string)
export const groq = (strings: TemplateStringsArray, ...values: unknown[]) => {
  return strings.reduce((acc, str, i) => acc + str + (values[i] ?? ''), '')
}

export function useSanityClient() {
  const config = useRuntimeConfig()

  const client = createClient({
    projectId: config.public.sanity.projectId,
    dataset: config.public.sanity.dataset,
    apiVersion: config.public.sanity.apiVersion,
    useCdn: true,
  })

  return client
}

export async function useSanityQuery<T = unknown>(query: string, params: Record<string, string | number | boolean> = {}) {
  const client = useSanityClient()

  const { data, error } = await useAsyncData(
    `sanity-${query}-${JSON.stringify(params)}`,
    () => client.fetch<T>(query, params)
  )

  return { data, error }
}

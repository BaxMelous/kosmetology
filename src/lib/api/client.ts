const DEFAULT_API_BASE_URL = "https://dev-mc-backend.citymed12.ru";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.trim() || DEFAULT_API_BASE_URL;
const DEFAULT_API_TIMEOUT_MS = 1500;

type FetchApiOptions = RequestInit & {
  timeoutMs?: number;
};

function buildUrl(endpoint: string) {
  return new URL(endpoint, API_BASE_URL).toString();
}

export async function fetchApi<T>(endpoint: string, options: FetchApiOptions = {}): Promise<T | null> {
  const url = buildUrl(endpoint);
  const { timeoutMs = DEFAULT_API_TIMEOUT_MS, ...requestOptions } = options;
  const timeoutSignal = AbortSignal.timeout(timeoutMs);
  const signal = requestOptions.signal
    ? AbortSignal.any([requestOptions.signal, timeoutSignal])
    : timeoutSignal;

  try {
    const response = await fetch(url, {
      ...requestOptions,
      signal,
      headers: {
        Accept: "application/json",
        ...(requestOptions.body ? { "Content-Type": "application/json" } : {}),
        ...requestOptions.headers,
      },
      next: requestOptions.method && requestOptions.method !== "GET" ? { revalidate: 3600 } : { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error(`API request failed for ${endpoint}: ${response.status} ${response.statusText}`);
      return null;
    }

    return (await response.json()) as T;
  } catch (error) {
    if (
      error instanceof Error &&
      (error.name === "TimeoutError" || error.name === "AbortError")
    ) {
      return null;
    }

    console.error(`API request failed for ${endpoint}`, error);
    return null;
  }
}

export function buildFileUrl(fileId: string | null | undefined) {
  if (!fileId) {
    return null;
  }

  return buildRemoteFileUrl(fileId);
}

export function buildRemoteFileUrl(fileId: string) {
  return new URL(`/files/${fileId}`, API_BASE_URL).toString();
}

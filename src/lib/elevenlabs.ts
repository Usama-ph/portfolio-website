/**
 * Extract an Eleven Labs agent ID from a shareable URL or raw ID.
 * Supports query params (agent_id / agent-id / agentId) and path/query
 * segments matching agent_….
 */
export function parseElevenLabsAgentId(
  value: string | undefined | null,
): string | null {
  if (!value) return null;

  const trimmed = value.trim();
  if (!trimmed) return null;

  if (/^agent_[a-zA-Z0-9]+$/.test(trimmed)) {
    return trimmed;
  }

  try {
    const url = new URL(trimmed);
    const fromQuery =
      url.searchParams.get("agent_id") ??
      url.searchParams.get("agent-id") ??
      url.searchParams.get("agentId");
    if (fromQuery && /^agent_[a-zA-Z0-9]+$/.test(fromQuery)) {
      return fromQuery;
    }

    const fromPath = url.pathname.match(/agent_[a-zA-Z0-9]+/);
    if (fromPath) return fromPath[0];
  } catch {
    // Not a valid URL — fall through to whole-string match
  }

  const match = trimmed.match(/agent_[a-zA-Z0-9]+/);
  return match ? match[0] : null;
}

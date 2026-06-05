const AVATAR_KEY_PREFIX = "finorise_avatar_";

export function getStoredAvatar(userId: string): string | null {
  try {
    return localStorage.getItem(`${AVATAR_KEY_PREFIX}${userId}`);
  } catch {
    return null;
  }
}

export function setStoredAvatar(userId: string, dataUrl: string | null) {
  try {
    const key = `${AVATAR_KEY_PREFIX}${userId}`;
    if (dataUrl) localStorage.setItem(key, dataUrl);
    else localStorage.removeItem(key);
  } catch {
    /* ignore quota errors */
  }
}

export function resolveAvatarUrl(userId: string, serverUrl?: string | null): string | null {
  return serverUrl ?? getStoredAvatar(userId);
}

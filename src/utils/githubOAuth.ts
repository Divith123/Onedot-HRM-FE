/**
 * GitHub OAuth utility functions
 * Handles GitHub OAuth flow for authentication
 */

const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
const GITHUB_REDIRECT_URI = process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI;

/**
 * Initiates GitHub OAuth flow by redirecting to GitHub authorization page
 */
export function initiateGitHubLogin() {
  if (!GITHUB_CLIENT_ID) {
    console.error('GitHub Client ID is not configured');
    throw new Error('GitHub OAuth is not configured');
  }

  if (!GITHUB_REDIRECT_URI) {
    console.error('GitHub Redirect URI is not configured');
    throw new Error('GitHub OAuth redirect URI is not configured');
  }

  // Build GitHub OAuth URL
  const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
  githubAuthUrl.searchParams.append('client_id', GITHUB_CLIENT_ID);
  githubAuthUrl.searchParams.append('redirect_uri', GITHUB_REDIRECT_URI);
  githubAuthUrl.searchParams.append('scope', 'user:email');

  // Redirect to GitHub
  window.location.href = githubAuthUrl.toString();
}

/**
 * Extracts authorization code from URL after GitHub redirect
 */
export function getGitHubCodeFromUrl(): string | null {
  if (typeof window === 'undefined') return null;

  const params = new URLSearchParams(window.location.search);
  return params.get('code');
}

/**
 * Extracts error from URL if GitHub authorization failed
 */
export function getGitHubErrorFromUrl(): string | null {
  if (typeof window === 'undefined') return null;

  const params = new URLSearchParams(window.location.search);
  return params.get('error');
}

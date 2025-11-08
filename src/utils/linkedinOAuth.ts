/**
 * LinkedIn OAuth utility functions
 * Handles LinkedIn OAuth flow for authentication
 */

const LINKEDIN_CLIENT_ID = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID;
const LINKEDIN_REDIRECT_URI = process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI;

/**
 * Initiates LinkedIn OAuth flow by redirecting to LinkedIn authorization page
 */
export function initiateLinkedInLogin() {
  if (!LINKEDIN_CLIENT_ID) {
    console.error('LinkedIn Client ID is not configured');
    throw new Error('LinkedIn OAuth is not configured');
  }

  if (!LINKEDIN_REDIRECT_URI) {
    console.error('LinkedIn Redirect URI is not configured');
    throw new Error('LinkedIn OAuth redirect URI is not configured');
  }

  // Generate random state for CSRF protection
  const state = Math.random().toString(36).substring(7);
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('linkedin_oauth_state', state);
  }

  // Build LinkedIn OAuth URL with OpenID Connect scopes
  const linkedinAuthUrl = new URL('https://www.linkedin.com/oauth/v2/authorization');
  linkedinAuthUrl.searchParams.append('response_type', 'code');
  linkedinAuthUrl.searchParams.append('client_id', LINKEDIN_CLIENT_ID);
  linkedinAuthUrl.searchParams.append('redirect_uri', LINKEDIN_REDIRECT_URI);
  linkedinAuthUrl.searchParams.append('state', state);
  linkedinAuthUrl.searchParams.append('scope', 'openid profile email');

  // Redirect to LinkedIn
  window.location.href = linkedinAuthUrl.toString();
}

/**
 * Extracts authorization code from URL after LinkedIn redirect
 */
export function getLinkedInCodeFromUrl(): string | null {
  if (typeof window === 'undefined') return null;

  const params = new URLSearchParams(window.location.search);
  return params.get('code');
}

/**
 * Extracts and validates state from URL
 */
export function validateLinkedInState(): boolean {
  if (typeof window === 'undefined') return false;

  const params = new URLSearchParams(window.location.search);
  const state = params.get('state');
  const storedState = sessionStorage.getItem('linkedin_oauth_state');

  if (state && storedState && state === storedState) {
    sessionStorage.removeItem('linkedin_oauth_state');
    return true;
  }

  return false;
}

/**
 * Extracts error from URL if LinkedIn authorization failed
 */
export function getLinkedInErrorFromUrl(): string | null {
  if (typeof window === 'undefined') return null;

  const params = new URLSearchParams(window.location.search);
  return params.get('error');
}

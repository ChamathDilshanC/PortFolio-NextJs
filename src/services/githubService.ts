export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  has_pages?: boolean;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  created_at: string;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
}

export interface GitHubRepoLanguages {
  [key: string]: number;
}

const GITHUB_API_BASE = "https://api.github.com";

/**
 * Fetch all public repositories for a GitHub user
 */
export async function fetchGitHubRepos(
  username: string,
  token?: string
): Promise<GitHubRepo[]> {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
    };

    // Add token if provided (increases rate limit)
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(
      `${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=100`,
      {
        headers,
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos: GitHubRepo[] = await response.json();

    // Filter out forks and archived repos (optional)
    return repos.filter((repo) => !repo.fork && !repo.archived);
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return [];
  }
}

/**
 * Fetch languages used in a specific repository
 */
export async function fetchRepoLanguages(
  owner: string,
  repo: string,
  token?: string
): Promise<GitHubRepoLanguages> {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${owner}/${repo}/languages`,
      {
        headers,
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching repo languages:", error);
    return {};
  }
}

/**
 * Format the last updated time in a human-readable format
 */
export function formatLastUpdated(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  if (diffInSeconds < 2592000)
    return `${Math.floor(diffInSeconds / 604800)}w ago`;

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Get the top languages from the languages object
 */
export function getTopLanguages(
  languages: GitHubRepoLanguages,
  limit: number = 3
): string[] {
  const sorted = Object.entries(languages).sort(([, a], [, b]) => b - a);
  return sorted.slice(0, limit).map(([lang]) => lang);
}

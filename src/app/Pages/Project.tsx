"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Card as ShadCard,
} from "@/components/ui/card";
import { FollowerPointerCard } from "@/components/ui/following-pointer";
import { Marquee } from "@/components/ui/marquee";
import {
  fetchGitHubRepos,
  formatLastUpdated,
  GitHubRepo,
} from "@/services/githubService";
import {
  BookOpen,
  Clock,
  Code2,
  ExternalLink,
  GitFork,
  GraduationCap,
  Lightbulb,
  Star,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const BLUR_FADE_DELAY = 0.04;
const GITHUB_USERNAME = "ChamathDilshanC";

// Project categories based on topics
const PROJECT_CATEGORIES = {
  project: {
    icon: Lightbulb,
    label: "Projects",
    color: "bg-gradient-to-br from-green-500 to-emerald-600",
    lightColor: "bg-green-50 dark:bg-green-950/30",
    textColor: "text-green-600 dark:text-green-400",
  },
  assignment: {
    icon: GraduationCap,
    label: "Assignments",
    color: "bg-gradient-to-br from-blue-500 to-blue-600",
    lightColor: "bg-blue-50 dark:bg-blue-950/30",
    textColor: "text-blue-600 dark:text-blue-400",
  },
  tutorial: {
    icon: BookOpen,
    label: "Tutorials",
    color: "bg-gradient-to-br from-purple-500 to-violet-600",
    lightColor: "bg-purple-50 dark:bg-purple-950/30",
    textColor: "text-purple-600 dark:text-purple-400",
  },
  template: {
    icon: Code2,
    label: "Templates",
    color: "bg-gradient-to-br from-orange-500 to-amber-600",
    lightColor: "bg-orange-50 dark:bg-orange-950/30",
    textColor: "text-orange-600 dark:text-orange-400",
  },
};

// Language colors for visual consistency
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-400",
  Python: "bg-green-600",
  Java: "bg-red-600",
  "C++": "bg-pink-600",
  C: "bg-gray-600",
  Go: "bg-cyan-500",
  Rust: "bg-orange-600",
  Ruby: "bg-red-500",
  PHP: "bg-purple-500",
};

// Determine category from repo name, description, and topics
function getCategoryFromRepo(
  repo: GitHubRepo
): keyof typeof PROJECT_CATEGORIES {
  const name = repo.name.toLowerCase();
  const description = (repo.description || "").toLowerCase();
  const topics = (repo.topics || []).map((t) => t.toLowerCase());

  // Check for assignment patterns in name
  const assignmentPatterns = [
    /assignment[-_]?\d+/i,
    /hw[-_]?\d+/i,
    /^its[-_]?\d+/i,
    /coursework/i,
    /exercise[-_]?\d+/i,
    /lab[-_]?\d+/i,
    /task[-_]?\d+/i,
  ];

  const isAssignment =
    assignmentPatterns.some((pattern) => pattern.test(repo.name)) ||
    name.includes("assignment") ||
    name.includes("homework") ||
    description.includes("assignment") ||
    description.includes("homework") ||
    topics.some(
      (t) =>
        t.includes("assignment") ||
        t.includes("homework") ||
        t.includes("coursework")
    );

  if (isAssignment) return "assignment";

  if (
    topics.some(
      (t) =>
        t.includes("tutorial") || t.includes("guide") || t.includes("learning")
    ) ||
    name.includes("tutorial") ||
    description.includes("tutorial")
  ) {
    return "tutorial";
  }

  if (
    topics.some(
      (t) =>
        t.includes("template") ||
        t.includes("boilerplate") ||
        t.includes("starter")
    ) ||
    name.includes("template") ||
    name.includes("boilerplate")
  ) {
    return "template";
  }

  return "project";
}

// Compute a Live Site URL if available
function getLiveSiteUrl(repo: GitHubRepo): string | null {
  // Prefer explicit homepage if set and looks like a valid http(s) URL
  const homepage = (repo.homepage || "").trim();
  if (homepage && /^(https?:)?\/\//i.test(homepage)) {
    return homepage.startsWith("http") ? homepage : `https:${homepage}`;
  }

  // Fallback to GitHub Pages if has_pages or topic indicates pages
  const hasPages =
    repo.has_pages ||
    (repo.topics || []).some((t) => t.toLowerCase() === "github-pages");
  if (hasPages) {
    // If repo name looks like username.github.io, use root; else /repo
    const isUserSite = /github\.io$/i.test(repo.name);
    // We don't have owner per-repo here, derive from full_name if available
    const owner = repo.full_name?.split("/")?.[0] || "";
    if (owner) {
      const base = `https://${owner}.github.io`;
      return isUserSite ? `${base}` : `${base}/${repo.name}`;
    }
  }

  return null;
}

export default function ProjectPage() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [languageFilter, setLanguageFilter] = useState<"all" | string>("all");
  const [categoryFilter, setCategoryFilter] = useState<"all" | string>("all");
  const [viewMode, setViewMode] = useState<"expandable" | "grid">("expandable");
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function loadRepos() {
      setLoading(true);
      const data = await fetchGitHubRepos(GITHUB_USERNAME);
      setRepos(data);
      setLoading(false);
    }
    loadRepos();
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const languages = Array.from(
    new Set(repos.map((repo) => repo.language).filter(Boolean))
  ) as string[];

  let filteredRepos = repos;

  if (languageFilter !== "all") {
    filteredRepos = filteredRepos.filter(
      (repo) => repo.language === languageFilter
    );
  }

  if (categoryFilter !== "all") {
    filteredRepos = filteredRepos.filter((repo) => {
      const category = getCategoryFromRepo(repo);
      return category === categoryFilter;
    });
  }

  // Filter repos with "showcase" topic for showcase view
  const showcaseRepos = repos.filter((repo) =>
    (repo.topics || []).some((topic) => topic.toLowerCase() === "showcase")
  );
  const showcaseCards = showcaseRepos;

  const reposByCategory = filteredRepos.reduce((acc, repo) => {
    const category = getCategoryFromRepo(repo);
    if (!acc[category]) acc[category] = [];
    acc[category].push(repo);
    return acc;
  }, {} as Record<string, GitHubRepo[]>);

  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-16 py-16 px-4 sm:px-6">
      {/* Header */}
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
              My Projects
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Check out my latest work
            </h2>
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-3xl mx-auto">
              I&apos;ve worked on a variety of projects, from simple websites to
              complex web applications. Here are a few of my favorites.
            </p>
            <p className="text-muted-foreground/60 text-xs sm:text-sm mt-3">
              These projects are automatically fetched from{" "}
              <Link
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-muted-foreground transition-colors underline decoration-dotted underline-offset-2"
              >
                GitHub ✨
              </Link>
            </p>
          </div>
        </div>
      </BlurFade>

      {/* View Mode Toggle */}
      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <div className="flex justify-center gap-3">
          <Badge
            variant={viewMode === "expandable" ? "default" : "outline"}
            className="cursor-pointer transition-all hover:scale-105 px-4 py-2"
            onClick={() => setViewMode("expandable")}
          >
            Showcase
          </Badge>
          <Badge
            variant={viewMode === "grid" ? "default" : "outline"}
            className="cursor-pointer transition-all hover:scale-105 px-4 py-2"
            onClick={() => setViewMode("grid")}
          >
            All Projects
          </Badge>
        </div>
      </BlurFade>

      {/* Filter Buttons - Only show in grid view */}
      {viewMode === "grid" && (
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <div className="space-y-8">
            {/* Category Filters */}
            <div className="text-center">
              <h3 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wider">
                Category
              </h3>
              <div className="flex flex-wrap gap-2.5 justify-center">
                <Badge
                  variant={categoryFilter === "all" ? "default" : "outline"}
                  className={`cursor-pointer transition-all hover:scale-105 hover:shadow-sm px-3.5 py-1.5 ${
                    categoryFilter === "all" ? "" : "hover:bg-accent"
                  }`}
                  onClick={() => setCategoryFilter("all")}
                >
                  All ({repos.length})
                </Badge>
                {Object.entries(PROJECT_CATEGORIES).map(
                  ([key, { icon: Icon, label }]) => {
                    const count = repos.filter(
                      (r) => getCategoryFromRepo(r) === key
                    ).length;
                    if (count === 0) return null;
                    return (
                      <Badge
                        key={key}
                        variant={categoryFilter === key ? "default" : "outline"}
                        className={`cursor-pointer transition-all hover:scale-105 hover:shadow-sm px-3.5 py-1.5 ${
                          categoryFilter === key ? "" : "hover:bg-accent"
                        }`}
                        onClick={() => setCategoryFilter(key)}
                      >
                        <Icon className="h-3.5 w-3.5 mr-1.5" />
                        {label} ({count})
                      </Badge>
                    );
                  }
                )}
              </div>
            </div>

            {/* Language Filters */}
            <div className="text-center">
              <h3 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wider">
                Language
              </h3>
              <div className="flex flex-wrap gap-2.5 justify-center">
                <Badge
                  variant={languageFilter === "all" ? "default" : "outline"}
                  className={`cursor-pointer transition-all hover:scale-105 hover:shadow-sm px-3.5 py-1.5 ${
                    languageFilter === "all" ? "" : "hover:bg-accent"
                  }`}
                  onClick={() => setLanguageFilter("all")}
                >
                  All Languages
                </Badge>
                {languages.map((lang) => (
                  <Badge
                    key={lang}
                    variant={languageFilter === lang ? "default" : "outline"}
                    className={`cursor-pointer transition-all hover:scale-105 hover:shadow-sm px-3.5 py-1.5 ${
                      languageFilter === lang ? "" : "hover:bg-accent"
                    }`}
                    onClick={() => setLanguageFilter(lang)}
                  >
                    <Code2 className="h-3.5 w-3.5 mr-1.5" />
                    {lang} ({repos.filter((r) => r.language === lang).length})
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </BlurFade>
      )}

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-[1200px] mx-auto">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <BlurFade key={i} delay={BLUR_FADE_DELAY * (i + 4)}>
              <ShadCard className="h-full animate-pulse border-muted">
                <CardHeader className="pb-4 pt-5 px-5">
                  <div className="h-6 bg-muted rounded-md w-3/4 mb-3" />
                  <div className="h-4 bg-muted rounded-md w-full mb-2" />
                  <div className="h-4 bg-muted rounded-md w-5/6" />
                </CardHeader>
                <CardContent className="pb-4 px-5">
                  <div className="h-7 bg-muted rounded-full w-24" />
                </CardContent>
                <CardFooter className="border-t pt-4 pb-4 px-5">
                  <div className="flex justify-between w-full">
                    <div className="h-4 bg-muted rounded w-24" />
                    <div className="h-4 bg-muted rounded w-20" />
                  </div>
                </CardFooter>
              </ShadCard>
            </BlurFade>
          ))}
        </div>
      )}

      {/* Showcase Cards View - Only repos with "showcase" topic */}
      {!loading && viewMode === "expandable" && showcaseCards.length > 0 && (
        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <div className="relative overflow-hidden">
            {/* Left/Right fade edges for marquee */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-14 z-10 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-14 z-10 bg-gradient-to-l from-background to-transparent" />

            <Marquee
              pauseOnHover
              className="[--gap:1.25rem] [--duration:38s] px-1 sm:px-2"
            >
              {showcaseCards.map((repo, idx) => {
                const category = getCategoryFromRepo(repo);
                const {
                  icon: Icon,
                  color,
                  textColor,
                } = PROJECT_CATEGORIES[
                  category as keyof typeof PROJECT_CATEGORIES
                ] || PROJECT_CATEGORIES.project;

                return (
                  <div
                    key={repo.id}
                    className="shrink-0 w-[320px] sm:w-[420px] cursor-pointer"
                    onClick={() => {
                      setSelectedRepo(repo);
                      setIsModalOpen(true);
                    }}
                  >
                    <BlurFade delay={BLUR_FADE_DELAY * (idx + 6)}>
                      <FollowerPointerCard
                        title={
                          <div className="flex items-center gap-2">
                            <Icon className="h-3.5 w-3.5" />
                            <span className="font-semibold">
                              {repo.name.replace(/-/g, " ").replace(/_/g, " ")}
                            </span>
                          </div>
                        }
                      >
                        <ShadCard className="group h-full overflow-hidden border-2 transition-[transform,box-shadow] duration-200 hover:shadow-xl hover:-translate-y-1">
                          <CardHeader className="pb-4 pt-5 px-5">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <CardTitle className="text-xl font-bold mb-2 line-clamp-2 break-words">
                                  {repo.name
                                    .replace(/-/g, " ")
                                    .replace(/_/g, " ")}
                                </CardTitle>
                                <CardDescription className="line-clamp-2 text-sm break-words">
                                  {repo.description ||
                                    "No description available"}
                                </CardDescription>
                              </div>
                              <div
                                className={`${color} rounded-lg p-2.5 shadow-lg shrink-0`}
                              >
                                <Icon className="h-5 w-5 text-white" />
                              </div>
                            </div>
                          </CardHeader>

                          <CardContent className="pb-4 px-5">
                            <div className="flex flex-wrap gap-2">
                              {repo.language && (
                                <Badge
                                  variant="secondary"
                                  className={`${
                                    LANGUAGE_COLORS[repo.language] ||
                                    "bg-gray-500"
                                  } text-white hover:${
                                    LANGUAGE_COLORS[repo.language] ||
                                    "bg-gray-500"
                                  }`}
                                >
                                  <Code2 className="h-3 w-3 mr-1" />
                                  {repo.language}
                                </Badge>
                              )}
                              <Badge variant="secondary" className={textColor}>
                                <Icon className="h-3 w-3 mr-1" />
                                {
                                  PROJECT_CATEGORIES[
                                    category as keyof typeof PROJECT_CATEGORIES
                                  ]?.label
                                }
                              </Badge>
                            </div>
                          </CardContent>

                          <CardFooter className="border-t pt-4 pb-4 px-5">
                            <div className="w-full text-sm text-muted-foreground flex flex-col gap-3">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5">
                                  <Star className="h-4 w-4" />
                                  <span className="font-medium">
                                    {repo.stargazers_count}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <GitFork className="h-4 w-4" />
                                  <span className="font-medium">
                                    {repo.forks_count}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1.5 ml-auto">
                                  <Clock className="h-4 w-4" />
                                  <span className="text-xs">
                                    {formatLastUpdated(repo.updated_at)}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 justify-end">
                                {getLiveSiteUrl(repo) && (
                                  <Link
                                    href={getLiveSiteUrl(repo)!}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <Button
                                      size="sm"
                                      variant="default"
                                      className="h-8 px-3"
                                    >
                                      Live site
                                    </Button>
                                  </Link>
                                )}
                                <Link
                                  href={repo.html_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-8 px-3"
                                  >
                                    <span className="flex items-center gap-1">
                                      View repo
                                      <ExternalLink className="h-3.5 w-3.5" />
                                    </span>
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </CardFooter>
                        </ShadCard>
                      </FollowerPointerCard>
                    </BlurFade>
                  </div>
                );
              })}
            </Marquee>
          </div>
        </BlurFade>
      )}

      {/* No Showcase Projects Message */}
      {!loading && viewMode === "expandable" && showcaseCards.length === 0 && (
        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              No showcase projects found. Add the &quot;showcase&quot; topic to your
              repositories to display them here.
            </p>
          </div>
        </BlurFade>
      )}

      {/* Grid View */}
      {!loading && viewMode === "grid" && filteredRepos.length > 0 && (
        <div className="space-y-16">
          {Object.entries(reposByCategory).map(([category, categoryRepos]) => {
            const {
              icon: Icon,
              label,
              color,
              lightColor,
              textColor,
            } = PROJECT_CATEGORIES[
              category as keyof typeof PROJECT_CATEGORIES
            ] || PROJECT_CATEGORIES.project;

            return (
              <div key={category} className="space-y-8">
                {/* Category Header */}
                <BlurFade delay={BLUR_FADE_DELAY * 6}>
                  <div className="flex items-center justify-center gap-4 mb-10">
                    <div
                      className={`${color} p-3.5 rounded-xl shadow-lg shadow-black/10`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-center">
                      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                        {label}
                      </h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        {categoryRepos.length}{" "}
                        {categoryRepos.length === 1
                          ? "repository"
                          : "repositories"}
                      </p>
                    </div>
                  </div>
                </BlurFade>

                {/* Category Projects Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-[1200px] mx-auto">
                  {categoryRepos.map((repo, index) => {
                    const category = getCategoryFromRepo(repo);
                    const categoryInfo = PROJECT_CATEGORIES[category];
                    const languageColor =
                      LANGUAGE_COLORS[repo.language || ""] || "bg-gray-500";

                    return (
                      <BlurFade
                        key={repo.id}
                        delay={BLUR_FADE_DELAY * (index + 7)}
                      >
                        <div
                          className="cursor-pointer"
                          onClick={() => {
                            setSelectedRepo(repo);
                            setIsModalOpen(true);
                          }}
                        >
                          <FollowerPointerCard
                          title={
                            <div className="flex items-center gap-2">
                              {categoryInfo && (
                                <categoryInfo.icon className="h-3.5 w-3.5" />
                              )}
                              <span className="font-semibold">
                                {repo.name
                                  .replace(/-/g, " ")
                                  .replace(/_/g, " ")}
                              </span>
                            </div>
                          }
                        >
                          <ShadCard className="h-full flex flex-col hover:shadow-xl transition-shadow duration-300 group border hover:border-primary/50 bg-card">
                            <CardHeader className="pb-4 space-y-3 pt-5 px-5">
                              <div className="flex items-start justify-between gap-3">
                                <Link
                                  href={repo.html_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-1 min-w-0"
                                >
                                  <CardTitle className="text-base sm:text-lg font-semibold group-hover:text-primary transition-colors duration-200 line-clamp-2 flex items-start gap-2 break-words">
                                    <span className="break-words">
                                      {repo.name}
                                    </span>
                                    <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0 mt-0.5" />
                                  </CardTitle>
                                </Link>
                                {categoryInfo && (
                                  <div
                                    className={`${categoryInfo.color} p-2 rounded-lg shadow-sm flex-shrink-0 transition-none`}
                                    title={categoryInfo.label}
                                  >
                                    <categoryInfo.icon className="h-4 w-4 text-white" />
                                  </div>
                                )}
                              </div>
                              <CardDescription className="line-clamp-2 text-sm leading-relaxed min-h-[2.5rem] break-words">
                                {repo.description || "No description available"}
                              </CardDescription>
                            </CardHeader>

                            <CardContent className="flex-1 pb-4 px-5">
                              {/* Language Badge */}
                              {repo.language && (
                                <div
                                  className={`${categoryInfo.lightColor} inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${categoryInfo.textColor} transition-none`}
                                >
                                  <span
                                    className={`w-2 h-2 rounded-full ${languageColor} transition-none`}
                                  />
                                  {repo.language}
                                </div>
                              )}
                            </CardContent>

                            <CardFooter className="text-xs text-muted-foreground pt-4 pb-4 px-5 border-t">
                              <div className="w-full flex flex-col gap-3">
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center gap-1.5 hover:text-foreground transition-colors duration-150">
                                    <Star className="h-3.5 w-3.5" />
                                    <span className="font-medium">
                                      {repo.stargazers_count}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1.5 hover:text-foreground transition-colors duration-150">
                                    <GitFork className="h-3.5 w-3.5" />
                                    <span className="font-medium">
                                      {repo.forks_count}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1.5 ml-auto">
                                    <Clock className="h-3.5 w-3.5" />
                                    <span className="text-xs">
                                      {formatLastUpdated(repo.updated_at)}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 justify-end">
                                  {getLiveSiteUrl(repo) && (
                                    <Link
                                      href={getLiveSiteUrl(repo)!}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <Button
                                        size="sm"
                                        variant="default"
                                        className="h-7 px-2.5"
                                      >
                                        Live site
                                      </Button>
                                    </Link>
                                  )}
                                  <Link
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="h-7 px-2.5"
                                    >
                                      Repo
                                    </Button>
                                  </Link>
                                </div>
                              </div>
                            </CardFooter>
                          </ShadCard>
                        </FollowerPointerCard>
                        </div>
                      </BlurFade>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredRepos.length === 0 && (
        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <ShadCard className="p-16 sm:p-20 text-center border-dashed border-2">
            <div className="flex flex-col items-center gap-6">
              <div className="p-5 rounded-full bg-muted">
                <Code2 className="h-10 w-10 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <p className="text-xl font-semibold">No repositories found</p>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Try adjusting your filters to see more projects
                </p>
              </div>
            </div>
          </ShadCard>
        </BlurFade>
      )}

      {/* --- MODAL POPUP --- */}
      {isModalOpen && selectedRepo && (
        <div
          className="fixed inset-0 z-50 bg-background/98 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative bg-card max-w-lg w-full rounded-2xl border border-border shadow-2xl animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Modal Header */}
              <div className="p-6 border-b border-border/30">
                <h2 className="text-2xl font-bold mb-2 pr-8">
                  {selectedRepo.name.replace(/[-_]/g, " ")}
                </h2>
                <p className="text-muted-foreground text-sm">
                  {selectedRepo.description || "No description available."}
                </p>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-4">
                {selectedRepo.language && (
                  <div className="flex items-center gap-2 text-sm">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        LANGUAGE_COLORS[selectedRepo.language] || "bg-gray-500"
                      }`}
                    ></span>
                    <span className="font-medium">{selectedRepo.language}</span>
                  </div>
                )}

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Star className="h-4 w-4" /> {selectedRepo.stargazers_count} Stars
                  </div>
                  <div className="flex items-center gap-1.5">
                    <GitFork className="h-4 w-4" /> {selectedRepo.forks_count} Forks
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    Updated {formatLastUpdated(selectedRepo.updated_at)}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-2 pt-4">
                  {getLiveSiteUrl(selectedRepo) && (
                    <Link
                      href={getLiveSiteUrl(selectedRepo)!}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button size="sm" className="px-3">
                        Live Site
                      </Button>
                    </Link>
                  )}
                  <Link
                    href={selectedRepo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button variant="outline" size="sm" className="px-3">
                      GitHub Repo <ExternalLink className="ml-1 h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
      )}
    </div>
  );
}

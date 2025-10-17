# GitHub-Integrated Portfolio

Your portfolio is now **dynamically connected to your GitHub** repositories! 🎉

## ✨ Features

- **Automatic Sync**: Fetches all your public GitHub repositories automatically
- **Real-time Updates**: Shows latest changes with "X hours/days ago" timestamps
- **Language Filtering**: Filter projects by programming language
- **Repository Stats**: Displays stars, forks, and activity
- **Topics/Tags**: Shows repository topics for easy categorization
- **Responsive Design**: Works beautifully on all devices
- **Theme-aware**: Adapts to light/dark mode

## 🚀 How It Works

The portfolio fetches data from the GitHub REST API every hour (cached) and displays:

- Repository name and description
- Programming language
- Stars and forks count
- Last updated time
- Repository topics/tags
- Direct link to GitHub repo

## 🔧 Setup (Optional: Increase Rate Limits)

By default, the portfolio works without any setup, but you have a rate limit of **60 requests/hour**.

### To increase to 5,000 requests/hour:

1. **Create a GitHub Personal Access Token**:

   - Go to: https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Give it a name like "Portfolio Token"
   - Select NO scopes (read-only public data)
   - Click "Generate token"
   - Copy the token

2. **Add to your project**:
   Create a `.env.local` file in your project root:

   ```bash
   NEXT_PUBLIC_GITHUB_TOKEN=your_token_here
   ```

3. **Add to `.gitignore`** (already done if using Next.js template):
   ```
   .env.local
   ```

⚠️ **Never commit your token to Git!**

## 📁 Project Structure

```
src/
├── services/
│   └── githubService.ts       # GitHub API logic
├── app/
│   └── Pages/
│       └── Project.tsx         # Projects page component
```

## 🎨 Customization

### Change GitHub Username

Edit `src/app/Pages/Project.tsx`:

```typescript
const GITHUB_USERNAME = "YourGitHubUsername";
```

### Filter Repositories

You can modify the fetch function to filter out specific repos:

```typescript
// In githubService.ts
return repos.filter(
  (repo) =>
    !repo.fork && // Exclude forks
    !repo.archived && // Exclude archived
    repo.stargazers_count > 0 // Only show starred projects
);
```

### Change Cache Duration

Edit the `fetchGitHubRepos` function:

```typescript
next: { revalidate: 3600 }, // Cache for 1 hour (3600 seconds)
```

## 🔄 Auto-Update Behavior

- **Production**: Repos update every hour automatically
- **Development**: Fetches fresh data on every page load

## 🎯 Future Enhancements

Want to take it further? Consider:

- **GitHub Webhooks**: Real-time updates when you push to repos
- **Pinned Repos**: Show specific repos at the top
- **Contribution Graph**: Display your GitHub activity
- **README Preview**: Show repo README in a modal
- **Deploy Status**: Show Vercel/Netlify deployment status
- **Two-way Sync**: Edit project details and update GitHub

## 📝 Notes

- The portfolio automatically excludes **forked** and **archived** repositories
- Repositories are sorted by **most recently updated**
- Language colors are based on your theme's primary color
- All external links open in a new tab

## 🐛 Troubleshooting

**No repos showing?**

- Check your GitHub username in `Project.tsx`
- Check browser console for API errors
- Verify your repos are public

**Rate limit exceeded?**

- Add a GitHub token (see setup above)
- Wait an hour for the rate limit to reset

**Styling issues?**

- Make sure all shadcn/ui components are installed
- Check that Tailwind CSS is properly configured

## 🚀 Deploy

Your GitHub-connected portfolio works perfectly on:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **GitHub Pages**
- Any static hosting service

---

**Enjoy your dynamically updated portfolio!** 🎉

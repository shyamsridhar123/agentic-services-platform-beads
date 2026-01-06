# 🚀 Quick Deployment Checklist

Follow these steps to deploy your site to GitHub Pages:

## ✅ Step 1: Enable GitHub Pages (Required - Do This First!)

1. Go to: https://github.com/shyamsridhar123/agentic-services-platform-beads/settings/pages
2. Under "Build and deployment" → "Source":
   - Select **"GitHub Actions"** from the dropdown
3. That's it! No other configuration needed.

## ✅ Step 2: Trigger the Deployment

Choose **ONE** of these options:

### Option A: Manual Trigger (Recommended for Testing)

1. Go to: https://github.com/shyamsridhar123/agentic-services-platform-beads/actions/workflows/deploy.yml
2. Click the blue **"Run workflow"** button (top right)
3. Select the branch: **`main`** (or `copilot/deploy-github-pages` to test)
4. Click **"Run workflow"**
5. Wait 2-3 minutes for completion

### Option B: Automatic (Push to main)

- Merge your pull request to `main`, and the deployment will happen automatically

## ✅ Step 3: Check Your Site

Once the workflow shows a ✅ green checkmark:

**Your site is live at:** https://shyamsridhar123.github.io/agentic-services-platform-beads/

## 🔍 Troubleshooting

### If the workflow fails with "Resource not accessible by integration":
- ❌ GitHub Pages is not enabled
- ✅ Go back to Step 1 and enable it

### If you see 404 on the deployed site:
- Wait 2-3 minutes for GitHub's CDN to update
- Clear your browser cache
- Check the workflow completed successfully

## 📚 More Help

- **Detailed setup guide:** [SETUP_GITHUB_PAGES.md](./SETUP_GITHUB_PAGES.md)
- **Deployment details:** [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Repository settings:** https://github.com/shyamsridhar123/agentic-services-platform-beads/settings
- **Actions:** https://github.com/shyamsridhar123/agentic-services-platform-beads/actions

---

**🎉 That's it! Once Step 1 is complete, deployments work automatically!**

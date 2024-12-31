# GitHub and VS Code Setup Guide

## 1. Initialize Git Repository

```bash
# Initialize git repository
git init

# Add .gitignore
echo "node_modules/
.env
.DS_Store
coverage/" > .gitignore

# Initial commit
git add .
git commit -m "Initial commit"
```

## 2. Create GitHub Repository

1. Go to GitHub and create a new repository
2. Follow GitHub's instructions to push existing repository:

```bash
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main
```

## 3. VS Code Setup

1. Install recommended extensions:
   - MongoDB for VS Code
   - ESLint
   - Prettier
   - GitLens

2. Configure MongoDB extension:
   - Click on MongoDB icon in VS Code
   - Add Connection
   - Use connection string from your .env file

3. Configure workspace settings:
   ```json
   {
     "editor.formatOnSave": true,
     "editor.codeActionsOnSave": {
       "source.fixAll.eslint": true
     }
   }
   ```

## 4. Synchronization

1. Pull latest changes:
   ```bash
   git pull origin main
   ```

2. Push your changes:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```
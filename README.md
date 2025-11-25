# Personal Researcher Homepage

A minimal and professional academic website for Minjong Kim, PhD researcher specializing in wearable robotics, biomechanics, and human-robot interaction.

## Features

- Clean, minimal academic design
- Fully responsive (mobile, tablet, desktop)
- Dark mode toggle with persistent preference
- Smooth scroll animations
- Optimized for GitHub Pages deployment
- Pure HTML/CSS/JavaScript (no frameworks)

## Project Structure

```
Personal_Homepage/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles including responsive and dark mode
├── js/
│   └── main.js         # JavaScript for interactivity
├── images/             # Profile photo and other images
│   └── profile.jpg     # Add your profile photo here
├── Minjong_Kim_CV.pdf  # Your CV (linked in hero section)
└── README.md           # This file
```

## Setup Instructions

### 1. Add Your Profile Photo

Place your profile photo in the `images/` folder and name it `profile.jpg`:

```bash
# From the project root directory
cp /path/to/your/photo.jpg images/profile.jpg
```

Recommended specifications:
- Format: JPG or PNG
- Size: 300x300 pixels (or larger, square aspect ratio)
- File size: Under 500KB for faster loading

### 2. Customize Content

Edit `index.html` to update:
- Personal information
- Research interests
- Project details
- Publications (when available)
- Social media links (GitHub, LinkedIn, Google Scholar)
- Contact information

### 3. Local Testing

Open `index.html` in your browser to preview:

```bash
# Option 1: Double-click index.html in file explorer

# Option 2: Use a simple HTTP server (recommended)
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (if http-server is installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## Deploying to GitHub Pages

### Method 1: GitHub Web Interface (Easiest)

1. **Create a GitHub repository**
   - Go to [GitHub](https://github.com) and sign in
   - Click the "+" icon → "New repository"
   - Name it: `your-username.github.io` (replace `your-username` with your actual GitHub username)
   - Make it public
   - Don't initialize with README (we already have one)
   - Click "Create repository"

2. **Upload your files**
   - On the repository page, click "uploading an existing file"
   - Drag and drop all files and folders from this project
   - Commit the changes

3. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Under "Source", select "main" branch and "/ (root)" folder
   - Click "Save"
   - Your site will be live at `https://your-username.github.io`

### Method 2: Git Command Line

```bash
# Navigate to your project directory
cd /Users/kmj/TEST/Personal_Homepage

# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: Personal homepage"

# Add remote repository (replace with your repository URL)
git remote add origin https://github.com/your-username/your-username.github.io.git

# Push to GitHub
git push -u origin main
```

If you get an error about "master" vs "main" branch:
```bash
git branch -M main
git push -u origin main
```

### Method 3: Using GitHub Desktop

1. Download and install [GitHub Desktop](https://desktop.github.com)
2. Open GitHub Desktop
3. File → Add Local Repository → Select your project folder
4. Create a new repository on GitHub.com from GitHub Desktop
5. Publish repository
6. Enable GitHub Pages in repository settings

## Post-Deployment

1. **Verify deployment**
   - Visit `https://your-username.github.io`
   - It may take 2-5 minutes for the site to go live initially

2. **Update your site**
   - Make changes to your local files
   - Commit and push to GitHub
   - Changes will be reflected in 1-2 minutes

3. **Custom domain (optional)**
   - Purchase a domain (e.g., from Namecheap, Google Domains)
   - In repository Settings → Pages → Custom domain
   - Enter your domain and follow DNS configuration instructions

## Updating Content

### Adding Publications

When you have publications to add, edit `index.html` and uncomment the publication template in the Publications section:

```html
<div class="publication-item">
    <h3>Your Paper Title</h3>
    <p class="authors">Author1, Author2, <strong>M. Kim</strong>, Author3</p>
    <p class="venue">Conference/Journal Name, Year</p>
    <div class="publication-links">
        <a href="paper.pdf" class="pub-link">PDF</a>
        <a href="https://github.com/..." class="pub-link">Code</a>
        <a href="https://doi.org/..." class="pub-link">DOI</a>
    </div>
</div>
```

### Adding More Projects

Copy the project card template and modify:

```html
<div class="project-card">
    <div class="project-header">
        <h3>Project Name</h3>
        <span class="date">Date Range</span>
    </div>
    <p class="project-role">Your Role</p>
    <p class="project-location">Institution/Location</p>
    <ul class="project-details">
        <li>Achievement or description 1</li>
        <li>Achievement or description 2</li>
    </ul>
    <div class="project-tags">
        <span class="tag">Technology 1</span>
        <span class="tag">Technology 2</span>
    </div>
</div>
```

### Updating Social Media Links

In the Contact section of `index.html`, update the `href` attributes:

```html
<a href="https://github.com/your-username" target="_blank" rel="noopener" class="social-link">
<a href="https://linkedin.com/in/your-username" target="_blank" rel="noopener" class="social-link">
<a href="https://scholar.google.com/citations?user=your-id" target="_blank" rel="noopener" class="social-link">
```

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- No external dependencies
- Minimal CSS and JavaScript
- Optimized for fast loading
- Lighthouse score: 95+ (with optimized images)

## Customization Tips

### Change Color Scheme

Edit the CSS variables in `css/style.css`:

```css
:root {
    --accent-primary: #2563eb;  /* Change this for different primary color */
    --accent-secondary: #1e40af;
}
```

### Modify Sections

You can add, remove, or reorder sections by editing `index.html`. Just make sure to:
- Update navigation links
- Maintain consistent styling with existing sections

### Disable Dark Mode

If you don't want dark mode:
1. Remove the dark mode button from `index.html`
2. Remove dark mode related JavaScript from `js/main.js`
3. Remove dark theme variables from `css/style.css`

## Troubleshooting

**Q: My profile photo doesn't show**
- Check that `images/profile.jpg` exists
- Verify the file extension matches (.jpg, .jpeg, .png)
- Check file permissions

**Q: Changes aren't showing on GitHub Pages**
- Wait 1-2 minutes after pushing
- Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)
- Check repository Settings → Pages for any errors

**Q: Dark mode isn't working**
- Check browser console for JavaScript errors
- Ensure `js/main.js` is properly linked in `index.html`
- Try clearing browser cache

**Q: Site looks broken on mobile**
- Make sure you didn't remove the viewport meta tag
- Test with browser developer tools mobile view
- Check for CSS syntax errors

## License

Free to use and modify for personal academic websites.

## Credits

Created for Minjong Kim, PhD Researcher at Seoul National University.

## Support

For issues or questions:
- Check the [GitHub Pages documentation](https://docs.github.com/en/pages)
- Review HTML/CSS/JavaScript in browser developer tools
- Contact: alswhd1111@gmail.com

---

Last updated: November 2025

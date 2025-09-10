# Arun Suthar Carpentry Website

A professional, responsive website for a carpenter business featuring a warm wood theme and modern design.

## 🌟 Features

- **Fully Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **Modern Wood Theme** - Warm colors and professional design perfect for carpentry business
- **Interactive Portfolio** - Filterable project gallery
- **Contact Form** - Multiple contact options including email integration
- **Smooth Animations** - Professional animations and transitions
- **SEO Optimized** - Clean HTML structure and semantic markup
- **Fast Loading** - Optimized CSS and JavaScript

## 📁 File Structure

```
├── index.html          # Main HTML file
├── style.css           # All styling and responsive design
├── script.js           # Interactive functionality
└── README.md           # This file
```

## 🚀 Getting Started

1. **Download all files** to your project folder
2. **Customize the contact information** (see instructions below)
3. **Replace placeholder images** with actual photos
4. **Deploy to your hosting platform**

## ✏️ Customization Instructions

### 1. Update Contact Information

**In `script.js`, line 200+:**
```javascript
const CONTACT_INFO = {
    email: 'your-actual-email@domain.com',     // Replace with your email
    phone: '+1 (555) 123-4567',               // Replace with your phone
    address: 'Your City, State 12345',        // Replace with your address
    formspreeId: 'YOUR_FORM_ID'               // See email setup below
};
```

**In `index.html`, update contact section:**
- Line 340+: Update phone number
- Line 346+: Update email address
- Line 352+: Update address
- Line 358+: Update business hours

### 2. Email Contact Form Setup

Choose one of these options:

#### Option A: Simple mailto (Current Setup)
- No setup required
- Opens user's email client
- Works immediately but requires user to have email client

#### Option B: Formspree (Recommended)
1. Go to [Formspree.io](https://formspree.io)
2. Create a free account
3. Create a new form and get your Form ID
4. In `script.js`, uncomment lines 79-95 and replace `YOUR_FORM_ID`
5. Comment out the mailto section (lines 67-77)

#### Option C: EmailJS
1. Sign up at [EmailJS.com](https://emailjs.com)
2. Follow their integration guide
3. Replace the contact form handling in `script.js`

### 3. Replace Placeholder Images

**Current placeholders to replace:**
- Hero section image (`.hero-placeholder`)
- About section photo (`.about-image .image-placeholder`)
- Portfolio project images (`.portfolio-image .image-placeholder`)

**To add real images:**
1. Create an `images/` folder
2. Add your photos (recommended: JPG format, optimized for web)
3. Replace placeholder divs with `<img>` tags:

```html
<!-- Replace this: -->
<div class="image-placeholder">
    <i class="fas fa-chair"></i>
    <p>Custom Dining Set</p>
</div>

<!-- With this: -->
<img src="images/dining-set.jpg" alt="Custom Dining Set">
```

### 4. Update Business Information

**In `index.html`:**
- Line 15: Update page title
- Line 24-26: Update business name and tagline
- Line 75-77: Update hero headline and description
- Line 123-125: Update about section content
- Line 135-150: Update statistics (projects completed, years experience, etc.)
- Line 155-165: Update specializations list

### 5. Add Your Portfolio Projects

**Replace the sample portfolio items (lines 280-350) with your actual projects:**

```html
<div class="portfolio-item" data-category="furniture">
    <div class="portfolio-image">
        <img src="images/your-project.jpg" alt="Project Name">
    </div>
    <div class="portfolio-content">
        <h3>Your Project Name</h3>
        <p>Description of your project and what makes it special.</p>
    </div>
</div>
```

### 6. Update Testimonials

**Replace sample testimonials (lines 360-390) with real client feedback:**

```html
<div class="testimonial">
    <div class="testimonial-content">
        <p>"Your actual client testimonial here..."</p>
    </div>
    <div class="testimonial-author">
        <h4>Client Name</h4>
        <span>Client Title/Location</span>
    </div>
</div>
```

## 🌐 Deployment Options

### GitHub Pages (Free)
1. Create a GitHub account
2. Create a new repository
3. Upload all files
4. Go to Settings > Pages
5. Select "Deploy from a branch" > "main"
6. Your site will be available at `username.github.io/repository-name`

### Netlify (Free)
1. Create a Netlify account
2. Drag and drop your project folder to Netlify
3. Your site will be live instantly with a custom URL

### Other Hosting Platforms
- **Vercel** - Simple deployment for static sites
- **Firebase Hosting** - Google's hosting platform
- **Traditional Web Hosting** - Upload files via FTP to any web host

## 📱 Social Media Integration

**To add your social media links:**

In `index.html`, line 550+:
```html
<div class="social-links">
    <a href="https://facebook.com/yourpage"><i class="fab fa-facebook"></i></a>
    <a href="https://instagram.com/yourpage"><i class="fab fa-instagram"></i></a>
    <a href="https://linkedin.com/in/yourprofile"><i class="fab fa-linkedin"></i></a>
</div>
```

## 🎨 Color Scheme Customization

**To change the wood color theme, update these CSS variables in `style.css` (lines 10-20):**

```css
:root {
    --primary-brown: #8B4513;      /* Main brand color */
    --dark-brown: #654321;         /* Darker accent */
    --light-brown: #D2B48C;        /* Light accent */
    --cream: #F5E6D3;              /* Background */
    --warm-white: #FFF8DC;         /* Content background */
    --accent-gold: #DAA520;        /* Highlights */
}
```

## 📄 SEO Optimization

**To improve search engine ranking:**

1. **Update meta tags** in `index.html` head section:
```html
<meta name="description" content="Professional carpentry services in [Your City]. Custom furniture, kitchen cabinets, and interior finishing by master carpenter [Your Name].">
<meta name="keywords" content="carpenter, woodworking, custom furniture, kitchen cabinets, [Your City]">
```

2. **Add structured data** for local business
3. **Optimize images** with descriptive alt text
4. **Create a sitemap.xml** file

## 🔧 Performance Optimization

- **Optimize images**: Use WebP format for modern browsers
- **Minify CSS/JS**: Use tools like UglifyJS for production
- **Enable compression**: Configure gzip on your server
- **Use CDN**: For font and icon libraries

## 📞 Support

If you need help customizing this website:

1. Check the comments in the code files
2. Search online for HTML/CSS/JavaScript tutorials
3. Consider hiring a web developer for advanced customizations

## 📝 License

This template is free to use for personal and commercial projects. No attribution required, but appreciated!

---

**Built with ❤️ for craftsmen who build beautiful things with their hands 🔨**

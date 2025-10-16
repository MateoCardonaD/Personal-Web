# Portfolio - Mateo Cardona Díaz

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Live Demo

[View Live Portfolio](https://your-vercel-url.vercel.app) <!-- Update this with your actual Vercel URL -->

## ✨ Features

- **Responsive Design**: Optimized for all devices
- **Bilingual Support**: English and Spanish language switching
- **Dark/Light Mode**: Toggle between themes
- **Interactive Hobbies**: Hover tooltips with clickable links
- **Project Gallery**: Horizontal scrolling project showcase
- **Modern Animations**: Smooth transitions and hover effects
- **PWA Ready**: Progressive Web App capabilities

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.4
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Custom SVG components
- **Deployment**: Vercel

## 📁 Project Structure

```
├── app/                 # Next.js app directory
├── components/          # React components
│   ├── sections/       # Page sections
│   └── ui/             # UI components
├── public/             # Static assets
├── hooks/              # Custom React hooks
└── lib/                # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Customization

### Adding New Projects

Edit `components/sections/Projects.tsx` to add new projects:

```typescript
const projects: ProjectItem[] = [
  {
    title: 'Your Project',
    year: 2024,
    type: 'Type',
    image: '/your-image.jpg',
    description: {
      en: 'English description',
      es: 'Spanish description'
    },
    link: 'https://your-project-link.com'
  }
]
```

### Adding New Hobbies

Edit `components/sections/Hobbies.tsx` to add new hobbies with tooltips:

```typescript
const hobbyTooltips = {
  'Your Hobby': {
    message: 'Your fun message 🎯',
    link: 'https://your-link.com' // Optional
  }
}
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy automatically

### Other Platforms

- **Netlify**: Connect GitHub repo and deploy
- **GitHub Pages**: Use `npm run build && npm run export`

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 📧 Contact

- **Email**: mateocardona1031@gmail.com
- **LinkedIn**: [mateo-cardona-díaz](https://www.linkedin.com/in/mateo-cardona-díaz/)
- **Behance**: [mateocardonadaz](https://www.behance.net/mateocardonadaz)

---

Built with ❤️ by Mateo Cardona Díaz
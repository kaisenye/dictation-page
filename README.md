# Romo - Landing Page

## Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Add your video:**
   - Place `demo.mp4` in the `public/` folder
   - Or update the video source in `src/app/page.tsx`

3. **Start development:**

   ```bash
   npm run dev
   ```

4. **Open** [http://localhost:3000](http://localhost:3000)

## Email Preview

Preview email templates in your browser:

- **Waitlist email**: [http://localhost:3000/api/preview-email?type=waitlist](http://localhost:3000/api/preview-email?type=waitlist)
- **Download email**: [http://localhost:3000/api/preview-email?type=download](http://localhost:3000/api/preview-email?type=download)

Add `&email=your@email.com` to customize the email address shown.

## Customize

- **Brand name**: Update "TechFlow" in `src/app/page.tsx`
- **Download links**: Replace button URLs with actual download links
- **Video**: Replace `demo.mp4` with your video file

## Tech Stack

- Next.js 15 + TypeScript
- Tailwind CSS + shadcn/ui
- Turbopack for fast builds

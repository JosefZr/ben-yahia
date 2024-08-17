import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains: ['images.unsplash.com', 'images.pexels.com', 'uploadthing.com',
        'utfs.io',
        'img.clerk.com',
        'subdomain',
        'files.stripe.com',] ,// Add the required hostnamesz here
        formats: ['image/avif', 'image/webp'], // Optional: specify formats
    },

};


export default withNextIntl(nextConfig);
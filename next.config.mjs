/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains: ['images.unsplash.com', 'images.pexels.com', 'uploadthing.com',
        'utfs.io',
        'img.clerk.com',
        'subdomain',
        'files.stripe.com',] ,// Add the required hostnames here
    }
};

export default nextConfig;

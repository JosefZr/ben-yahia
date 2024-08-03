import createNextIntlPlugin from 'next-intl/plugin';
import withPlugins from 'next-compose-plugins';
import optimizedImages from 'next-optimized-images';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'images.unsplash.com',
            'images.pexels.com',
            'uploadthing.com',
            'utfs.io',
            'img.clerk.com',
            'subdomain',
            'files.stripe.com',
        ], // Add the required hostnames here
    },
};

export default withPlugins([
    [optimizedImages, {
      /* config for next-optimized-images */
        handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif'],
        optimizeImages: true,
        optimizeImagesInDev: true,
    }]
], withNextIntl(nextConfig));

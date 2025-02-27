import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    // output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
    async redirects() {
        return [
            {
                source: '/admin-panel',
                destination: '/admin-panel/users',
                permanent: true,
            },

        ]
    },
}


export default nextConfig;

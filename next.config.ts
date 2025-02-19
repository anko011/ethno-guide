import type {NextConfig} from "next";

const nextConfig: NextConfig = {
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

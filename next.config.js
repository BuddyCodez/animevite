/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXTAUTH_URL: "http://localhost:3000/api/auth",
        NEXTAUTH_SECRET: "/Ied3ugwmkVLPpW/N2SuVoAb1j4D2CIQnPb6Rd86Zlc="
    },
    experimental: {
        serverActions: true
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**.*.*",
            },
            {
                protocol: "https",
                hostname: "**.**.*.*",
            },
        ],
    },
}

module.exports = nextConfig

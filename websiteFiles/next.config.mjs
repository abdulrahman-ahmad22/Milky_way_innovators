import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  // Keep Turbopack scoped to this app even if unrelated lockfiles exist in a
  // parent directory. This avoids excessive file watching and bad resolution.
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;

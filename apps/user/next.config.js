/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
  transpilePackages: ['@tutormint/prisma'],
};

const ENV_FILES = ['.env', '.env.local', `.env.${process.env.NODE_ENV || 'development'}`];

ENV_FILES.forEach((file) => {
  require('dotenv').config({
    path: path.join(__dirname, `../../${file}`),
  });
});

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    loader: "cloudinary",
    path: `https://res.cloudinary.com/${process.env.CLOUDINARY_PUBLIC_NAME}/image/upload/`,
  },
};

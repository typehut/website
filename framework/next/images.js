module.exports = (config) => {
  return {
    images: {
      loader: "cloudinary",
      path: `https://res.cloudinary.com/${process.env.CLOUDINARY_PUBLIC_NAME}/image/upload/`,
    },
  };
};

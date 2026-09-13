// Single source of truth for site-wide SEO values.
// TODO: once a production domain is chosen, either set NEXT_PUBLIC_SITE_URL
// in the hosting provider's env vars, or replace the fallback URL below.
export const siteConfig = {
  name: "Magero Kyayi Joshua",
  title: "Magero Kyayi Joshua | Founder, Digital Infrastructure for East African Institutions",
  description:
    "Founder of Soma & Synsify. Building institutional-grade systems — insurance, edtech, fintech — for East African conditions.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://magerokyayi.com",
  author: "Magero Kyayi Joshua",
  email: "kyayijoshua@gmail.com",
  locale: "en_US",
  keywords: [
    "Magero Kyayi Joshua",
    "Soma",
    "Synsify",
    "East Africa software engineer",
    "Uganda web developer",
    "fintech Uganda",
    "edtech Uganda",
    "systems architect Kampala",
    "full-stack developer Uganda",
  ],
  social: {
    github: "https://github.com/joshuakyayi256",
    linkedin: "https://ug.linkedin.com/in/magero-kyayi-joshua",
    instagram: "https://www.instagram.com/josh_kyayi/",
  },
};

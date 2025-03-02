import GenerateSitemap from "react-router-sitemap-maker";
import Routes from "../src/routes";

const sitemapData = await GenerateSitemap(Routes(), {
	baseUrl: "https://rikthepixel.github.io",
	hashrouting: true,
	changeFrequency: "monthly"
});

sitemapData.toFile("./dist/sitemap.xml");
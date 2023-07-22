export default defineNuxtConfig({
    app: {
        head: {
            title: "联合国实习生岗位汇总",
            charset: "utf-8",
            viewport: "width=device-width, initial-scale=1"
        }
    },
    runtimeConfig: {
        public: {
            BASE_URL: process.env.BASE_URL
        }
    },
    devtools: { enabled: true },
    modules: ["@element-plus/nuxt", "@nuxtjs/tailwindcss"],
    css: ["@/assets/style/global.scss"],
    plugins: [{ src: "~/plugins/element-plus-icons.ts", mode: "client" }]
});

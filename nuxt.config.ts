// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: "联合国实习生岗位汇总",
            charset: "utf-8",
            viewport: "width=device-width, initial-scale=1"
        }
    },
    devtools: { enabled: true },
    modules: ["@element-plus/nuxt"],
    css: ["@/assets/style/global.scss"],
    plugins: [{ src: "~/plugins/element-plus-icons.ts", mode: "client" }]
});

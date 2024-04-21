import { build, emptyDir } from "https://deno.land/x/dnt@0.37.0/mod.ts";

await emptyDir("./npm");

await build({
    entryPoints: ["./mod.ts"],
    outDir: "./npm",
    shims: {
      deno: true,
    },
    package: {
      name: "jdp-ime",
      version: Deno.args[0],
      description:
        "Input method editor for web pages",
      license: "MIT",
      repository: {
        type: "git",
        url: "git+https://github.com/dpurge/xxx.git",
      },
      bugs: {
        url: "https://github.com/dpurge/xxx/issues",
      },
    },
    postBuild() {
    //   Deno.copyFileSync("LICENSE", "npm/LICENSE");
      Deno.copyFileSync("README.md", "npm/README.md");
    },
  });
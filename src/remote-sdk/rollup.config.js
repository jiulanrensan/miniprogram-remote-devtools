import dts from "rollup-plugin-dts";
export default [
  {
    input: "src/sdk/index.ts",
    output: {
      file: "sdk/index.js",
      format: "es",
      sourcemap: true,
    },
  },
  {
    input: "src/sdk/index.ts",
    output: {
      file: "sdk/index.d.ts",
      format: "es",
    },
    plugins: [dts()]
  }
]
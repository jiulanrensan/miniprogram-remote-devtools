import dts from "rollup-plugin-dts";
import typescript from "rollup-plugin-typescript2";
export default [
  {
    input: "src/remote-sdk/index.ts",
    output: {
      file: "sdk/index.js",
      format: "es",
      sourcemap: true,
    },
    plugins: [
      typescript(),
    ],
  },
  {
    input: "src/remote-sdk/index.ts",
    output: {
      file: "sdk/index.d.ts",
      format: "es",
    },
    plugins: [dts()]
  }
]
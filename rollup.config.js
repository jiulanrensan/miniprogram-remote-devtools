import dts from "rollup-plugin-dts";
import typescript from "rollup-plugin-typescript2";
export default [
  // {
  //   input: "packages/common/src/index.ts",
  //   output: {
  //     file: "packages/common/dist/index.js",
  //     format: "es",
  //     sourcemap: true,
  //   },
  //   plugins: [
  //     typescript({
  //       tsconfig: './packages/common/tsconfig.json'
  //     }),
  //   ],
  // },
  // {
  //   input: "packages/common/src/index.ts",
  //   output: {
  //     file: "packages/common/dist/index.d.ts",
  //     format: "es",
  //   },
  //   plugins: [dts()]
  // },
  {
    input: "packages/wechat-remote-sdk/src/index.ts",
    output: {
      file: "packages/wechat-remote-sdk/dist/index.js",
      format: "es",
      sourcemap: true,
    },
    plugins: [
      typescript(),
    ],
  },
  {
    input: "packages/wechat-remote-sdk/src/index.ts",
    output: {
      file: "packages/wechat-remote-sdk/dist/index.d.ts",
      format: "es",
    },
    plugins: [dts()]
  }
]
// import dts from "rollup-plugin-dts";
import typescript from "rollup-plugin-typescript2";
export default [
  {
    input: "packages/common/src/index.ts",
    output: {
      file: "packages/common/dist/index.js",
      format: "es",
      sourcemap: true,
    },
    plugins: [
      typescript({
        tsconfig: './packages/common/tsconfig.json'
      }),
    ],
  },
  // {
  //   input: "src/wechat-remote-sdk/index.ts",
  //   output: {
  //     file: "sdk/index.js",
  //     format: "es",
  //     sourcemap: true,
  //   },
  //   plugins: [
  //     typescript(),
  //   ],
  // },
  // {
  //   input: "src/wechat-remote-sdk/index.ts",
  //   output: {
  //     file: "sdk/index.d.ts",
  //     format: "es",
  //   },
  //   plugins: [dts()]
  // }
]
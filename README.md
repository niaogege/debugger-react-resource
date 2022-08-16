---
title: react debugger 源码调试
order: 0
group:
  title: react生态
  order: 0
---

膜拜[react 源码调试](https://mp.weixin.qq.com/s/Yfmb11mmvfXg2FlEu7UlXA)

> 调试 launch.json 的时候，本地记得运行项目在 debugger,不然报错 debugger 不起来

经过周末的折腾，终于能把源码调试搞定了，接下来就是阅读源码的浩大工程，哈哈哈，不知道如何下手

先记录下源码调试的过程，

### First step

建一个 workspace,假设名称是 reactTs,里面包含两个子项目，一个是 react-test,用 create-react-app 搭建即可，另一个是 react-source,这个直接去 github 上下载指定版本的[react 源码](https://github.com/facebook/react)即可,我项目里用的是 17.0.2，所以源码下载之后，把分支切到 **17.0.2**,记得 yarn,把源码所需要的依赖安装完毕

```js
--reactTs;
--react - test;
--react - source;
```

### Second step

在根目录下新建一个.vscode 文件夹，然后新建调试文件**launch.json**

```json
{
  "configurations": [
    {
      "name": "debugger react",
      "request": "launch",
      "type": "chrome",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}/react-test"
    }
  ]
}
```

### Third step

需要对 react 源码进行打包，打包出含有**sourceMap**的文件，所以修改*react-source/scripts/rollup/build.js*，修改主要是 2 个方法，内容主要如下

```js
//...省略代码
//1。更改配置，设置源码绝对定位
function getRollupOutputOptions(
  outputPath,
  format,
  globals,
  globalName,
  bundleType
) {
  const isProduction = isProductionBundleType(bundleType);

  return {
    file: outputPath,
    format,
    globals,
    freeze: !isProduction,
    interop: false,
    name: globalName,
    sourcemap: true, // 配置为true
    sourcemapPathTransform(relativeSourcePath) {
      return relativeSourcePath.replace(
        "../../../../packages",
        "/Users/cpp/My/project/reactTs/react-source/packages" // 此处为react源码的绝对位置，更换成自己的即可
      );
    },
    esModule: false,
  };
}
// 2.注释各种插件代码
function getPlugins(
  entry,
  externals,
  updateBabelOptions,
  filename,
  packageName,
  bundleType,
  globalName,
  moduleType,
  pureExternalModules,
  bundle
) {
  const findAndRecordErrorCodes = extractErrorCodes(errorCodeOpts);
  const forks = Modules.getForks(bundleType, entry, moduleType, bundle);
  const isProduction = isProductionBundleType(bundleType);
  const isProfiling = isProfilingBundleType(bundleType);
  const isUMDBundle =
    bundleType === UMD_DEV ||
    bundleType === UMD_PROD ||
    bundleType === UMD_PROFILING;
  const isFBWWWBundle =
    bundleType === FB_WWW_DEV ||
    bundleType === FB_WWW_PROD ||
    bundleType === FB_WWW_PROFILING;
  const isRNBundle =
    bundleType === RN_OSS_DEV ||
    bundleType === RN_OSS_PROD ||
    bundleType === RN_OSS_PROFILING ||
    bundleType === RN_FB_DEV ||
    bundleType === RN_FB_PROD ||
    bundleType === RN_FB_PROFILING;
  const shouldStayReadable = isFBWWWBundle || isRNBundle || forcePrettyOutput;
  return [
    // Extract error codes from invariant() messages into a file.
    shouldExtractErrors && {
      transform(source) {
        findAndRecordErrorCodes(source);
        return source;
      },
    },
    // Shim any modules that need forking in this environment.
    useForks(forks),
    // Ensure we don't try to bundle any fbjs modules.
    forbidFBJSImports(),
    // Use Node resolution mechanism.
    resolve({
      skip: externals,
    }),
    // Remove license headers from individual modules
    stripBanner({
      exclude: "node_modules/**/*",
    }),
    // Compile to ES2015.
    babel(
      getBabelConfig(
        updateBabelOptions,
        bundleType,
        packageName,
        externals,
        !isProduction
      )
    ),
    // Remove 'use strict' from individual source files.
    // {
    //   transform(source) {
    //     return source.replace(/['"]use strict["']/g, '');
    //   },
    // },
    // Turn __DEV__ and process.env checks into constants.
    replace({
      __DEV__: isProduction ? "false" : "true",
      __PROFILE__: isProfiling || !isProduction ? "true" : "false",
      __UMD__: isUMDBundle ? "true" : "false",
      "process.env.NODE_ENV": isProduction ? "'production'" : "'development'",
      __EXPERIMENTAL__,
      // Enable forked reconciler.
      // NOTE: I did not put much thought into how to configure this.
      __VARIANT__: bundle.enableNewReconciler === true,
    }),
    // The CommonJS plugin *only* exists to pull "art" into "react-art".
    // I'm going to port "art" to ES modules to avoid this problem.
    // Please don't enable this for anything else!
    isUMDBundle && entry === "react-art" && commonjs(),
    // Apply dead code elimination and/or minification.
    // isProduction &&
    //   closure(
    //     Object.assign({}, closureOptions, {
    //       // Don't let it create global variables in the browser.
    //       // https://github.com/facebook/react/issues/10909
    //       assume_function_wrapper: !isUMDBundle,
    //       renaming: !shouldStayReadable,
    //     })
    //   ),
    // HACK to work around the fact that Rollup isn't removing unused, pure-module imports.
    // Note that this plugin must be called after closure applies DCE.
    // isProduction && stripUnusedImports(pureExternalModules),
    // Add the whitespace back if necessary.
    // shouldStayReadable &&
    //   prettier({
    //     parser: 'babel',
    //     singleQuote: false,
    //     trailingComma: 'none',
    //     bracketSpacing: true,
    //   }),
    // License and haste headers, top-level `if` blocks.
    // {
    //   renderChunk(source) {
    //     return Wrappers.wrapBundle(
    //       source,
    //       bundleType,
    //       globalName,
    //       filename,
    //       moduleType
    //     );
    //   },
    // },
    // Record bundle size.
    sizes({
      getSize: (size, gzip) => {
        const currentSizes = Stats.currentBuildResults.bundleSizes;
        const recordIndex = currentSizes.findIndex(
          (record) =>
            record.filename === filename && record.bundleType === bundleType
        );
        const index = recordIndex !== -1 ? recordIndex : currentSizes.length;
        currentSizes[index] = {
          filename,
          bundleType,
          packageName,
          size,
          gzip,
        };
      },
    }),
  ].filter(Boolean);
}
```

### Fourth step

调试工具只会解析一次 sourceMap，也就是要么只能完成从 **bundle.js** 到 **react-xxx.development.js** 的映射，要么完成 **react-xx.development.js** 到 **react** 最初源码的映射，所以想看源码，就只能把前面的映射干掉，如何干掉呢？

**不打包** react 和 react-dom 这俩包不就行了。不经过 webpack 打包，那就没有 webpack 产生的 sourcemap，不就一次就映射到 React 最初的源码了。

那怎么不打包这俩模块呢？ webpack 支持 externals 来配置一些模块使用全局变量而不进行打包，这样我们就可以单独加载 react、react-dom，然后把他们导出的全局变量配置到 externals 就行了。要改动 webpack 配置的话，在 create-react-app 下要执行 **npm run eject**。然后项目下会多出 config 目录和 public 目录，这俩分别放着 webpack 配置和一些公共文件。更改 webpack 编译配置

```js
// 文件位置 react-test/config/webpack.config.js
... 省略代码
    // Turn off performance processing because we utilize
    // our own hints via the FileSizeReporter
    performance: false,
    externals: {
      react: "React",
      "react-dom": "ReactDOM",
    },
... 省略代码
```

然后把 react.development.js 和 react-dom.development.js 以及对应的 map 文件一起 拷贝到 **public** 下，并在 index.html 里面的 head 标签里 加载这俩文件：

```html
<script src="./react.development.js"></script>
<script src="./react-dom.development.js"></script>
```

### Last step

首先把 react-test 项目给运行起来,执行 yarn start,然后 **debugger**，就能看到 react 源码了，而且点击文件路径，也能一步跳过去，react-test 已上传到 github[cpp-react-test](https://github.com/niaogege/cpp-react-test)

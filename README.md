# README
## What is this repository for?

This is a basic **Typescript** <img src="public/images/icons8-typescript-20.png"/> project configuration that allows start coding right away. It is an alternative to the use of **create-react-app**, which has the downside of doing a lot of "Magic" under the hood.

The main idea is taken from [here](https://dev.to/riddhiagrawal001/create-react-app-without-create-react-app-typescript-5ea2) and a few additions have been made to it.

## How do I get set up?

### Summary of set up

After cloning this project the following steps are needed to start coding:

1. Install the dependencies: ` npm install `
2. Start the development server: ` npm run start-dev ` 
3. Happy coding :grin:

### Dependencies
#### React
* react
* react-dom
#### Typescript
* typescript
* @types/react
* @types/react-dom
#### Scss
* sass
#### Babel
* @babel/core
* @babel/preset-env
* @babel/preset-react
* @babel/preset-typescript
#### Webpack
* webpack
* webpack-cli
> ##### Loaders
> * babel-loader
> * file-loader
> * style-loader
> * css-loader
> * sass-loader
> ##### Hot reload
> * webpack-dev-server
> * html-webpack-plugin
> * react-refresh
> * @pmmmwh/react-refresh-webpack-plugin


## Useful links

As this solution is composed by many different components, in this section there are some links that might help you understand what each of these components do.

### <img src="public/images/icons8-babel-30.png"/> Babel
It is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backward compatible version JavaScript so browsers can understand it.
Check its main page [here](https://babeljs.io/docs/en/index.html)

#### Presets
* **@babel/core**: I couldn't find any documentation that explans this preset. I think it is needed to run babel
* [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env): allows to use the latest JavaScript without needing to manage which syntax transforms are needed by your target environment
* [@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react): includes the following plugins:
> * [@babel/plugin-syntax-jsx](https://www.npmjs.com/package/@babel/plugin-syntax-jsx): allows babel to understand JSX syntax
> * [@babel/plugin-transform-react-jsx](https://www.npmjs.com/package/@babel/plugin-transform-react-jsx): compiles JSX into JavaScript
> * [@babel/plugin-transform-react-display-name](https://www.npmjs.com/package/@babel/plugin-transform-react-display-name): add a displayName to React.createClass calls
> * [@babel/plugin-transform-react-jsx-self](https://www.npmjs.com/package/@babel/plugin-transform-react-jsx-self): add a __self prop to all JSX elements
> * [@babel/plugin-transform-react-jsx-source](https://www.npmjs.com/package/@babel/plugin-transform-react-jsx-source): add a __source prop to all JSX elements

* [@babel/preset-typescript](https://babeljs.io/docs/en/babel-preset-typescript)
### <img src="public/images/icons8-webpack-48.png"/> Webpack
* webpack
* webpack-cli
> ##### Loaders
> * [babel-loader](https://www.npmjs.com/package/babel-loader): allows transpiling javascript using Babel and Webpack
> * [file-loader](https://www.npmjs.com/package/file-loader): emits the file in the output directory and resolves the correct URL to reference it
> * [style-loader](https://www.npmjs.com/package/style-loader): inject CSS into DOM
> * [css-loader](https://www.npmjs.com/package/css-loader): interpret the @import and url() like import/require() and will resolve them
> * [sass-loader](https://www.npmjs.com/package/sass-loader): load a SASS/SCSS file and compiles it to CSS
> ##### Hot reload
> * [webpack-dev-server](https://www.npmjs.com/package/webpack-dev-server): use webpack with a development server that provides hot reloading
> * [html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin): plugin that simplifies the creation of HTML files to serve your bundles
> * [react-refresh](https://www.npmjs.com/package/react-refresh): implements all the wiring necessary to integrate fast refresh to bundlers. Fast refresh is a feature that lets you edit a React component on a running application without losing their state.
> * [@pmmmwh/react-refresh-webpack-plugin](https://www.npmjs.com/package/@pmmmwh/react-refresh-webpack-plugin): plugin needed to enable react-refresh


### Webpack configuration explained

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact
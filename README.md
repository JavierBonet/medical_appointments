# README
## What is this repository for?

This is a basic **Typescript** <img src="public/images/icons8-typescript-20.png"/> project configuration that allows start coding right away. It is an alternative to the use of **create-react-app**, which has the downside of doing a lot of "Magic" under the hood.

The main idea is taken from [here](https://dev.to/riddhiagrawal001/create-react-app-without-create-react-app-typescript-5ea2) and a few additions have been made to it.

* Quick summary
* Version

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

* How to run tests
* Deployment instructions

## Useful links

As this solution is composed by many different components, in this section there are some links that might help you understand what each of these components do.

### <img src="public/images/icons8-babel-30.png"/> Babel
It is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backward compatible version JavaScript so browsers can understand it.
Check its main page [here](https://babeljs.io/docs/en/index.html)

#### Presets
* **@babel/core**: I couldn't find any documentation that explans this preset. I think it is needed to run babel
* [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env)
* [@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react)
* [@babel/preset-typescript](https://babeljs.io/docs/en/babel-preset-typescript)
### <img src="public/images/icons8-webpack-48.png"/> Webpack
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


* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact
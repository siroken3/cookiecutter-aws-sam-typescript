import * as Webpack from 'webpack';
import {resolve} from 'path';
import {sync} from 'glob';

const SRC_PATH = resolve(__dirname, './src/functions/');
const ENTRY_NAME = 'index.ts';
const BUILD_PATH= resolve(__dirname, './build');
const BUILD_MODE = process.env.NODE_ENV as "none" | "development" | "production"

const resolveEntry = (): Webpack.Entry => {
    const entries: {[key: string]: string} = {};
    const targets: string[] = sync(`${SRC_PATH}/**/${ENTRY_NAME}`);
    const pathRegex = new RegExp(`${SRC_PATH}/(.+?)/${ENTRY_NAME}`);
    targets.forEach((value: string) => {
        let key: string = value.replace(pathRegex, '$1/index');
        entries[key] = value;
    });
    return entries;
};

const config: Webpack.Configuration = {
    target: 'node',
    mode: BUILD_MODE,
    resolve: {
      extensions: ['.ts', '.js', '.json']
    },
    entry: resolveEntry(),
    output: {
      filename: '[name].js',
      path: BUILD_PATH,
      library: '[name]',
      libraryTarget: 'commonjs2'
    },
    module: {
      rules: [
        {
          test: /\.ts?$/,
          loader: 'awesome-typescript-loader'
        }
      ]
    }    
};

export default config;

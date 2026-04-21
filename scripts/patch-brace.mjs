import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const bracePkg = resolve('node_modules/brace/package.json');
const pkg = JSON.parse(readFileSync(bracePkg, 'utf-8'));

const desiredExports = {
  '.': './index.js',
  './mode/*': './mode/*.js',
  './mode/*.js': './mode/*.js',
  './theme/*': './theme/*.js',
  './theme/*.js': './theme/*.js',
  './ext/*': './ext/*.js',
  './ext/*.js': './ext/*.js',
  './worker/*': './worker/*.js',
  './worker/*.js': './worker/*.js',
  './keybinding/*': './keybinding/*.js',
  './keybinding/*.js': './keybinding/*.js',
  './snippets/*': './snippets/*.js',
  './snippets/*.js': './snippets/*.js',
};

if (JSON.stringify(pkg.exports) !== JSON.stringify(desiredExports)) {
  pkg.exports = desiredExports;
  writeFileSync(bracePkg, JSON.stringify(pkg, null, 2));
  console.log('Patched brace/package.json with exports map');
} else {
  console.log('brace/package.json already patched');
}

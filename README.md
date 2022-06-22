# Platform Extension Starter

> Starter repository for extensions for Bullhorn 2017

* MASTER BRANCH == static version
* FULLSTACK == full stack version (STILL TODO)

## Getting Started

##### Prerequisites: Node v14.15.x or later

* Clone This
* `npm install` or `yarn install`
* `npm start`


## Upgrade Process

In general, the upgrade process will vary slightly everytime. However, websites such as https://update.angular.io help walk you through the process for each version of Angular. For a concrete example, the entire process of cloning + upgrading from Angular 10 to 13 is detailed below:

1. `git clone x`
2. `npm install`
3. Run `ng update @angular/core@11 @angular/cli@11 --allow-dirty` to take Angular from v10 to v11
4. Run `ng update @angular/core@12 @angular/cli@12 --allow-dirty` to take Angular from v11 to v12
5. Manually update `@angular/cdk` to the Angular 12 version in package.json to fix dependency error
6. `npm install` to install updated `@angular/cdk` and its dependencies
7. `ng update @angular/core@13 @angular/cli@13 --allow-dirty` to take Angular from v12 to v13
8. Update other NPM packages manually in package.json (this was primarily done by looking at packages on https://npmjs.org / text output from `npm install`)
9. `npm install`
10. `ng update novo-elements --migrate-only --from=0.0.0 --to=7.0.0 --force --allow-dirty` to update Novo Elements to v7
11. Manually resolve compile errors (mainly just paths) within Angular app

# Digg / Reddit clone with upvote and downvote

## Description
In this test project is about how to submit topic, that user can upvote and downvote without any filtering multiple vote of user. 20 top topic is listing on bottom of form submit topic.
In this project, I'm using lodash to debounce or waiting for user to stop hitting vote, after that, topic list automaticly sorting by top upvote.

### Front-end
This test project build on top of vuejs framework. That we know, vuejs more easy to build front-end website.

### Back-end
Back-end nodejs build on top of expressjs framework,that more suitable to make back-end for website of any application.

## Project setup 
 - npm install
 - npm run build
 - npm run start

 ### Local Serving
 First time, we need to install all of module that require on this project by run `` npm install `` on terminal or command line. 
 If you have to install all module, run `` npm run build `` to build all vue resource to static resource. all static resource locate in dist path/folder.

 And the last command is `` npm run start `` to start serve all resource and API (application programing interface).

### build for server or hosting
same as local serve, but have some additional action.
- delete package-lock.json and yarn.lock
- replace package.json with example.package.json or just rename example.package.json to package.json
- on `.gitignore` delete text dist or ./dist
- public path, src path, babel config not need on production serve, you can delete all of that.

# STATIC WEBSITES BOILERPLATE

## 1) BASICS
Simple development and production boilerplate for static websites.

This is tailored to be used with heroku.com for pushing only the content of /dist to the main site.

This is opinionated and adapted to static website projects only.



## 2) INITIALISING:

1. Add a title, author and description to both packge.json files.
2. `$ npm run first`
- It deletes the current .git repo
- It creates a git repo for the dev environment and for the live one.
- It installs necessary node modules used by the task runner




## 3) INTERFACE:

- `$ npm run first`: initialising (see above).
- `$ gulp clean `: Cleans the public production folder.
- `$ gulp deploy`: Copies assets + html, css and js files to public folder.
- `$ gulp sass`: same as npm run watch
- `$ gulp watchDev`: Watches for EJS templates and sass files being modified



## 4) CONTENT

### html
A very basic template.

### Sass
Needs node-watch (installed when initialising).

- The folder organisation is heavily based on [Sass Guidelines](http://sass-guidelin.es/).
- The content of the _variables file is set to default value so that the watch command will work right away. These values are not here to match anything, they're just placeholders.
- There are a few heplful functions and mixins in /abstract.
- There is no CSS normalise or reset but some of the rules in /base/base are based on CSS normalise. Other rules are based on my experience.
- /base/typography and layout/container contain rules that I find useful but are opinionated.
- All other files are empty.

### A gulp file
See interface

### Other files
- robots.txt telling crawlers to do their job.

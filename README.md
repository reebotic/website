1. The theme includes a custom Gulp file which can be used to quickly re-compile and minify the theme's SCSS and JS files and also to optimize images. You'll need to install bot Node and Gulp before using included gulpfile.js.
```bash
$ npm install gulp -g
```
After installing Gulp, make sure you've installed the rest of the theme's dependencies:
```bash
$ npm install
```

2. Now you're ready to to modify your source files and run gulp to generate new local dist/ files automatically. We've also included a gulp watch command so it keeps track of changes and compile the files on the fly.

3. Start up a simple http server, if you are using python 3.0, `SimpleHTTPServer` module has been merged into `http.server` 
```bash
$ python -m SimpleHTTPServer 8000
```

4. In browser input
```
http://localhost:8000
```

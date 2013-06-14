# Clean.js

Clean up your JavaScript files

> **Attention** This script overwrites original files, so use version control or some
> form of backup when using.


## Usage

```bash
$ git clone https://github.com/Dignifiedquire/clean.git
$ cd clean
$ npm install
$ ./bin/clean **/*.js
```

## Known Problems

Because of the way [esprima] works the following type of comments are removed 
and added back by hand:

```js
var awesome variable = 10 \\ this comment will be removed
```

All comments that are alone their line are preserved.

[http://esprima.org/]
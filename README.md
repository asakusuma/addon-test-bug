# Addon-test-bug

Reproduces a bug where a file imported in the `include()` hook and then added to the test tree via `postprocessTree()` is not found. This is happening in ember-cli master, but not the 1.13.8.

Simply run `npm install` and then `./node_modules/ember-cli/bin/ember test` and you'll see the error:

  ENOENT, no such file or directory '/Users/akusuma/workspace/opensource/addon-test-bug/tmp/concat_with_maps-input_base_path-HRQDorzQ.tmp/0/my-custom-test-files/test-file.js'

If you downgrade to 1.13.8, you no longer see the error. I included a tree in the `js` tree, which works fine even on master. Both trees are logged. On master, when the error occurs, the test tree is not logged, but the js tree is logged, which seems to indicate that the test tree is not being included soon enough.

If you take a look at [lib/broccoli/ember-app.js](https://github.com/ember-cli/ember-cli/blob/master/lib/broccoli/ember-app.js), the way test imports are handled is different than regular js imports.

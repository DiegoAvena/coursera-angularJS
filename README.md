# coursera-angularJS
Repo containing all coursera angular js tutorials.

# Some quick notes

## Starting Browser sync

> browser-sync start --server --directory --files "**/*"
 
- --server (this is server mode, which means server up all files in the given directory) 

- --directory (directory mode, if there is nothing in directory, it will still display a webpage with the directory structure it sees) 

- --files "**/*" (tells browser sync to track which files have been changed, so it automatically updates for any new changes we make to those files, the **/ means any directory, and * means any file in that directory)

## Closing Browser sync 

> ctrl C
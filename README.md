###Build and publish custom schematics
This project uses Tomas Trajan's blog post on Medium
## dev mode
npm run build:watch

### prod mode 
npm run build

### pack
npm pack will give hello-1.0.0.tgz file which we can copy to Angular CLI workspace project.

### install in angular project 
In the target Angular CLI workspace, run npm i --no-save schematics-hello-1.0.0-tgz 

### To create schematic
ng g hello:hello 'feature/college'


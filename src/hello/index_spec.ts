import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';

const collectionPath = path.join(__dirname, '../collection.json');

describe('schematics', () => {
  it('works', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = await runner.runSchematicAsync('schematics', {}, Tree.empty());
    tree.subscribe((tree) => {
      console.log(tree);
      expect(tree.files).toEqual([]);
    });
  });
});

// import { Tree } from '@angular-devkit/schematics';
// import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
// import * as path from 'path';

// const collectionPath = path.join(__dirname, '../collection.json');

// describe('hello', () => {
//   it('works', () => {
//     const runner = new SchematicTestRunner('schematics', collectionPath);
//     const tree = runner.runSchematic('hello', {}, Tree.empty());

//     expect(tree.files).toEqual([]);
//   });
// });

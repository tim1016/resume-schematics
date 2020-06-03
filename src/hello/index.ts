import { Rule, SchematicContext, Tree, url, apply, template, mergeWith } from '@angular-devkit/schematics';

// import { Schema } from './schema';
import { strings } from '@angular-devkit/core';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function hello(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const sourceTemplates = url('./files');
    const sourceParametrizedTemplates = apply(sourceTemplates, [
      template({
        ..._options,
        ...strings,
      }),
    ]);
    // const { name } = _options;
    // tree.create('hello.js', `console.log('Hello ${name}')`);
    return mergeWith(sourceParametrizedTemplates)(tree, _context);
  };
}

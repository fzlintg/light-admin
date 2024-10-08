import { withInstall } from '@utils';
import codeEditor from './Editor.vue';
import jsonPreview from './json-preview/JsonPreview.vue';

export const CodeEditor = withInstall(codeEditor);
export const JsonPreview = withInstall(jsonPreview);

export * from './typing';

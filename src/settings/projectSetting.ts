import type { ProjectConfig } from '#/config';
import projectSetting from '@settings/projectSetting';
import { merge } from 'lodash-es';

const setting: Partial<ProjectConfig> = {
  showSettingButton: true,
};
export default merge(projectSetting, setting);

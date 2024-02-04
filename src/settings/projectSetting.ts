import type { ProjectConfig } from '#/config';
import projectSetting from '@/settings/projectSetting';
import _ from "lodash-es"
const setting: Partial<ProjectConfig> = {
    // Whether to show the configuration button
    showSettingButton: false

}

export default _.merge(projectSetting, setting)
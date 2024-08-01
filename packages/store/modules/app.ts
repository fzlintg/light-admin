import type {
  ProjectConfig,
  HeaderSetting,
  MenuSetting,
  TransitionSetting,
  MultiTabsSetting,
} from '#/config';
import type { BeforeMiniState, ApiAddress } from '#/store';

import { defineStore } from 'pinia';
import { store } from '@/store';

import { ThemeEnum } from '@enums/appEnum';
import {
  APP_DARK_MODE_KEY,
  PROJ_CFG_KEY,
  API_ADDRESS,
  LIGHT_CFG_KEY,
  LIGHT_CACHE_KEY,
} from '@enums/cacheEnum';
import { Persistent } from '@utils/cache/persistent';
import { darkMode } from '@settings/designSetting';
import { resetRouter } from '@/router';
import { deepMerge } from '@utils';

interface AppState {
  darkMode?: ThemeEnum;
  // Page loading status
  pageLoading: boolean;
  // project config
  projectConfig: ProjectConfig | null;
  // When the window shrinks, remember some states, and restore these states when the window is restored
  beforeMiniInfo: BeforeMiniState;
  lightFormConfig: Object;
  lightFormCache: Object;
}
let timeId: TimeoutHandle;
export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    darkMode: undefined,
    pageLoading: false,
    projectConfig: Persistent.getLocal(PROJ_CFG_KEY),
    beforeMiniInfo: {},
    lightFormConfig: Persistent.getLocal(LIGHT_CFG_KEY) || { mode: true },
    logic: {},
    //   lightFormCache: Persistent.getLocal(LIGHT_CACHE_KEY) || {},
  }),

  getters: {
    getPageLoading(state): boolean {
      return state.pageLoading;
    },
    getDarkMode(state): 'light' | 'dark' | string {
      return state.darkMode || localStorage.getItem(APP_DARK_MODE_KEY) || darkMode;
    },

    getBeforeMiniInfo(state): BeforeMiniState {
      return state.beforeMiniInfo;
    },

    getProjectConfig(state): ProjectConfig {
      return state.projectConfig || ({} as ProjectConfig);
    },

    getHeaderSetting(): HeaderSetting {
      return this.getProjectConfig.headerSetting;
    },
    getMenuSetting(): MenuSetting {
      return this.getProjectConfig.menuSetting;
    },
    getTransitionSetting(): TransitionSetting {
      return this.getProjectConfig.transitionSetting;
    },
    getMultiTabsSetting(): MultiTabsSetting {
      return this.getProjectConfig.multiTabsSetting;
    },
    getApiAddress() {
      return JSON.parse(localStorage.getItem(API_ADDRESS) || '{}');
    },
    getLightFormConfig() {
      return this.lightFormConfig;
    },
    getLogic() {
      return this.logic;
    },
    // getLightFormCache() {
    //   return this.lightFormCache;
    // },
  },
  actions: {
    // setLightFormCache(schemas) {
    //   this.lightFormCache = schemas;
    //   Persistent.setLocal(LIGHT_CACHE_KEY, schemas);
    // },
    setLogic(logic) {
      this.logic = logic;
    },
    setLightFormConfig(config): void {
      this.lightFormConfig = deepMerge(this.lightFormConfig || {}, config);
      //Object.assign(this.lightFormConfig, config);
      Persistent.setLocal(LIGHT_CFG_KEY, this.lightFormConfig);
    },
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading;
    },

    setDarkMode(mode: ThemeEnum): void {
      this.darkMode = mode;
      localStorage.setItem(APP_DARK_MODE_KEY, mode);
    },

    setBeforeMiniInfo(state: BeforeMiniState): void {
      this.beforeMiniInfo = state;
    },

    setProjectConfig(config: DeepPartial<ProjectConfig>): void {
      this.projectConfig = deepMerge(this.projectConfig || {}, config) as ProjectConfig;
      Persistent.setLocal(PROJ_CFG_KEY, this.projectConfig);
    },
    setMenuSetting(setting: Partial<MenuSetting>): void {
      this.projectConfig!.menuSetting = deepMerge(this.projectConfig!.menuSetting, setting);
      Persistent.setLocal(PROJ_CFG_KEY, this.projectConfig);
    },

    async resetAllState() {
      resetRouter();
      Persistent.clearAll();
    },
    async setPageLoadingAction(loading: boolean): Promise<void> {
      if (loading) {
        clearTimeout(timeId);
        // Prevent flicker
        timeId = setTimeout(() => {
          this.setPageLoading(loading);
        }, 50);
      } else {
        this.setPageLoading(loading);
        clearTimeout(timeId);
      }
    },
    setApiAddress(config: ApiAddress): void {
      localStorage.setItem(API_ADDRESS, JSON.stringify(config));
    },
  },
});

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store);
}

// /**
//  * Created by Joe on 15/12/10.
//  */
//
//
// 'use strict';
//
//
// angular
//     .module('texas.poker.config')
//     .config([
//         '$translateProvider',
//         'i18nHelperProvider',
//         function ($translateProvider, i18nHelperProvider) {
//             $translateProvider.useMissingTranslationHandlerLog();
//             $translateProvider.registerAvailableLanguageKeys(
//                 ['zh_CN', 'en_US'], {
//                     'en*': 'en_US',
//                     'zh*': 'zh_CN',
//                     '*': 'en_US' // must be last!
//                 }
//             );
//
//             //$translateProvider.translations('zh_CN', window.xflush_burning['lang.zh_CN']);
//             //$translateProvider.translations('en_US', window.xflush_burning['lang.en_US']);
//
//             //$translateProvider.useSanitizeValueStrategy('sanitize');
//             $translateProvider.fallbackLanguage('zh_CN');
//             $translateProvider.uniformLanguageTag('bcp47');
//             $translateProvider.determinePreferredLanguage(); // 根据浏览器判断语言
//             $translateProvider.useCookieStorage(); // 缓存选择语言到 useCookieStorage
//             $translateProvider.storageKey('X6-LOCALE');
//
//             //tmhDynamicLocaleProvider.localeLocationPattern('https://a.alipayobjects.com/flaming-cloud/angular-1.4.0/angular-i18n/angular-locale_{{locale}}.js');
//
//             i18nHelperProvider.defaults.locale = 'zh-cn';
//         }
//     ]);
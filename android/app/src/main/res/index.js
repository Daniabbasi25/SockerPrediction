/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import "intl";
import "intl/locale-data/jsonp/en";
import {
    en,
    // fr,
    // nl,
    // de,
    // pl,
    // pt,
    // ar,
    // ko
    // fr
    // enGB,
    registerTranslation,
  } from 'react-native-paper-dates'

  registerTranslation('en', en)

AppRegistry.registerComponent(appName, () => App);

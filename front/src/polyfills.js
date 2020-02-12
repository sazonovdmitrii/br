import 'promise-polyfill/src/polyfill';
import 'regenerator-runtime/runtime';
import 'unfetch/polyfill';

// for https://github.com/verlok/lazyload
// import 'intersection-observer';
// import 'custom-event-polyfill'; // for https://github.com/verlok/lazyload
// import '@formatjs/intl-relativetimeformat/polyfill';

// Support for...of (a commonly used syntax feature that requires Symbols)
import 'core-js/fn/symbol';
// Support iterable spread (...Set, ...Map)
import 'core-js/fn/array/from';

import 'core-js/fn/array/find';
import 'core-js/fn/object/keys';
import 'core-js/fn/object/values';
import 'core-js/fn/object/entries';
import 'core-js/fn/weak-map';
// import 'core-js/fn/url-search-params';

Object.assign = require('object-assign');

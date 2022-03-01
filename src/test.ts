// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone-testing';

import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

import { getTestBed } from '@angular/core/testing';

declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
);
jasmine.getEnv().configure({ hideDisabled: true });
jasmine.getEnv().addReporter({
    suiteDone() {
        // Clear the styles after each test suite.
        const head: HTMLHeadElement = document.getElementsByTagName("head")[0];
        const styles: HTMLCollectionOf<HTMLStyleElement> = head.getElementsByTagName("style");
        for (let i = 0; i < styles.length; i++) {
            head.removeChild(styles[i]);
        }
    }
});

beforeAll(() => {
    window.onbeforeunload = jasmine.createSpy('beforeunload');
});

// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);

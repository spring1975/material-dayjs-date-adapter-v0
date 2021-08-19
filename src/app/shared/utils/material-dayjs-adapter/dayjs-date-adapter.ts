import { Optional, Inject, InjectionToken } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import utc from 'dayjs/plugin/utc';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import arraySupport from 'dayjs/plugin/arraySupport';

/**
 * Pulled from https://github.com/tabuckner/material-dayjs-adapter, then modified to satisfy tests
 */
export interface DayJsDateAdapterOptions {
    /**
     * Turns the use of utc dates on or off.
     * Changing this will change how Angular Material components like DatePicker output dates.
     * {@default false}
     */
    useUtc?: boolean;
}

export const MAT_DAYJS_DATE_ADAPTER_OPTIONS_FACTORY = (): DayJsDateAdapterOptions =>
({
    useUtc: true
});

/** InjectionToken for Dayjs date adapter to configure options. */
export const MAT_DAYJS_DATE_ADAPTER_OPTIONS = new InjectionToken<DayJsDateAdapterOptions>(
    'MAT_DAYJS_DATE_ADAPTER_OPTIONS', {
    providedIn: 'root',
    factory: MAT_DAYJS_DATE_ADAPTER_OPTIONS_FACTORY
});


/** Creates an array and fills it with values. */
const range = <T>(length: number, valueFunction: (index: number) => T): T[] => {
    const valuesArray = Array(length);
    for (let i = 0; i < length; i++) {
        valuesArray[i] = valueFunction(i);
    }
    return valuesArray;
};

interface LocaleData {
    dates: string[];
    firstDayOfWeek: number;
    longDaysOfWeek: string[];
    longMonths: string[];
    narrowDaysOfWeek: string[];
    shortDaysOfWeek: string[];
    shortMonths: string[];
}


/** Adapts Dayjs Dates for use with Angular Material. */
export class DayjsDateAdapter extends DateAdapter<dayjs.Dayjs> {
    private localeData: LocaleData;

    constructor(
        @Optional() @Inject(MAT_DATE_LOCALE) public dateLocale: string,
        @Optional() @Inject(MAT_DAYJS_DATE_ADAPTER_OPTIONS) private readonly options?: DayJsDateAdapterOptions
    ) {
        super();

        this.localeData = this.initializeParser(dateLocale);
    }

    setLocale(locale: string): LocaleData {
        super.setLocale(locale);
        const dayJsLocaleData = this.dayJs().localeData();
        this.localeData = {
            firstDayOfWeek: dayJsLocaleData.firstDayOfWeek(),
            longMonths: dayJsLocaleData.months(),
            shortMonths: dayJsLocaleData.monthsShort(),
            dates: range(31, (i) => this.createDate(2017, 0, i + 1).format('D')),
            longDaysOfWeek: range(7, (i) => this.dayJs().set('day', i).format('dddd')),
            shortDaysOfWeek: dayJsLocaleData.weekdaysShort(),
            narrowDaysOfWeek: dayJsLocaleData.weekdaysMin(),
        };
        return this.localeData;
    }

    getYear(date: dayjs.Dayjs): number {
        return this.dayJs(date).year();
    }

    getMonth(date: dayjs.Dayjs): number {
        return this.dayJs(date).month();
    }

    getDate(date: dayjs.Dayjs): number {
        return this.dayJs(date).date();
    }

    getDayOfWeek(date: dayjs.Dayjs): number {
        return this.dayJs(date).day();
    }

    getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
        return style === 'long' ? this.localeData.longMonths : this.localeData.shortMonths;
    }

    getDateNames(): string[] {
        return this.localeData.dates;
    }

    getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
        if (style === 'long') {
            return this.localeData.longDaysOfWeek;
        }
        if (style === 'short') {
            return this.localeData.shortDaysOfWeek;
        }
        return this.localeData.narrowDaysOfWeek;
    }

    getYearName(date: dayjs.Dayjs): string {
        return this.dayJs(date).format('YYYY');
    }

    getFirstDayOfWeek(): number {
        return this.localeData.firstDayOfWeek;
    }

    getNumDaysInMonth(date: dayjs.Dayjs): number {
        return this.dayJs(date).daysInMonth();
    }

    clone(date: dayjs.Dayjs): dayjs.Dayjs {
        return date.clone();
    }

    createDate(year: number, month: number, date: number): dayjs.Dayjs {
        // dayjs will create an invalid date if any of the components are out of bounds, but we
        // explicitly check each case so we can throw more descriptive errors.
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
            if (month < 0 || month > 11) {
                throw Error(`Invalid month index "${month}". Month index has to be between 0 and 11.`);
            }

            if (date < 1) {
                throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
            }

            if (date > 31) {
                throw Error(`Invalid date "${date}". Date has to be less than 32.`);
            }
        }
        const result = this.dayJs([year, month, date]).locale(this.locale).startOf('day');

        // If the result isn't valid, the date must have been out of bounds for this month.
        if (!result.isValid() && (typeof ngDevMode === 'undefined' || ngDevMode)) {
            throw Error(`Invalid date "${date}" for month with index "${month}".`);
        }
        return result;
    }

    today(): dayjs.Dayjs {
        return this.dayJs();
    }

    parse(value: any, parseFormat?: string | string[]): dayjs.Dayjs | null {
        return (value && typeof value === 'string')
            ? this.dayJs(value, parseFormat, this.locale)
            : value
                ? this.dayJs(value, this.locale)
                : null;
    }

    format(date: dayjs.Dayjs, displayFormat: string): string {
        if (!this.isValid(date)) {
            throw Error('DayjsDateAdapter: Cannot format invalid date.');
        }
        return date.locale(this.locale).format(displayFormat);
    }

    addCalendarYears(date: dayjs.Dayjs, years: number): dayjs.Dayjs {
        return date.add(years, 'year');
    }

    addCalendarMonths(date: dayjs.Dayjs, months: number): dayjs.Dayjs {
        return date.add(months, 'month');
    }

    addCalendarDays(date: dayjs.Dayjs, days: number): dayjs.Dayjs {
        return date.add(days, 'day');
    }

    toIso8601(date: dayjs.Dayjs): string {
        return date.toISOString();
    }

    /**
     * Attempts to deserialize a value to a valid date object. This is different from parsing in that
     * deserialize should only accept non-ambiguous, locale-independent formats (e.g. a ISO 8601
     * string). The default implementation does not allow any deserialization, it simply checks that
     * the given value is already a valid date object or null. The `<mat-datepicker>` will call this
     * method on all of it's `@Input()` properties that accept dates. It is therefore possible to
     * support passing values from your backend directly to these properties by overriding this method
     * to also deserialize the format used by your backend.
     *
     * @param value The value to be deserialized into a date object.
     * @returns The deserialized date object, either a valid date, null if the value can be
     *     deserialized into a null date (e.g. the empty string), or an invalid date.
     */
    deserialize(value: any): dayjs.Dayjs | null {
        let date;
        if (value instanceof Date) {
            date = this.dayJs(value);
        } else if (this.isDateInstance(value)) {
            // NOTE: assumes that cloning also sets the correct locale.
            return this.clone(value);
        }
        if (typeof value === 'string') {
            if (!value) {
                return null;
            }
            date = this.dayJs(value, '');
        }
        if (date && this.isValid(date)) {
            return this.dayJs(date);
        }
        return super.deserialize(value);
    }

    isDateInstance(obj: any): boolean {
        return dayjs.isDayjs(obj);
    }

    isValid(date: dayjs.Dayjs): boolean {
        return this.dayJs(date).isValid();
    }

    invalid(): dayjs.Dayjs {
        return this.dayJs(null);
    }

    private dayJs(input?: any, format?: string | string[], locale?: string): dayjs.Dayjs {
        const result = (input instanceof Date || typeof input === 'number' || !format)
            ? dayjs(input, locale)
            : dayjs(input, format, locale);

        return !this.shouldUseUtc
            ? result
            : result.utc();
    }

    private get shouldUseUtc(): boolean {
        const { useUtc }: DayJsDateAdapterOptions = this.options || {};
        return !!useUtc;
    }

    private initializeParser(dateLocale: string): LocaleData {
        // if (this.shouldUseUtc) {
        dayjs.extend(utc);
        // }

        dayjs.extend(LocalizedFormat);
        dayjs.extend(customParseFormat);
        dayjs.extend(localeData);
        dayjs.extend(arraySupport);

        return this.setLocale(dateLocale);
    }
}

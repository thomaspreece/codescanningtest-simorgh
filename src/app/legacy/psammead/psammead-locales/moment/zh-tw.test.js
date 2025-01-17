import moment from 'moment';
import './zh-tw';

moment.locale('zh-tw');

// This assert overrides the gunit assertion done in the moment codebase.
// Format and styling of this file has been keep consistent with the official moment tests.
// An example of these tests can be seen at https://github.com/moment/moment/blob/develop/src/test/locale/zh-tw.js
const assert = {
  equal: (val1, val2, scenario) =>
    it(scenario, () => expect(val1).toEqual(val2)),
};

describe('zh-tw', () => {
  describe('parse', () => {
    const tests =
      '一月 1月_二月 2月_三月 3月_四月 4月_五月 5月_六月 6月_七月 7月_八月 8月_九月 9月_十月 10月_十一月 11月_十二月 12月'.split(
        '_'
      );

    function equalTest(input, mmm, i) {
      assert.equal(
        moment(input, mmm).month(),
        i,
        `${input} should be month ${i + 1}`
      );
    }

    let i;
    for (i = 0; i < 12; i += 1) {
      tests[i] = tests[i].split(' ');
      equalTest(tests[i][0], 'MMM', i);
      equalTest(tests[i][1], 'MMM', i);
      equalTest(tests[i][0], 'MMMM', i);
      equalTest(tests[i][1], 'MMMM', i);
      equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
      equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
      equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
      equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
    }
  });

  const a = [
    ['dddd, MMMM Do YYYY, a h:mm:ss', '星期日, 二月 14日 2010, 下午 3:25:50'],
    ['ddd, Ah', '週日, 下午3'],
    ['M Mo MM MMMM MMM', '2 2月 02 二月 2月'],
    ['YYYY YY', '2010 10'],
    ['D Do DD', '14 14日 14'],
    ['d do dddd ddd dd', '0 0日 星期日 週日 日'],
    ['DDD DDDo DDDD', '45 45日 045'],
    ['w wo ww', '8 8週 08'],
    ['h hh', '3 03'],
    ['H HH', '15 15'],
    ['m mm', '25 25'],
    ['s ss', '50 50'],
    ['a A', '下午 下午'],
    ['[這年的第] DDDo', '這年的第 45日'],
    ['LTS', '15:25:50'],
    ['L', '2010/02/14'],
    ['LL', '2010年2月14日'],
    ['LLL', '2010年2月14日下午3時25分'],
    ['LLLL', '2010年2月14日星期日 15:25'],
    ['l', '2010/2/14'],
    ['ll', '2010年2月14日'],
    ['lll', '2010年2月14日 15:25'],
    ['llll', '2010年2月14日星期日 15:25'],
  ];

  describe.each(a)('format %s', (formatString, expectedDate) => {
    const b = moment(new Date(2010, 1, 14, 15, 25, 50, 125));
    assert.equal(
      b.format(formatString),
      expectedDate,
      `${formatString} ---> ${expectedDate}`
    );
  });

  describe('format ordinal', () => {
    assert.equal(moment([2011, 0, 1]).format('DDDo'), '1日', '1日');
    assert.equal(moment([2011, 0, 2]).format('DDDo'), '2日', '2日');
    assert.equal(moment([2011, 0, 3]).format('DDDo'), '3日', '3日');
    assert.equal(moment([2011, 0, 4]).format('DDDo'), '4日', '4日');
    assert.equal(moment([2011, 0, 5]).format('DDDo'), '5日', '5日');
    assert.equal(moment([2011, 0, 6]).format('DDDo'), '6日', '6日');
    assert.equal(moment([2011, 0, 7]).format('DDDo'), '7日', '7日');
    assert.equal(moment([2011, 0, 8]).format('DDDo'), '8日', '8日');
    assert.equal(moment([2011, 0, 9]).format('DDDo'), '9日', '9日');
    assert.equal(moment([2011, 0, 10]).format('DDDo'), '10日', '10日');

    assert.equal(moment([2011, 0, 11]).format('DDDo'), '11日', '11日');
    assert.equal(moment([2011, 0, 12]).format('DDDo'), '12日', '12日');
    assert.equal(moment([2011, 0, 13]).format('DDDo'), '13日', '13日');
    assert.equal(moment([2011, 0, 14]).format('DDDo'), '14日', '14日');
    assert.equal(moment([2011, 0, 15]).format('DDDo'), '15日', '15日');
    assert.equal(moment([2011, 0, 16]).format('DDDo'), '16日', '16日');
    assert.equal(moment([2011, 0, 17]).format('DDDo'), '17日', '17日');
    assert.equal(moment([2011, 0, 18]).format('DDDo'), '18日', '18日');
    assert.equal(moment([2011, 0, 19]).format('DDDo'), '19日', '19日');
    assert.equal(moment([2011, 0, 20]).format('DDDo'), '20日', '20日');

    assert.equal(moment([2011, 0, 21]).format('DDDo'), '21日', '21日');
    assert.equal(moment([2011, 0, 22]).format('DDDo'), '22日', '22日');
    assert.equal(moment([2011, 0, 23]).format('DDDo'), '23日', '23日');
    assert.equal(moment([2011, 0, 24]).format('DDDo'), '24日', '24日');
    assert.equal(moment([2011, 0, 25]).format('DDDo'), '25日', '25日');
    assert.equal(moment([2011, 0, 26]).format('DDDo'), '26日', '26日');
    assert.equal(moment([2011, 0, 27]).format('DDDo'), '27日', '27日');
    assert.equal(moment([2011, 0, 28]).format('DDDo'), '28日', '28日');
    assert.equal(moment([2011, 0, 29]).format('DDDo'), '29日', '29日');
    assert.equal(moment([2011, 0, 30]).format('DDDo'), '30日', '30日');

    assert.equal(moment([2011, 0, 31]).format('DDDo'), '31日', '31日');
  });

  describe('format month', () => {
    const expected =
      '一月 1月_二月 2月_三月 3月_四月 4月_五月 5月_六月 6月_七月 7月_八月 8月_九月 9月_十月 10月_十一月 11月_十二月 12月'.split(
        '_'
      );
    let i;
    for (i = 0; i < expected.length; i += 1) {
      assert.equal(
        moment([2011, i, 1]).format('MMMM MMM'),
        expected[i],
        expected[i]
      );
    }
  });

  describe('format week', () => {
    const expected =
      '星期日 週日 日_星期一 週一 一_星期二 週二 二_星期三 週三 三_星期四 週四 四_星期五 週五 五_星期六 週六 六'.split(
        '_'
      );
    let i;
    for (i = 0; i < expected.length; i += 1) {
      assert.equal(
        moment([2011, 0, 2 + i]).format('dddd ddd dd'),
        expected[i],
        expected[i]
      );
    }
  });

  describe('from', () => {
    const start = moment([2007, 1, 28]);
    assert.equal(
      start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
      '1 分鐘',
      '45 seconds = a minute'
    );
    assert.equal(
      start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
      '1 分鐘',
      '89 seconds = a minute'
    );
    assert.equal(
      start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
      '2 分鐘',
      '90 seconds = 2 minutes'
    );
    assert.equal(
      start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
      '44 分鐘',
      '44 minutes = 44 minutes'
    );
    assert.equal(
      start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
      '1 小時',
      '45 minutes = an hour'
    );
    assert.equal(
      start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
      '1 小時',
      '89 minutes = an hour'
    );
    assert.equal(
      start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
      '2 小時',
      '90 minutes = 2 hours'
    );
    assert.equal(
      start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
      '5 小時',
      '5 hours = 5 hours'
    );
    assert.equal(
      start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
      '21 小時',
      '21 hours = 21 hours'
    );
    assert.equal(
      start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
      '1 天',
      '22 hours = a day'
    );
    assert.equal(
      start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
      '1 天',
      '35 hours = a day'
    );
    assert.equal(
      start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
      '2 天',
      '36 hours = 2 days'
    );
    assert.equal(
      start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
      '1 天',
      '1 day = a day'
    );
    assert.equal(
      start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
      '5 天',
      '5 days = 5 days'
    );
    assert.equal(
      start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
      '25 天',
      '25 days = 25 days'
    );
    assert.equal(
      start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
      '1 個月',
      '26 days = a month'
    );
    assert.equal(
      start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
      '1 個月',
      '30 days = a month'
    );
    assert.equal(
      start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
      '1 個月',
      '43 days = a month'
    );
    assert.equal(
      start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
      '2 個月',
      '46 days = 2 months'
    );
    assert.equal(
      start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
      '2 個月',
      '75 days = 2 months'
    );
    assert.equal(
      start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
      '3 個月',
      '76 days = 3 months'
    );
    assert.equal(
      start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
      '1 個月',
      '1 month = a month'
    );
    assert.equal(
      start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
      '5 個月',
      '5 months = 5 months'
    );
    assert.equal(
      start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
      '1 年',
      '345 days = a year'
    );
    assert.equal(
      start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
      '2 年',
      '548 days = 2 years'
    );
    assert.equal(
      start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
      '1 年',
      '1 year = a year'
    );
    assert.equal(
      start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
      '5 年',
      '5 years = 5 years'
    );
  });

  describe('suffix', () => {
    assert.equal(moment(30000).from(0), '幾秒後', 'prefix');
    assert.equal(moment(0).from(30000), '幾秒前', 'prefix');
  });

  describe('now from now', () => {
    assert.equal(
      moment().fromNow(),
      '幾秒前',
      'now from now should display as in the past'
    );
  });

  describe('fromNow', () => {
    assert.equal(
      moment().add({ s: 30 }).fromNow(),
      '幾秒後',
      'in a few seconds'
    );
    assert.equal(moment().add({ d: 5 }).fromNow(), '5 天後', 'in 5 days');
  });

  describe('calendar day', () => {
    const calendarTime = moment().hours(12).minutes(0).seconds(0);

    assert.equal(
      moment(calendarTime).calendar(),
      '今天 12:00',
      'today at the same time'
    );
    assert.equal(
      moment(calendarTime).add({ m: 25 }).calendar(),
      '今天 12:25',
      'Now plus 25 min'
    );
    assert.equal(
      moment(calendarTime).add({ h: 1 }).calendar(),
      '今天 13:00',
      'Now plus 1 hour'
    );
    assert.equal(
      moment(calendarTime).add({ d: 1 }).calendar(),
      '明天 12:00',
      'tomorrow at the same time'
    );
    assert.equal(
      moment(calendarTime).subtract({ h: 1 }).calendar(),
      '今天 11:00',
      'Now minus 1 hour'
    );
    assert.equal(
      moment(calendarTime).subtract({ d: 1 }).calendar(),
      '昨天 12:00',
      'yesterday at the same time'
    );
  });

  describe('calendar next week', () => {
    let i;
    let m;

    for (i = 2; i < 7; i += 1) {
      m = moment().add({ d: i });
      assert.equal(
        m.calendar(),
        m.format('[下]dddd LT'),
        `Today + ${i} days current time`
      );
      m.hours(0).minutes(0).seconds(0).milliseconds(0);
      assert.equal(
        m.calendar(),
        m.format('[下]dddd LT'),
        `Today + ${i} days beginning of day`
      );
      m.hours(23).minutes(59).seconds(59).milliseconds(999);
      assert.equal(
        m.calendar(),
        m.format('[下]dddd LT'),
        `Today + ${i} days end of day`
      );
    }
  });

  describe('calendar last week', () => {
    let i;
    let m;

    for (i = 2; i < 7; i += 1) {
      m = moment().subtract({ d: i });
      assert.equal(
        m.calendar(),
        m.format('[上]dddd LT'),
        `Today - ${i} days current time`
      );
      m.hours(0).minutes(0).seconds(0).milliseconds(0);
      assert.equal(
        m.calendar(),
        m.format('[上]dddd LT'),
        `Today - ${i} days beginning of day`
      );
      m.hours(23).minutes(59).seconds(59).milliseconds(999);
      assert.equal(
        m.calendar(),
        m.format('[上]dddd LT'),
        `Today - ${i} days end of day`
      );
    }
  });

  describe('calendar all else', () => {
    let weeksAgo = moment().subtract({ w: 1 });
    let weeksFromNow = moment().add({ w: 1 });

    assert.equal(weeksAgo.calendar(), weeksAgo.format('L'), '1 week ago');
    assert.equal(
      weeksFromNow.calendar(),
      weeksFromNow.format('L'),
      'in 1 week'
    );

    weeksAgo = moment().subtract({ w: 2 });
    weeksFromNow = moment().add({ w: 2 });

    assert.equal(weeksAgo.calendar(), weeksAgo.format('L'), '2 weeks ago');
    assert.equal(
      weeksFromNow.calendar(),
      weeksFromNow.format('L'),
      'in 2 weeks'
    );
  });

  describe('weeks year starting sunday formatted', () => {
    assert.equal(
      moment([2012, 0, 1]).format('w ww wo'),
      '1 01 1週',
      'Jan  1 2012 應該是第 1週'
    );
    assert.equal(
      moment([2012, 0, 7]).format('w ww wo'),
      '1 01 1週',
      'Jan  7 2012 應該是第 1週'
    );
    assert.equal(
      moment([2012, 0, 8]).format('w ww wo'),
      '2 02 2週',
      'Jan  8 2012 應該是第 2週'
    );
    assert.equal(
      moment([2012, 0, 14]).format('w ww wo'),
      '2 02 2週',
      'Jan 14 2012 應該是第 2週'
    );
    assert.equal(
      moment([2012, 0, 15]).format('w ww wo'),
      '3 03 3週',
      'Jan 15 2012 應該是第 3週'
    );
  });
});

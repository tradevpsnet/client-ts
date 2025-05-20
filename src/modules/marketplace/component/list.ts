export enum Importance {
  NONE = 0,
  LOW = 1,
  MODERATE = 2,
  HIGH = 3
}

export const ImportanceMapFa = {
  [Importance.NONE]: {
    label: 'بدون اهمیت',
    description: 'رویدادی با اهمیت ناچیز.',
    variant: 'default'
  },
  [Importance.LOW]: {
    label: 'کم اهمیت',
    description: 'رویدادی با تاثیر اندک بر بازار.',
    variant: 'info'
  },
  [Importance.MODERATE]: {
    label: 'اهمیت متوسط',
    description: 'رویدادی با احتمال تاثیر بر بازار.',
    variant: 'warning'
  },
  [Importance.HIGH]: {
    label: 'بسیار مهم',
    description: 'رویدادی با تاثیر زیاد بر بازار.',
    variant: 'danger'
  }
};

export enum Impact {
  NA = 0,
  POSITIVE = 1,
  NEGATIVE = 2
}

export const ImpactMapFa = {
  [Impact.NA]: {
    label: 'بدون تاثیر مشخص',
    description: 'تاثیر مشخصی بر بازار ندارد.',
    variant: 'default'
  },
  [Impact.POSITIVE]: {
    label: 'تاثیر مثبت',
    description: 'تاثیر مثبت بر بازار.',
    variant: 'success'
  },
  [Impact.NEGATIVE]: {
    label: 'تاثیر منفی',
    description: 'تاثیر منفی بر بازار.',
    variant: 'danger'
  }
};

export enum Frequency {
  NONE = 0,
  WEEK = 1,
  MONTH = 2,
  QUARTER = 3,
  YEAR = 4,
  DAY = 5
}

export const FrequencyMapFa = {
  [Frequency.NONE]: {
    label: 'بدون تکرار',
    description: 'رویدادی بدون تکرار منظم.',
    variant: 'info'
  },
  [Frequency.WEEK]: {
    label: 'هفتگی',
    description: 'رویداد تکرارشونده هفتگی.',
    variant: 'info'
  },
  [Frequency.MONTH]: {
    label: 'ماهانه',
    description: 'رویداد تکرارشونده ماهانه.',
    variant: 'info'
  },
  [Frequency.QUARTER]: {
    label: 'فصلی',
    description: 'رویداد تکرارشونده فصلی.',
    variant: 'info'
  },
  [Frequency.YEAR]: {
    label: 'سالانه',
    description: 'رویداد تکرارشونده سالانه.',
    variant: 'info'
  },
  [Frequency.DAY]: {
    label: 'روزانه',
    description: 'رویداد تکرارشونده روزانه.',
    variant: 'info'
  }
};

export enum Multiplier {
  NONE = 0,
  THOUSANDS = 1,
  MILLIONS = 2,
  BILLIONS = 3,
  TRILLIONS = 4
}

export const MultiplierMapFa = {
  [Multiplier.NONE]: {
    label: 'بدون ضریب',
    description: 'عدد بدون تغییر است.',
    variant: 'default'
  },
  [Multiplier.THOUSANDS]: {
    label: 'هزار',
    description: 'عدد در هزار ضرب شده است.',
    variant: 'info'
  },
  [Multiplier.MILLIONS]: {
    label: 'میلیون',
    description: 'عدد در یک میلیون ضرب شده است.',
    variant: 'info'
  },
  [Multiplier.BILLIONS]: {
    label: 'میلیارد',
    description: 'عدد در یک میلیارد ضرب شده است.',
    variant: 'warning'
  },
  [Multiplier.TRILLIONS]: {
    label: 'تریلیون',
    description: 'عدد در یک تریلیون ضرب شده است.',
    variant: 'danger'
  }
};

export enum Sector {
  NONE = 0,
  MARKET = 1,
  GDP = 2,
  JOBS = 3,
  PRICES = 4,
  MONEY = 5,
  TRADE = 6,
  GOVERNMENT = 7,
  BUSINESS = 8,
  CONSUMER = 9,
  HOUSING = 10,
  TAXES = 11,
  HOLIDAYS = 12
}

export const SectorMapFa = {
  [Sector.NONE]: {label: 'نامشخص', description: 'بخش اقتصادی خاصی مشخص نشده.', variant: 'default'},
  [Sector.MARKET]: {label: 'بازار', description: 'شاخص‌ها و رویدادهای مربوط به بازار.', variant: 'info'},
  [Sector.GDP]: {label: 'تولید ناخالص داخلی', description: 'اندازه‌گیری عملکرد اقتصادی.', variant: 'info'},
  [Sector.JOBS]: {label: 'شغل', description: 'نرخ بیکاری، اشتغال و نیروی کار.', variant: 'info'},
  [Sector.PRICES]: {label: 'قیمت‌ها', description: 'تورم، CPI، PPI.', variant: 'info'},
  [Sector.MONEY]: {label: 'پول', description: 'سیاست پولی، نرخ بهره، نقدینگی.', variant: 'info'},
  [Sector.TRADE]: {label: 'تجارت', description: 'صادرات، واردات، تراز تجاری.', variant: 'info'},
  [Sector.GOVERNMENT]: {label: 'دولت', description: 'بودجه، هزینه‌ها، سیاست‌های مالی.', variant: 'info'},
  [Sector.BUSINESS]: {label: 'کسب‌وکار', description: 'تولید، خدمات و فعالیت‌های تجاری.', variant: 'info'},
  [Sector.CONSUMER]: {label: 'مصرف‌کننده', description: 'فروش، احساسات و مخارج مصرف‌کننده.', variant: 'info'},
  [Sector.HOUSING]: {label: 'مسکن', description: 'بازار مسکن، ساخت و ساز، املاک.', variant: 'info'},
  [Sector.TAXES]: {label: 'مالیات', description: 'سیاست‌ها و اطلاعیه‌های مالیاتی.', variant: 'info'},
  [Sector.HOLIDAYS]: {label: 'تعطیلات', description: 'تعطیلات رسمی و بسته بودن بازارها.', variant: 'default'}
};

export enum TimeMode {
  DATETIME = 0,
  DATE = 1,
  NO_TIME = 2,
  TENTATIVE = 3
}

export const TimeModeMapFa = {
  [TimeMode.DATETIME]: {label: 'تاریخ و زمان دقیق', description: 'تاریخ و زمان دقیق مشخص شده است.', variant: 'info'},
  [TimeMode.DATE]: {label: 'فقط تاریخ', description: 'تنها تاریخ مشخص شده است.', variant: 'info'},
  [TimeMode.NO_TIME]: {label: 'زمان مشخص نیست', description: 'زمان دقیق مشخص نیست.', variant: 'warning'},
  [TimeMode.TENTATIVE]: {
    label: 'موقت',
    description: 'زمان به‌صورت موقت مشخص شده و ممکن است تغییر کند.',
    variant: 'warning'
  }
};

export enum EventType {
  EVENT = 0,
  INDICATOR = 1,
  HOLIDAY = 2
}

export const EventTypeMapFa = {
  [EventType.EVENT]: {label: 'رویداد', description: 'رویداد اقتصادی مانند جلسه بانک مرکزی.', variant: 'info'},
  [EventType.INDICATOR]: {label: 'شاخص', description: 'شاخص اقتصادی مانند تولید ناخالص داخلی.', variant: 'warning'},
  [EventType.HOLIDAY]: {label: 'تعطیلات', description: 'تعطیلات بازار یا بانک‌ها.', variant: 'default'}
};

export enum Unit {
  NONE = 0,
  PERCENT = 1,
  CURRENCY = 2,
  HOUR = 3,
  JOB = 4,
  RIG = 5,
  USD = 6,
  PEOPLE = 7,
  MORTGAGE = 8,
  VOTE = 9,
  BARREL = 10,
  CUBIC_FEET = 11,
  POSITION = 12,
  BUILDING = 13
}

export const UnitMapFa = {
  [Unit.NONE]: {label: 'بدون واحد', description: 'واحد خاصی مشخص نشده است.', variant: 'default'},
  [Unit.PERCENT]: {label: 'درصد', description: 'درصد (%)', variant: 'info'},
  [Unit.CURRENCY]: {label: 'واحد پولی', description: 'وابسته به ارز تعیین شده.', variant: 'info'},
  [Unit.HOUR]: {label: 'ساعت', description: 'ساعت زمان.', variant: 'info'},
  [Unit.JOB]: {label: 'شغل', description: 'تعداد شغل‌ها.', variant: 'info'},
  [Unit.RIG]: {label: 'دکل حفاری', description: 'تعداد دکل‌های نفتی.', variant: 'info'},
  [Unit.USD]: {label: 'دلار آمریکا', description: 'دلار آمریکا بدون توجه به کشور.', variant: 'info'},
  [Unit.PEOPLE]: {label: 'نفر', description: 'تعداد افراد.', variant: 'info'},
  [Unit.MORTGAGE]: {label: 'وام مسکن', description: 'تعداد وام‌های مسکن.', variant: 'info'},
  [Unit.VOTE]: {label: 'رای', description: 'تعداد رای‌ها.', variant: 'info'},
  [Unit.BARREL]: {label: 'بشکه', description: 'تعداد بشکه (معمولاً برای نفت).', variant: 'info'},
  [Unit.CUBIC_FEET]: {label: 'فوت مکعب', description: 'حجم به فوت مکعب (گاز طبیعی).', variant: 'info'},
  [Unit.POSITION]: {label: 'موقعیت', description: 'تعداد موقعیت‌ها.', variant: 'info'},
  [Unit.BUILDING]: {label: 'ساختمان', description: 'تعداد ساختمان‌ها.', variant: 'info'}
};


export const ImportanceMap = {
  [Importance.NONE]: {
    label: 'No Importance',
    description: 'Event with negligible importance.',
    variant: 'default'
  },
  [Importance.LOW]: {
    label: 'Low Importance',
    description: 'Event with minor market impact.',
    variant: 'info'
  },
  [Importance.MODERATE]: {
    label: 'Moderate Importance',
    description: 'Event with potential market impact.',
    variant: 'warning'
  },
  [Importance.HIGH]: {
    label: 'High Importance',
    description: 'Event with significant market impact.',
    variant: 'danger'
  }
};



export const ImpactMap = {
  [Impact.NA]: {
    label: 'No Clear Impact',
    description: 'No clear market impact.',
    variant: 'default'
  },
  [Impact.POSITIVE]: {
    label: 'Positive Impact',
    description: 'Positive market impact.',
    variant: 'success'
  },
  [Impact.NEGATIVE]: {
    label: 'Negative Impact',
    description: 'Negative market impact.',
    variant: 'danger'
  }
};


export const FrequencyMap = {
  [Frequency.NONE]: {
    label: 'Non-recurring',
    description: 'Event without regular recurrence.',
    variant: 'info'
  },
  [Frequency.WEEK]: {
    label: 'Weekly',
    description: 'Weekly recurring event.',
    variant: 'info'
  },
  [Frequency.MONTH]: {
    label: 'Monthly',
    description: 'Monthly recurring event.',
    variant: 'info'
  },
  [Frequency.QUARTER]: {
    label: 'Quarterly',
    description: 'Quarterly recurring event.',
    variant: 'info'
  },
  [Frequency.YEAR]: {
    label: 'Yearly',
    description: 'Yearly recurring event.',
    variant: 'info'
  },
  [Frequency.DAY]: {
    label: 'Daily',
    description: 'Daily recurring event.',
    variant: 'info'
  }
};



export const MultiplierMap = {
  [Multiplier.NONE]: {
    label: 'No multiplier',
    description: 'Number is unchanged.',
    variant: 'default'
  },
  [Multiplier.THOUSANDS]: {
    label: 'Thousand',
    description: 'Number is multiplied by thousand.',
    variant: 'info'
  },
  [Multiplier.MILLIONS]: {
    label: 'Million',
    description: 'Number is multiplied by million.',
    variant: 'info'
  },
  [Multiplier.BILLIONS]: {
    label: 'Billion',
    description: 'Number is multiplied by billion.',
    variant: 'warning'
  },
  [Multiplier.TRILLIONS]: {
    label: 'Trillion',
    description: 'Number is multiplied by trillion.',
    variant: 'danger'
  }
};


export const SectorMap = {
  [Sector.NONE]: {label: 'Unspecified', description: 'No specific economic sector specified.', variant: 'default'},
  [Sector.MARKET]: {label: 'Market', description: 'Market indices and related events.', variant: 'info'},
  [Sector.GDP]: {label: 'GDP', description: 'Economic performance measurement.', variant: 'info'},
  [Sector.JOBS]: {label: 'Employment', description: 'Unemployment rate, employment, labor force.', variant: 'info'},
  [Sector.PRICES]: {label: 'Prices', description: 'Inflation, CPI, PPI.', variant: 'info'},
  [Sector.MONEY]: {label: 'Monetary', description: 'Monetary policy, interest rates, liquidity.', variant: 'info'},
  [Sector.TRADE]: {label: 'Trade', description: 'Exports, imports, trade balance.', variant: 'info'},
  [Sector.GOVERNMENT]: {label: 'Government', description: 'Budget, expenditures, fiscal policies.', variant: 'info'},
  [Sector.BUSINESS]: {label: 'Business', description: 'Production, services, and business activities.', variant: 'info'},
  [Sector.CONSUMER]: {label: 'Consumer', description: 'Sales, sentiment, and consumer spending.', variant: 'info'},
  [Sector.HOUSING]: {label: 'Housing', description: 'Housing market, construction, real estate.', variant: 'info'},
  [Sector.TAXES]: {label: 'Taxes', description: 'Tax policies and announcements.', variant: 'info'},
  [Sector.HOLIDAYS]: {label: 'Holidays', description: 'Official holidays and market closures.', variant: 'default'}
};



export const TimeModeMap = {
  [TimeMode.DATETIME]: {label: 'Exact datetime', description: 'Exact date and time specified.', variant: 'info'},
  [TimeMode.DATE]: {label: 'Date only', description: 'Only date specified.', variant: 'info'},
  [TimeMode.NO_TIME]: {label: 'No time specified', description: 'Exact time not specified.', variant: 'warning'},
  [TimeMode.TENTATIVE]: {
    label: 'Tentative',
    description: 'Time is tentative and may change.',
    variant: 'warning'
  }
};

export const EventTypeMap = {
  [EventType.EVENT]: {label: 'Event', description: 'Economic event like central bank meeting.', variant: 'info'},
  [EventType.INDICATOR]: {label: 'Indicator', description: 'Economic indicator like GDP.', variant: 'warning'},
  [EventType.HOLIDAY]: {label: 'Holiday', description: 'Market or bank holiday.', variant: 'default'}
};


export const UnitMap = {
  [Unit.NONE]: {label: 'No unit', description: 'No specific unit specified.', variant: 'default'},
  [Unit.PERCENT]: {label: 'Percent', description: 'Percentage (%)', variant: 'info'},
  [Unit.CURRENCY]: {label: 'Currency', description: 'Dependent on specified currency.', variant: 'info'},
  [Unit.HOUR]: {label: 'Hour', description: 'Time in hours.', variant: 'info'},
  [Unit.JOB]: {label: 'Job', description: 'Number of jobs.', variant: 'info'},
  [Unit.RIG]: {label: 'Rig', description: 'Number of oil rigs.', variant: 'info'},
  [Unit.USD]: {label: 'US Dollar', description: 'US dollars regardless of country.', variant: 'info'},
  [Unit.PEOPLE]: {label: 'People', description: 'Number of people.', variant: 'info'},
  [Unit.MORTGAGE]: {label: 'Mortgage', description: 'Number of mortgages.', variant: 'info'},
  [Unit.VOTE]: {label: 'Vote', description: 'Number of votes.', variant: 'info'},
  [Unit.BARREL]: {label: 'Barrel', description: 'Number of barrels (typically for oil).', variant: 'info'},
  [Unit.CUBIC_FEET]: {label: 'Cubic feet', description: 'Volume in cubic feet (natural gas).', variant: 'info'},
  [Unit.POSITION]: {label: 'Position', description: 'Number of positions.', variant: 'info'},
  [Unit.BUILDING]: {label: 'Building', description: 'Number of buildings.', variant: 'info'}
};
export type Language = 'en' | 'fa';
export const DEFAULT_LANGUAGE: Language = 'en';
export const getImportanceMap = (lang: Language = DEFAULT_LANGUAGE) => 
  lang === 'fa' ? ImportanceMapFa : ImportanceMap;

export const getImpactMap = (lang: Language = DEFAULT_LANGUAGE) => 
  lang === 'fa' ? ImpactMapFa : ImpactMap;

export const getFrequencyMap = (lang: Language = DEFAULT_LANGUAGE) => 
  lang === 'fa' ? FrequencyMapFa : FrequencyMap;

export const getMultiplierMap = (lang: Language = DEFAULT_LANGUAGE) => 
  lang === 'fa' ? MultiplierMapFa : MultiplierMap;

export const getSectorMap = (lang: Language = DEFAULT_LANGUAGE) => 
  lang === 'fa' ? SectorMapFa : SectorMap;

export const getTimeModeMap = (lang: Language = DEFAULT_LANGUAGE) => 
  lang === 'fa' ? TimeModeMapFa : TimeModeMap;

export const getEventTypeMap = (lang: Language = DEFAULT_LANGUAGE) => 
  lang === 'fa' ? EventTypeMapFa : EventTypeMap;

export const getUnitMap = (lang: Language = DEFAULT_LANGUAGE) => 
  lang === 'fa' ? UnitMapFa : UnitMap;

export const getLocalizedMaps = (lang: Language = DEFAULT_LANGUAGE) => ({
  importance: getImportanceMap(lang),
  impact: getImpactMap(lang),
  frequency: getFrequencyMap(lang),
  multiplier: getMultiplierMap(lang),
  sector: getSectorMap(lang),
  timeMode: getTimeModeMap(lang),
  eventType: getEventTypeMap(lang),
  unit: getUnitMap(lang),
});
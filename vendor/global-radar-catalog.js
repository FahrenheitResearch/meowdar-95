// Generated from the BowEcho toolkit data_source international and community feed tables.
// Keep this data-only module deterministic; SDK behavior belongs in radar-toolbox.js.

export const GLOBAL_RADAR_PROVIDERS = [
  {
    "id": "nexrad-level2",
    "label": "NOAA/NWS NEXRAD Level II",
    "country": "United States",
    "kind": "nexrad-level2",
    "formats": [
      "nexrad-level2"
    ],
    "capabilities": {
      "staticSites": true,
      "catalog": true,
      "latestPlan": true,
      "recentPlan": true,
      "livePolling": true,
      "archive": true,
      "clientSideReady": true
    }
  },
  {
    "id": "smhi",
    "label": "SMHI Sweden",
    "country": "Sweden",
    "kind": "international-odim-single",
    "formats": [
      "odim-h5"
    ],
    "capabilities": {
      "staticSites": true,
      "catalog": true,
      "latestPlan": true,
      "recentPlan": true,
      "browserPlanner": true,
      "clientSideReady": true
    }
  },
  {
    "id": "dmi",
    "label": "DMI Denmark",
    "country": "Denmark",
    "kind": "international-odim-single",
    "formats": [
      "odim-h5"
    ],
    "capabilities": {
      "staticSites": true,
      "catalog": true,
      "latestPlan": true,
      "recentPlan": true,
      "browserPlanner": true,
      "clientSideReady": true
    }
  },
  {
    "id": "geosphere",
    "label": "GeoSphere Austria",
    "country": "Austria",
    "kind": "international-odim-single",
    "formats": [
      "odim-h5"
    ],
    "capabilities": {
      "staticSites": true,
      "catalog": true,
      "latestPlan": true,
      "recentPlan": true,
      "browserPlanner": true,
      "clientSideReady": true
    }
  },
  {
    "id": "fmi",
    "label": "FMI Finland",
    "country": "Finland",
    "kind": "international-odim-single",
    "formats": [
      "odim-h5"
    ],
    "capabilities": {
      "staticSites": true,
      "catalog": true,
      "latestPlan": true,
      "recentPlan": true,
      "browserPlanner": true,
      "clientSideReady": true
    }
  },
  {
    "id": "shmu",
    "label": "SHMU Slovakia",
    "country": "Slovakia",
    "kind": "international-odim-split",
    "formats": [
      "odim-h5"
    ],
    "capabilities": {
      "staticSites": true,
      "catalog": true,
      "latestPlan": true,
      "recentPlan": true,
      "mergeParts": true,
      "browserPlanner": true,
      "clientSideReady": true
    }
  },
  {
    "id": "dwd",
    "label": "DWD Germany",
    "country": "Germany",
    "kind": "international-odim-sweep-merge",
    "formats": [
      "odim-h5"
    ],
    "capabilities": {
      "staticSites": true,
      "catalog": true,
      "latestPlan": true,
      "recentPlan": true,
      "mergeParts": true,
      "browserPlanner": true,
      "clientSideReady": true
    }
  },
  {
    "id": "chmi",
    "label": "CHMI Czechia",
    "country": "Czechia",
    "kind": "international-odim-task-merge",
    "formats": [
      "odim-h5"
    ],
    "capabilities": {
      "staticSites": true,
      "catalog": true,
      "latestPlan": true,
      "recentPlan": true,
      "mergeParts": true,
      "browserPlanner": true,
      "clientSideReady": true
    }
  },
  {
    "id": "jma",
    "label": "JMA Japan",
    "country": "Japan",
    "kind": "international-jma-grib2-tar",
    "formats": [
      "jma-grib2-tar"
    ],
    "capabilities": {
      "staticSites": true,
      "catalog": true,
      "latestPlan": true,
      "recentPlan": true,
      "browserPlanner": true,
      "siteFilteredDecode": true,
      "clientSideReady": true
    }
  },
  {
    "id": "ord",
    "label": "EUMETNET ORD",
    "country": "Europe (OPERA)",
    "kind": "international-odim-opera-cache",
    "formats": [
      "odim-h5"
    ],
    "capabilities": {
      "staticSites": true,
      "catalog": true,
      "latestPlan": true,
      "recentPlan": true,
      "mergeParts": "mixed",
      "browserPlanner": true,
      "clientSideReady": true
    }
  },
  {
    "id": "community-gr2a",
    "label": "Community GR2A Level II feeds",
    "country": "United States",
    "kind": "community-gr2a-level2",
    "formats": [
      "nexrad-level2"
    ],
    "capabilities": {
      "staticSites": true,
      "catalog": true,
      "latestPlan": true,
      "recentPlan": false,
      "dirListPolling": true,
      "clientSideReady": false
    }
  }
];

export const INTERNATIONAL_RADAR_SITES = [
  {
    "source": "international",
    "providerId": "smhi",
    "id": "angelholm",
    "label": "\u00c4ngelholm",
    "country": "Sweden",
    "lat": 56.3675,
    "lon": 12.8517,
    "format": "odim-h5",
    "merge": false,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "smhi",
    "id": "atvidaberg",
    "label": "\u00c5tvidaberg",
    "country": "Sweden",
    "lat": 58.1059,
    "lon": 15.9365,
    "format": "odim-h5",
    "merge": false,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "smhi",
    "id": "balsta",
    "label": "B\u00e5lsta",
    "country": "Sweden",
    "lat": 59.611,
    "lon": 17.5833,
    "format": "odim-h5",
    "merge": false,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "smhi",
    "id": "hemse",
    "label": "Hemse",
    "country": "Sweden",
    "lat": 57.3035,
    "lon": 18.4001,
    "format": "odim-h5",
    "merge": false,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "smhi",
    "id": "hudiksvall",
    "label": "Hudiksvall",
    "country": "Sweden",
    "lat": 61.5771,
    "lon": 16.7144,
    "format": "odim-h5",
    "merge": false,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "smhi",
    "id": "karlskrona",
    "label": "Karlskrona",
    "country": "Sweden",
    "lat": 56.2955,
    "lon": 15.6102,
    "format": "odim-h5",
    "merge": false,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "smhi",
    "id": "kiruna",
    "label": "Kiruna",
    "country": "Sweden",
    "lat": 67.7088,
    "lon": 20.6178,
    "format": "odim-h5",
    "merge": false,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "smhi",
    "id": "leksand",
    "label": "Leksand",
    "country": "Sweden",
    "lat": 60.723,
    "lon": 14.8776,
    "format": "odim-h5",
    "merge": false,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "smhi",
    "id": "lulea",
    "label": "Lule\u00e5",
    "country": "Sweden",
    "lat": 65.4309,
    "lon": 21.865,
    "format": "odim-h5",
    "merge": false,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "smhi",
    "id": "ornskoldsvik",
    "label": "\u00d6rnsk\u00f6ldsvik",
    "country": "Sweden",
    "lat": 63.6395,
    "lon": 18.4019,
    "format": "odim-h5",
    "merge": false,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "smhi",
    "id": "ostersund",
    "label": "\u00d6stersund",
    "country": "Sweden",
    "lat": 63.2951,
    "lon": 14.7591,
    "format": "odim-h5",
    "merge": false,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "smhi",
    "id": "vara",
    "label": "Vara",
    "country": "Sweden",
    "lat": 58.2556,
    "lon": 12.826,
    "format": "odim-h5",
    "merge": false,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "dmi",
    "id": "06036",
    "label": "Sindal",
    "country": "Denmark",
    "lat": 57.4893,
    "lon": 10.1365,
    "format": "odim-h5",
    "merge": false,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "dmi",
    "id": "06133",
    "label": "Sams\u00f8",
    "country": "Denmark",
    "lat": 55.8119,
    "lon": 10.5853,
    "format": "odim-h5",
    "merge": false,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "dmi",
    "id": "06177",
    "label": "Stevns",
    "country": "Denmark",
    "lat": 55.3262,
    "lon": 12.4493,
    "format": "odim-h5",
    "merge": false,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "dmi",
    "id": "06194",
    "label": "Bornholm",
    "country": "Denmark",
    "lat": 55.1127,
    "lon": 14.8875,
    "format": "odim-h5",
    "merge": false,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "dmi",
    "id": "60960",
    "label": "R\u00f8m\u00f8/Juvre",
    "country": "Denmark",
    "lat": 55.1731,
    "lon": 8.552,
    "format": "odim-h5",
    "merge": false,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "geosphere",
    "id": "hochficht",
    "label": "Hochficht",
    "country": "Austria",
    "lat": 48.7369,
    "lon": 13.9209,
    "format": "odim-h5",
    "merge": false,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "fmi",
    "id": "fianj",
    "label": "Anjalankoski",
    "country": "Finland",
    "lat": 60.9039,
    "lon": 27.1081,
    "format": "odim-h5",
    "merge": false,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "fmi",
    "id": "fikan",
    "label": "Kankaanp\u00e4\u00e4",
    "country": "Finland",
    "lat": 61.8108,
    "lon": 22.502,
    "format": "odim-h5",
    "merge": false,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "fmi",
    "id": "fikau",
    "label": "Kaunisp\u00e4\u00e4",
    "country": "Finland",
    "lat": 68.4344,
    "lon": 27.444,
    "format": "odim-h5",
    "merge": false,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "fmi",
    "id": "fikes",
    "label": "Kes\u00e4lahti",
    "country": "Finland",
    "lat": 61.9069,
    "lon": 29.7977,
    "format": "odim-h5",
    "merge": false,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "fmi",
    "id": "fikor",
    "label": "Korppoo",
    "country": "Finland",
    "lat": 60.1285,
    "lon": 21.6434,
    "format": "odim-h5",
    "merge": false,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "fmi",
    "id": "fikuo",
    "label": "Kuopio",
    "country": "Finland",
    "lat": 62.8626,
    "lon": 27.3815,
    "format": "odim-h5",
    "merge": false,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "fmi",
    "id": "filuo",
    "label": "Luosto",
    "country": "Finland",
    "lat": 67.1391,
    "lon": 26.8969,
    "format": "odim-h5",
    "merge": false,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "fmi",
    "id": "finur",
    "label": "Nurmes",
    "country": "Finland",
    "lat": 63.8378,
    "lon": 29.4489,
    "format": "odim-h5",
    "merge": false,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "fmi",
    "id": "fipet",
    "label": "Pet\u00e4j\u00e4vesi",
    "country": "Finland",
    "lat": 62.3045,
    "lon": 25.4401,
    "format": "odim-h5",
    "merge": false,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "fmi",
    "id": "fiuta",
    "label": "Utaj\u00e4rvi",
    "country": "Finland",
    "lat": 64.7749,
    "lon": 26.3189,
    "format": "odim-h5",
    "merge": false,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "fmi",
    "id": "fivih",
    "label": "Vihti",
    "country": "Finland",
    "lat": 60.5562,
    "lon": 24.4956,
    "format": "odim-h5",
    "merge": false,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "fmi",
    "id": "fivim",
    "label": "Vimpeli",
    "country": "Finland",
    "lat": 63.1048,
    "lon": 23.8209,
    "format": "odim-h5",
    "merge": false,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "shmu",
    "id": "skjav",
    "label": "Mal\u00fd Javorn\u00edk",
    "country": "Slovakia",
    "lat": 48.2556,
    "lon": 17.1524,
    "format": "odim-h5",
    "merge": true,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "shmu",
    "id": "skkoj",
    "label": "Koj\u0161ovsk\u00e1 ho\u013ea",
    "country": "Slovakia",
    "lat": 48.7827,
    "lon": 20.9873,
    "format": "odim-h5",
    "merge": true,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "shmu",
    "id": "skkub",
    "label": "Kub\u00ednska ho\u013ea",
    "country": "Slovakia",
    "lat": 49.2717,
    "lon": 19.2493,
    "format": "odim-h5",
    "merge": true,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "shmu",
    "id": "sklaz",
    "label": "\u0160pan\u00ed laz",
    "country": "Slovakia",
    "lat": 48.2404,
    "lon": 19.2573,
    "format": "odim-h5",
    "merge": true,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "dwd",
    "id": "asb",
    "label": "Borkum (ASR)",
    "country": "Germany",
    "lat": 53.564,
    "lon": 6.7482,
    "format": "odim-h5",
    "merge": true,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "dwd",
    "id": "boo",
    "label": "Boostedt",
    "country": "Germany",
    "lat": 54.0043,
    "lon": 10.0468,
    "format": "odim-h5",
    "merge": true,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "dwd",
    "id": "drs",
    "label": "Dresden",
    "country": "Germany",
    "lat": 51.1246,
    "lon": 13.7686,
    "format": "odim-h5",
    "merge": true,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "dwd",
    "id": "eis",
    "label": "Eisberg",
    "country": "Germany",
    "lat": 49.5407,
    "lon": 12.4028,
    "format": "odim-h5",
    "merge": true,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "dwd",
    "id": "ess",
    "label": "Essen",
    "country": "Germany",
    "lat": 51.4055,
    "lon": 6.9669,
    "format": "odim-h5",
    "merge": true,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "dwd",
    "id": "fbg",
    "label": "Feldberg",
    "country": "Germany",
    "lat": 47.8736,
    "lon": 8.0039,
    "format": "odim-h5",
    "merge": true,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "dwd",
    "id": "fld",
    "label": "Flechtdorf",
    "country": "Germany",
    "lat": 51.3112,
    "lon": 8.802,
    "format": "odim-h5",
    "merge": true,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "dwd",
    "id": "hnr",
    "label": "Hannover",
    "country": "Germany",
    "lat": 52.46,
    "lon": 9.6945,
    "format": "odim-h5",
    "merge": true,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "dwd",
    "id": "isn",
    "label": "Isen",
    "country": "Germany",
    "lat": 48.1747,
    "lon": 12.1017,
    "format": "odim-h5",
    "merge": true,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "dwd",
    "id": "mem",
    "label": "Memmingen",
    "country": "Germany",
    "lat": 48.0421,
    "lon": 10.2192,
    "format": "odim-h5",
    "merge": true,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "dwd",
    "id": "neu",
    "label": "Neuhaus",
    "country": "Germany",
    "lat": 50.5001,
    "lon": 11.1351,
    "format": "odim-h5",
    "merge": true,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "dwd",
    "id": "nhb",
    "label": "Neuheilenbach",
    "country": "Germany",
    "lat": 50.1097,
    "lon": 6.5483,
    "format": "odim-h5",
    "merge": true,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "dwd",
    "id": "oft",
    "label": "Offenthal",
    "country": "Germany",
    "lat": 49.9847,
    "lon": 8.7129,
    "format": "odim-h5",
    "merge": true,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "dwd",
    "id": "pro",
    "label": "Pr\u00f6tzel",
    "country": "Germany",
    "lat": 52.6486,
    "lon": 13.858,
    "format": "odim-h5",
    "merge": true,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "dwd",
    "id": "ros",
    "label": "Rostock",
    "country": "Germany",
    "lat": 54.1757,
    "lon": 12.058,
    "format": "odim-h5",
    "merge": true,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "dwd",
    "id": "tur",
    "label": "T\u00fcrkheim",
    "country": "Germany",
    "lat": 48.5853,
    "lon": 9.7828,
    "format": "odim-h5",
    "merge": true,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "dwd",
    "id": "umd",
    "label": "Ummendorf",
    "country": "Germany",
    "lat": 52.1601,
    "lon": 11.1761,
    "format": "odim-h5",
    "merge": true,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "chmi",
    "id": "brd",
    "label": "Brdy-Praha",
    "country": "Czechia",
    "lat": 49.6583,
    "lon": 13.8178,
    "format": "odim-h5",
    "merge": true,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "chmi",
    "id": "ska",
    "label": "Skalky",
    "country": "Czechia",
    "lat": 49.5011,
    "lon": 16.7885,
    "format": "odim-h5",
    "merge": true,
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "jma",
    "id": "AKIT",
    "label": "AKIT (RS47582)",
    "country": "Japan",
    "lat": 39.7178,
    "lon": 140.0994,
    "format": "jma-grib2-tar",
    "merge": false,
    "siteFilteredDecode": true
  },
  {
    "source": "international",
    "providerId": "jma",
    "id": "FUNC",
    "label": "FUNC (RS47909)",
    "country": "Japan",
    "lat": 28.3942,
    "lon": 129.5519,
    "format": "jma-grib2-tar",
    "merge": false,
    "siteFilteredDecode": true
  },
  {
    "source": "international",
    "providerId": "jma",
    "id": "HAIG",
    "label": "HAIG (RS47792)",
    "country": "Japan",
    "lat": 34.2703,
    "lon": 132.5933,
    "format": "jma-grib2-tar",
    "merge": false,
    "siteFilteredDecode": true
  },
  {
    "source": "international",
    "providerId": "jma",
    "id": "HAKO",
    "label": "HAKO (RS47432)",
    "country": "Japan",
    "lat": 41.9336,
    "lon": 140.7814,
    "format": "jma-grib2-tar",
    "merge": false,
    "siteFilteredDecode": true
  },
  {
    "source": "international",
    "providerId": "jma",
    "id": "ISHI",
    "label": "ISHI (RS47920)",
    "country": "Japan",
    "lat": 24.4267,
    "lon": 124.1822,
    "format": "jma-grib2-tar",
    "merge": false,
    "siteFilteredDecode": true
  },
  {
    "source": "international",
    "providerId": "jma",
    "id": "ITOK",
    "label": "ITOK (RS47937)",
    "country": "Japan",
    "lat": 26.1533,
    "lon": 127.765,
    "format": "jma-grib2-tar",
    "merge": false,
    "siteFilteredDecode": true
  },
  {
    "source": "international",
    "providerId": "jma",
    "id": "KASH",
    "label": "KASH (RS47695)",
    "country": "Japan",
    "lat": 35.8597,
    "lon": 139.9597,
    "format": "jma-grib2-tar",
    "merge": false,
    "siteFilteredDecode": true
  },
  {
    "source": "international",
    "providerId": "jma",
    "id": "KURU",
    "label": "KURU (RS47611)",
    "country": "Japan",
    "lat": 36.1031,
    "lon": 138.1958,
    "format": "jma-grib2-tar",
    "merge": false,
    "siteFilteredDecode": true
  },
  {
    "source": "international",
    "providerId": "jma",
    "id": "KUSH",
    "label": "KUSH (RS47419)",
    "country": "Japan",
    "lat": 42.9608,
    "lon": 144.5175,
    "format": "jma-grib2-tar",
    "merge": false,
    "siteFilteredDecode": true
  },
  {
    "source": "international",
    "providerId": "jma",
    "id": "MAKI",
    "label": "MAKI (RS47659)",
    "country": "Japan",
    "lat": 34.7428,
    "lon": 138.1336,
    "format": "jma-grib2-tar",
    "merge": false,
    "siteFilteredDecode": true
  },
  {
    "source": "international",
    "providerId": "jma",
    "id": "MISA",
    "label": "MISA (RS47791)",
    "country": "Japan",
    "lat": 35.5417,
    "lon": 133.1036,
    "format": "jma-grib2-tar",
    "merge": false,
    "siteFilteredDecode": true
  },
  {
    "source": "international",
    "providerId": "jma",
    "id": "MURO",
    "label": "MURO (RS47899)",
    "country": "Japan",
    "lat": 33.2525,
    "lon": 134.1772,
    "format": "jma-grib2-tar",
    "merge": false,
    "siteFilteredDecode": true
  },
  {
    "source": "international",
    "providerId": "jma",
    "id": "NAGO",
    "label": "NAGO (RS47636)",
    "country": "Japan",
    "lat": 35.1681,
    "lon": 136.9653,
    "format": "jma-grib2-tar",
    "merge": false,
    "siteFilteredDecode": true
  },
  {
    "source": "international",
    "providerId": "jma",
    "id": "SAPP",
    "label": "SAPP (RS47415)",
    "country": "Japan",
    "lat": 43.1389,
    "lon": 141.0097,
    "format": "jma-grib2-tar",
    "merge": false,
    "siteFilteredDecode": true
  },
  {
    "source": "international",
    "providerId": "jma",
    "id": "SEFU",
    "label": "SEFU (RS47806)",
    "country": "Japan",
    "lat": 33.4344,
    "lon": 130.3569,
    "format": "jma-grib2-tar",
    "merge": false,
    "siteFilteredDecode": true
  },
  {
    "source": "international",
    "providerId": "jma",
    "id": "SEND",
    "label": "SEND (RS47590)",
    "country": "Japan",
    "lat": 38.2622,
    "lon": 140.8972,
    "format": "jma-grib2-tar",
    "merge": false,
    "siteFilteredDecode": true
  },
  {
    "source": "international",
    "providerId": "jma",
    "id": "TAKA",
    "label": "TAKA (RS47773)",
    "country": "Japan",
    "lat": 34.6164,
    "lon": 135.6564,
    "format": "jma-grib2-tar",
    "merge": false,
    "siteFilteredDecode": true
  },
  {
    "source": "international",
    "providerId": "jma",
    "id": "TANE",
    "label": "TANE (RS47869)",
    "country": "Japan",
    "lat": 30.6397,
    "lon": 130.9792,
    "format": "jma-grib2-tar",
    "merge": false,
    "siteFilteredDecode": true
  },
  {
    "source": "international",
    "providerId": "jma",
    "id": "TOJI",
    "label": "TOJI (RS47705)",
    "country": "Japan",
    "lat": 36.2375,
    "lon": 136.1422,
    "format": "jma-grib2-tar",
    "merge": false,
    "siteFilteredDecode": true
  },
  {
    "source": "international",
    "providerId": "jma",
    "id": "YAHI",
    "label": "YAHI (RS47572)",
    "country": "Japan",
    "lat": 37.7186,
    "lon": 138.8161,
    "format": "jma-grib2-tar",
    "merge": false,
    "siteFilteredDecode": true
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "bejab",
    "label": "Jabbeke (Belgium)",
    "country": "Belgium",
    "lat": 51.1917,
    "lon": 3.0642,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "bewid",
    "label": "Wideumont (Belgium)",
    "country": "Belgium",
    "lat": 49.9136,
    "lon": 5.5044,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "chalb",
    "label": "Albis (Switzerland)",
    "country": "Switzerland",
    "lat": 47.2843,
    "lon": 8.512,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "chdol",
    "label": "La Dole (Switzerland)",
    "country": "Switzerland",
    "lat": 46.4251,
    "lon": 6.0994,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "chlem",
    "label": "Monte Lema (Switzerland)",
    "country": "Switzerland",
    "lat": 46.0408,
    "lon": 8.8332,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "chppm",
    "label": "Plaine Morte (Switzerland)",
    "country": "Switzerland",
    "lat": 46.3706,
    "lon": 7.4866,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "chwei",
    "label": "Weissfluhgipfel (Switzerland)",
    "country": "Switzerland",
    "lat": 46.835,
    "lon": 9.7945,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "eesur",
    "label": "S\u00fcrgavere (Estonia)",
    "country": "Estonia",
    "lat": 58.4823,
    "lon": 25.5187,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "frabb",
    "label": "Abbeville (France)",
    "country": "France",
    "lat": 50.136,
    "lon": 1.8347,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "fraja",
    "label": "Ajaccio (France)",
    "country": "France",
    "lat": 41.9531,
    "lon": 8.7005,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "frave",
    "label": "Avesnes (France)",
    "country": "France",
    "lat": 50.1283,
    "lon": 3.8118,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "frbla",
    "label": "Blaisy (France)",
    "country": "France",
    "lat": 47.3552,
    "lon": 4.7759,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "frbol",
    "label": "Boll\u00e8ne (France)",
    "country": "France",
    "lat": 44.3231,
    "lon": 4.7622,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "frbor",
    "label": "Bordeaux (France)",
    "country": "France",
    "lat": 44.8315,
    "lon": -0.6919,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "frbou",
    "label": "Bourges (France)",
    "country": "France",
    "lat": 47.0586,
    "lon": 2.3596,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "frcae",
    "label": "Falaise (France)",
    "country": "France",
    "lat": 48.9272,
    "lon": -0.1495,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "frcol",
    "label": "Collobri\u00e8res (France)",
    "country": "France",
    "lat": 43.2166,
    "lon": 6.3729,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "frgre",
    "label": "Gr\u00e8zes (France)",
    "country": "France",
    "lat": 45.1044,
    "lon": 1.3697,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "frmom",
    "label": "Momuy (France)",
    "country": "France",
    "lat": 43.6245,
    "lon": -0.6094,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "frmtc",
    "label": "Montancy (France)",
    "country": "France",
    "lat": 47.3686,
    "lon": 7.019,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "frnan",
    "label": "Nancy (France)",
    "country": "France",
    "lat": 48.7158,
    "lon": 6.5816,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "frnim",
    "label": "N\u00eemes (France)",
    "country": "France",
    "lat": 43.8061,
    "lon": 4.5027,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "frniz",
    "label": "Saint-Nizier (France)",
    "country": "France",
    "lat": 46.0678,
    "lon": 4.4454,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "fropo",
    "label": "Opoul (France)",
    "country": "France",
    "lat": 42.9184,
    "lon": 2.865,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "frpla",
    "label": "Plabennec (France)",
    "country": "France",
    "lat": 48.4609,
    "lon": -4.4298,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "frtou",
    "label": "Toulouse (France)",
    "country": "France",
    "lat": 43.5743,
    "lon": 1.3763,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "frtre",
    "label": "Treilli\u00e8res (France)",
    "country": "France",
    "lat": 47.3374,
    "lon": -1.6563,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "frtro",
    "label": "Arcis-sur-Aube (France)",
    "country": "France",
    "lat": 48.4621,
    "lon": 4.3093,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "hrbil",
    "label": "Bilogora (Croatia)",
    "country": "Croatia",
    "lat": 45.8835,
    "lon": 17.2005,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "hrdeb",
    "label": "Debeljak (Croatia)",
    "country": "Croatia",
    "lat": 44.0452,
    "lon": 15.3764,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "hrgra",
    "label": "Gradi\u0161te (Croatia)",
    "country": "Croatia",
    "lat": 45.1592,
    "lon": 18.7033,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "hrpun",
    "label": "Puntijarka (Croatia)",
    "country": "Croatia",
    "lat": 45.9078,
    "lon": 15.9684,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "hrulj",
    "label": "Uljenje (Croatia)",
    "country": "Croatia",
    "lat": 42.8944,
    "lon": 17.4783,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "iedub",
    "label": "Dublin (Ireland)",
    "country": "Ireland",
    "lat": 53.4299,
    "lon": -6.2443,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "iesha",
    "label": "Shannon (Ireland)",
    "country": "Ireland",
    "lat": 52.6928,
    "lon": -8.92,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "isbjo",
    "label": "Bj\u00f3lfur (Iceland)",
    "country": "Iceland",
    "lat": 65.2659,
    "lon": -14.0618,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "iskef",
    "label": "Keflav\u00edk (Iceland)",
    "country": "Iceland",
    "lat": 64.0257,
    "lon": -22.6354,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "isska",
    "label": "Skagi (Iceland)",
    "country": "Iceland",
    "lat": 66.0557,
    "lon": -20.268,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "ltlau",
    "label": "Laukuva (Lithuania)",
    "country": "Lithuania",
    "lat": 55.609,
    "lon": 22.2395,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "ltvil",
    "label": "Vilnius (Lithuania)",
    "country": "Lithuania",
    "lat": 54.6262,
    "lon": 25.1068,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "mtgud",
    "label": "Gudja (Malta)",
    "country": "Malta",
    "lat": 35.8528,
    "lon": 14.4747,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "nldhl",
    "label": "Den Helder (Netherlands)",
    "country": "Netherlands",
    "lat": 52.9528,
    "lon": 4.7906,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "nlhrw",
    "label": "Herwijnen (Netherlands)",
    "country": "Netherlands",
    "lat": 51.8369,
    "lon": 5.1381,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "noand",
    "label": "And\u00f8ya (Norway)",
    "country": "Norway",
    "lat": 69.2414,
    "lon": 16.003,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "nober",
    "label": "Berlev\u00e5g (Norway)",
    "country": "Norway",
    "lat": 70.5107,
    "lon": 29.0184,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "nobml",
    "label": "B\u00f8mlo (Norway)",
    "country": "Norway",
    "lat": 59.854,
    "lon": 5.09,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "nohas",
    "label": "Hasvik (Norway)",
    "country": "Norway",
    "lat": 70.6052,
    "lon": 22.443,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "nohfj",
    "label": "Hafjell (Norway)",
    "country": "Norway",
    "lat": 61.2318,
    "lon": 10.5273,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "nohgb",
    "label": "H\u00e6gebostad (Norway)",
    "country": "Norway",
    "lat": 58.3601,
    "lon": 7.1648,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "nohur",
    "label": "Hurum (Norway)",
    "country": "Norway",
    "lat": 59.6271,
    "lon": 10.5645,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "norsa",
    "label": "Rissa (Norway)",
    "country": "Norway",
    "lat": 63.69,
    "lon": 10.204,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "norsg",
    "label": "R\u00e1sseg\u00e1lv\u00e1rri (Norway)",
    "country": "Norway",
    "lat": 69.2186,
    "lon": 23.4398,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "norst",
    "label": "R\u00f8st (Norway)",
    "country": "Norway",
    "lat": 67.5307,
    "lon": 12.0986,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "nosmn",
    "label": "S\u00f8mna (Norway)",
    "country": "Norway",
    "lat": 65.2199,
    "lon": 11.9926,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "nosta",
    "label": "Stad (Norway)",
    "country": "Norway",
    "lat": 62.1871,
    "lon": 5.1275,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "plbrz",
    "label": "Brzuchania (Poland)",
    "country": "Poland",
    "lat": 50.3942,
    "lon": 20.0832,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "plgdy",
    "label": "Gdynia-Szemud (Poland)",
    "country": "Poland",
    "lat": 54.5009,
    "lon": 18.2718,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "plgsa",
    "label": "G\u00f3ra \u015awi\u0119tej Anny (Poland)",
    "country": "Poland",
    "lat": 50.4639,
    "lon": 18.1532,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "plleg",
    "label": "Legionowo (Poland)",
    "country": "Poland",
    "lat": 52.4053,
    "lon": 20.9611,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "plpas",
    "label": "Pastewnik (Poland)",
    "country": "Poland",
    "lat": 50.8925,
    "lon": 16.0395,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "plpoz",
    "label": "Pozna\u0144 (Poland)",
    "country": "Poland",
    "lat": 52.4133,
    "lon": 16.797,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "plram",
    "label": "Ram\u017ca (Poland)",
    "country": "Poland",
    "lat": 50.1513,
    "lon": 18.7251,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "plrze",
    "label": "Rzesz\u00f3w (Poland)",
    "country": "Poland",
    "lat": 50.1141,
    "lon": 22.037,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "plswi",
    "label": "\u015awidwin (Poland)",
    "country": "Poland",
    "lat": 53.7958,
    "lon": 15.8368,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "pluzr",
    "label": "Uzranki (Poland)",
    "country": "Poland",
    "lat": 53.8557,
    "lon": 21.4123,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "robar",
    "label": "B\u00e2rnova (Romania)",
    "country": "Romania",
    "lat": 47.0118,
    "lon": 27.5825,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "robob",
    "label": "Bobohalma (Romania)",
    "country": "Romania",
    "lat": 46.3602,
    "lon": 24.2252,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "robuc",
    "label": "Bucure\u0219ti (Romania)",
    "country": "Romania",
    "lat": 44.5127,
    "lon": 26.0773,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "rocra",
    "label": "Craiova (Romania)",
    "country": "Romania",
    "lat": 44.3103,
    "lon": 23.8674,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "romed",
    "label": "Medgidia (Romania)",
    "country": "Romania",
    "lat": 44.2434,
    "lon": 28.2506,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "roora",
    "label": "Oradea (Romania)",
    "country": "Romania",
    "lat": 47.0922,
    "lon": 21.9429,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "rotim",
    "label": "Timi\u0219oara (Romania)",
    "country": "Romania",
    "lat": 45.7717,
    "lon": 21.2577,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "silis",
    "label": "Lisca (Slovenia)",
    "country": "Slovenia",
    "lat": 46.0678,
    "lon": 15.2849,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  },
  {
    "source": "international",
    "providerId": "ord",
    "id": "sipas",
    "label": "Pasja Ravan (Slovenia)",
    "country": "Slovenia",
    "lat": 46.098,
    "lon": 14.2282,
    "format": "odim-h5",
    "merge": "mixed",
    "siteFilteredDecode": false
  }
];

export const COMMUNITY_RADAR_FEEDS = [
  {
    "id": "FWLX",
    "label": "WLX X-Band",
    "state": "TN",
    "lat": 35.254,
    "lon": -87.325,
    "pollUrl": "https://mesonet-nexrad.agron.iastate.edu/level2/raw/FWLX",
    "cluster": null
  },
  {
    "id": "FUSA",
    "label": "Denton",
    "state": "MD",
    "lat": 38.86949,
    "lon": -75.81616,
    "pollUrl": "https://mesonet-nexrad.agron.iastate.edu/level2/raw/FUSA",
    "cluster": null
  },
  {
    "id": "GAWX",
    "label": "Lawrenceville",
    "state": "GA",
    "lat": 33.98047,
    "lon": -84.00345,
    "pollUrl": "https://mesonet-nexrad.agron.iastate.edu/level2/raw/GAWX",
    "cluster": null
  },
  {
    "id": "WILU",
    "label": "Western Illinois University",
    "state": "IL",
    "lat": 40.465,
    "lon": -90.685,
    "pollUrl": "https://mesonet-nexrad.agron.iastate.edu/level2/raw/WILU",
    "cluster": null
  },
  {
    "id": "KULM",
    "label": "Monroe / ULM",
    "state": "LA",
    "lat": 32.529,
    "lon": -92.012,
    "pollUrl": "https://mesonet-nexrad.agron.iastate.edu/level2/raw/KULM",
    "cluster": null
  },
  {
    "id": "MZZU",
    "label": "Columbia / Mizzou",
    "state": "MO",
    "lat": 38.906,
    "lon": -92.269,
    "pollUrl": "https://mesonet-nexrad.agron.iastate.edu/level2/raw/MZZU",
    "cluster": null
  },
  {
    "id": "OP5R",
    "label": "Fort Greely",
    "state": "AK",
    "lat": 63.922,
    "lon": -145.833,
    "pollUrl": "https://mesonet-nexrad.agron.iastate.edu/level2/raw/OP5R",
    "cluster": null
  },
  {
    "id": "K08D",
    "label": "Stanley ARB",
    "state": "ND",
    "lat": 48.30145,
    "lon": -102.40141,
    "pollUrl": "https://level2.swc.nd.gov/raw/K08D",
    "cluster": null
  },
  {
    "id": "KXWA",
    "label": "Williston ARB",
    "state": "ND",
    "lat": 48.26344,
    "lon": -103.74733,
    "pollUrl": "https://level2.swc.nd.gov/raw/KXWA",
    "cluster": null
  },
  {
    "id": "KBPP",
    "label": "Bowman ARB",
    "state": "ND",
    "lat": 46.187,
    "lon": -103.428,
    "pollUrl": "https://level2.swc.nd.gov/raw/KBPP",
    "cluster": null
  },
  {
    "id": "LARE",
    "label": "KGNS EWR Doppler",
    "state": "TX",
    "lat": 27.541472,
    "lon": -99.457692,
    "pollUrl": "http://offsitevpn.ewradar.com/Laredo/archive2.trans",
    "cluster": null
  },
  {
    "id": "DAN1",
    "label": "Norman Testbed",
    "state": "OK",
    "lat": 35.238,
    "lon": -97.46,
    "pollUrl": "https://mesonet-nexrad.agron.iastate.edu/level2/raw/DAN1",
    "cluster": "Norman Testbed"
  },
  {
    "id": "DOP1",
    "label": "Norman Testbed",
    "state": "OK",
    "lat": 35.238,
    "lon": -97.46,
    "pollUrl": "https://mesonet-nexrad.agron.iastate.edu/level2/raw/DOP1",
    "cluster": "Norman Testbed"
  },
  {
    "id": "FOP1",
    "label": "Norman Testbed",
    "state": "OK",
    "lat": 35.238,
    "lon": -97.46,
    "pollUrl": "https://mesonet-nexrad.agron.iastate.edu/level2/raw/FOP1",
    "cluster": "Norman Testbed"
  },
  {
    "id": "NOP3",
    "label": "Norman Testbed",
    "state": "OK",
    "lat": 35.238,
    "lon": -97.46,
    "pollUrl": "https://mesonet-nexrad.agron.iastate.edu/level2/raw/NOP3",
    "cluster": "Norman Testbed"
  },
  {
    "id": "NOP4",
    "label": "Norman Testbed",
    "state": "OK",
    "lat": 35.238,
    "lon": -97.46,
    "pollUrl": "https://mesonet-nexrad.agron.iastate.edu/level2/raw/NOP4",
    "cluster": "Norman Testbed"
  },
  {
    "id": "ROP3",
    "label": "Norman Testbed",
    "state": "OK",
    "lat": 35.238,
    "lon": -97.46,
    "pollUrl": "https://mesonet-nexrad.agron.iastate.edu/level2/raw/ROP3",
    "cluster": "Norman Testbed"
  },
  {
    "id": "ROP4",
    "label": "Norman Testbed",
    "state": "OK",
    "lat": 35.238,
    "lon": -97.46,
    "pollUrl": "https://mesonet-nexrad.agron.iastate.edu/level2/raw/ROP4",
    "cluster": "Norman Testbed"
  },
  {
    "id": "KCRI",
    "label": "Norman Testbed",
    "state": "OK",
    "lat": 35.238,
    "lon": -97.46,
    "pollUrl": "https://mesonet-nexrad.agron.iastate.edu/level2/raw/KCRI",
    "cluster": "Norman Testbed"
  }
];

export const COMMUNITY_RADAR_MARKERS = [
  {
    "label": "FWLX - WLX X-Band",
    "lat": 35.254,
    "lon": -87.325,
    "feedIds": [
      "FWLX"
    ]
  },
  {
    "label": "FUSA - Denton",
    "lat": 38.86949,
    "lon": -75.81616,
    "feedIds": [
      "FUSA"
    ]
  },
  {
    "label": "GAWX - Lawrenceville",
    "lat": 33.98047,
    "lon": -84.00345,
    "feedIds": [
      "GAWX"
    ]
  },
  {
    "label": "WILU - Western Illinois University",
    "lat": 40.465,
    "lon": -90.685,
    "feedIds": [
      "WILU"
    ]
  },
  {
    "label": "KULM - Monroe / ULM",
    "lat": 32.529,
    "lon": -92.012,
    "feedIds": [
      "KULM"
    ]
  },
  {
    "label": "MZZU - Columbia / Mizzou",
    "lat": 38.906,
    "lon": -92.269,
    "feedIds": [
      "MZZU"
    ]
  },
  {
    "label": "OP5R - Fort Greely",
    "lat": 63.922,
    "lon": -145.833,
    "feedIds": [
      "OP5R"
    ]
  },
  {
    "label": "K08D - Stanley ARB",
    "lat": 48.30145,
    "lon": -102.40141,
    "feedIds": [
      "K08D"
    ]
  },
  {
    "label": "KXWA - Williston ARB",
    "lat": 48.26344,
    "lon": -103.74733,
    "feedIds": [
      "KXWA"
    ]
  },
  {
    "label": "KBPP - Bowman ARB",
    "lat": 46.187,
    "lon": -103.428,
    "feedIds": [
      "KBPP"
    ]
  },
  {
    "label": "LARE - KGNS EWR Doppler",
    "lat": 27.541472,
    "lon": -99.457692,
    "feedIds": [
      "LARE"
    ]
  },
  {
    "label": "Norman Testbed",
    "lat": 35.238,
    "lon": -97.46,
    "feedIds": [
      "DAN1",
      "DOP1",
      "FOP1",
      "NOP3",
      "NOP4",
      "ROP3",
      "ROP4",
      "KCRI"
    ]
  }
];

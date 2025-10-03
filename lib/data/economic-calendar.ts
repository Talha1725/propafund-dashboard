import React from "react";
import ReactCountryFlag from "react-country-flag";

export const economicCalendarData = [
  {
    id: 1,
    time: "01:00",
    currency: "JPY",
    country: "JP",
    event: "BoJ Core CPI (YoY)",
    actual: "2.3%",
    forecast: "2.5%",
    previous: "2.5%",
    impact: "high",
  },
  {
    id: 2,
    time: "01:00",
    currency: "SGD",
    country: "SG",
    event: "Core CPI (YoY) (Jun)",
    actual: "0.60%",
    forecast: "0.70%",
    previous: "0.60%",
    impact: "medium",
  },
  {
    id: 3,
    time: "01:00",
    currency: "SGD",
    country: "SG",
    event: "CPI (MoM) (Jun)",
    actual: "-0.10%",
    forecast: "-",
    previous: "0.70%",
    impact: "medium",
  },
  {
    id: 4,
    time: "01:00",
    currency: "SGD",
    country: "SG",
    event: "CPI (YoY) (Jun)",
    actual: "0.8%",
    forecast: "0.9%",
    previous: "0.8%",
    impact: "medium",
  },
  {
    id: 5,
    time: "04:00",
    currency: "ZAR",
    country: "ZA",
    event: "Core CPI (YoY) (Jun)",
    actual: "2.9%",
    forecast: "-",
    previous: "3.0%",
    impact: "medium",
  },
  {
    id: 6,
    time: "04:00",
    currency: "ZAR",
    country: "ZA",
    event: "Core CPI (MoM) (Jun)",
    actual: "0.3%",
    forecast: "-",
    previous: "0.0%",
    impact: "medium",
  },
  {
    id: 7,
    time: "04:00",
    currency: "ZAR",
    country: "ZA",
    event: "CPI (MoM) (Jun)",
    actual: "0.3%",
    forecast: "-",
    previous: "0.2%",
    impact: "medium",
  },
  {
    id: 8,
    time: "04:00",
    currency: "ZAR",
    country: "ZA",
    event: "CPI (YoY) (Jun)",
    actual: "3.0%",
    forecast: "-",
    previous: "2.8%",
    impact: "medium",
  },
  {
    id: 9,
    time: "05:30",
    currency: "EUR",
    country: "DE",
    event: "German 10-Year Bund Auction",
    actual: "2.620%",
    forecast: "-",
    previous: "2.630%",
    impact: "high",
  },
];

const getActualValueColor = (actual: string, forecast: string) => {
  if (forecast === "-") return "text-white";
  const actualNum = parseFloat(actual.replace('%', ''));
  const forecastNum = parseFloat(forecast.replace('%', ''));
  if (actualNum < forecastNum) return "text-red-400";
  if (actualNum > forecastNum) return "text-green-400";
  return "text-white";
};

export const economicCalendarColumns = [
  {
    key: "time",
    label: "Time",
    sortable: true,
    render: (value: string) => React.createElement('span', {
      className: "text-white font-creato-display font-normal text-sm"
    }, value)
  },
  {
    key: "currency",
    label: "Currency",
    sortable: true,
    render: (value: string, row: { country: string }) => React.createElement('div', { 
      className: "flex items-center gap-2" 
    },
      React.createElement('div', { className: "w-5 h-5 rounded-full overflow-hidden flex items-center justify-center" },
        React.createElement(ReactCountryFlag, { 
          countryCode: row.country, 
          svg: true,
          className: "w-[20px] h-[20px] rounded-full object-cover"
        })
      ),
      React.createElement('span', {
        className: "text-white font-creato-display font-normal text-sm"
      }, value)
    )
  },
  {
    key: "event",
    label: "Event",
    sortable: true,
    render: (value: string) => React.createElement('span', {
      className: "text-white font-creato-display font-normal text-sm"
    }, value)
  },
  {
    key: "actual",
    label: "Actual",
    sortable: true,
    render: (value: string, row: { forecast: string }) => React.createElement('span', {
      className: `${getActualValueColor(value, row.forecast)} font-creato-display font-normal text-sm`
    }, value)
  },
  {
    key: "forecast",
    label: "Forecast",
    sortable: true,
    render: (value: string) => React.createElement('span', {
      className: "text-white/70 font-creato-display font-normal text-sm"
    }, value)
  },
  {
    key: "previous",
    label: "Previous",
    sortable: true,
    render: (value: string) => React.createElement('span', {
      className: "text-white/70 font-creato-display font-normal text-sm"
    }, value)
  }
];
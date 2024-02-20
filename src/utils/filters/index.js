import string from "@/utils/filters/string";
import number from "@/utils/filters/number";
import currency from "@/utils/filters/currency";
import date from "@/utils/filters/date";

const filters = [...string, ...number, ...currency, ...date];

export default filters;

export class RouteParamReader {
  private static currentDate = new Date();

  static getDefaultDate(): Date { return RouteParamReader.currentDate; }

  static monthToRouteParams(month: Date): number[]  {
    return [month.getFullYear(), month.getMonth() + 1];
  }

  static routeParmsToMonth(params: {[paramName: string]: string}): Date {
    let year = parseInt(params['year'], 10);
    year = year > 0 ? year : RouteParamReader.currentDate.getFullYear();
    let month = parseInt(params['month'], 10);
    month = month >= 1 && month <= 12 ? month : RouteParamReader.currentDate.getMonth() + 1;
    return new Date(year, month - 1, 1);
  }
}

export default interface IGovarnamentConstructionLocalizationProvider {
  getAll(): Promise<string | undefined>;
}

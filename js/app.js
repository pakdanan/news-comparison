function newsApp() {
  return {
    apiKey: '',
    keyword: '',
    isCompare: false,
    loading: false,
    rawResults: [],
    flatResults: [],
    groupedResults: {},

    init() {
      this.$watch('isCompare', () => this.processResults());
      console.log("✅ Alpine ready");
    },

    async search() {
      if (!this.apiKey || !this.keyword) return;

      this.loading = true;
      this.rawResults = [];
      this.flatResults = [];
      this.groupedResults = {};

      this.rawResults = await fetchNews(this.apiKey, this.keyword);
      console.log("Raw results:", this.rawResults);

      this.processResults();
      this.loading = false;
    },

    processResults() {
      if (this.isCompare) {
        this.groupedResults = groupBySource(this.rawResults);
        this.flatResults = [];
      } else {
        this.flatResults = this.rawResults;
        this.groupedResults = {};
      }
    },

    get hasAnyResult() {
      return this.flatResults.length > 0 || Object.values(this.groupedResults).flat().length > 0;
    }
  };
}
window.newsApp = newsApp;

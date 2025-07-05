function newsApp() {
  return {
    apiKey: '',
    keyword: '',
    isCompare: false,
    loading: false,
    rawResults: [],
    flatResults: [],
    groupedResults: {},
    cardTemplate, // pastikan fungsi ini ada di templates.js

    init() {
      this.$watch('isCompare', () => this.processResults());
    },

    async search() {
      if (!this.apiKey || !this.keyword) return;

      this.loading = true;
      this.rawResults = [];
      this.flatResults = [];
      this.groupedResults = {};

      try {
        this.rawResults = await fetchNews(this.apiKey, this.keyword);
        console.log("Raw results:", this.rawResults);
        this.processResults();
      } catch (err) {
        console.error("Gagal memuat data:", err);
      } finally {
        this.loading = false;
      }
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
      return this.flatResults.length > 0 || Object.keys(this.groupedResults).length > 0;
    }
  };
}

// ⛳️ PENTING: attach ke window agar bisa diakses di HTML
window.newsApp = newsApp;
console.log("✅ app.js loaded");
console.log("window.newsApp:", typeof window.newsApp);

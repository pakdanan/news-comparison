async function fetchNews(apiKey, keyword) {
  const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${encodeURIComponent(keyword)}&country=id&language=id`;

  const res = await fetch(url);
  const data = await res.json();
  return data.results || [];
}

function groupBySource(results) {
  const grouped = {};
  results.forEach(item => {
    const source = item.source_id || "Tidak diketahui";
    if (!grouped[source]) grouped[source] = [];
    grouped[source].push(item);
  });
  return grouped;
}

async function fetchNews(apiKey, keyword) {
  try {
    const res = await fetch(`https://newsdata.io/api/1/news?apikey=${apiKey}&q=${encodeURIComponent(keyword)}&country=id&language=id`);
    const data = await res.json();
    return data.results || [];
  } catch (err) {
    console.error("fetchNews error:", err);
    return [];
  }
}

function groupBySource(results) {
  const grouped = {};
  results.forEach(item => {
    const src = item.source_id || "Tidak diketahui";
    if (!grouped[src]) grouped[src] = [];
    grouped[src].push(item);
  });
  return grouped;
}

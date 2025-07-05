function cardTemplate(item) {
  const image = item.image_url
    ? `<img src="${item.image_url}" alt="thumbnail" class="w-full h-40 object-cover rounded-t" />`
    : '';

  const icon = item.source_icon
    ? `<img src="${item.source_icon}" alt="logo" class="w-4 h-4 rounded" />`
    : '';

  const description = item.description || 'Tidak ada ringkasan.';
  const source = item.source_id || 'Tidak diketahui';

  return `
    <div class="bg-gray-50 rounded shadow flex flex-col h-full">
      ${image}
      <div class="p-3 flex flex-col flex-grow">
        <h3 class="font-semibold text-sm mb-1">${item.title}</h3>
        <p class="text-xs text-gray-600 flex-grow">${description}</p>
        <div class="flex items-center gap-2 text-xs text-gray-500 mt-1">
          ${icon}
          <span>${source}</span>
        </div>
        <a href="${item.link}" target="_blank"
           class="text-blue-600 text-sm mt-2 hover:underline font-medium">🔗 Baca Selengkapnya</a>
      </div>
    </div>
  `;
}

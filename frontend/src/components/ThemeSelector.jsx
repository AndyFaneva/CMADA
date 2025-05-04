import React from 'react';

const themes = ["light", "dark", "cupcake", "emerald", "synthwave", "night"];

export default function ThemeSelector() {
  const changeTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
  };

  return (
    <div>
      <div className="flex items-center gap-2">
  <span className="text-sm font-medium">Thème</span>
  <div className="relative">
    <select
      onChange={(e) => changeTheme(e.target.value)}
      className="appearance-none border rounded px-3 py-1 pr-8 bg-base-200"
    >
      {themes.map((theme) => (
        <option key={theme} value={theme}>
          {theme.charAt(0).toUpperCase() + theme.slice(1)}
        </option>
      ))}
    </select>
    <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
      ▼
    </div>
  </div>
</div>

    </div>
  );
}

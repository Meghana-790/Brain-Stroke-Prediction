export default function InputField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  options = []
}) {
  const inputBase =
    "w-full max-w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-black bg-white " +
    "focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 " +
    "transition-all duration-150 shadow-sm appearance-none overflow-hidden";

  return (
    <div className="text-black w-full">
      <label className="block mb-1 text-sm font-medium text-teal-700">
        {label}
      </label>

      {type === "select" ? (
        <div className="relative w-full">
          <select
            className={`${inputBase} pr-10`}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
          >
            <option value="" disabled hidden>
              Select {label}
            </option>

            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>

          {/* Custom Dropdown Arrow */}
          <span
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            style={{ fontSize: "10px" }}
          >
            ▼
          </span>
        </div>
      ) : (
        <input
          className={inputBase}
          type={type}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

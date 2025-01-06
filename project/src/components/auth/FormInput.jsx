import { FaEye, FaEyeSlash } from 'react-icons/fa';

function FormInput({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  required = false,
  showPasswordToggle = false,
  showPassword,
  onTogglePassword,
  note,
  hasGenerateOtp = false,
  onGenerateOtp,
  error
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}{required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex gap-4">
        <div className="relative flex-1">
          <input
            type={showPasswordToggle ? (showPassword ? 'text' : 'password') : type}
            value={value}
            onChange={onChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder={placeholder}
            required={required}
          />
          {showPasswordToggle && (
            <button
              type="button"
              onClick={onTogglePassword}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          )}
        </div>
        {hasGenerateOtp && (
          <button
            type="button"
            onClick={onGenerateOtp}
            className="px-4 py-2 bg-navy-800 text-white rounded-lg hover:bg-navy-900 whitespace-nowrap"
          >
            Generate OTP
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      {note && <p className="text-xs text-gray-500 mt-1">{note}</p>}
    </div>
  );
}

export default FormInput;
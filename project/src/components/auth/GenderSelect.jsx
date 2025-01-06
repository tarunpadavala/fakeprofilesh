function GenderSelect({ value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Gender<span className="text-red-500">*</span>
      </label>
      <select
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        required
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
    </div>
  );
}

export default GenderSelect;
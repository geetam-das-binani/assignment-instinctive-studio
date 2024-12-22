import React from "react";

const InputField = ({
  label,
  id,
  type = "text",
  value,
  name,
  placeholder,
  onChange,
  required = true,
}) => {
  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      {type === "textarea" && (
        <textarea
          id={id}
          name={name}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
          placeholder={placeholder}
          required={required}
          rows={4}
          value={value}
          onChange={onChange}
        ></textarea>
      )}
      {type !== "textarea" && (
        <input
          type={type}
          id={id}
          value={value}
          name={name}
          onChange={onChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          placeholder={placeholder}
          required={required}
        />
      )}
    </div>
  );
};

export default InputField;

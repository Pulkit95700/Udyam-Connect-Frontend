import React from "react";

const Input = (props) => {
  return (
    <div>
      {props.isLabel && (
        <label
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {props.labelValue}
        </label>
      )}
      {props.textarea && (
        <textarea
          id="message"
          rows="4"
          value={props.value}
          onChange={props.onChange}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder={props.inputPlaceholder}
        ></textarea>
      )}
      {!props.textarea && (
        <input
          type={props.type ? props.type : "text"}
          value={props.value}
          onChange={props.onChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder={props.inputPlaceholder}
          required={props.required}
        />
      )}
    </div>
  );
};

export default Input;

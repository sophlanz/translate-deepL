import React from "react";
interface Props {
  handleSelectLang: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  targetLanguage: string;
}
export default function SelectLang(props: Props): JSX.Element {
  const { handleSelectLang, targetLanguage } = props;
  return (
    <div className="selectWrapper">
      <h2>TRANSLATE TO : </h2>
      <select
        className="targetLang"
        value={targetLanguage}
        onChange={handleSelectLang}
      >
        <option value="EN-US">English-US</option>
        <option value="EN-GB">English-GB</option>
        <option value="ES">Spanish</option>
        <option value="FR">French</option>
        <option value="DE">German</option>
        <option value="ZH">Chinese</option>
        <option value="JA">Japanese</option>
        <option value="KO">Korean</option>
      </select>
    </div>
  );
}

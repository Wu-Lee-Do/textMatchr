import React, { useState, useEffect } from "react";

import "./App.css";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
// reset.css 초기화 적용(Node.js 패키지 사용)
// https://velog.io/@daymoon_/React-styled-reset - 참고 자료 출처

const GlobalStyle = createGlobalStyle`
  ${reset}
  /* other styles */
`;

//불일치 하이라이트 로직
const findDifference = (inputText1, inputText2) => {
  const differences = [];
  const maxLength = Math.max(inputText1.length, inputText2.length);
  for (let i = 0; i < maxLength; i++) {
    if (inputText1[i] !== inputText2[i]) {
      differences.push(i);
    }
  }
  return differences;
};


function App() {
  //useState이용 inputText1,2로 구별
  //결과값 result
  const [inputText1, setInputText1] = useState("");
  const [inputText2, setInputText2] = useState("");
  const [result, setResult] = useState(null);

  //비교 버튼 누를 시 compareHandler작동
  //if문으로 inputText1,2 비교
  //결과값 setResult로 구현
  const compareHandler = () => {
    if (inputText1 === inputText2) {
      setResult("일치");
    } else {
      setResult(findDifference(inputText1, inputText2));
    }
  };

  //reset버튼 누를시 resetHandler작동
  //텍스트 박스 값 결과 값 초기화
  const resetHandler = () => {
    setInputText1("");
    setInputText2("");
    setResult(null);
  };

  // change 버튼 누를시 changeHandler 작동
  // 각각의 textarea 의 값 서로 위치 변환
  const changeHandler = () => {
    setInputText1(inputText2);
    setInputText2(inputText1);
  };

  //불일치 하이라이트 로직
  useEffect(() => {
    setResult(findDifference(inputText1, inputText2));
  }, [inputText1, inputText2]);

  return (
    <React.Fragment>
      <GlobalStyle />
      <div id="wrapper">
        <div className="group-box">
          <div className="reset-button button" onClick={resetHandler}>
            reset
          </div>
          <textarea
            className="control-group group"
            type="text"
            placeholder="기준이 되는 텍스트를 입력해 주세요."
            value={inputText1}
            onChange={(e) => setInputText1(e.target.value)}
          />
          <div className="change-button" onClick={changeHandler}></div>
          <textarea
            className="experimental-group group"
            type="text"
            placeholder="비교하려는 텍스트를 입력해 주세요."
            value={inputText2}
            onChange={(e) => setInputText2(e.target.value)}
          />
        </div>

        <div className="compare-button button" onClick={compareHandler}>
          비교하기
        </div>

        {result !== null && (
          <div className="compare-result">
            결과:{" "}
            {Array.isArray(result) ? (
              <>
                {result.map((index, i) => (
                  <React.Fragment key={i}>
                    {inputText2.slice(result[i - 1] + 1, index)}
                    <span style={{ color: "red" }}>
                      {inputText2.slice(index, index + 1)}
                    </span>
                  </React.Fragment>
                ))}
                {inputText2.slice(result[result.length - 1] + 1)}
              </>
            ) : (
              result
            )}
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
// test
export default App;

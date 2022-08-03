import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Result from "../Result/Result";

const QuizQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState([]);
  const [selected, setSelected] = useState({});
  const [totalAns, setTotalAns] = useState([]);
  const [count, setCount] = useState(1);
  const [isChecked, setIsChecked] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const url = "./questions.json";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setIsReload(true);
      });
  }, [isReload]);

  useEffect(() => {
    if (count > 0) {
      const q = questions.filter((a) => a.id === count);
      setQuestion(q[0]);
    }
  }, [count, questions]);

  const handlePrevious = () => {
    const a = count - 1;
    setCount(a);
    if (count > 0) {
      const q = questions.filter((a) => a.id === count);
      setQuestion(q[0]);
    }
  };

  const handleNext = () => {
    const a = count + 1;
    setCount(a);
    if (count > 0 && count < questions.length) {
      const q = questions.filter((a) => a.id === count);
      setQuestion(q[0]);
    }
  };

  const handleSubmit = () => {
    navigate("/result");

    setIsChecked(!isChecked);
  };

  const handleAns = (e) => {
    const answer = e.target.value;
    setSelected({ id: question?.id, selectedAns: answer });
  };

  const getTotal = () => {
    Object.keys(selected).length !== 0 &&
      totalAns.indexOf(selected) === -1 &&
      totalAns.push(selected);
    setTotalAns(totalAns);
    console.log(totalAns);
  };
  useEffect(() => {
    getTotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <div className="w-[600px] min-h-screen mx-auto my-auto">
      <div className="mt-20 text-xl">
        <p className="font-bold text-3xl my-4">
          {question?.id}. <span>{question?.question}</span>
        </p>
        <div
          onClick={(e) => handleAns(e)}
          className="grid grid-cols-1 w-full gap-8"
        >
          <p className="p-3 border-2 rounded">
            <input
              // disabled={isChecked}
              type="checkbox"
              name="option"
              id={question?.id}
              value={question?.optionA}
              className="mr-1"
            />
            {question?.optionA}
          </p>
          <p className="p-3 border-2 rounded">
            <input
              //  disabled={isChecked}
              type="checkbox"
              name="option"
              id={question?.id}
              value={question?.optionB}
              className="mr-1"
            />
            {question?.optionB}
          </p>
          <p className="p-3 border-2 rounded">
            <input
              // disabled={isChecked}
              type="checkbox"
              name="option"
              id={question?.id}
              value={question?.optionC}
              className="mr-1"
            />
            {question?.optionC}
          </p>
          <p className="p-3 border-2 rounded">
            <input
              // disabled={isChecked}
              type="checkbox"
              name="option"
              id={question?.id}
              value={question?.optionD}
              className="mr-1"
            />
            {question?.optionD}
          </p>
        </div>
      </div>
      <div className="flex justify-between my-10">
        {count === 1 ? (
          <>
            <div>
              <button
                disabled
                onClick={handlePrevious}
                className="px-4 py-2 bg-gray-500
                rounded font-bold text-white"
              >
                Previous
              </button>
            </div>
            <div>
              <button
                onClick={handleNext}
                className="px-4 py-2 rounded bg-blue-500 font-bold text-white"
              >
                Next
              </button>
            </div>
          </>
        ) : count === questions.length ? (
          <>
            <div>
              <button
                onClick={handlePrevious}
                className="px-4 py-2 bg-blue-500
                rounded font-bold text-white"
              >
                Previous
              </button>
            </div>
            <div>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded bg-blue-500 font-bold text-white"
              >
                Submit
              </button>
            </div>
          </>
        ) : (
          <>
            <div>
              <button
                onClick={handlePrevious}
                className="px-4 py-2 bg-blue-500
                rounded font-bold text-white"
              >
                Previous
              </button>
            </div>
            <div>
              <button
                onClick={handleNext}
                className="px-4 py-2 rounded bg-blue-500 font-bold text-white"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
      {isChecked && <Result totalAns={totalAns} />}
    </div>
  );
};

export default QuizQuestions;
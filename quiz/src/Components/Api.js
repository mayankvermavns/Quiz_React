import { useState } from "react";
import axios from "axios";

function Api() {
  const [subjects, setSubjects] = useState([]);
  const [quizes, setQuizes] = useState([]);
  const [showquiz, setShowQuiz] = useState(false);
  const [submitted, setSubmitted] = useState({});
  const [answers, setAnswers] = useState({}); 

  //  *********** Load Subject From JSON *************
  const loadSubjects = () => {
    const baseurl = `https://mayankvermavns.github.io/All-Json-File/Subject.json`;
    axios
      .get(baseurl)
      .then((response) => {
        setSubjects(response.data);
      })
      .catch((error) => {
        console.log("Error in API", error);
      });
  };

  // ********** Load quizzes for a selected subject ***********
  const loadQuizes = (quizurl) => {
    axios
      .get(quizurl)
      .then((response) => {
        setQuizes(response.data);
        setShowQuiz(true);
        setSubmitted({});
        setAnswers({}); // reset answers
      })
      .catch((error) => {
        console.log("Error in Quiz API", error);
      });
  };

  // ********** Handle Option Change ***********
  const handleOptionChange = (index, value) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };

  // ********** Handle Submit ***********
  const handleSubmit = (index) => {
    setSubmitted((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Quiz App</h1>
      <button onClick={loadSubjects}>Load Subjects</button>

      {/* Subject List */}
      {subjects.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h2>Subjects List</h2>
          {subjects.map((sub, index) => (
            <p key={index}>
              <button onClick={() => loadQuizes(sub.quizurl)}>
                {sub.subjectno} - {sub.subjectname}
              </button>
            </p>
          ))}
        </div>
      )}

      {/* Quiz Question */}
      {showquiz && quizes.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h2>Quiz Questions</h2>
          {quizes.map((Q, index) => (
            <div
              key={index}
              style={{
                marginBottom: "15px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
            >
              <p>
                <b>Q{Q.qno}:</b> {Q.question}
              </p>

              <div>
                <label>
                  <input
                    type="radio"
                    name={`q${index}`}
                    value="a"
                    onChange={() => handleOptionChange(index, Q.a)}
                    disabled={submitted[index]}
                  />{" "}
                  a) {Q.a}
                </label>
              </div>

              <div>
                <label>
                  <input
                    type="radio"
                    name={`q${index}`}
                    value="b"
                    onChange={() => handleOptionChange(index, Q.b)}
                    disabled={submitted[index]}
                  />{" "}
                  b) {Q.b}
                </label>
              </div>

              <div>
                <label>
                  <input
                    type="radio"
                    name={`q${index}`}
                    value="c"
                    onChange={() => handleOptionChange(index, Q.c)}
                    disabled={submitted[index]}
                  />{" "}
                  c) {Q.c}
                </label>
              </div>

              <div>
                <label>
                  <input
                    type="radio"
                    name={`q${index}`}
                    value="d"
                    onChange={() => handleOptionChange(index, Q.d)}
                    disabled={submitted[index]}
                  />{" "}
                  d) {Q.d}
                </label>
              </div>

              {!submitted[index] && (
                <button
                  onClick={() => handleSubmit(index)}
                  style={{ marginTop: "10px" }}
                >
                  Submit
                </button>
              )}

              {submitted[index] && (
                <>
                  {answers[index] === Q.correct ? (
                    <p style={{ color: "green", marginTop: "5px" }}>
                      ✅ Your answer is correct <br />
                      You selected: <b>{answers[index]}</b>
                    </p>
                  ) : (
                    <p>
                      You selected: <b>{answers[index]}</b> <br />
                      ✔ Correct answer is: <b>{Q.correct}</b>
                    </p>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Api;

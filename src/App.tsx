import { useFilms } from "./zustand/state.ts";
import { Chances } from "../src/components/chances.tsx";

export function App() {
  const { modalFullTest, closeModalFullTest, sureOpenFullTest, sureYesModalFullTest, sureNoModalFullTest,
    createFullTestQuestion, createdFullTestQuestion, modalFullTestCount, createTicketQuestion, ticketsTest,
    createTicketsTest, progressTicketsTest, createdTicketTestQuestion, modalTicketTest, modalTicketTestCount,
    totalTicketsTest, closeModalTicketTest, openPageTicketTest, pageTicketTest, closePageTicketTest, openClosedOutPageTicket,
    incrementChance, wordsCount, learnWords, openLearnWord, closeLearnWord, createPaginate, paginated, prevPageLearn, nextPageLearn,
    page, modalFullSearchTest, openModalFullSearchTest, closeModalFullSearchTest, searchFullTestAnswers, fullSearchTestValue,
    searchedResult, openSearch, createdFullSearchQuestion, selectAnswer, checkAnswer, isSearching, totalFullSearchTest,
    totalSearchTest
  } = useFilms();

  return (
    <>
      <div className="container">
        <h1>Тест словарного запаса English (B1-B2-C1)</h1>
        {!pageTicketTest && !learnWords && <>
          <button onClick={() => { openLearnWord(), createPaginate() }} className="tickets check">Учить слова</button>
          <button onClick={createFullTestQuestion} className="tickets check">Полный тест (3650 вопросов)</button>
          <button onClick={() => { openPageTicketTest(), createTicketsTest() }} className="tickets check">Тест по билетам</button>
          <button onClick={openModalFullSearchTest} className="tickets check">Полный тест (без ответов)</button>
        </>}
        {learnWords && <button className="back-tickets" onClick={closeLearnWord}>Exit</button>}
        {learnWords &&
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "30px" }}>
            <button className="tickets" onClick={() => prevPageLearn()}>&lt;</button>
            <button className="tickets" onClick={() => prevPageLearn()}>{page}</button>
            <button className="tickets" onClick={() => nextPageLearn()}>&gt;</button>
          </div>
        }
        {learnWords && <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "center",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid white", padding: "8px" }}>
                English
              </th>

              <th style={{ border: "1px solid white", padding: "8px" }}>
                Русский
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(paginated).map(([eng, ru]: any) => (
              <tr key={eng}>
                <td style={{ border: "1px solid white", padding: "8px" }}>
                  {eng}
                </td>

                <td style={{ border: "1px solid white", padding: "8px" }}>
                  {ru}
                </td>
              </tr>
            ))}
          </tbody>
        </table>}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {pageTicketTest && <button className="back-tickets" onClick={() => closePageTicketTest()}>Exit</button>}
          <Chances />
        </div>
        {pageTicketTest && <div className="wrapper-tickets">
          {
            Array(ticketsTest).fill("").map((_, i) => (
              <button key={i + 1} onClick={() => {
                if (progressTicketsTest === i + 1) {
                  createTicketQuestion(i + 1);
                }
              }} className={i + 1 <= progressTicketsTest ? "tickets" : "tickets inactive"}>{i + 1}</button>
            ))
          }
        </div>}
      </div >
      {modalFullTest && <div className="modal-all-test">
        <div className="modal">
          <span onClick={closeModalFullTest}>x</span>
          <p className="question">{modalFullTestCount}/{wordsCount}. {createdFullTestQuestion.answer}</p>
          <div className="test-answers-list">
            {createdFullTestQuestion.variants.map((item: string, index: number) => {
              if (item === "") return null;
              return <button className="variants" onClick={() => {
                if (index === createdFullTestQuestion.correctIdx) {
                  createFullTestQuestion()
                } else { sureYesModalFullTest() }
              }
              } key={index}>{item}</button>
            })}
          </div>
        </div>
      </div>
      }
      {
        sureOpenFullTest && <div className="modal-all-test no-overlay ">
          <div className="modal">
            <p className="sure">Are you sure?</p>
            <button className="yesno" onClick={sureYesModalFullTest}>Yes</button>
            <button className="yesno" onClick={sureNoModalFullTest}>No</button>
          </div>
        </div>
      }
      {
        modalTicketTest && <div className="modal-all-test">
          <div className="modal">
            <div className="chances-modal">
              <Chances />
            </div>
            <div className="progress-modal">
              <button className="tickets">{progressTicketsTest}</button>
            </div>
            <span onClick={closeModalTicketTest}>x</span>
            <p className="question">{modalTicketTestCount}/{totalTicketsTest}. {createdTicketTestQuestion.answer}</p>
            <div className="test-answers-list">
              {createdTicketTestQuestion.variants.map((item: string, index: number) => {
                if (item === "") return null;
                return <button className="variants" onClick={() => {
                  if (index === createdTicketTestQuestion.correctIdx) {
                    openClosedOutPageTicket()
                    createTicketQuestion(progressTicketsTest)
                  } else {
                    incrementChance()
                  }
                }
                } key={index}>{item}</button>
              })}
            </div>
          </div>
        </div>
      }

      {modalFullSearchTest && (
        <div className="modal-all-test">
          <div className="modal full-test">
            <span onClick={closeModalFullSearchTest}>
              x
            </span>
            <p className="question">
              {totalFullSearchTest}/{totalSearchTest}. "{createdFullSearchQuestion.trim()}"
            </p>
            <div className="input-wrapper">
              <input
                value={fullSearchTestValue}
                onChange={(e) =>
                  searchFullTestAnswers(e.target.value)
                }
                placeholder="Search answer..."
              />
              {openSearch && (
                <div className="list">
                  {isSearching ? (
                    <div className="loader" />
                  ) : searchedResult.length ? (
                    searchedResult.map(([_, rus]: any, i: number) => (
                      <div
                        key={i}
                        className="item"
                        onClick={() =>
                          selectAnswer(rus)
                        }
                      >
                        {rus}
                      </div>
                    ))
                  ) : (
                    <div className="loader" />
                  )}
                </div>
              )}
            </div>
            {!openSearch && (
              <button disabled={!fullSearchTestValue} className={fullSearchTestValue ? "confirm" : "confirm inactive"} onClick={checkAnswer}>
                Confirm
              </button>
            )}
          </div>

        </div>
      )}
    </>
  )
}

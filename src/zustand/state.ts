import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from 'zustand/middleware';
import { words } from "../../words.ts"

function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
const PAGE_SIZE = 40;

export const useFilms = create<any>()(
  persist(
    immer((set, get) => ({
      allData: words,
      paginated: {},
      page: 1,
      createPaginate: () => {
        const { allData, page } = get();
        const entries = Object.entries(allData);
        const start = (page - 1) * PAGE_SIZE;
        const end = start + PAGE_SIZE;
        const sliced = entries.slice(start, end);
        const paginated = Object.fromEntries(sliced);
        set({ paginated });
      },
      nextPageLearn: () => {
        const { allData, page, createPaginate } = get();
        const totalPages = Math.ceil(
          Object.keys(allData).length / PAGE_SIZE
        );
        if (page < totalPages) {
          set({ page: page + 1 });
          setTimeout(() => {
            createPaginate();
          }, 0);
        }
      },
      prevPageLearn: () => {
        const { page, createPaginate } = get();
        if (page > 1) {
          set({ page: page - 1 });
          setTimeout(() => {
            createPaginate();
          }, 0);
        }
      },
      modalFullTestCount: 0,
      wordsCount: 0,
      modalFullTest: false,
      excludedModalFullTest: [],
      createdFullTestQuestion: null,
      sureOpenFullTest: false,
      closeModalFullTest: () => {
        set({ sureOpenFullTest: true });
      },
      sureYesModalFullTest: () => {
        set({ sureOpenFullTest: false, modalFullTestCount: 0, modalFullTest: false, excludedModalFullTest: [], createdFullTestQuestion: null })
      },
      sureNoModalFullTest: () => {
        set({ sureOpenFullTest: false })
      },
      createFullTestQuestion: () => {
        set({ modalFullTest: true });
        const state = get();

        const entries = Object.entries(state.allData);

        const available = entries.filter(
          ([eng]) => !state.excludedModalFullTest.includes(eng)
        );

        if (available.length === 0) {
          return;
        }

        const [correctEng, correctRu] =
          available[Math.floor(Math.random() * available.length)];

        const other = entries
          .filter(([eng]) => eng !== correctEng)
          .map(([, ru]) => ru);

        const uniqueOther = Array.from(new Set(other));

        shuffle(uniqueOther);

        const variants = [...uniqueOther.slice(0, 4), correctRu];

        shuffle(variants);

        const correctIdx = variants.indexOf(correctRu);

        set((state: any) => {
          state.createdFullTestQuestion = {
            answer: correctEng,
            variants,
            correctIdx,
          };
          state.wordsCount = entries.length;
          state.modalFullTestCount = state.modalFullTestCount + 1
          state.excludedModalFullTest.push(correctEng);
        });
      },
      modalTicketTestCount: 0,
      modalTicketTest: false,
      totalTicketsTest: 0,
      excludedTicketTest: [],
      createdTicketTestQuestion: null,
      sureOpenTicketTest: false,
      availableTicketQuestions: {},
      ticketsTest: 0,
      chances: 3,
      progressTicketsTest: 1,
      pageTicketTest: false,
      closedOutPageTicket: false,
      openClosedOutPageTicket: () => {
        set({ closedOutPageTicket: false });
      },
      openPageTicketTest: () => {
        set({ pageTicketTest: true })
      },
      closePageTicketTest: () => {
        set({ pageTicketTest: false })
      },

      createTicketsTest: () => {
        const state = get();
        const entries = Object.entries(state.allData);
        const totalItems = entries.length;
        const totalPages = Math.ceil(totalItems / PAGE_SIZE);
        set({ ticketsTest: totalPages });
      },

      closeModalTicketTest: () => {
        set({
          modalTicketTest: false,
          modalTicketTestCount: 0,
          totalTicketsTest: 0,
          excludedTicketTest: [],
          createdTicketTestQuestion: null,
          availableTicketQuestions: {},
          chances: 3,
          progressTicketsTest: 1,
        })
      },
      createTicketQuestion: (ticket: number) => {
        set({ modalTicketTest: true, progressTicketsTest: ticket });
        const state = get();

        if (state.closedOutPageTicket === false) {
          let currentTicket = ticket;

          // Проверяем завершение билета
          if (state.modalTicketTestCount >= PAGE_SIZE) {
            set((state: any) => {
              state.progressTicketsTest += 1;
              state.modalTicketTestCount = 0;
              state.excludedTicketTest = [];
            });

            currentTicket += 1;
          }

          const updatedState = get();

          const entries = Object.entries(updatedState.allData);

          const start = (currentTicket - 1) * PAGE_SIZE;
          const end = start + PAGE_SIZE;

          const fourtyQuestions = entries.slice(start, end);

          const available = fourtyQuestions.filter(
            ([eng]) => !updatedState.excludedTicketTest.includes(eng)
          );

          if (!available.length) return;

          const [correctEng, correctRu] =
            available[Math.floor(Math.random() * available.length)];

          const other = entries
            .filter(([eng]) => eng !== correctEng)
            .map(([, ru]) => ru);

          const uniqueOther = Array.from(new Set(other));

          shuffle(uniqueOther);

          const variants = [...uniqueOther.slice(0, 4), correctRu];

          shuffle(variants);

          const correctIdx = variants.indexOf(correctRu);

          set((state: any) => {
            state.createdTicketTestQuestion = {
              answer: correctEng,
              variants,
              correctIdx,
            };

            state.modalTicketTestCount += 1;

            state.excludedTicketTest.push(correctEng);
            state.totalTicketsTest = fourtyQuestions.length;
          });

        }
      },
      incrementChance: () => {
        const state = get();
        if (state.chances >= 1) {
          set({ chances: state.chances - 1 })
        } else {
          set({
            chances: 3,
            modalTicketTestCount: 0,
            modalTicketTest: false,
            excludedTicketTest: [],
            createdTicketTestQuestion: null,
            sureOpenTicketTest: false,
            progressTicketsTest: 1,
            closedOutPageTicket: false,
          });
        }
      },
      learnWords: false,
      openLearnWord: () => {
        set({ learnWords: true })
      },
      closeLearnWord: () => {
        set({ learnWords: false })
      },






      modalFullSearchTest: false,
      createdFullSearchQuestion: "",
      correctAnswer: "",
      totalFullSearchTest: 1,
      totalSearchTest: 0,
      excludedFullSearchTest: [] as string[],
      fullSearchTestValue: "",
      searchedResult: [],
      openSearch: false,
      openModalFullSearchTest: () => {
        const {
          excludedFullSearchTest
        } = get();
        const availableWords =
          Object.entries(words).filter(
            ([eng]) =>
              !excludedFullSearchTest.includes(eng)
          );
        // закончились слова
        if (!availableWords.length) {
          return set({
            modalFullSearchTest: false
          });
        }
        const random =
          availableWords[
          Math.floor(
            Math.random() * availableWords.length
          )
          ];
        const [eng, rus] = random;

        set({
          modalFullSearchTest: true,
          createdFullSearchQuestion: eng,
          correctAnswer: rus,
          fullSearchTestValue: "",
          searchedResult: [],
          openSearch: false,
          totalSearchTest: Object.entries(words).length
        });
      },
      searchFullTestAnswers: (value: string) => {
        const query = value.toLowerCase();
        if (query.length < 2) {
          return set({
            fullSearchTestValue: value,
            searchedResult: [],
          });
        }
        const filtered = Object.entries(words).filter(
          ([_, rus]) =>
            rus.toLowerCase().includes(query)
        );
        set({
          fullSearchTestValue: value,
          searchedResult: filtered,
          openSearch: true
        });
      },
      selectAnswer: (value: string) => {
        set({
          fullSearchTestValue: value,
          searchedResult: [],
          openSearch: false
        });
      },
      checkAnswer: () => {
        const state = get();
        const isCorrect =
          state.fullSearchTestValue ===
          state.correctAnswer;

        if (!isCorrect) {
          return set({
            fullSearchTestValue: "",
            modalFullSearchTest: false,
            totalFullSearchTest: 1
          });
        }
        // добавляем прошлый вопрос в черный список
        const updatedExcluded = [
          ...state.excludedFullSearchTest,
          state.createdFullSearchQuestion
        ];
        set({
          excludedFullSearchTest: updatedExcluded,
          totalFullSearchTest:
            state.totalFullSearchTest + 1
        });
        // новый вопрос
        get().openModalFullSearchTest();
      },
      resetFullTest: () =>
        set({
          excludedFullSearchTest: [],
          totalFullSearchTest: 1
        }),
      closeModalFullSearchTest: () =>
        set({
          modalFullSearchTest: false,
          fullSearchTestValue: "",
          totalFullSearchTest: 1
        }),
    })),
    {
      name: "words",
      partialize: ({ allData,






        ...state }) => state,
    }
  ));

// testingData {}
// allData {}
// excludedData {} 
// devidedNumber 32
// languageFrom ru|en
// searchInputValue
// findedAnswers
// position

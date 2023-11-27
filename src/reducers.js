import {
  NOT_EKLE,
  NOT_SIL,
  GOT_ERROR,
  GOT_ORDER_REQUIRING,
  GET_INITIAL_STATE,
} from "./actions";

const s10chLocalStorageKey = "s10ch";

const baslangicDegerleri = {
  notlar: [
    {
      id: "75g1IyB8JLehAr0Lr5v3p",
      date: "Fri Feb 03 2023 09:40:27 GMT+0300 (GMT+03:00)",
      body: "Bugün hava çok güzel!|En iyi arkadaşımın en iyi arkadaşı olduğumu öğrendim :)|Kedim iyileşti!",
    },
  ],
  busy: false,
  error: null,
};

function localStorageStateYaz(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function localStorageStateOku(key) {
  return JSON.parse(localStorage.getItem(key));
}

function baslangicNotlariniGetir(key) {
  const eskiNotlar = localStorage.getItem(key);

  if (eskiNotlar) {
    return localStorageStateOku(key);
  } else {
    return baslangicDegerleri;
  }
}

export const reducerNot = (state = baslangicDegerleri, action) => {
  switch (action.type) {
    case NOT_EKLE:
      const notEkle = {
        ...state,
        busy: false,
        notlar: [action.payload, ...state.notlar],
      };
      localStorageStateYaz(s10chLocalStorageKey, notEkle);
      return notEkle;

    case NOT_SIL:
      const notSil = {
        ...state,
        busy: false,
        notlar: state.notlar.filter((f) => f.id !== action.payload),
      };
      localStorageStateYaz(s10chLocalStorageKey, notSil);
      return notSil;

    case GOT_ORDER_REQUIRING:
      return { ...state, busy: true, error: null };

    case GOT_ERROR:
      return { ...state, busy: false, error: action.payload };
    case GET_INITIAL_STATE:
      const initialState = baslangicNotlariniGetir(s10chLocalStorageKey);
      return initialState;

    default:
      return {
        ...state,
      };
  }
};

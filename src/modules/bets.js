const BET = "BET";
const UNBET = "UNBET";
const PLACE_BETS = "PLACE_BETS";
const CLEAN_BETS = "CLEAN_BETS";
const END_BETS = "END_BETS";

export function endBets(matrixId) {
  return {
    type: END_BETS,
    matrixId,
  };
}

export function cleanBets(matrixId) {
  return {
    type: CLEAN_BETS,
    matrixId,
  };
}

export function bet(matrixId, betId, active, price, x, y) {
  return {
    type: active ? BET : UNBET,
    bet: {
      id: betId,
      matrixId,
      price,
      x,
      y,
    },
  };
}

export function placeBets(matrixId) {
  return {
    type: PLACE_BETS,
    matrixId,
  };
}

const initialState = {
  balance: 100,
  list: [],
  placed: [],
};

export default (state = initialState, action) => {
  const { type, bet, matrixId } = action;
  switch (type) {
    case END_BETS:
      return {
        ...state,
        list: state.list.filter(b => b.matrixId !== matrixId),
        placed: state.placed.filter(b => b.matrixId !== matrixId),
      };
    case PLACE_BETS:
      return {
        ...state,
        list: state.list.filter(b => b.matrixId !== matrixId),
        placed: [
          ...state.placed,
          ...state.list.filter(b => b.matrixId === matrixId),
        ],
      };
    case CLEAN_BETS:
      return {
        ...state,
        list: state.list.filter(b => b.matrixId !== matrixId),
      };
    case UNBET:
      return {
        ...state,
        balance: state.balance + bet.price,
        list: state.list.filter(b => {
          if (b.id === bet.id && b.x === bet.x && b.y === bet.y) {
            return false;
          }
          return true;
        }),
      };
    case BET:
      return {
        ...state,
        balance: state.balance - bet.price,
        list: [...state.list, bet],
      };
    default:
      return state;
  }
};

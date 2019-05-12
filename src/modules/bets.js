import { SQUARE_STATUS } from "../components/Square/Square";

const BET = "BET";
const UNBET = "UNBET";
const PLACE_BETS = "PLACE_BETS";
const CLEAN_BETS = "CLEAN_BETS";
const END_BETS = "END_BETS";

export function endBets(gameId) {
  return {
    type: END_BETS,
    gameId,
  };
}

export function cleanBets(gameId) {
  return {
    type: CLEAN_BETS,
    gameId,
  };
}

export function bet(gameId, betId, status, price) {
  return {
    type: status === SQUARE_STATUS.BLANK ? BET : UNBET,
    bet: {
      id: betId,
      gameId,
      price,
    },
  };
}

export function placeBets(gameId) {
  return {
    type: PLACE_BETS,
    gameId,
  };
}

const initialState = {
  balance: 100,
  list: [],
  placed: [],
};

export default (state = initialState, action) => {
  const { type, bet, gameId } = action;
  switch (type) {
    case END_BETS:
      return {
        ...state,
        list: state.list.filter(b => b.gameId !== gameId),
        placed: state.placed.filter(b => b.gameId !== gameId),
      };
    case PLACE_BETS:
      return {
        ...state,
        list: state.list.filter(b => b.gameId !== gameId),
        placed: [
          ...state.placed,
          ...state.list.filter(b => b.gameId === gameId),
        ],
      };
    case CLEAN_BETS:
      return {
        ...state,
        list: state.list.filter(b => b.gameId !== gameId),
      };
    case UNBET:
      return {
        ...state,
        balance: state.balance + bet.price,
        list: state.list.filter(b => {
          if (b.id === bet.id) {
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

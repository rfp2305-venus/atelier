// actions return obj: type + relevant data

const UPVOTE = 'UPVOTE'; // for Q AND A alike?
const GET_QUESTIONS = 'GET_QUESTIONS';
const REPORT_ANSWER = 'REPORT_ANSWER';

export function getter() {
  type: GET_QUESTIONS; // linter wants semicolon?
}

export function upvoter() {
  return {
    type: UPVOTE,
    votes: votes + 1 // hmmm... this feels wrong
  };
}

export function reporter(id) {
  return {
    type: 'REPORT',
    isReported: true
  };
}
export function combineDocuments(docArray) {
  return docArray.map((obj) => obj.pageContent).join("\n\n");
}

export function convHistoryString(question, answer) {
  return ` Human: ${question} AI: ${answer}`;
}

export function formatConvHistory(messages) {
  return messages
    .map((message, i) => {
      if (i % 2 === 0) {
        return `Human: ${message}`;
      } else {
        return `AI: ${message}`;
      }
    })
    .join("\n");
}

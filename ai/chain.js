import {
  RunnableSequence,
  RunnablePassthrough,
} from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { standaloneQuestionPrompt, answerPrompt } from "./templates";
import { retriever } from "../utils/retriever";
import { combineDocuments } from "../utils/helpers";
import { llm } from "../config";

const standaloneChain = RunnableSequence.from([
  standaloneQuestionPrompt,
  llm,
  new StringOutputParser(),
]);

const retrieverChain = RunnableSequence.from([
  (prevInput) => prevInput.standalone_question,
  retriever,
  combineDocuments,
]);

const answerChain = RunnableSequence.from([
  answerPrompt,
  llm,
  new StringOutputParser(),
]);

const chain = RunnableSequence.from([
  {
    standalone_question: standaloneChain,
    original_input: new RunnablePassthrough(),
  },
  (prevResult) => {
    // Log and return the First step
    console.log("First Step", prevResult);
    return prevResult;
  },
  {
    context: retrieverChain,
    question: ({ original_input }) => original_input.question,
    conv_history: ({ original_input }) => original_input.conv_history,
  },
  (prevResult) => {
    // Log and return the second Step
    console.log("Second Step", prevResult);
    return prevResult;
  },
  answerChain,
]);

export async function mainChainRun(question, conv_history = "") {
  const response = await chain.invoke({
    question: question,
    conv_history: conv_history,
  });
  return response;
}

import { PromptTemplate } from "@langchain/core/prompts";
import { KNOWLEDGE_BASE_COMPANY_TITLE, SUPPORT_EMAIL } from "../config";

// A string holding the phrasing of the prompt
const standaloneQuestionTemplate = `Given some conversation history (if any) and a question, convert the question to a standalone question. 
conversation history: {conv_history}
question: {question} 
standalone question: `;

const answerTemplate = `You are a helpful and enthusiastic support bot who can answer a given question about ${KNOWLEDGE_BASE_COMPANY_TITLE} based on the context provided and the conversation history. 
Try to find the answer in the context. If the answer is not given in the context, find the answer in the conversation history if possible. 
If you really don't know the answer, say "I'm sorry, I don't know the answer to that." 
And direct the questioner to email ${SUPPORT_EMAIL}. Don't try to make up an answer. 
Always speak as if you were chatting to a friend.
context: {context}
conversation history: {conv_history}
question: {question}
answer: `;

// A prompt created using PromptTemplate and the fromTemplate method
export const standaloneQuestionPrompt = PromptTemplate.fromTemplate(
  standaloneQuestionTemplate
);

export const answerPrompt = PromptTemplate.fromTemplate(answerTemplate);

import { convHistoryString, combineDocuments } from "./utils/helpers";
import { mainChainRun } from "./ai/chain";

//const convHistory = [];
let convHistory = "";

//Conversation Flow
async function progressConversation() {
  const userInput = document.getElementById("user-input");
  const chatbotConversation = document.getElementById(
    "chatbot-conversation-container"
  );
  const humanQuestion = userInput.value;
  userInput.value = "";

  // Add human message
  const newHumanSpeechBubble = document.createElement("div");
  newHumanSpeechBubble.classList.add("speech", "speech-human");
  chatbotConversation.appendChild(newHumanSpeechBubble);
  newHumanSpeechBubble.textContent = humanQuestion;
  chatbotConversation.scrollTop = chatbotConversation.scrollHeight;

  // Run the chain
  const aiAnswer = await mainChainRun(humanQuestion, convHistory);

  // Update conversation history
  convHistory += convHistoryString(humanQuestion, aiAnswer);
  // console.log(convHistory);

  // Add AI message
  const newAiSpeechBubble = document.createElement("div");
  newAiSpeechBubble.classList.add("speech", "speech-ai");
  chatbotConversation.appendChild(newAiSpeechBubble);
  newAiSpeechBubble.textContent = aiAnswer;
  chatbotConversation.scrollTop = chatbotConversation.scrollHeight;
}

// Event handler
document.addEventListener("submit", (e) => {
  e.preventDefault();
  progressConversation();
});

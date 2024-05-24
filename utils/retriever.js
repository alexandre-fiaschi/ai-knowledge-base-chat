import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";
import { openAIApiKey, sbClient } from "../config";

const embeddings = new OpenAIEmbeddings({ openAIApiKey });

// Vector store config
const vectorStore = new SupabaseVectorStore(embeddings, {
  client: sbClient,
  tableName: "documents",
  queryName: "match_documents",
});

// Retriever will search inside the vector store to find nearest match
export const retriever = vectorStore.asRetriever();

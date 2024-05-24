import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { openAIApiKey } from "../config";
// import scrimbaInfoText from "bundle-text:../scrimbaInfo.txt";

async function splitText(text) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    separators: ["\n\n", "\n", " ", ""], // default setting
    chunkOverlap: 50,
  });
  const output = await splitter.createDocuments([text]);
  return output;
}

async function storeText(text) {
  const output = await splitText(text);
  await SupabaseVectorStore.fromDocuments(
    output,
    new OpenAIEmbeddings({ openAIApiKey }),
    {
      client: sbClient,
      tableName: "documents",
    }
  );
}

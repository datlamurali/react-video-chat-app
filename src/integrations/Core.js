export async function InvokeLLM({ prompt }) {
  try {
    const response = await fetch('https://datlam-opglxkphn-datlamuralis-projects.vercel.app/api/invoke-llm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error("InvokeLLM error:", error);
    return "I'm sorry, I encountered an error. Please try again!";
  }
}

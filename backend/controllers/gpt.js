const agent = require('https-proxy-agent')
const OpenAI = require('openai')

let openai

if (process.env.PROXY) {
  openai = new OpenAI.OpenAI({
    httpAgent: new agent.HttpsProxyAgent(process.env.PROXY),
    apiKey: process.env.OPENAI_KEY,
  })
} else {
  openai = new OpenAI.OpenAI({
    apiKey: process.env.OPENAI_KEY,
  })
}

const gptController = {
  generateMotivationLetter: async (ctx) => {
    try {
      const { cv, jobDescription } = ctx.request.body

      const systemPrompt = `You are a helpful intern application assistant. 
      Users will share their cv and the job description and you will help them 
      write a motivation letter.`

      const res = await openai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          { role: 'user', content: JSON.stringify({ cv, jobDescription }) },
        ],
        model: 'gpt-3.5-turbo',
      })
      const message = res?.choices?.[0]?.message?.content
      ctx.body = message
    } catch (error) {
      console.log(error)
      ctx.status = 500
      ctx.body = { error: 'Internal Server Error' }
    }
  },
}

module.exports = gptController
